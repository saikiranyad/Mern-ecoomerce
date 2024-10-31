import jwt from 'jsonwebtoken'

const authUser = async(req,res,next)=>{
    const {token} = req.headers;
    if(!token){
        res.json({success:false,messgae:'Login not authorized'})
    }
    try{
        const tokendecode = jwt.verify(token,process.env.JWTSECRET);
        req.body.userId = tokendecode.id
        next();
    }catch(err){
        console.log(err)
        res.json({success:false,message:'error occured in auth user middleware api'})

    }
}

export default authUser