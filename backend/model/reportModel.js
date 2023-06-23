const mongoose = require('mongoose')
const reportSchema = new mongoose.Schema({
    
    report:{
        type:String,
    },
    reportedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Users',
    },
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'vehicle',
    }
},{timestamps:true})


module.exports = mongoose.model('reports',reportSchema)
