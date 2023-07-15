const mongoose = require('mongoose')
const bannerSchema = new mongoose.Schema({
    image: {
        url:{
          type:String
        },
        id:{
          type:String
        }
    }
    },
    {
      timestamps: true,
    }
)

module.exports = mongoose.model('banner',bannerSchema)