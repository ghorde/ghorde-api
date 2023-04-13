import {Router} from 'express'

import {default as bot} from './bot'

const router = Router()

router.use('/bot', bot)

export default router