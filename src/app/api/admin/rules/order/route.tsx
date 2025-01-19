import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getToken, userMiddleware, verifyToken } from '@/middleware/auth-middleware';

const prisma = new PrismaClient();


export async function PATCH(request: NextRequest) {
  try {
    // Middleware pour vérifier les droits
    const authError = await userMiddleware(request, ['admin']);
    if (authError) {
      return authError;
    }

    // Validation du token
    const token = await getToken(request);
    const userId = await verifyToken(token);
    if (!userId) {
      return NextResponse.json(
        { error: 'Error token verification' },
        { status: 404 }
      );
    }

    const body = await request.json();
    if (!Array.isArray(body) || body.some(rule => typeof rule.id !== 'number' || typeof rule.order !== 'number')) {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }
    await prisma.$connect();
    const oldRules = await prisma.game_rules.findMany();
    const patchRules:any[] = []

    body.forEach((element)=>{
      const findOldRule = oldRules.find((old)=> old.id == element.id)
      if(findOldRule){
        if(findOldRule.order != element.order){
          patchRules.push(element)
        }
      }
    })

    const updatePromises = patchRules.map(async (rule: { id: number; order: number }) => {
      return prisma.game_rules.update({
        where: { id: rule.id },
        data: { order: rule.order },
      });
    });

    await Promise.all(updatePromises);
    await prisma.$disconnect();

    return new Response(
      JSON.stringify({ message: 'Order updated successfully' }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: 'An unexpected error occurred', details: error.message },
      { status: 500 }
    );
  }
}