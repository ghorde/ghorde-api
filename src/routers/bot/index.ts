import {default as server} from './server.routers'
import {default as image} from './image.routers'
import {Router} from 'express'

const router = Router()

router.use('/server', server)
router.use('/image', image)

export default router