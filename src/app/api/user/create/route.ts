import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();
    console.log("Received data:", { name, email, password }); // Log received data

    if (!name || !email || !password) {
      console.error("Missing required fields"); // Log error
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.error("Invalid email format"); // Log error
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Check if email is already used
    const existingUser = await prisma.user.findMany({
      where: { email: email },
    });
    console.log("Existing user:", existingUser); // Log existing user
    if (existingUser && existingUser.length > 0) {
      console.error("Email already in use"); // Log error
      return NextResponse.json(
        { error: "Email already in use" },
        { status: 400 }
      );
    }

    // Check database connection
    await prisma.$connect();
    console.log("Database connected successfully");

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "standard",
        created_at: new Date().toISOString(), // Convert date to ISO string
      },
    });

    console.log("User created:", newUser); 

    return NextResponse.json({ message: "User created" }, { status: 201 });
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
