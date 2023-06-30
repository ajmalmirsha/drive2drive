const mongoose = require('mongoose')
const couponSchema = new mongoose.Schema({
    name: {
        type: String
    },
    code: {
        type: String,
        unique:true
    },
    expire: {
        type: Date
    },
    disPercent: {
        type: Number,
        max:100
    },
    used: {
        type: Array,
        default: []
    }
    },
    {
      timestamps: true,
    }
)

module.exports = mongoose.model('coupon',couponSchema)