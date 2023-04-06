import Koa from 'koa'
import Router from 'koa-router'
import cors from 'koa2-cors'
import api from './api/api'
import user from './api/user'

const app = new Koa()
const router = new Router()

router.get('/', ctx => {
    ctx.body = 'Hello World'
})

router.use('/api', api.routes(), api.allowedMethods())
router.use('/user', user.routes(), user.allowedMethods())

// cors跨域
app.use(cors())
app.use(router.routes())
app.listen(3000, () => {
    console.log('server is running at http://localhost:3000')
})
