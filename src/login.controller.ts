import {Request,Response} from "express";
import { loginService} from "./login.service";
import {user} from "./login.interface";

export class loginController{
    LoginService : loginService;

    constructor(){
        this.LoginService = new loginService;
    }

// post generate otp 
    generateOtpController = async (req:Request,res:Response):Promise<void>=> {
       
        try {
            const {email,limit} = req.body;
            const otp = await this.LoginService.generateOtp(limit);
            await this.LoginService.saveOtp(email,otp);
            res.json({message: "otp generated successfully"});
        }
        catch (error:unknown) {
            const errorMsg = error as {message: string};
            console.error(errorMsg.message);
            res.status(500).json({ error: "Internal Server Error" });   
        }
    };

    verifyOtpController = async (req:Request,res:Response):Promise<void> => {
        try 
        {
            const { email,otp} = req.body;
            const result = await this.LoginService.verifyOtp(email,otp);
            console.log(result);
            let message = "";
            if(result == true){
                 message = "otp verified successfully";
            }
            else{
                message = "otp not verified successfully";
            }
            res.json(message);
        }
        catch (error:unknown) {
            const errorMsg = error as {message: string};
            console.error(errorMsg.message);
            res.status(500).json({ error: "Internal Server Error" });   
        }  
    };

    registrationController = async (req: Request, res: Response): Promise<void> => {
        try {
            const newUser:user = req.body;
            console.log(newUser);
            await this.LoginService.Registration(newUser);
            res.json({ message: "User registered successfully" });
        } catch (error) {
            const errorMsg = error as {message: string};
            console.error(errorMsg.message);
            res.status(500).json({ error: "Internal Server Error" });
        }
    };

    loginController = async (req: Request, res: Response): Promise<void> => {
        try {
            const { email, password } = req.body;
            const result = await this.LoginService.login(email, password);
            console.log(result);
            let message = "";
            if(result == true){
                 message = "user login successfully";
            }
            else{
                message = "user not login successfully";
            }
            res.json(message);
            
        } catch (error) {
            const errorMsg = error as {message: string};
            console.error(errorMsg.message);
            res.status(500).json({ error: "Internal Server Error" });
        }
    };

    /*sendOtpController = async (req: Request, res: Response): Promise<void> => {
        try {

            const { email } = req.body;
            const otp = await this.LoginService.generateOtp(4); 
            await this.LoginService.sendOtp(email, otp);
            
            res.json({ message: "OTP sent successfully"});
        } catch (error) {
            const errorMsg = error as {message: string};
            console.error("Error in sendOtpController:", errorMsg.message);
            res.status(500).json({ error: "Internal Server Error"});
        }
    };*/

}
