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

module.exports = {
  uploadLisence(req, res) {
    try {
      const id = req.headers.userid

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
      console.log(error.message);
    }
  },
  async addReview(req, res) {
    try {
      const { vehicleId, rating, review } = JSON.parse(req.body.reviewData)


      const userId = new mongoose.Types.ObjectId(req.headers.userId)
      console.log('userId', typeof userId);
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
        console.log('populated', response);
        res.status(200).json({ success: true, message: 'review added succesfully', data: response.reviews })
      })
    } catch (error) {
      console.log(error.message);
    }
  },
  async getVehicleData(req, res) {
    try {
      const data = await vehicleModel.find({ category: req.params.vehicle }).populate('ownerId')
      console.log(data);
      res.status(200).json({ success: true, data })
    } catch (error) {
      console.log(error.message);
    }
  },
  async getAllVehicleDetails(req, res) {
    try {
      const allVehicle = await vehicleModel.find({}).populate('ownerId')
      console.log('here', allVehicle);

      res.status(200).json({ success: true, allVehicle })
    } catch (error) {
      console.log(error.message);
    }
  },

  getAllNotifications(req, res) {
    try {
      const { role } = req.params
      console.log(role);
      const filterCriteria = {};
      filterCriteria[role] = true;
      notificationModel.find(filterCriteria).then((response) => {
        res.status(200).json({ success: true, notifications: response })
      })
    } catch (e) {
      console.log(e.message);
    }
  },

  addBooking(req, res) {
    try {
      // console.log(req.body);
      // console.log(req.body.data.address);
      req.body.data.userId = req.headers?.userId
      console.log(req.headers?.userId);
      console.log(req.body);
      const newPickTime = req.body.data.address.pickUp.pickTime
      console.log(newPickTime);
      vehicleModel.findOne(
        {
          _id: req.body.data.vehicle._id,
          bookings: {
            $elemMatch: {
              $and: [
                { form: { $gte: newPickTime } }, // Check if newPickTime is greater than or equal to any existing form time
                { to: { $lte: newPickTime } } // Check if newPickTime is less than or equal to any existing to time
              ]
            }
          }
        }
      )
      .then((matchedBooking) => {
        if(matchedBooking){
          console.log('matched bookign');
          return res.status(500).json({success:true,message:'the vehicle is already busy on this time'})
        }else {
          console.log('not matched bookign');
        }
      })
      bookingModel.create({ ...req.body.data }).then((response) => {
        console.log(response);
        res.status(200).json({ success: true, message: 'your booking request sent to owner wait for response !' })
      })
    } catch (e) {
      console.log(e.message);
    }
  },
  paymentUpdation(req, res) {
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
          ).then(() => {
            // Query executed successfully
          });
          
          if (couponId) {
            couponModel.updateOne({ _id: couponId }, { $addToSet: { used: userId } }).then(() => {
            })
          }
          console.log(response,'PAYMENT SUCCESS');
          // here the data comes


          const pickUpTime = new Date(response.address.pickUp.pickTime);
          const today = new Date();

          if (pickUpTime >= today) {
            const timeDifference = pickUpTime.getTime() - today.getTime();
            console.log('time diffrence', timeDifference, timeDifference / 60000);
            const time = timeDifference
            console.log(time, 'time', 'minute', time / 60000);
            setTimeout(() => {
              console.log('on set time out');
              vehicleModel
                .updateOne(
                  { _id: response.vehicle._id },
                  { $addToSet: { bookedUsers: userId }, $set: { free: false } }
                )
                .then(() => {
                  console.log('updated');
                  const dropTime = new Date(response.address.dropOff.dropTime);
                  const busyTime = dropTime.getTime() - pickUpTime.getTime()
                  console.log('busy time ', busyTime, 'time', busyTime / 60000);
                  setTimeout(() => {
                    console.log('on busy setTime out');
                    vehicleModel
                      .updateOne(
                        { _id: response.vehicle._id },
                        { $addToSet: { bookedUsers: userId }, $set: { free: true } }
                      ).then(() => {
                        console.log('updated busy');
                      })
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

          // vehicleModel.updateOne({_id:response.vehicle._id},{$addToSet: { bookedUsers: userId }}).then(()=> {
          // })
          bookingModel.find({ userId }).sort({ updatedAt: -1 }).then((response) => {
            res.status(200).json({ success: true, data: response })
          })
        })
    } catch (e) {
      console.log(e.message);
    }
  },
  getApprovedBookings(req, res) {
    try {
      const userId = req.headers?.userId
      console.log('user Id', userId);
      bookingModel.find({ userId }).sort({ updatedAt: -1 }).then((response) => {
        console.log(response);
        res.status(200).json({ success: true, data: response })
      })
    } catch (e) {
      console.log(e.message);
    }
  },
  getSenderDetails(req, res) {
    try {
      const { userId } = req.params
      console.log(userId, 'sdjfhds');
      ownerModel.findById(userId).select('-password -_id').then(data => {
        res.status(200).json({ success: true, data })
      })
    } catch (e) {
      console.log(e.message);
    }
  },


  // chat functions 

  async setMessage(req, res) {
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
      console.log(e.message);
    }
  },

  async getMessages(req, res) {
    try {

      const { to } = req.body
      const from = req.headers?.userId ?? req.headers?.ownerId

      const messages = await chatModel.find({
        users: {
          $all: [from, to],
        },
      }).sort({ updatedAt: 1 });
      console.log('real messages', messages);
      const formattedMessages = messages.map((msg) => {
        const now = new Date();
        const timeAgo = Math.floor((now - new Date(msg.updatedAt)) / 60000); // Calculate time difference in minutes

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
      console.log(formattedMessages);

      res.status(200).json({ messages: formattedMessages });
    } catch (e) {
      console.log(e.message);
    }
  },

  getContacts(req, res) {
    try {
      console.log('ethi');
      chatModel.distinct('sender').then((response) => {
        const senderIds = response.map((sender) => sender.toString()).filter((x) => x !== req.headers?.ownerId)
        console.log(senderIds);
        userModel.find({ _id: { $in: senderIds } }, { username: 1, image: 1 })
          .then((users) => {
            console.log(users);
            res.status(200).json({ success: true, data: users })
          })
      })
    } catch (e) {
      console.log(e.message);
    }
  },

  ownerNotifications(req, res) {
    try {
      console.log('reached owner notifications');
      notificationModel.find({ owner: true }).sort({ _id: -1 }).then(data => {
        console.log(data, 7878);
        res.status(200).json({ success: true, data })
      })
    } catch (e) {
      console.log(e.message);
    }
  },

  //getting available places for user

  async getAvailablePlaces(req, res) {
    try {
      const data = await vehicleModel.distinct('places');
      res.status(200).json({ success: true, data })
    } catch (err) {
      console.error(err);
    }
  },

  // add report function

  addReport(req, res) {
    try {
      const { report, proId, } = req.body
      const { userId } = req.headers
      reportModel.create({ report, productId: proId, reportedBy: userId }).then(() => {
        res.status(200).json({ success: true, message: 'report sent successfully' })
      })
    } catch (e) {
      console.log(e.message);
    }
  },

  // apply coupon

  applyCoupon(req, res) {
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
      console.log(e.message);
    }
  },

}