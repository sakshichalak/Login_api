import { NextFunction,Request,Response} from "express";
import {isValidEmail,isValidPassword} from "../helper /login.helper";

export class validateUser {
    
    
    static validateFields = (
        fields: string[],
        validateField: (field: string) => boolean
      ) => {
        return (req: Request, res: Response, next: NextFunction) => {
          const body = req.body;
          
          for (const field of fields) {
            if (!validateField(body[field])) {
              return res.status(400).json({
                error: `Invalid ${field} format`,
              });
            }
          }
          next();
        };
      };
    
      static validateRequestBody = validateUser.validateFields(
        [],
        () => true
      );
      static validateUpdateProfile = validateUser.validateFields(
        ["firstName", "lastName", "email", "password"],
        (value) => !!value
      );
    
      static validateVerifyOtp = validateUser.validateFields(
        ["email"],
        (email) => isValidEmail(email)
      );
      static validateResendOtp = validateUser.validateFields(
        ["email", "limit"],
        (value) => !!value
      );

      static validateRegisterAndLogin = (req:Request, res:Response, next:NextFunction) => {
        const { type } = req.body;
        if (type === "1") {
            const validationFields = ["email", "password", "firstName", "lastName"];
            validateUser.validateFields(validationFields, (value) => !!value)(req, res, next);
        } else if (type === "2") {
            const validationFields = ["email", "password", "userId"];
            validateUser.validateFields(validationFields, (value) => !!value)(req, res, next);
        } else {
            res.status(400).json({ error: "Invalid request type" });
        }
    };
    

}
