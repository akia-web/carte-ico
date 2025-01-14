import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  if (!req.url) {
    return res.status(400).json({ error: "Request URL is required" });
  }
  const { searchParams } = new URL(req.url);
  const playerCount = searchParams.get("playerCount");

  if (playerCount) {
    try {
      const setups = await prisma.player_number.findMany({
        where: {
          number: parseInt(playerCount, 10),
        },
        include: {
          card_num_by_player: {
            include: {
              card: {
                include: {
                  card_description: true,
                },
              },
            },
          },
        },
      });

      return res.status(200).json(setups);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  } else {
    try {
      const cards = await prisma.card.findMany({
        include: {
          card_description: true,
        },
      });
      return res.status(200).json(cards);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

export async function PUT(req: NextApiRequest, res: NextApiResponse) {
  const { id, type, name, descriptions } = req.body;

  if (!id || !type || !name || !descriptions) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const updatedCard = await prisma.card.update({
      where: { id: BigInt(id) },
      data: {
        type,
        name,
        card_description: {
          deleteMany: {},
          create: descriptions.map((desc: string) => ({ description: desc })),
        },
      },
    });
    return res.status(200).json(updatedCard);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { type, name, descriptions } = req.body;

  if (!type || !name || !descriptions) {
    return res.status(400).json({ error: "All fields are required" });
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
    return res.status(201).json(newCard);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function DELETE(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: "Card ID is required" });
  }

  try {
    await prisma.card_description.deleteMany({
      where: { card_id: BigInt(id) },
    });

    await prisma.card.delete({
      where: { id: BigInt(id) },
    });

    return res.status(204).end();
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}

export const config = {
  runtime: "edge",
};
