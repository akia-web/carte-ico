import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { adminMiddleware } from "../../../../middleware/authMiddleware";

const prisma = new PrismaClient();

function bigintReplacer(key: string, value: any) {
  return typeof value === "bigint" ? value.toString() : value;
}

export async function GET(request: NextRequest) {
  try {
    const authError = await adminMiddleware(request);
    if (authError) {
      return authError;
    }

    // Check database connection
    await prisma.$connect();
    console.log("Database connected successfully");

    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        created_at: true,
      },
    });

    return NextResponse.json(JSON.stringify(users, bigintReplacer), {
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
