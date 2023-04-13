import {default as server} from './server.routers'
import {Router} from 'express'

const router = Router()

router.use('/server', server)

export default router