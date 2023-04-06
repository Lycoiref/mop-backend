import Router from 'koa-router'

const router = new Router();

router.post('/test', (ctx, next) => {
    ctx.body = 'HelloWorld'
})

export default router;
