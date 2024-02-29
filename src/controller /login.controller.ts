import {Request,Response} from "express";
import { loginService} from "../service /login.service";
import {user} from "../Interface /login.interface";

export class loginController{
    LoginService : loginService;

    constructor(){
        this.LoginService = new loginService;
    }

    userController = async (req: Request, res: Response): Promise<void> => {
        try {
            const { userId, email, password, firstName, lastName, imageUrl,type } = req.body;
            const result = await this.LoginService.RegestrationLogin({ userId, email, password, firstName, lastName ,imageUrl},type,email,password);
            const Token = await this.LoginService.generateToken(userId)
            res.header('Authorization', Token);
            res.json({ message: result ? "User registered/login successfully" : "User not registered/login successfully" })
        }
        catch (error:unknown) {
            const errorMsg = error as {message: string};
            console.error(errorMsg.message);
            res.status(500).json({ error: "Internal Server Error" });   
        }  
    };

    getProfileDetailsController = async (req: Request, res: Response): Promise<void> => {
        try {
            const result = await this.LoginService.getProfileDetails();
            console.log(result);
            res.status(200).json({message:"get profile Details suceessfully",result})
        }
        catch (error:unknown) {
            const errorMsg = error as {message: string};
            console.error(errorMsg.message);
            res.status(500).json({ error: "Internal Server Error" });   
        }  
    }

    updateProfileDetailsController = async(req:Request,res:Response):Promise<any> => {
        try
        {
            const newClub:user = req.body; 
            const userId = req.params.id;
            await this.LoginService.updateProfileDetails(newClub,userId);
            res.status(200).json({ message: 'user profile details updated successfully' });
        }
        catch(error:unknown) 
        {
            const errorMsg = error as {message: string};
            console.error(errorMsg.message);
            res.status(500).json({ error: "Internal Server Error" });   
        }  
    }

    verifyOtpController = async (req: Request, res: Response): Promise<void> => {
        try {
            const { email, otp, limit } = req.body;
            if (otp) {
                const result = await this.LoginService.verifyOtp(email, otp);
                console.log(result);
                if (result == true) {
                    res.json({message :"otp verified successfully"});
                } else {
                    res.json({message :"otp not verified successfully"});
                }
            } 
            else {
                const generatedOtp = await this.LoginService.generateOtp(limit);
                await this.LoginService.saveOtp(email, generatedOtp);
                res.json({ message: "otp generated successfully" });
            }
        } catch (error: unknown) {
            const errorMsg = error as { message: string };
            console.error(errorMsg.message);
            res.status(500).json({ error: "Internal Server Error" });
        }
    };

    resendOtpController = async (req: Request, res: Response): Promise<void> => {
        try {
            const { email, limit } = req.body;
            await this.LoginService.ResendOtp(email, limit);
            res.json({ message: "OTP resent successfully" });
        } catch (error: unknown) {

            const errorMsg = error as { message: string };
            console.error(errorMsg.message);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
    
}
    
