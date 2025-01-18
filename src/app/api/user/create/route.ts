import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, confirmPassword } = await request.json();
    console.log("Received data:", { name, email, password, confirmPassword }); // Log received data

    if (!name || !email || !password || !confirmPassword) {
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

    if(password !== confirmPassword){
      console.error("Password and confirmPassword are different");
      return NextResponse.json(
        { error: "Password and confirmPassword are different" },
        { status: 404 }
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

    const user_stat = {
      created_at: new Date().toISOString(),
      game_played: 0,
      num_win: 0,
      game_abandoned: 0,
      game_loss: 0
    }

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "standard",
        created_at: new Date().toISOString(),
        user_stat: {
          create: user_stat,
        },
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
