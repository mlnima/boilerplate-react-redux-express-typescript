import {Router} from 'express'
const authRouter = Router();

import clientRegisterNewUser from './auth/register'
import clientUserLogin from './auth/login'

authRouter.post('/register',clientRegisterNewUser)
authRouter.post('/login',clientUserLogin)

export default authRouter
