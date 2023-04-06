import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

prisma.$on('beforeExit', async () => {
    console.log('beforeExit hook')
})

export default prisma
