const jwt = require('jsonwebtoken');
const fetchuser=(req,res,next)=>{
    const token=req.header('auth-token');
 
    if(!token){
         res.status(401).json({err:"please enter authneticated token"})
    }

try {   

      const JWT_SECRET="Kriitika@564764jdjf";

        const data= jwt.verify(token,JWT_SECRET);
        req.user=data.user  ;
        next();
        
    } catch (error) {
        res.status(401).json({err:"please enter authneticated token"})
    }
}
module.exports=fetchuser;