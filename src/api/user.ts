import Router from 'koa-router'
import { UserInput } from '../types';
import { User } from '@prisma/client';
import prisma from '../utils/database/database';

const router = new Router();

router.post('/', async (ctx) => {
    const data: User = {
        ...(ctx.request.body as User)
    }

    const user: User = await prisma.user.create({
        data
    })

    ctx.body = user
})

router.delete('/:id', async (ctx) => {
    const id = parseInt(ctx.params.id)
    const user = await prisma.user.delete({
        where: { id: id },
    })
    ctx.body = user
})

router.put('/:id', async (ctx) => {
    const id = parseInt(ctx.params.id)
    const user = await prisma.user.update({
      where: { id: id },
      data: {
          ...ctx.request.body as UserInput
      },
    })
    ctx.body = user
})

router.get('/', async (ctx) => {
    const users = await prisma.user.findMany()
    ctx.body = users
})

router.get('/:id', async (ctx) => {
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
