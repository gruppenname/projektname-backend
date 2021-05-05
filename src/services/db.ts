import { PrismaClient } from '@prisma/client';
import debug from 'debug';
const log = debug('db')

const prisma = new PrismaClient();
log('Database connection established')

export async function close() {
  await prisma.$disconnect();
  log('Database successfully disconnected')

}
export default prisma;