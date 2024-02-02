import express from "express";
import { loginController } from "./login.controller";
import { validateUser } from "./login.middleware";

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
 // post generateOtp
    this.app.route("/api/generateOtp")
        .post(
            this.validation.validateGenerateOtp,
            this.LoginController.generateOtpController
        );

// post login 

    this.app.route("/api/login")
        .post(
            this.validation.validateLoginOtp,
            this.LoginController.loginController
        );

// post Registration 

    this.app.route("/api/Registration")
            .post(
                this.validation.validateRegisterOtp,
                this.LoginController.registrationController
            );
// post VerifyOtp
    
    this.app.route("/api/VerifyOtp")
        .post(
            this.validation.validateVerifyOtp,
            this.LoginController.verifyOtpController
        );
}
}
