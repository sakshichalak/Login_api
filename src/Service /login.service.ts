
import {user} from "../Interface /login.interface";
import { createdb,executeQuery } from "../connection/login.connectionDB";
import{InsertQueryGenerator,selectQueryGenerator} from "../Helper /login.query";
import { comparePassword, hashPassword } from "../Helper /login.hash";

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

    ResendOtp = async(email:string,limit:number):Promise<void> => {
        try {
            const generatedOtp = await this.generateOtp(limit);
            const connection = await createdb();
            const existingOtpQuery = `SELECT otp FROM otp WHERE email = '${email}'`;
            const existingOtpResult = await executeQuery(connection, existingOtpQuery);
            console.log(existingOtpResult);
    
            if (existingOtpResult.length > 0) {
                const updateOtpQuery = `UPDATE otp SET otp = '${generatedOtp}', expire = ADDTIME(Now(), "00:03:00.000000") WHERE email = '${email}'`;
                const result = await executeQuery(connection, updateOtpQuery);
                console.log(result);
            } else {
                const insertOtpQuery = `INSERT INTO otp (email, otp, expire) VALUES ('${email}', '${generatedOtp}', ADDTIME(Now(), "00:03:00.000000"))`;
                await executeQuery(connection, insertOtpQuery);
            }
            await connection.end();

        } catch (error: unknown) {
            const errorMsg = error as { message: string };
            console.error("Error ResendOtp:", errorMsg.message);
            throw new Error("failed to ResendOtp");
        }
    }


    /*Registration = async(newUser:user,type:string): Promise<boolean> => {    
        try{
            const userExists = await this.isExists(newUser.email);
            if (userExists) {
                throw new Error("User already exists");
            }
            const connection = await createdb();
            const hashed = await hashPassword(newUser.password);
            console.log(hashed);
            const query = InsertQueryGenerator("users", {firstname:newUser.firstName,lastname:newUser.lastName,email:newUser.email,Password:hashed});
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

    login = async (email:string,password:string,type:string): Promise<boolean> => {
        try
        {
            let isUserValid = false;
            const connection = await createdb();
            const hashed  = await hashPassword(password);
            console.log(hashed);
            const query = selectQueryGenerator("users",{email});
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
    }; */

    isExists = async (email: string): Promise<boolean> => {
        try {
          const connection = await createdb();
          const query = selectQueryGenerator("users", { email });
          const result = await executeQuery(connection, query);
          return result.length > 0;
        } 
        catch (error: unknown) {
          const errorMsg = error as { message: string };
          console.error("Error:", errorMsg.message);
          throw new Error("Failed to check if user exists");
        }
    };

    RegestrationLogin = async(newUser:{userId:string,email:string,password:string,firstName:string,lastName:string},type:string,email:string,password:string):Promise<any> => {
        try {
            if (type == "1") {
                console.log("Registration Request");
                const userExists = await this.isExists(newUser.email);
                if (userExists) {
                    throw new Error("User already exists");
                }
                const connection = await createdb();
                const hashed = await hashPassword(newUser.password);
                console.log(hashed);
                const query = InsertQueryGenerator("users", { userId: newUser.userId ,firstName: newUser.firstName, lastName: newUser.lastName, email: newUser.email, Password: hashed });
                await executeQuery(connection, query);
                console.log("User registered successfully");
                return true;

            } 
            else if (type == "2") {
                console.log("Login Request");
                let isUserValid = false;
                const connection = await createdb();
                const hashed  = await hashPassword(password);
                console.log(hashed);
                const query = selectQueryGenerator("users",{email});
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
        }
        catch (error: unknown) {
            const errorMsg = error as { message: string };
            console.error("Error:", errorMsg.message);
            throw new Error("Failed to process the request");
        }
    }

    generateToken = async (userId:number):Promise<string> => {
        const connection = await createdb();
        const UserId = userId;
        const currentDate = new Date().toISOString();
        const Expiry = new Date();
        Expiry.setDate(Expiry.getDate() + 1); 

        const TOKEN = UserId + currentDate + Expiry;
        const query = InsertQueryGenerator("Auth",{UserId,TOKEN,Expiry:'ADDTIME(Now(), "00:3:00.000000")'})
        await executeQuery(connection, query);
        console.log(query);
    
        return `${UserId} ${TOKEN} ${Expiry.toISOString()}`;
    }

    getProfileDetails = async(userId:number):Promise<any> => {
        try{
        const connection = await createdb();
        const query =  `SELECT users.userId, users.firstName, Auth.token
                        FROM users
                        INNER JOIN Auth ON users.userId = Auth.userId`;
        const result = await executeQuery(connection, query);
        console.log(result);
        }
        catch (error: unknown) {
            const errorMsg = error as { message: string };
            console.error("Error:", errorMsg.message);
            throw new Error("Failed to get profile details");
        }

    }

    updateProfileDetails = async(newUser:user,userId:string):Promise<any> => {
        try{
        const connection = await createdb();
        const password = await hashPassword(newUser.password);
        const query = `UPDATE users SET 
        firstName = '${newUser.firstName}',
        lastName = '${newUser.lastName}',
        email = '${newUser.email}',
        password = '${password}'
        WHERE UserId = ${userId}`;
        const result = await executeQuery(connection,query);
        console.log(result);
        }
        catch (error: unknown) {
            const errorMsg = error as { message: string };
            console.error("Error:", errorMsg.message);
            throw new Error("Failed to update profile details");
        }
    }

    
}
 