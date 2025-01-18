import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { userMiddleware } from '@/middleware/authMiddleware';


const prisma = new PrismaClient();

export async function DELETE(request: NextRequest) {
  try {
    const authError = await userMiddleware(request,['admin']);
    if (authError) {
      return authError;
    }

    const { userId } = await request.json();
    console.log("Received data:", { userId }); // Log received data

    if (!userId) {
      console.error("Missing required fields"); // Log error
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check database connection
    await prisma.$connect();
    console.log("Database connected successfully");

    const deletedUser = await prisma.user.delete({
      where: { id: BigInt(userId) },
    });

    console.log("User deleted:", deletedUser);

    return NextResponse.json({ message: "User deleted" }, { status: 200 });
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
