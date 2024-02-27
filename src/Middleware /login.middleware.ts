import { NextFunction,Request,Response} from "express";
import {isValidEmail,isValidPassword} from "../Helper /login.helper";

export class validateUser {
    
    validateRequestBody(req:Request,res:Response){
        const obj = req.body;
        if(!obj){
            return res.status(400).json({error: "request body is empty"});
        }
    }

    validateGenerateOtp(req:Request,res:Response,next:NextFunction){
        const obj = req.body;
        if(!obj.email){
            return res.send("email not found");
        }
        if(!obj.limit){
            return res.send("limit not found");
        }
        if(obj.limit == 4){
            return res.send("limit is not correct");
        }
        if(!isValidEmail(obj.email)){
            return res.send("Invalidate email format");     
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


    /*validateRegisterOtp(req:Request,res:Response,next:NextFunction){
        const obj = req.body;
        if(!obj.firstName){
            return res.send("firstName not found");
        }
        if(!obj.lastName){
            return res.send("lastName not found");
        }
        if(!obj.email){
            return res.send("email not found");
        }
        if(!obj.password){
            return res.send("password not found");
        }
        if(!isValidEmail(obj.email)){
            return res.send("Invalidate email format");
        }
        if(!isValidPassword(obj.password)){
            return res.send("Invalidate password format");    
        }
        next();
    }


    validateLoginOtp(req:Request,res:Response,next:NextFunction){
        const obj = req.body;
        if(!obj.email){
            return res.send("email not found");
        }
        if(!obj.password){
            return res.send("password not found");
        }
        if(!isValidEmail(obj.email)){
            return res.send("Invalidate email format");
        }
        if(!isValidPassword(obj.password)){
            return res.send("Invalidate password format");    
        }
        next();    
    }*/
    validateRegisterAndLogin(req: Request, res: Response, next: NextFunction) {
        const obj = req.body;
        if (!obj.email) {
            return res.send("email not found");
        }

        if (!isValidEmail(obj.email)) {
            return res.send("Invalid email format");
        }

        if (!obj.password) {
            return res.send("password not found");
        }

        if (!isValidPassword(obj.password)) {
            return res.send("Invalid password format");
        }

        if (!obj.firstName && !obj.lastName) {
            return res.send("firstName and lastName not found");
        }

        next();
    }

}
