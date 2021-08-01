module.exports = {
    sendJwtToClient: (user, response) => {
        // Generate JWT
        const token = user.generateJwtFromUser();
    
        const { JWT_COOKIE, NODE_ENV} = process.env;
        
        return response
        .status(200)
        .cookie("access_token",token,{
            httpOnly: true,
            expires: new Date(Date.now() + parseInt(JWT_COOKIE) * 1000 * 60),
            secure: NODE_ENV === "development" ? false : true
        })
        .json({
            success: true,
            access_token : token,
            data : {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        });
        // Response
    
    },
    
    isTokenIncluded: (request) => {
        return (
            request.headers.authorization && request.headers.authorization.startsWith("Bearer:")
        );
    },
    
    getAccessTokenFrom: (request) => {
        const authorization = request.headers.authorization;
        const access_token = authorization.split(" ")[1];
        
        console.log(authorization, "<-- getAccessToken authorization");
        return access_token;
    }
}




