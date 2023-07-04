const { json, response } = require('express');
const userModel = require('../model/userModel')
const vehicleModel = require('../model/vehicleModel')
const notificationModel = require('../model/notificationModel')
const mongoose = require('mongoose');
const bookingModel = require('../model/bookingModel');
const chatModel = require('../model/chatModel');
const ownerModel = require('../model/ownerModel');
const reportModel = require('../model/reportModel');
const couponModel = require('../model/couponModel');
const bannerModel = require('../model/bannerModel');

module.exports = {

  // upload lisence

  uploadLisence(req, res, next) {
    try {
      const id = req.headers?.userid
      if (req.files && req.files['license[front]'] && req.files['license[front]'][0] || req.files['license[back]'] && req.files['license[back]'][0]) {
        userModel.findOneAndUpdate({ _id: id }, {
          $set:
          {
            'license.front': req.files?.['license[front]']?.[0]?.filename,
            'license.rear': req.files?.['license[back]']?.[0]?.filename
          }
        }, { new: true }).then((response) => {
          res.status(200).json({ user: response })
        })
      }
    } catch (error) {
      next()
    }
  },

  // add review

  addReview(req, res, next) {
    try {
      const { vehicleId, rating, review } = JSON.parse(req.body.reviewData)
      const userId = new mongoose.Types.ObjectId(req.headers.userId)
      vehicleModel.findOneAndUpdate(
        { _id: vehicleId },
        {
          $push: {
            reviews: {
              rating,
              review,
              userId,
              image: req?.file?.filename
            }
          }
        },
        { new: true }
      ).populate({
        path: 'reviews',
        populate: {
          path: 'userId'
        }
      }).then((response) => {
        res.status(200).json({ success: true, message: 'review added succesfully', data: response.reviews })
      })
    } catch (error) {
      next()
    }
  },

  // get data for view detail

  getVehicleData(req, res, next) {
    try {
      vehicleModel.find({ category: req.params.vehicle }).populate('ownerId').then((data)=> {
        res.status(200).json({ success: true, data })
      })
    } catch (error) {
      next()
    }
  },

  // get all vehicle details

  async getAllVehicleDetails(req, res, next) {
    try {
      const allVehicle = await vehicleModel.find({}).populate('ownerId')
      res.status(200).json({ success: true, allVehicle })
    } catch (error) {
      next()
    }
  },

  // get all notifications

  getAllNotifications(req, res, next) {
    try {
      const { role } = req.params
      const filterCriteria = {};
      filterCriteria[role] = true;
      notificationModel.find(filterCriteria).then((response) => {
        res.status(200).json({ success: true, notifications: response })
      })
    } catch (e) {
      next()
    }
  },

  // add booking

  addBooking(req, res, next) {
    try {
      req.body.data.userId = req.headers?.userId
      const newPickTime = req.body.data.address.pickUp.pickTime
      vehicleModel.findOne(
        {
          _id: req.body.data.vehicle._id,
          bookings: {
            $elemMatch: {
              $and: [
                { form: { $gte: newPickTime } }, 
                { to: { $lte: newPickTime } } 
              ]
            }
          }
        }
      )
        .then((matchedBooking) => {
          if (matchedBooking) {
            return res.status(500).json({ success: true, message: 'the vehicle is already busy on this time' })
          } else {
            bookingModel.create({ ...req.body.data }).then((response) => {
              res.status(200).json({ success: true, message: 'your booking request sent to owner wait for response !' })
            })
          }
        })
     
    } catch (e) {
     next()
    }
  },

  // updating payment succes / false

  paymentUpdation(req, res, next) {
    try {
      const { paymentId, bookingId, paymentMethod, couponId } = req.body
      const { userId } = req.headers
      bookingModel.findByIdAndUpdate({ _id: bookingId }
        , { $set: { paid: true, 'payment.paymentId': paymentId, 'payment.method': paymentMethod, status: 'completed' } },
        { new: true }).then((response) => {
          vehicleModel.updateOne(
            { _id: response.vehicle._id },
            {
              $push: {
                bookings: {
                  from: response.address.pickUp.pickTime,
                  to: response.address.dropOff.dropTime
                }
              }
            }
          ).then(() => {});

          if (couponId) {
            couponModel.updateOne({ _id: couponId }, { $addToSet: { used: userId } }).then(() => {})
          }
          const pickUpTime = new Date(response.address.pickUp.pickTime);
          const today = new Date();

          if (pickUpTime >= today) {
            const timeDifference = pickUpTime.getTime() - today.getTime();
            const time = timeDifference
            setTimeout(() => {
              vehicleModel
                .updateOne(
                  { _id: response.vehicle._id },
                  { $addToSet: { bookedUsers: userId }, $set: { free: false } }
                )
                .then(() => {
                  const dropTime = new Date(response.address.dropOff.dropTime);
                  const busyTime = dropTime.getTime() - pickUpTime.getTime()
                  setTimeout(() => {
                    vehicleModel
                      .updateOne(
                        { _id: response.vehicle._id },
                        { $addToSet: { bookedUsers: userId }, $set: { free: true } }
                      ).then(() => {})
                  }, busyTime)
                });
            }, time);
          } else {
            vehicleModel
              .updateOne(
                { _id: response.vehicle._id },
                { $addToSet: { bookedUsers: userId }, $set: { free: false } }
              )
              .then(() => {
              });
          }
          bookingModel.find({ userId }).sort({ updatedAt: -1 }).then((response) => {
            res.status(200).json({ success: true, data: response })
          })
        })
    } catch (e) {
      next()
    }
  },

  // get all approved bookings

  getApprovedBookings(req, res, next) {
    try {
      const userId = req.headers?.userId
      bookingModel.find({ userId }).sort({ updatedAt: -1 }).then((response) => {
        res.status(200).json({ success: true, data: response })
      })
    } catch (e) {
      next()
    }
  },

  // get sender details

  getSenderDetails(req, res, next) {
    try {
      const { userId } = req.params
      ownerModel.findById(userId).select('-password -_id').then(data => {
        res.status(200).json({ success: true, data })
      })
    } catch (e) {
      next()
    }
  },

  // set new messages

  async setMessage(req, res, next) {
    try {
      const { msg, to } = req.body
      const from = req.headers?.userId ?? req.headers?.ownerId

      const data = await chatModel.create({
        message: { text: msg },
        users: [from, to],
        sender: from,
      })
      if (data) return res.status(200).json({ msg: "Message added successfully." });
      else return res.status(500).json({ msg: "Failed to add message to the database" });
    } catch (e) {
      next()
    }
  },

  // get all messages

  async getMessages(req, res, next) {
    try {
      const { to } = req.body
      const from = req.headers?.userId ?? req.headers?.ownerId
      const messages = await chatModel.find({
        users: {
          $all: [from, to],
        },
      }).sort({ updatedAt: 1 });
      const formattedMessages = messages.map((msg) => {
        const now = new Date();
        const timeAgo = Math.floor((now - new Date(msg.updatedAt)) / 60000);
        let timeString;
        if (timeAgo <= 0) {
          timeString = 'just now';
        } else if (timeAgo === 1) {
          timeString = '1 minute ago';
        } else if (timeAgo < 60) {
          timeString = `${timeAgo} minutes ago`;
        } else if (timeAgo < 1440) {
          const updatedTime = new Date(msg.updatedAt).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
          timeString = updatedTime.includes(':') ? updatedTime.replace(' ', '') : updatedTime;
        } else {
          const updatedTime = new Date(msg.updatedAt).toLocaleString([], { hour: 'numeric', minute: '2-digit', hour12: true });
          timeString = updatedTime.includes(',') ? updatedTime.replace(',', '') : updatedTime;
        }
        return {
          fromSelf: msg.sender.toString() === from,
          message: msg.message.text,
          time: timeString,
        };
      });

      res.status(200).json({ messages: formattedMessages });
    } catch (e) {
      next()
    }
  },

  // get all messages senders for side bar list

  getContacts(req, res, next) {
    try {
      chatModel.distinct('sender').then((response) => {
        const senderIds = response.map((sender) => sender.toString()).filter((x) => x !== req.headers?.ownerId)
        userModel.find({ _id: { $in: senderIds } }, { username: 1, image: 1 })
          .then((users) => {
            res.status(200).json({ success: true, data: users })
          })
      })
    } catch (e) {
      next()
    }
  },

  // getting all owner notifications

  ownerNotifications(req, res, next) {
    try {
      notificationModel.find({ owner: true }).sort({ _id: -1 }).then(data => {
        res.status(200).json({ success: true, data })
      })
    } catch (e) {
      next()
    }
  },

  //getting available places for user

  async getAvailablePlaces(req, res, next) {
    try {
      const data = await vehicleModel.distinct('places');
      res.status(200).json({ success: true, data })
    } catch (err) {
      next()
    }
  },

  // add report function

  addReport(req, res, next) {
    try {
      const { report, proId, } = req.body
      const { userId } = req.headers
      reportModel.create({ report, productId: proId, reportedBy: userId }).then(() => {
        res.status(200).json({ success: true, message: 'report sent successfully' })
      })
    } catch (e) {
      next()
    }
  },

  // apply coupon

  applyCoupon(req, res, next) {
    try {
      const { coupon } = req.body
      const { userId } = req.headers
      couponModel.findOne({ code: coupon }).then((data) => {
        if (data.used.includes(userId)) {
          res.status(409).json({ success: false, message: 'this coupon already used' })
        } else if (data.expire < new Date()) {
          res.status(409).json({ success: false, message: 'this coupon expired' })
        } else {
          res.status(200).json({ success: true, data })
        }
      })
    } catch (e) {
      next()
    }
  },

  // get all banners

  getBanners(req, res, next) {
    try {
      bannerModel.find({}).then((data) => {
        res.status(200).json({ success: true, data })
      })
    } catch (e) {
      next()
    }
  },

  
}