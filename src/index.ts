import * as dotenv from "dotenv";
import express from "express";
//import cors from "cors";  
import helmet from "helmet";
//import mysql  from "mysql2";
import { loginRoute } from "./routes";
//import {route} from "./routes";
dotenv.config();  

if (!process.env.PORT) {
    process.exit(1);
 }

const PORT: number = 5000;
const app: express.Application = express();

app.use(helmet());
//app.use(cors());
app.use(express.json());
//app.use("/hash-password",route);


const LoginRoute = new loginRoute(app);
LoginRoute.configureRoutes();



console.log("PORT", PORT);
app.listen(PORT ,() => {
    console.log(`Listening on port ${PORT}`);
});