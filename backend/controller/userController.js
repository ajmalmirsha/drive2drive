const userModel = require('../model/userModel')

module.exports = {
    uploadLisence (req,res) {
        try {
            const id = req.headers.userid
                    
            if (req.files && req.files['license[front]'] && req.files['license[front]'][0] || req.files['license[back]'] && req.files['license[back]'][0]) {
                userModel.findOneAndUpdate({_id:id},{$set:
                {
                    'license.front': req.files?.['license[front]']?.[0]?.filename,
                    'license.rear': req.files?.['license[back]']?.[0]?.filename
                }
                },{new:true}).then((response)=>{
                    res.status(200).json({user:response}) 
                })
              } 
        } catch (error) {
            console.log(error.message);
        }
    }
}