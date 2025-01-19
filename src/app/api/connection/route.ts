import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { bigintReplacerAllForUser } from '@/app/service/bigInt.service';

const prisma = new PrismaClient();

function bigintReplacer(value: any) {
  return typeof value === 'bigint' ? value.toString() : value;
}



export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findFirst({
      where: { email },
      include: { user_stat: true }
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined');
    }

    const userId = bigintReplacer(user.id);

    const token: string = jwt.sign({ id: userId, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '7h',
    });

    return NextResponse.json(
      { message: 'Login successful', token, user: bigintReplacerAllForUser(user) },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Internal Server Error:', error?.message || error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
