import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

function convertBigIntToNumber(obj: any): any {
  if (typeof obj === "bigint") {
    return Number(obj);
  } else if (Array.isArray(obj)) {
    return obj.map(convertBigIntToNumber);
  } else if (typeof obj === "object" && obj !== null) {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [
        key,
        convertBigIntToNumber(value),
      ])
    );
  }
  return obj;
}

export async function GET(req: NextRequest) {
  if (!req.url) {
    return NextResponse.json(
      { error: "Request URL is required" },
      { status: 400 }
    );
  }
  const { searchParams } = new URL(req.url);
  const playerCount = searchParams.get("playerCount");

  if (!playerCount || isNaN(parseInt(playerCount, 10))) {
    return NextResponse.json(
      { error: "Valid player count is required" },
      { status: 400 }
    );
  }

  try {
    const setups = await prisma.player_number.findMany({
      where: {
        number: parseInt(playerCount, 10),
      },
      include: {
        card_num_by_player: {
          include: {
            card: {},
          },
        },
      },
    });

    const setupsConverted = convertBigIntToNumber(setups);

    return NextResponse.json(setupsConverted, { status: 200 });
  } catch (error) {
    console.error("GET /api/admin-dashboard/player-setup error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const { playerCount, cardSets } = await req.json();

  if (!playerCount || !cardSets) {
    return NextResponse.json(
      { error: "Player count and card sets are required" },
      { status: 400 }
    );
  }

  const totalCards = cardSets.reduce(
    (sum: number, set: { quantity: number }) => sum + set.quantity,
    0
  );
  if (totalCards !== playerCount) {
    return NextResponse.json(
      { error: "Total number of cards must match the number of players" },
      { status: 400 }
    );
  }

  try {
    await prisma.$transaction(async (prisma) => {
      // Delete existing card sets for the player count
      await prisma.card_num_by_player.deleteMany({
        where: {
          player_num_id: {
            equals: playerCount,
          },
        },
      });

      // Add new card sets
      for (const set of cardSets) {
        await prisma.card_num_by_player.create({
          data: {
            card_id: set.cardId,
            player_num_id: playerCount,
            quantity: set.quantity,
          },
        });
      }
    });

    // Fetch the updated card sets to return in the response
    const updatedCardSets = await prisma.card_num_by_player.findMany({
      where: {
        player_num_id: playerCount,
      },
      include: {
        card: {
          include: {
            card_description: true,
          },
        },
      },
    });

    const updatedCardSetsConverted = convertBigIntToNumber(updatedCardSets);

    return NextResponse.json(
      {
        message: "Card sets updated successfully",
        data: updatedCardSetsConverted,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("POST /api/admin-dashboard/player-setup error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export const config = {
  runtime: "edge",
};
