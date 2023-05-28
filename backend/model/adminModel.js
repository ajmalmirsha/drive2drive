const mongoose = require('mongoose')
const adminSchema = new mongoose.Schema({
    
    email:{
        type:String,
        required:true ['email required !'],
        unique:true
    },
    password:{
        type:String,
        required:true ['password required']
    }
})


module.exports = mongoose.model('admins',adminSchema)
