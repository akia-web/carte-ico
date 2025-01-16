
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function authMiddleware(request: NextRequest, userId: BigInt) {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];
  // Assuming you have a function to verify the token and get the user
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

  return null; // No error, proceed with the request
}

async function verifyToken(token: string) {
  // Implement your token verification logic here
  // Return the user object if the token is valid
  return { id: 1, role: "admin" }; // Example user object
}