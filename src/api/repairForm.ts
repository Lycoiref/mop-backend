import Router from 'koa-router'
import { RepairFormInput } from '../utils/types';
import { RepairForm } from '@prisma/client';
import prisma from '../utils/database/database';

const router = new Router();

router.post('/', async (ctx) => {
    const data: RepairForm = {
        ...(ctx.request.body as RepairForm)
    }

    const repairForm = await prisma.repairForm.create({
        data
    })

    ctx.body = repairForm
})

router.delete('/:id', async (ctx) => {
    const id = parseInt(ctx.params.id)
    const repairForm = await prisma.repairForm.delete({
        where: { id: id },
    })
    ctx.body = repairForm
})

router.put('/:id', async (ctx) => {
    const id = parseInt(ctx.params.id)
    const repairForm = await prisma.repairForm.update({
      where: { id: id },
      data: {
          ...ctx.request.body as RepairFormInput
      },
    })
    ctx.body = repairForm
})

router.get('/', async (ctx) => {
    const repairForms = await prisma.repairForm.findMany()
    ctx.body = repairForms
})

router.get('/:id', async (ctx) => {
    const repairFormId = parseInt(ctx.params.id)
    const repairForm = await prisma.user.findUnique({ where: { id: repairFormId } })
    if (repairForm) {
        ctx.body = repairForm
    } else {
        ctx.status = 404
        ctx.body = { message: 'User not found' }
    }
})

export default router;
