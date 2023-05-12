import Koa from 'koa'
const bodyParser = require('koa-bodyparser')
import Router from 'koa-router'
import cors from 'koa2-cors'
import { initAdmin } from './utils/database/index'
import { api, user } from './api/index'

const app = new Koa()
const router = new Router()

app.use(bodyParser())

router.get('/', ctx => {
    ctx.body = 'Hello World'
})

router.use('/api', api.routes(), api.allowedMethods())
router.use('/user', user.routes(), user.allowedMethods())

// cors跨域
app.use(cors())
app.use(router.routes())
app.listen(3000, async () => {
    await initAdmin()
    console.log('server is running at http://localhost:3000')
})
