import authRouter from './authRouter'
import {Router} from 'express'
const mainRouter = Router()

mainRouter.use('/auth',authRouter);

export default mainRouter
// module.exports = mainRouter