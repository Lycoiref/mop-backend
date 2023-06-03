import Koa from 'koa'
const bodyParser = require('koa-bodyparser')
import Router from 'koa-router'
import cors from 'koa2-cors'
import { initAdmin } from './utils/database/index'
import { user, device, historicalRepairRecord, reimbursementRecord, repairForm } from './api/index'

const app = new Koa()
const router = new Router()

app.use(bodyParser())

router.get('/', ctx => {
    ctx.body = 'Hello World'
})

router.use('/user', user.routes(), user.allowedMethods())
router.use('/device', device.routes(), device.allowedMethods())
router.use('/historical-repair', historicalRepairRecord.routes(), historicalRepairRecord.allowedMethods())
router.use('/reimburse', reimbursementRecord.routes(), reimbursementRecord.allowedMethods())
router.use('/repair', repairForm.routes(), repairForm.allowedMethods())

// cors跨域
app.use(cors())
app.use(router.routes())
app.listen(3000, async () => {
    await initAdmin()
    console.log('server is running at http://localhost:3000')
})
