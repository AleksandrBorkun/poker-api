import { Router } from 'express'

const router: Router = Router()

// import routes
import pokerRouter from '../resources/poker/routes'

// Higher level routes definition
router.use('/poker', pokerRouter)

export default router
