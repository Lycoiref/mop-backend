import Koa from 'koa'
import Router from 'koa-router'

const app = new Koa()
const router = new Router()

router.get('/', ctx => {
    ctx.body = 'Hello World'
})
// app.use(async ctx => {
//     ctx.body = 'Hello World';
// });

app.use(router.routes())

app.listen(3000);