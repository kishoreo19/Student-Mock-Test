import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    const result = await prisma.position.updateMany({
      data: {
        status: 'INACTIVE'
      }
    });
    console.log(`Successfully updated ${result.count} positions to INACTIVE`);
  } catch (error) {
    console.error('Error updating positions:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
