import { PrismaClient } from "@prisma/client";
import { NextApiRequest } from "next";

const prisma = new PrismaClient();

function bigintReplacer(key: string, value: any) {
  return typeof value === 'bigint' ? value.toString() : value;
}

export async function GET() {
  try {
    const cards = await prisma.card.findMany({
      include: {
        card_description: true,
      },
    });
    return new Response(JSON.stringify(cards, bigintReplacer), { status: 200 });
  } catch (error) {
    console.error("Error fetching cards:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}

export async function PUT(req: NextApiRequest, res: Response) {
  try {
    const { id, type, name, descriptions } = req.body;

    if (!id || !type || !name || !descriptions) {
      return new Response(JSON.stringify({ error: "All fields are required" }), { status: 400 });
    }

    const updatedCard = await prisma.card.update({
      where: { id: BigInt(id) },
      data: {
        type,
        name,
        card_description: {
          updateMany: descriptions.map((desc: any) => ({
            where: { id: BigInt(desc.id) },
            data: { description: desc.description },
          })),
        },
      },
    });

    return new Response(JSON.stringify(updatedCard, bigintReplacer), { status: 200 });
  } catch (error) {
    console.error("Error updating card:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}

export async function POST(req: NextApiRequest, res: Response) {
  const { type, name, descriptions } = req.body;

  if (!type || !name || !descriptions) {
    return new Response(JSON.stringify({ error: "All fields are required" }), { status: 400 });
  }

  try {
    const newCard = await prisma.card.create({
      data: {
        type,
        name,
        card_description: {
          create: descriptions.map((desc: string) => ({ description: desc })),
        },
      },
    });
    return new Response(JSON.stringify(newCard, bigintReplacer), { status: 201 });
  } catch (error) {
    console.error("Error creating card:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}

export async function DELETE(req: NextApiRequest) {
  const { id } = req.body;

  if (!id) {
    return new Response(JSON.stringify({ error: "Card ID is required" }), { status: 400 });
  }

  try {
    await prisma.card_description.deleteMany({
      where: { card_id: BigInt(id) },
    });

    await prisma.card.delete({
      where: { id: BigInt(id) },
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting card:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}

export const config = {
  runtime: "edge",
};
