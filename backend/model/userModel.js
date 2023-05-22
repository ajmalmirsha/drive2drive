const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true ['username required !']
    },
    email:{
        type:String,
        required:true ['email required !']
    },
    password:{
        type:String,
        required:true ['password required']
    },
    image:{
        type:String,
    },
    dob:{
        type:Date
    },
    drivinglisence:{
        front:{
            type:String
        },
        rear:{
            type:String
        }
    }

})

userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password,salt)
    next()
})

module.exports = mongoose.model('Users',userSchema)

