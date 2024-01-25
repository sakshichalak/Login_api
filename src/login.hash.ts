
import * as bcrypt from "bcrypt";
import {saltRounds} from "./login.constants";
//const plainTextPassword1 = "welcome123";

async function hashPassword(Password: string): Promise<string> {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        console.log(`salt: ${salt}`);

        const hash = await bcrypt.hash(Password, salt);
        console.log(hash);

        return hash;
    }
    catch (error) {
        const errorMsg = error as {message: string};
        console.error("Error:", errorMsg.message);
        throw new Error("Failed to hash password");
    }
}

async function comparePassword(enteredPassword: string, hashedPassword: string): Promise<boolean> {
    try {
        const match = await bcrypt.compare(enteredPassword, hashedPassword);
        return match;
    } 
    catch (error) {
        const errorMsg = error as {message: string};
        console.error("Error:", errorMsg.message);
        throw new Error("Failed to compare password");
    }
}

export {hashPassword,comparePassword};


