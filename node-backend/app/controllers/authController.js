const CustomError = require('../helpers/CustomError');
const User = require('../models/User');
const  {sendJwtToClient} = require('../helpers/authorization/tokenHelpers');
const {validateUserInput,comparePassword} = require('../helpers/input/inputHelpers');
const sendEmail = require('../helpers/libraries/sendEmail');

module.exports = {

    async register(request, response, next) {
       
       // POST DATA 
        const {name,email,password,role} = request.body;
       
        try {
            const user = await User.create({
                name,
                email,
                password,
                role
            });
            sendJwtToClient(user,response);

        } catch (error) {
            next(error);
        }



    },
    login: async(req, res, next) => {
        try {
            const {email, password} = req.body;
            
            if (!validateUserInput(email,password)) {
                
                return next(new CustomError("Please check your inputs",400));
            }
    
            const user  = await User.findOne({email}).select("+password");
            console.log(user, password);
            if (!comparePassword(password, user.password)) {
                return next(new CustomError("Please check your credentials",400));
            }
            
            sendJwtToClient(user,res);  
        } catch (error) {
            console.log(error);
            next(new CustomError("Error password null"));
        }

    },
    
    logout: async(req, res, next) => {

        const { NODE_ENV } = process.env;

        return res.status(200).cookie({
            httpOnly: true,
            expires: new Date(Date.now()),
            secure: NODE_ENV === "development" ? false : true
        }).json({
            success: true,
            message: "Logout Successfull"
        });
    },

    getUser: (request, response, next) => {
        response.json({
            success: true,
            data: {
                id: request.user.id,
                name: request.user.name
            }
        })
    },

    imageUpload: async(req, res, next) => {
        
        try {
            const user = await User.findByIdAndUpdate(req.user.id, {
                "profile_image" : req.savedProfileImage
            }, {
                new : true,
                runValidators: true
            });
            
            res.status(200)
            .json({
                success: true,
                message: "Image Upload Successfull",
                data: user
            });
        } catch (error) {
            
        }


    },

    forgotPassword: async(req, res, next) => {
        try {
            const resetEmail = req.body.email;

            const user = await User.findOne({email: resetEmail});

            if (!user) {
                return next(new CustomError("There is no user with that email", 400));
            }
            const resetPasswordToken = user.getResetPasswordTokenFromUser();

            await user.save();

            const resetPasswordUrl = `http://localhost:5000/api/auth/resetpassword?resetPasswordToken=${resetPasswordToken}`;

            const emailTemplate = `
                <h3>Reset Your Password</h3>
                <p>This <a href = '${resetPasswordUrl}' target = '_blank'>link</a> will expire in 1 hour</p>
            `;
            try {
                await sendEmail({
                    from : process.env.SMTP_USER,
                    to : resetEmail,
                    subject: "Reset Your Password",
                    html: emailTemplate
                });
                return res.status(200).json({
                    success: true,
                    message: "Token Sent To Your Email"
                }); 
            } catch (error) {
                user.resetPasswordToken = undefined;
                user.resetPasswordExpire = undefined;

                await user.save();
                return next(new CustomError("Email Could Not Be Sent",500));
            }

        } catch (error) {
            
        }
    },

    resetPassword: async(req, res, next) => {

        try {
            const {resetPasswordToken} = req.query;

            const {password} = req.body;
            
            if (!resetPasswordToken) {
                return next(new CustomError("Please provide a valid token",400));
            }
            let user = await User.findOne({
                resetPasswordToken: resetPasswordToken,
                resetPasswordExpire: {$gt : Date.now()}
            });
            if (!user) {
                return next(new CustomError("Invalid Token or Session Expired", 400));
            }

            user.password = password;
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            
            await user.save();

            return res.status(200).json({
                success: true,
                message: "Reset Password Process Successful"
            });
        } catch (error) {
            
        }
    },
    editDetails: async(req,res,next) => {
        const editInformation = req.body;

        const user = await User.findByIdAndUpdate(req.user.id,editInformation,{
            new : true,
            runValidators: true
        });
        res.status(200)
        .json({
            success: true,
            data: user
        });
    }


}