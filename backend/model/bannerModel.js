const mongoose = require('mongoose')
const bannerSchema = new mongoose.Schema({
    image: {
        type: String,
        default:''
    }
    },
    {
      timestamps: true,
    }
)

module.exports = mongoose.model('banner',bannerSchema)