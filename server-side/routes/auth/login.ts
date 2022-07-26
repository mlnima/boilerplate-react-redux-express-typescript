// clientUserLogin
import userSchema from '../../models/userSchema'
// @ts-ignore
import jwt from 'jsonwebtoken'
// @ts-ignore
import bcrypt from 'bcryptjs'
import { Types } from 'mongoose';

const tokenExpireTime = '30 days';

const login = async (req: { body: { username: any; password: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): void; new(): any; }; }; json: (arg0: { token?: any; username?: string; role?: string; keyMaster?: boolean; profileImage?: string; coverImage?: any; _id?: Types.ObjectId; message?: string; response?: string; type?: string; }) => void; }) => {
    const username = req.body.username;
    const password = req.body.password;
    await userSchema.findOne({username})
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password,  (err: any, isCorrect: boolean)=> {
                    if (err || isCorrect === false) {
                        res.status(401).json({message: 'You have entered an invalid username or password'})
                    } else if (isCorrect) {
                        const token = jwt.sign({
                                username: user.username,
                                _id: user._id,
                            },
                            process.env.JWT_KEY,
                            {expiresIn: tokenExpireTime});
                        res.json({
                            token,
                            username: user.username,
                            role: user.role,
                            keyMaster: user.keyMaster,
                            profileImage: user.profileImage,
                            coverImage: user.coverImage,
                            _id:user._id,
                            message: 'Login successful',
                        });

                    }

                })
            } else if (!user) {

                res.status(404).json({message: 'You have entered an invalid username or password'})

            }
        }).catch(err => {
            res.status(503).json({message: 'Something went wrong please try again later'})
            res.json({response: 'server Error !', type: 'error'})
        });
};


export default login