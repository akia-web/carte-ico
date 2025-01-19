import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getToken, userMiddleware, verifyToken } from '@/middleware/auth-middleware';
import { bigintReplacerAllForUser } from '@/app/service/bigInt.service';

const prisma = new PrismaClient();

function bigintReplacer(key: string, value: any) {
  return typeof value === "bigint" ? value.toString() : value;
}

export async function GET(request: NextRequest) {
  try {

    const authError = await userMiddleware(request,['standard']);
    if (authError) {
      return authError;
    }

    const token = await getToken(request)
    const userId = await verifyToken(token)

    if(!userId){
      return NextResponse.json(
        { error: "error token verification" },
        { status: 404 }
      );
    }
    // Check database connection
    await prisma.$connect();
    console.log("Database connected successfully");

    const user = await prisma.user.findUnique({
      where:{
        id: userId.id
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        created_at: true,
        user_stat: {
          select: {
            game_played: true,
            num_win: true,
            game_abandoned: true,
            game_loss: true,
          },
        },
      },
    });

    return NextResponse.json(
      bigintReplacerAllForUser(user),
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Internal Server Error:", error?.message || error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
