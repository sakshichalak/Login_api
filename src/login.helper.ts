
/*import{InsertQueryGenerator} from "./login.query";
export function addMinutes(Expire:number):Date{
    try{
        /*const date = new Date();
        date.setMinutes(date.getMinutes() + Expire);
        date.setTime(date.getTime() + 5.5 * 60 * 60 * 1000);
        const istDate = new Date(date.getTime() + (5.5 * 60 * 60 * 1000));
        console.log("Original Date:", date.toISOString());
        console.log("Date after adding 2 minutes:", istDate);
        return date;

        const expirationDate = new Date();
        expirationDate.setMinutes(expirationDate.getMinutes() + Expire);
        const formattedDate = expirationDate.toISOString().slice(0, 19).replace("T", " ");
        expire = 'FORMAT(DATEADD(Expire, 30, GETDATE() AT TIME ZONE, "India Standard Time"), "yy:MM:dd HH:mm:ss"'
        const query = InsertQueryGenerator("otp", {email,otp,expire});
    }

    catch (error:unknown) 
        {
            const errorMsg = error as {message: string};
            console.error("Error :", errorMsg.message);
            throw new Error("failed to addminutes");
        }
}

export function addMinutes(Expire: number): Date {
    const currentDate = new Date();
    const newDate = new Date(currentDate.getTime() + Expire * 60000);
    console.log("Original Date:", currentDate.toISOString());
    return newDate;
}
    const Expire = 10;
    const newDateTime = addMinutes(Expire);
    console.log("Current Date and Time:", new Date());
    console.log(`After adding ${Expire} minutes:`, newDateTime);
  
*/
