import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  if (!req.url) {
    return res.status(400).json({ error: "Request URL is required" });
  }
  const { searchParams } = new URL(req.url);
  const playerCount = searchParams.get("playerCount");

  if (!playerCount) {
    return res.status(400).json({ error: "Player count is required" });
  }

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
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { playerCount, cardSets } = req.body;

  if (!playerCount || !cardSets) {
    return res
      .status(400)
      .json({ error: "Player count and card sets are required" });
  }

  const totalCards = cardSets.reduce(
    (sum: number, set: { quantity: number }) => sum + set.quantity,
    0
  );
  if (totalCards !== playerCount) {
    return res
      .status(400)
      .json({
        error: "Total number of cards must match the number of players",
      });
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

    return res.status(200).json({ message: "Card sets updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}

export const config = {
  runtime: "edge",
};
