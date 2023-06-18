
const jwt = require('jsonwebtoken')

module.exports = {
userAuthenticator ( req, res, next) {
         try {
            if ( req.headers.authentication ) {
                 jwt.verify(req.headers.authentication,process.env.USER_JWT_SECRET,( err, decode) => {
                  if (err) {
                     res.status(401).json({success:false,message:err.message,Auth:false})
                  }else {
                     req.headers.userId = decode.userId              
                     next()
                  } 
                })
            } else {
               res.status(401).json({success:false,message:'not authenticated !',Auth:false})
            }
         } catch (e) {
            res.status(401).json({success:false,message:'not authenticated !',Auth:false})
         }
    },
   ownerAuthenticator (req, res, next) {
      try {
         console.log('on ownerAuthenticator');
         if ( req.headers.authentication ) {
            jwt.verify(req.headers.authentication,process.env.OWNER_JWT_SECRET,( err, decode) => {
             if (err) {
               console.log(err);
                res.status(401).json({success:false,message:err.message,Auth:false})
             }else {
                req.headers.ownerId = decode.ownerId              
                next()
             } 
           })
       } else {
          res.status(401).json({success:false,message:'not authenticated !',Auth:false})
       }
      } catch (e) {
         res.status(401).json({success:false,message:'not authenticated !',Auth:false})
      }
   }
}