import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) =>{
    try{
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({
                message: "User not Authenticated",
                status: false
            })
        }
        const decode = await jwt.verify(token, process.env.SECRET_KEY);
        if (!decode || !decode.userId) {
            return res.status(401).json({
            message:"Invalid token",
            success:false,
            status:false,
            })
        }
        req.id = decode.userId;
        next();
    }
    catch(err){
        console.error("Authentication failed:", err.message);
        return res.status(401).json({
            message: "Invalid or expired token",
            success: false,
            status: false,
        });
    }
}

export default isAuthenticated;
