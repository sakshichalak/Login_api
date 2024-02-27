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

// post login 

    this.app.route("/api/RegisterAndlogin")
        .post(
            //this.validation.validateRegisterAndLogin,
            this.LoginController.userController
        );

/*// post Registration 

    this.app.route("/api/Registration")
            .post(
                this.validation.validateRegisterOtp,
                this.LoginController.registrationController
            );*/
// post VerifyOtp
    
    this.app.route("/api/VerifyOtp")
        .post(
            this.validation.validateVerifyOtp,
            this.LoginController.verifyOtpController
        );

    
    this.app.route("/api/UpdateProfile/:id")
        .put(
            //this.validation.,
            this.LoginController.updateProfileDetailsController
        );

     
    this.app.route("/api/getProfile")
        .get(
            //this.validation.,
            this.LoginController.getProfileDetailsController
        );

    this.app.route("/api/resendOtp")
        .post(
            //this.validation.,
            this.LoginController.resendOtpController
        )
    }

}
