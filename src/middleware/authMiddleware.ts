
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function authMiddleware(request: NextRequest, userId: BigInt) {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];
  const user = await verifyToken(token);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
  });

  if (!dbUser || (dbUser.role !== "admin" && dbUser.id !== userId)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  return null; 
}

async function verifyToken(token: string) {
  return { id: 1, role: "admin" }; 
}