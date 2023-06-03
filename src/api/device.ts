import Router from 'koa-router'
import { Device } from '@prisma/client';
import prisma from '../utils/database/database';
import { DeviceInput } from '../utils/types';

const router = new Router();

router.post('/', async (ctx) => {
    const data: Device = {
        ...(ctx.request.body as Device)
    }

    const device = await prisma.device.create({
        data
    })

    ctx.body = device
})

router.delete('/:id', async (ctx) => {
    const id = parseInt(ctx.params.id)
    const device = await prisma.device.delete({
        where: { id: id },
    })
    ctx.body = device
})

router.put('/:id', async (ctx) => {
    const id = parseInt(ctx.params.id)
    const device = await prisma.device.update({
      where: { id: id },
      data: {
          ...ctx.request.body as DeviceInput
      },
    })
    ctx.body = device
})

router.get('/', async (ctx) => {
    const devices = await prisma.device.findMany()
    ctx.body = devices
})

router.get('/:id', async (ctx) => {
    const deviceId = parseInt(ctx.params.id)
    const device = await prisma.device.findUnique({ where: { id: deviceId } })
    if (device) {
        ctx.body = device
    } else {
        ctx.status = 404
        ctx.body = { message: 'User not found' }
    }
})

export default router;
