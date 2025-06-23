import jwt from "jsonwebtoken";

const authMiddleware=async(req,res,next)=>{
    const {token}=req.headers;
    if(!token){
        return res.json({success:false,message:"Not Authorized Login Again"})
    }
    try{
        const decoded_token=jwt.verify(token,process.env.JWT_SECRET);
        if (!req.body) req.body = {};
        req.body.userId=decoded_token.id;
        next();
    }catch(err){
        console.log(err);
        res.json({success:false,message:"Error"})
    }
}

export default authMiddleware;