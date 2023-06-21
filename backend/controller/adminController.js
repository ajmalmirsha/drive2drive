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
            notificationModel.find({}).sort({_id:-1}).then((response)=>{
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
                'license.verification': 'pending',
                'license.front': { $ne: '' },
                'license.rear': { $ne: '' }
              }).then((response)=>{
                res.status(200).json({succes:true,data:response})
            })
        } catch (e) {
            console.log(e.message);
        }
    },

    getAllUserDetails ( req, res) {
     try {
        userModel.find({}).then((data) => {
            res.status(200).json({ success: true, data})
        })
     } catch (e) {
        console.log(e.message);
     }
    },

    verifyLisence ( req, res) {
        try {
            console.log(req.body);
            const { id, status } = req.body
            console.log( status );
            userModel.findByIdAndUpdate(id,{$set:{'license.verification':status}},{new:true}).then(()=>{
                 userModel.find({
                'license.verification': 'pending',
                'license.front': { $ne: '' },
                'license.rear': { $ne: '' }
              }).then((response)=>{
                res.status(200).json({succes:true,data:response})
              })
            })
           
        } catch (e) {
            console.log(e.message);
        }
    },

    blockUnblock ( req, res) {
        try{
           const { status , userId } = req.body
           const block = status === 'block'
           userModel.findOneAndUpdate({_id:userId},{$set:{block:block}},{new:true}).then( data => {
            res.status(200).json({success:true,data})
           })
        } catch ( e ) {
            console.log(e.message);
        }
    }
}