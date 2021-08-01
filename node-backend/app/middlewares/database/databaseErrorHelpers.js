const User = require('../../models/User');
const CustomError = require('../../helpers/CustomError');



module.exports = {

    checkUserExist: async(req,res,next) => {
        const {id} = req.params;

        const user = await User.findById(id);
        console.log(user, id);
        if (!user) {
            return next(new CustomError("There is no such user with that id", 400));

        }
        next();
    }

}