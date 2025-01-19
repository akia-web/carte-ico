import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { bigintReplacerAll, bigIntReplacerForOne } from '@/app/service/bigInt.service';
import { getToken, userMiddleware, verifyToken } from '@/middleware/auth-middleware';
import { FeedBackDto } from '@/app/interfaces/feed-back.dto';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {

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

  const body = await request.json();

  const highestOrderGameRule = await prisma.game_rules.findFirst({
    orderBy: {
      order: 'desc',
    },
  });

  let order: number = 1;

  if (highestOrderGameRule && highestOrderGameRule.order) {
    const orderString = bigIntReplacerForOne(highestOrderGameRule.order);
    const orderNumber = Number(orderString);
    order = orderNumber + 1;
  }


  const newRule = {
    created_at: new Date(),
    title: body.title,
    message: body.message,
    order: order

  };
  await prisma.game_rules.create({
    data: newRule,
  });


  return new Response(JSON.stringify({ message: 'ok' }),
    { status: 200, headers: { 'Content-Type': 'application/json' } });
}

export async function GET(request: NextRequest) {
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

  const getRules = await prisma.game_rules.findMany({
    orderBy: {
      order: 'asc',
    },
  });

  const newRules: FeedBackDto[] = [];
  if (getRules) {
    getRules.forEach((element) => {
      newRules.push(bigintReplacerAll(element));
    });
  }

  return NextResponse.json(
    newRules,
    { status: 200 }
  );
}

export async function PATCH(request: NextRequest) {

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

  const body = await request.json();

  const updatePromises = body.map(async (rule: { id: number; order: number }) => {
    return prisma.game_rules.update({
      where: { id: rule.id },
      data: { order: rule.order },
    });
  });

  await Promise.all(updatePromises);

  return new Response(JSON.stringify({ message: 'Order updated successfully' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });

}