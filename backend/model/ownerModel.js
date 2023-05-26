const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const ownerSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true ['username required !']
    },
    email:{
        type:String,
        required:true ['email required !'],
        unique:true
    },
    password:{
        type:String,
        required:true ['password required']
    },
    phone:{
        type:Number,
        default:null
    },
    image:{
        type:String,
        default:''
    },
    dob:{
        type:String,
        default:''
    },
    adminVerify:{
        type:Boolean,
        default:false
    }

})

ownerSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password,salt)
    next()
})

module.exports = mongoose.model('owner',ownerSchema)

