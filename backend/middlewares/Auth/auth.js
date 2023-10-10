const jwt = require("jsonwebtoken");
const userModel = require("../../model/userModel");

module.exports = {
  async userAuthenticator(req, res, next) {
    try {
      const token = req.headers.authentication;

      if (!token) {
        return unauthorizedResponse(res, "Not authenticated!");
      }

      const decoded = await verifyToken(token);
      const user = await userModel.findById(decoded.userId, 'block' )
      console.log(user);
      if (!user || user.block) {
        return unauthorizedResponse(res, "Not authenticated!");
      }

      req.headers.userId = decoded.userId;
      next();
    } catch (e) {
      return unauthorizedResponse(res, "Not authenticated!");
    }
  },
  ownerAuthenticator(req, res, next) {
    try {
      if (req.headers.authentication) {
        jwt.verify(req.headers.authentication, process.env.OWNER_JWT_SECRET, (err, decode) => {
          if (err) {
            res.status(401).json({ success: false, message: err.message, Auth: false });
          } else {
            req.headers.ownerId = decode.ownerId;
            next();
          }
        });
      } else {
        res.status(401).json({ success: false, message: "not authenticated !", Auth: false });
      }
    } catch (e) {
      res.status(401).json({ success: false, message: "not authenticated !", Auth: false });
    }
  },
  adminAuthenticator(req, res, next) {
    try {
      if (req.headers.authentication) {
        jwt.verify(req.headers.authentication, process.env.ADMIN_JWT_SECRET, (err, decode) => {
          if (err) {
            res.status(401).json({ success: false, message: err.message, Auth: false });
          } else {
            req.headers.adminId = decode.adminId;
            next();
          }
        });
      } else {
        res.status(401).json({ success: false, message: "not authenticated !", Auth: false });
      }
    } catch (e) {
      res.status(401).json({ success: false, message: "not authenticated !", Auth: false });
    }
  },
};

async function verifyToken(token) {
   return new Promise((resolve, reject) => {
     jwt.verify(token, process.env.USER_JWT_SECRET, (err, decode) => {
       if (err) {
         reject(err);
       } else {
         resolve(decode);
       }
     });
   });
 }

function unauthorizedResponse(res, message) {
  res.status(401).json({ success: false, message, Auth: false });
}
