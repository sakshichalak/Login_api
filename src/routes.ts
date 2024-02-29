import express from "express";
import { loginController } from "../src/controller /login.controller";
import { validateUser } from "./middleware /login.middleware";

export class loginRoute{
    app: express.Application;
    LoginController: loginController;


    constructor(app:express.Application){
        this.app = app; 
        this.LoginController = new loginController();
    }

    configureRoutes(){


    this.app.route("/api/RegisterAndlogin")
        .post(
            validateUser.validateRegisterAndLogin,
            this.LoginController.userController
        );
    
    this.app.route("/api/VerifyOtp")
        .post(
            validateUser.validateVerifyOtp,
            this.LoginController.verifyOtpController
        );

    
    this.app.route("/api/UpdateProfile/:id")
        .put(
            validateUser.validateUpdateProfile,
            this.LoginController.updateProfileDetailsController
        );

     
    this.app.route("/api/getProfile")
        .get(
            //validateUser.validateGetProfile,
            this.LoginController.getProfileDetailsController
        );

    this.app.route("/api/resendOtp")
        .post(
            validateUser.validateResendOtp,
            this.LoginController.resendOtpController
        )
    }

}
