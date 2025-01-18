import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function userMiddleware(request: NextRequest, role: string[]) {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];
  const user = await verifyToken(token);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const dbUser = await prisma.user.findUnique({
    where: { id: (user as jwt.JwtPayload).id },
  });

  if (!dbUser || !role.includes(dbUser.role)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return null;
}

// export async function adminMiddleware(request: NextRequest) {
//   const authHeader = request.headers.get("Authorization");
//   if (!authHeader) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }
//
//   const token = authHeader.split(" ")[1];
//   const user = await verifyToken(token);
//   if (!user) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }
//
//   const dbUser = await prisma.user.findUnique({
//     where: { id: (user as jwt.JwtPayload).id },
//   });
//
//   if (!dbUser || dbUser.role !== "admin") {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }
//
//   return null;
// }

export async function verifyToken(token: string) {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined');
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as jwt.JwtPayload;
    return decoded;
  } catch (error) {
    return null;
  }
}

export async function getToken(request: NextRequest) {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader) {
    throw new Error('no authorization headers');
  }

  return authHeader.split(' ')[1];
}
