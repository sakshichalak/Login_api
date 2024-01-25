import mysql from "mysql2/promise";

export function createdb() {
    const config = {
        host: "localhost",
        user: "root",
        password: "sakshi@VMSDINO22",
        database: "Logindatabase"
    };
    const pool = mysql.createPool(config);
    //console.log(pool);
    console.log("database pool connected ");
    return pool;
}


export const executeQuery = async (connection: mysql.Connection, query: string, values?:string): Promise<Array<unknown[]>> => {
    try {
      const [rows] = await connection.execute(query, values);
      if (!rows) {
        throw new Error();
      }
      return rows as Array<unknown[]>;
    

    } catch (error:unknown) {
        const errorMsg = error as {message: string};
        console.error("Error executing query:", errorMsg.message);
        throw new Error("failed to execute Query");
    }
};
export{};

