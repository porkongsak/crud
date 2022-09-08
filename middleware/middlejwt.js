
const jwt = require('jsonwebtoken')


module.exports = (req, res, next) =>{
    try{
         //const token = req.headers.authorization.split("Bearer ")[1];
        // const decoded = jwt.verify(token , process.env.KEY_JWT);
        // req.auth = decoded;
        // return next();

       const token = req.headers["authtoken"];

        if (!token) {
          return res.status(401).send("no token , authorization denied");
        }
        const decoded = jwt.verify(token, process.env.KEY_JWT);
    
        console.log("middleware", decoded);
        req.user  = decoded.user
        return next()
    


        
    }catch(err){
        return res.status(401).json({
            message: 'Auth failed Token'
        })
    }
}