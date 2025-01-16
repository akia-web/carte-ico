import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

function bigintReplacer(key: string, value: any) {
  return typeof value === "bigint" ? value.toString() : value;
}

export async function GET(request: NextRequest) {
  try {
    const { user_id } = await request.json();

    if (!user_id) {
      console.error("Missing required fields");
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check database connection
    await prisma.$connect();
    console.log("Database connected successfully");

    const user = await prisma.user.findUnique({
      where: { id: BigInt(user_id) },
    });

    return NextResponse.json(JSON.stringify(user, bigintReplacer), {
      status: 200,
    });
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
