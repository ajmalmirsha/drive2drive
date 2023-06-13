const mongoose = require('mongoose')
const notificationSchema = new mongoose.Schema({
    
    title:{
        type:String,
        default:''
    },
    message:{
        type:String,
        default:""
    },
    user:{
        type:Boolean,
        default:false
    },
    owner:{
        type:Boolean,
        default:false
    },
    image:{
       type:String,
       default:'' 
    }
})


module.exports = mongoose.model('notifications',notificationSchema)
