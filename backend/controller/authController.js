const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const ownerModel = require("../model/ownerModel");
const adminModel = require("../model/adminModel");
const {
  removeFromCloudinary,
  uploadToCloudinary,
} = require("../config/cloudnary");
const { genToken } = require("../utils/jwt");
const { SuccessResponse, ErrorResponse } = require("../utils/response");

function handleError(err) {
  if (err.code === 11000) {
    const emailMatch = err.message.match(/email: "(.*?)"/);
    if (emailMatch) return "email already registered";
  }
  return err;
}
module.exports = {
  /**
   * Register a new user by checking username, email and password.
   * returns user details and a jwt token
   */
  async register(req, res) {
    try {
      const { username, email, password } = req.body;

      if (!username) throw "Username is required";
      if (!email) throw "Email is required";
      if (!password) throw "Password is required";

      const image = {
        url: req.body.user?.image || "",
        id: "",
      };
      const user = await userModel.create({ username, email, password, image });

      const token = genToken({ userId: user._id });

      if (!token) throw "Token not generated";

      SuccessResponse(res, { token }, "user registered successfully");
    } catch (err) {
      ErrorResponse(res, handleError(err), 401);
    }
  },

  /**
   * Login a user by checking email and password.
   * returns user details and a jwt token
   */
  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email) throw "Email is required";
      if (!password) throw "Password is required";

      const user = await userModel.findOne({ email }).select("+password");

      if (!user) throw "Invalid Email";
      if (user?.block) throw "User Blocked by Admin";

      if (!(await user.matchPassword(password))) throw "Invalid Password";

      const token = genToken({ userId: user._id });

      if (!token) throw "Token not generated";

      SuccessResponse(res, { token }, "user login successful");
    } catch (err) {
      ErrorResponse(res, err, 401);
    }
  },

  /**
   * Login a user by checking email and password if not existed will create one.
   * returns user details and a jwt token
   */
  async googleLogin(req, res, next) {
    try {
      const { username, email, password } = req.body;

      if (!email) throw "Email is required";
      if (!password) throw "Password is required";

      const user = await userModel.findOne({ email }).select("+password");

      if (user) {
        if (user?.block) throw "User Blocked by Admin";
        console.log("user", user);
        if (!(await user.matchPassword(password))) throw "Invalid Password";
        const token = genToken({ userId: user._id });

        if (!token) throw "Token not generated";

        delete user.password;

        // remove: prev response
        // res.json({
        //   success: true,
        //   message: "login successful",
        //   token,
        //   user,
        // });
        SuccessResponse(res, { token, user }, "user login successful");
      } else {
        const image = {
          url: req.body?.image,
          id: "",
        };
        const user = await userModel.create({
          username,
          email,
          password,
          image,
        });
        const token = genToken({ userId: user._id });

        if (!token) throw "Token not generated";

        delete user.password;

        // remove: prev response
        // res.json({
        //   success: true,
        //   message: "login successful",
        //   token,
        //   user,
        // });
        SuccessResponse(res, { token }, "user registered successfully");
      }
    } catch (err) {
      ErrorResponse(res, handleError(err), 401);
    }
  },

  // update  user

  async updateUser(req, res, next) {
    try {
      const { id, username, email, phone, dob } = req.body.user;
      userModel
        .findOneAndUpdate(
          { _id: id },
          {
            $set: {
              username: username,
              email: email,
              phone: phone,
              dob: dob,
            },
          },
          { new: true }
        )
        .then((response) => {
          res.status(200).json({
            success: true,
            userData: response,
            message: "details updated successfully",
          });
        })
        .catch((err) => {
          const error = handleError(err);
          res.status(501).json({ success: false, message: error });
        });
    } catch (error) {
      next();
    }
  },

  // update profile image

  async uploadProfileImage(req, res, next) {
    try {
      const user = await userModel.findOne({ _id: req.headers.userid });
      const data = await uploadToCloudinary(req.file?.path, "profile-images");
      if (user.image.id) {
        // fs.unlink(path.join(__dirname,'../../backend/public/images/',user.image),(err)=>{})
        removeFromCloudinary(user.image.id, "profile-images");
      }

      userModel
        .findOneAndUpdate(
          { _id: req.headers.userid },
          {
            $set: {
              image: {
                url: data?.url,
                id: data?.public_id,
              },
            },
          },
          { new: true }
        )
        .then((response) => {
          res.status(200).json({
            success: true,
            message: "profile picture updated successfully",
            user: response,
          });
        });
    } catch (error) {
      next();
    }
  },

  // owner register

  ownerRegister(req, res, next) {
    try {
      const image = req.body.user?.image;
      const { username, email, password } = req.body.owner;
      ownerModel
        .create({ username, email, password, image })
        .then((response) => {
          const token = jwt.sign(
            { ownerId: response._id },
            process.env.OWNER_JWT_SECRET,
            { expiresIn: "1day" }
          );
          res.status(200).json({ success: true, owner: response, token });
        })
        .catch((err) => {
          let errorMessage = handleError(err);
          res.status(401).json({ success: false, message: errorMessage });
        });
    } catch (error) {
      const err = handleError(error);
      if (err) {
        res.status(401).json({ success: false, message: err });
      } else {
        next();
      }
    }
  },

  // owner login

  async ownerLogin(req, res, next) {
    try {
      const { email, password } = req.body.ownerData;
      const owner = await ownerModel.findOne({ email });
      if (owner) {
        bcrypt.compare(password, owner.password).then((response) => {
          if (response) {
            const token = jwt.sign(
              { ownerId: owner._id },
              process.env.OWNER_JWT_SECRET,
              { expiresIn: "1day" }
            );
            res.json({
              success: true,
              message: "login successful",
              token,
              owner,
            });
          } else {
            res
              .status(200)
              .json({ success: false, message: "invalid password" });
          }
        });
      } else {
        res.status(200).json({ success: false, message: "invalid email" });
      }
    } catch (error) {
      const err = handleError(error);
      res.status(200).json({ success: false, message: err });
    }
  },

  // admin login

  async adminLogin(req, res, next) {
    try {
      const { email, password } = req.body.admin;
      const admin = await adminModel.findOne({ email: email });
      if (admin) {
        bcrypt.compare(password, admin.password).then((response) => {
          if (response) {
            const token = jwt.sign(
              { adminId: admin._id },
              process.env.ADMIN_JWT_SECRET,
              { expiresIn: "1day" }
            );
            res.status(200).json({
              success: true,
              message: "login succesfully",
              token,
              data: admin,
            });
          } else
            res.status(401).json({
              success: false,
              message: "email and password not matched",
            });
        });
      } else {
        res.status(401).json({ success: false, message: "email not found" });
      }
    } catch (error) {
      next();
    }
  },
};
