import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { getToken, userMiddleware, verifyToken } from '@/middleware/auth-middleware';
import { bigintReplacerAll } from '@/app/service/bigInt.service';
import { FeedBackDto } from '@/app/interfaces/feed-back.dto';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {

    const authError = await userMiddleware(request, ['admin']);
    if (authError) {
      return authError;
    }

    const token = await getToken(request);
    const userId = await verifyToken(token);

    if (!userId) {
      return NextResponse.json(
        { error: 'error token verification' },
        { status: 404 }
      );
    }
    await prisma.$connect();
    console.log('Database connected successfully');

    const getFeedBack = await prisma.feedback.findMany({
      orderBy: {
        created_at: 'desc',
      },
    });

    // remove bigInt for id
    const newFeedBack: FeedBackDto[] = [];
    if (getFeedBack) {
      getFeedBack.forEach((element) => {
        newFeedBack.push(bigintReplacerAll(element));
      });
    }

    return NextResponse.json(
      newFeedBack,
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

export async function DELETE(request: NextRequest) {
  const authError = await userMiddleware(request, ['admin']);
  if (authError) {
    return authError;
  }

  const token = await getToken(request);
  const userId = await verifyToken(token);

  if (!userId) {
    return NextResponse.json(
      { error: 'error token verification' },
      { status: 404 }
    );
  }

  await prisma.$connect();
  console.log('Database connected successfully');
  const body = await request.json();

  await prisma.feedback.delete({
    where: {
      id: body.id,
    },
  });

  return new Response(JSON.stringify({ message: 'ok' }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
}

export async function POST(request : NextRequest) {
  // no Middleware because everyone with account or without account can send message

  const body = await request.json();
  const newfeedback = {created_at: new Date(),
    email: body.email,
    message: body.message,
    type: body.type,
    subject: body.subject
  }
  await prisma.feedback.create({
    data: newfeedback,
  });


  return new Response(JSON.stringify({ message: 'ok' }),
    { status: 200, headers: { 'Content-Type': 'application/json' } })
}