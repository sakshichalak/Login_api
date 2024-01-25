import express from "express";
import { loginController } from "./login.controller";
//import * as bcrypt from "bcrypt";
//import {Request,Response} from "express";

export class loginRoute{
    app: express.Application;
    LoginController: loginController;


    constructor(app:express.Application){
        this.app = app;
        this.LoginController = new loginController();
    }

    configureRoutes(){
 // post generateOtp
    this.app.route("/api/generateOtp")
        .post(
            this.LoginController.generateOtpController
        );

// post login 

    this.app.route("/api/login")
        .post(
            this.LoginController.loginController
        );

// post Registration 

    this.app.route("/api/Registration")
            .post(
                this.LoginController.registrationController
            );
// post VerifyOtp
    
    this.app.route("/api/VerifyOtp")
        .post(
            this.LoginController.verifyOtpController
        );

// post sendOtp 

 /*   this.app.route("/api/sendOtp")
        .post(
            this.LoginController.sendOtpController
        );   */  
}
}
