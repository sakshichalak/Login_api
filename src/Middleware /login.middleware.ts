import { NextFunction,Request,Response} from "express";
import {isValidEmail,isValidPassword} from "../Helper /login.helper";

export class validateUser {
    
    validateRequestBody(req:Request,res:Response){
        const obj = req.body;
        if(!obj){
            return res.status(400).json({error: "request body is empty"});
        }
    }


    validategetProfile(req:Request,res:Response,next:NextFunction){
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }

        next();
    }

    validateUpdateProfile(req:Request,res:Response,next:NextFunction){
        const { firstName, lastName, email, password } = req.body;

        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        if (!isValidEmail(email)) {
            return res.status(400).json({ error: "Invalid email format" });
        }

        if (!isValidPassword(password)) {
            return res.status(400).json({ error: "Invalid password format" });
        }

        next();
    }


    validateVerifyOtp(req:Request,res:Response,next:NextFunction){
        const obj = req.body;
        console.log("validateverifyOTP::obj",obj);
        if(!obj.email){
            return res.send({message:"email not found"});
        }
        if(!isValidEmail(obj.email)){
            return res.send("Invalidate email format");
        }
        next();     
    }


    validateRegisterAndLogin(req: Request, res: Response, next: NextFunction) {
        const { type, email, password, firstName, lastName } = req.body;
        if (type === 1) {
            if (!email || !password || !firstName || !lastName) {
                return res.status(400).send("Missing required fields for registration");
            }
            if (!isValidEmail(email)) {
                return res.status(400).send("Invalid email format");
            }
            if (!isValidPassword(password)) {
                return res.status(400).send("Invalid password format");
            }
        } else if (type === 2) {
            if (!email || !password) {
                return res.status(400).send("Missing required fields for login");
            }
            if (!isValidEmail(email)) {
                return res.status(400).send("Invalid email format");
            }
        } else {
            return res.status(400).send("Invalid request type");
        }
    
        next();
    }

}
