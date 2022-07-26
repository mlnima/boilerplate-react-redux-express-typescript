import * as jwt from 'jsonwebtoken'

const authMiddleware = (req,res,next)=>{
    try{
        const token = req.body.token || req.query.token
        req.userData = jwt.verify(token , process.env.JWT_KEY);
        next()
    }catch (error) {
        return res.status(401).json({
            message:'Unauthorized'
        })
    }
};

export default authMiddleware