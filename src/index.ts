import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";  
import helmet from "helmet";
import { loginRoute } from "./routes";
import { createdb } from "../src/connection/login.connectionDB";
dotenv.config();  

// if (!process.env.PORT) {
//     console.log("port");
//     process.exit(1);
//  }

const PORT: number = 3000;
const app: express.Application = express();

app.use(helmet());
app.use(cors());
app.use(express.json());


const LoginRoute = new loginRoute(app);
LoginRoute.configureRoutes();



console.log("PORT", PORT);
app.listen(PORT ,() => {
    console.log(`Listening on port ${PORT}`);
});

createdb()