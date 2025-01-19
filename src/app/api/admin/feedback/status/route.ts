import { PrismaClient } from '@prisma/client';
import { getToken, userMiddleware, verifyToken } from '@/middleware/auth-middleware';
import { NextRequest, NextResponse } from "next/server";
import { JwtPayload } from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function PATCH(request : NextRequest) {
  const authError = await userMiddleware(request,['admin']);
  if (authError) {
    return authError;
  }

  const token:string = await getToken(request)
  const userId:JwtPayload| null = await verifyToken(token)

  if(!userId){
    return NextResponse.json(
      { error: "error token verification" },
      { status: 404 }
    );
  }


  const body = await request.json();

   await prisma.feedback.update({
    where: { id: body.id },
    data: {
      status: body.status
    },
  });

  return new Response(JSON.stringify({ message: 'ok' }),
    { status: 200, headers: { 'Content-Type': 'application/json' } })
}
