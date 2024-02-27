import express from "express";
import { loginController } from "../src/controller /login.controller";
import { validateUser } from "../src/Middleware /login.middleware";

export class loginRoute{
    app: express.Application;
    LoginController: loginController;


    constructor(app:express.Application){
        this.app = app; 
        this.LoginController = new loginController();
        this.validation = new validateUser;
    }
    validation = new validateUser;

    configureRoutes(){


    this.app.route("/api/RegisterAndlogin")
        .post(
            this.validation.validateRegisterAndLogin,
            this.LoginController.userController
        );
    
    this.app.route("/api/VerifyOtp")
        .post(
            this.validation.validateVerifyOtp,
            this.LoginController.verifyOtpController
        );

    
    this.app.route("/api/UpdateProfile/:id")
        .put(
            this.validation.validateUpdateProfile,
            this.LoginController.updateProfileDetailsController
        );

     
    this.app.route("/api/getProfile")
        .get(
            this.validation.validategetProfile,
            this.LoginController.getProfileDetailsController
        );

    this.app.route("/api/resendOtp")
        .post(
            this.LoginController.resendOtpController
        )
    }

}
