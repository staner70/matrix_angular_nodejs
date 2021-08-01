const User = require('../models/User');
const CustomError = require('../helpers/CustomError');


module.exports = {

    blockUser: async(req,res,next) => {
        const {id} = req.params;

        const user = await User.findById(id);

        user.blocked = !user.blocked;

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Block - Unblock Successfull"
        });
    },
    deleteUser: async(req,res,next) => {
        const {id} = req.params;

        const user = await User.findById(id);
        console.log(user);
        await user.remove();

        res.status(200)
        .json({
            success: true,
            message: "Delete Operation Successful"
        });
    }
}