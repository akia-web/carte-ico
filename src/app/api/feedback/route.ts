import { NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
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