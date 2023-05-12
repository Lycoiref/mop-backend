import Router from 'koa-router'
import { ReimbursementRecordInput } from '../utils/types';
import { reimbursement_record as ReimbursementRecord } from '@prisma/client';
import prisma from '../utils/database/database';

const router = new Router();

router.post('/reimburse', async (ctx) => {
    const data: ReimbursementRecordInput = {
        ...ctx.request.body as ReimbursementRecord
    }

    const reimbursementRecord = await prisma.reimbursement_record.create({
        data
    })

    ctx.body = reimbursementRecord
})

router.delete('/reimburse/:id', async (ctx) => {
    const id = parseInt(ctx.params.id)
    const user = await prisma.user.delete({
        where: { id: id },
    })
    ctx.body = user
})

router.put('/reimburse/:id', async (ctx) => {
    const id = parseInt(ctx.params.id)
    const user = await prisma.user.update({
      where: { id: id },
      data: {
          ...ctx.request.body as User
      },
    })
    ctx.body = user
})

router.get('/reimburse', async (ctx) => {
    const users = await prisma.user.findMany()
    ctx.body = users
})

router.get('/reimburse/:id', async (ctx) => {
    const userId = parseInt(ctx.params.id)
    const user = await prisma.user.findUnique({ where: { id: userId } })
    if (user) {
        ctx.body = user
    } else {
        ctx.status = 404
        ctx.body = { message: 'User not found' }
    }
})

export default router;
