import Router from 'koa-router'
import { UserInput } from '../utils/types';
import { user as User } from '@prisma/client';
import prisma from '../utils/database/database';

const router = new Router();

router.post('/user', async (ctx) => {
    const data: UserInput = {
        ...ctx.request.body as User
    }

    const user = await prisma.user.create({
        data
    })

    ctx.body = user
})

router.delete('/user/:id', async (ctx) => {
    const id = parseInt(ctx.params.id)
    const user = await prisma.user.delete({
        where: { id: id },
    })
    ctx.body = user
})

router.put('/user/:id', async (ctx) => {
    const id = parseInt(ctx.params.id)
    const user = await prisma.user.update({
      where: { id: id },
      data: {
          ...ctx.request.body as User
      },
    })
    ctx.body = user
})

router.get('/user', async (ctx) => {
    const users = await prisma.user.findMany()
    ctx.body = users
})

router.get('/user/:id', async (ctx) => {
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
