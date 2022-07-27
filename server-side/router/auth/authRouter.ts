import * as express from "express";
import login from './login';
import register from './register';
import autoLogin from "./autoLogin";
import authMiddleware from "../../middleware/authMiddleware";
import userUploadImage from "./userUploadImage";
const router = express.Router();

router.post('/register',register)
router.post('/login',login)
router.post('/autoLogin',authMiddleware,autoLogin)
router.post('/userUploadImage',authMiddleware,userUploadImage)

export default router