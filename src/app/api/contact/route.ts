import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request : Request) {
  const body = await request.json();
  const newfeedback = {created_at: new Date(),
    email: body.email,
    message: body.message,
    type: body.type
  }
  await prisma.feedback.create({
    data: newfeedback,
  });


  return new Response(JSON.stringify({ message: 'ok' }),
  { status: 200, headers: { 'Content-Type': 'application/json' } })
}
  
  

