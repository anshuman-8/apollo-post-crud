import { User } from '../models';
import { SECRET } from "../config";
import { verify } from "jsonwebtoken";

const AuthMiddleware = async (req, res, next) => {
    // console.log("Auth header: ",req.headers.authorization,"\n\n")

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        req.isAuth = false;
        return next();
    };

    const token = authHeader.split(" ")[1];

    if (!token || token === "") {
        req.isAuth = false;
        return next();
    };

    let decodedToken;
    try{
        decodedToken = verify(token, SECRET);
    }catch(error){
        req.isAuth = false;
        return next();
    }

    if (!decodedToken) {
        req.isAuth = false;
        return next();
    };

    let authUser= await User.findById(decodedToken.id);

    if(!authUser){
        req.isAuth = false;
        return next();
    }

    req.user=authUser;
    req.isAuth = true;
    // console.log(req);
    // console.log("!!!!!------------------------------------------------------------!!!!!!!!!")

    return next();
};

export default AuthMiddleware;
