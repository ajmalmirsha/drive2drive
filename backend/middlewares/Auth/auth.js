
const jwt = require('jsonwebtoken')
const userModel = require('../../model/userModel')

module.exports = {
   userAuthenticator(req, res, next) {
      try {
         if (req.headers.authentication) {
            jwt.verify(req.headers.authentication, process.env.USER_JWT_SECRET, (err, decode) => {
               if (err) {
                  res.status(401).json({ success: false, message: err.message, Auth: false })
               } else {
                  userModel.findById(decode.userId).then((data) => {
                     if (!data?.block) {
                        req.headers.userId = decode.userId
                        next()
                     } else {
                        res.status(401).json({ success: false, message: 'not authenticated !', Auth: false })
                     }
                  })
               }
            })
         } else {
            res.status(401).json({ success: false, message: 'not authenticated !', Auth: false })
         }
      } catch (e) {
         res.status(401).json({ success: false, message: 'not authenticated !', Auth: false })
      }
   },
   ownerAuthenticator(req, res, next) {
      try {
         if (req.headers.authentication) {
            jwt.verify(req.headers.authentication, process.env.OWNER_JWT_SECRET, (err, decode) => {
               if (err) {
                  res.status(401).json({ success: false, message: err.message, Auth: false })
               } else {
                  req.headers.ownerId = decode.ownerId
                  next()
               }
            })
         } else {
            res.status(401).json({ success: false, message: 'not authenticated !', Auth: false })
         }
      } catch (e) {
         res.status(401).json({ success: false, message: 'not authenticated !', Auth: false })
      }
   },
   adminAuthenticator(req, res, next) {
      try {
         if (req.headers.authentication) {
            jwt.verify(req.headers.authentication, process.env.ADMIN_JWT_SECRET, (err, decode) => {
               if (err) {
                  res.status(401).json({ success: false, message: err.message, Auth: false })
               } else {
                  req.headers.adminId = decode.adminId
                  next()
               }
            })
         } else {
            res.status(401).json({ success: false, message: 'not authenticated !', Auth: false })
         }
      } catch (e) {
         res.status(401).json({ success: false, message: 'not authenticated !', Auth: false })
      }
   }
}