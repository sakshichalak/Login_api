
import {user} from "./login.interface";
import { createdb,executeQuery } from "./login.connectionDB";
import{InsertQueryGenerator,selectQueryGenerator} from "./login.query";
import { comparePassword, hashPassword } from "./login.hash";

export class loginService{
    
    generateOtp = async(limit:number): Promise<string> => { 
        try
        {
            console.log("generate");
            const digits = "0123456789";
            let otp = "";
            for (let i = 0; i < limit; i++ ) {
                otp += digits[Math.floor(Math.random() * 10)];
            }
            console.log(otp);
            return otp;
        }
        catch (error:unknown) 
        {
            const errorMsg = error as {message: string};
            console.error("Error generateOtp:", errorMsg.message);
            throw new Error("failed to GenerateOtp");
        }
    };


    saveOtp = async(email:string, otp:string):Promise<void> => {
        
        try {
            const connection = await createdb();
            // eslint-disable-next-line quotes
            const query = InsertQueryGenerator("otp", {email,otp,expire:'ADDTIME(Now(), "00:3:00.000000")'});
            console.log(query);

            await executeQuery(connection,query);
        }
        catch (error:unknown) 
        {
            const errorMsg = error as {message: string};
            console.error("Error saveOtp:", errorMsg.message);
            throw new Error("failed to saveOtp");
        }
    };


    verifyOtp = async (email:string,otp:string):Promise<boolean> => {
        try
        {
            let isOtpValid = false;
            const connection = await createdb();
            const query = selectQueryGenerator("otp",{email,otp, expire: "lesserThan(Now())"});
            console.log(query);
            const result = await executeQuery(connection,query);
            console.log(result);
            if (result.length > 0){
                isOtpValid = true;
            }  
            return isOtpValid;

        }
        catch (error: unknown) {
            const errorMsg = error as {message: string};
            console.error("Error verifyOtp:", errorMsg.message);
            throw new Error("failed to verifyOtp");
        }
    };

    Registration = async(newUser:user): Promise<boolean> => {    
        try{
            const userExists = await this.isExists(newUser.email);
            if (userExists) {
                throw new Error("User already exists");
            }
            const connection = await createdb();
            const hashed = await hashPassword(newUser.password);
            console.log(hashed);
            const query = InsertQueryGenerator("user", {firstname:newUser.firstName,lastname:newUser.lastName,email:newUser.email,Password:hashed});
            await executeQuery(connection, query);
            console.log("User registered successfully");
            return true;
        }
        catch (error: unknown) {
            const errorMsg = error as {message: string};
            console.error("Error Register:", errorMsg.message);
            throw new Error("Failed to Register user");
        }
    };

    login = async (email:string,password:string): Promise<boolean> => {
        try
        {
            let isUserValid = false;
            const connection = await createdb();
            const hashed  = await hashPassword(password);
            console.log(hashed);
            const query = selectQueryGenerator("user",{email});
            console.log(query);

            const result = await executeQuery(connection, query);
            console.log(result);

            if (result.length)
            {
                const response = result[0] as unknown as {password: string};
                const storedHashedPassword = response.password;
                console.log(storedHashedPassword);

                const MatchPassword = await comparePassword(password, storedHashedPassword);
                console.log(MatchPassword);
                
                if (MatchPassword)
                {
                    isUserValid = true;
                }
            }     
            return isUserValid; 
        }
        catch (error: unknown) {
            const errorMsg = error as {message: string};
            console.error("Error login:", errorMsg.message);
            throw new Error("Failed to login user");
        }
    }; 

    isExists = async (email: string): Promise<boolean> => {
        try {
          const connection = await createdb();
          const query = selectQueryGenerator("user", { email });
          const result = await executeQuery(connection, query);
          return result.length > 0;
        } 
        catch (error: unknown) {
          const errorMsg = error as { message: string };
          console.error("Error:", errorMsg.message);
          throw new Error("Failed to check if user exists");
        }
    };
}
 