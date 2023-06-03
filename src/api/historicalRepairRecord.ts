import Router from 'koa-router'
import { HistoricalRepairRecord } from '@prisma/client';
import prisma from '../utils/database/database';
import { HistoricalRepairRecordInput } from '../utils/types';

const router = new Router();

router.post('/', async (ctx) => {
    const data: HistoricalRepairRecord = {
        ...(ctx.request.body as HistoricalRepairRecord)
    }

    const historicalRepairRecord = await prisma.historicalRepairRecord.create({
        data
    })

    ctx.body = historicalRepairRecord
})

router.delete('/:id', async (ctx) => {
    const id = parseInt(ctx.params.id)
    const historicalRepairRecord = await prisma.historicalRepairRecord.delete({
        where: { id: id },
    })
    ctx.body = historicalRepairRecord
})

router.put('/:id', async (ctx) => {
    const id = parseInt(ctx.params.id)
    const historicalRepairRecord = await prisma.historicalRepairRecord.update({
      where: { id: id },
      data: {
          ...ctx.request.body as HistoricalRepairRecordInput
      },
    })
    ctx.body = historicalRepairRecord
})

router.get('/', async (ctx) => {
    const historicalRepairRecords = await prisma.historicalRepairRecord.findMany()
    ctx.body = historicalRepairRecords
})

router.get('/:id', async (ctx) => {
    const historicalRepairRecordId = parseInt(ctx.params.id)
    const historicalRepairRecord = await prisma.historicalRepairRecord.findUnique({ where: { id: historicalRepairRecordId } })
    if (historicalRepairRecord) {
        ctx.body = historicalRepairRecord
    } else {
        ctx.status = 404
        ctx.body = { message: 'User not found' }
    }
})

export default router;
