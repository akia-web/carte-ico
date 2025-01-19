import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request : Request) {
  const body = await request.json();
  const config = {
    name: body.name,
    value: body.value,
  }
  await prisma.game_config.create({
    data: config,
  });


  return new Response(JSON.stringify({ message: 'ok' }),
  { status: 200, headers: { 'Content-Type': 'application/json' } })
}
  
  

