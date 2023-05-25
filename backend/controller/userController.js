const userModel = require('../model/userModel')

module.exports = {
    uploadLisence (req,res) {
        try {
            console.log(req.file.filename);
        } catch (error) {
            console.log(error.message);
        }
    }
}