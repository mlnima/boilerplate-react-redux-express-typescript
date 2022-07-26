// @ts-ignore
import bcrypt from 'bcryptjs'
// @ts-ignore
import userSchema from '../../models/userSchema'

const register =  (req: { body: { username: any; email: any; password: any; password2: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): void; new(): any; }; }; json: (arg0: { message: string; }) => void; }) =>{
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const password2 = req.body.password2;

    userSchema.findOne({ $or: [ { username }, { email } ] }).exec()
        .then((user) => {
            if (user) {
                res.status(409).json({message:'This username already exists'})
            } else {
                // Hashing
                if (password === password2) {
                    bcrypt.hash(password, 10, (error: any, hash: any)=> {
                        if (error) {
                            res.status(503).json({message:'Something went wrong please try again later'})
                        } else if (hash) {
                            const userData = {
                                username,
                                email,
                                role: 'subscriber',
                                password: hash,
                                keyMaster:false
                            };
                            const newUserData = new userSchema(userData);
                            newUserData.save().then(() => {
                                res.json({message:'Your account has been successfully created you can login now'})
                            }).catch(() => {
                                res.status(503).json({message:'Something went wrong please try again later'})
                            });

                        }
                    });
                } else {

                    res.status(400).json({message:'Passwords are not matched'})

                }

            }
        }).catch(() => {
        res.status(503).json({message:'Something went wrong please try again later'})

    })
}

export default register