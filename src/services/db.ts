import { PrismaClient } from '@prisma/client';
import { generateUID } from './uid'

const prisma = new PrismaClient();


export async function close() {
  await prisma.$disconnect();
}
export default prisma;