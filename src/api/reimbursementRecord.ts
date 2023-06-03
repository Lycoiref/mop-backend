import Router from 'koa-router'
import { ReimbursementRecord } from '@prisma/client';
import prisma from '../utils/database/database';
import { ReimbursementRecordInput } from '../utils/types';

const router = new Router();

router.post('/reimburse', async (ctx) => {
    const data: ReimbursementRecord = {
        ...(ctx.request.body as ReimbursementRecord)
    }

    const reimbursementRecord = await prisma.reimbursementRecord.create({
        data
    })

    ctx.body = reimbursementRecord
})

router.delete('/:id', async (ctx) => {
    const id = parseInt(ctx.params.id)
    const reimbursementRecord = await prisma.reimbursementRecord.delete({
        where: { id: id },
    })
    ctx.body = reimbursementRecord
})

router.put('/:id', async (ctx) => {
    const id = parseInt(ctx.params.id)
    const reimbursementRecord = await prisma.reimbursementRecord.update({
      where: { id: id },
      data: {
          ...ctx.request.body as ReimbursementRecordInput
      },
    })
    ctx.body = reimbursementRecord
})

router.get('/', async (ctx) => {
    const reimbursementRecords = await prisma.reimbursementRecord.findMany()
    ctx.body = reimbursementRecords
})

router.get('/:id', async (ctx) => {
    const reimbursementRecordId = parseInt(ctx.params.id)
    const reimbursementRecord = await prisma.reimbursementRecord.findUnique({ where: { id: reimbursementRecordId } })
    if (reimbursementRecord) {
        ctx.body = reimbursementRecord
    } else {
        ctx.status = 404
        ctx.body = { message: 'User not found' }
    }
})

export default router;
