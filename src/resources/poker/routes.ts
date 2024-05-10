import { Router } from 'express'
import { checkSchema } from 'express-validator'
import { compareHands, getHands } from './controller'
import { compareHandsSchema } from './schema'

const router = Router()

// define routes
router.route('/get-hands').get(getHands)
router.post('/compare-hands', checkSchema(compareHandsSchema), compareHands)

export default router
