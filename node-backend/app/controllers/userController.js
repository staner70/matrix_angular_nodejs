const CustomError = require('../helpers/CustomError');
const User = require('../models/User');

module.exports = {
    
    getSingleUser: async(req,res,next) => {
        const {id} = req.params;

        const user = await User.findById(id);

        res.status(200).json({
            success: true,
            data: user
        });
    },
    getAllUsers: async(req,res,next) => {
        const users = await User.find();

        res.status(200).json({
            success: true,
            data: users
        });
    }
}