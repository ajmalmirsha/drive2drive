const notificationModel = require("../model/notificationModel");
const userModel = require("../model/userModel");



module.exports = {
      
    addNotifications (req, res) {
        try {
         const {title,message,user,owner} = JSON.parse(req.body.notification)
       notificationModel.create({title, message, user, owner, image:req?.file?.filename}).then((response) => {
        res.status(200).json({success:true,data:response})
       })    
        } catch (e) {
           console.log(e.message); 
        }
      
    },

    getAllNotifications (req, res ){
        try {
            console.log('sfsd');
            notificationModel.find({}).then((response)=>{
                res.status(200).json({succes:true,data:response})
            })
        } catch (e) {
            console.log(e.message);
        }
    },

    getAllVerifications (req, res ){
        try {
            console.log('sfsd');
            userModel.find({
                'license.verified': false,
                'license.front': { $ne: '' },
                'license.rear': { $ne: '' }
              }).then((response)=>{
                res.status(200).json({succes:true,data:response})
            })
        } catch (e) {
            console.log(e.message);
        }
    },

    verifyLisence ( req, res) {
        try {
            console.log(req.body);
            const {id} = req.body
            userModel.findByIdAndUpdate(id,{$set:{'license.verified':true}},{new:true}).then(()=>{
                 userModel.find({
                'license.verified': false,
                'license.front': { $ne: '' },
                'license.rear': { $ne: '' }
              }).then((response)=>{
                console.log(response,'updated');
                res.status(200).json({succes:true,data:response})
              })
            })
           
        } catch (e) {
            console.log(e.message);
        }
    }
}