import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";  
import helmet from "helmet";
import { loginRoute } from "./routes";
import { createdb } from "../src/connection/login.connectionDB";
import bodyParser = require("body-parser");
dotenv.config();  

const PORT: number = 5000;
const app: express.Application = express();
var corsOptions = {
    origin: '*'
  }


app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.json({ limit: '500mb'})); 
//app.use(express.urlencoded({limit: '50mb'}));  

app.post('/upload', (req, res) => {
  console.log("request");
});

const LoginRoute = new loginRoute(app);
LoginRoute.configureRoutes();

console.log("PORT", PORT);
app.listen(PORT ,() => {
    console.log(`Listening on port ${PORT}`);
});

createdb()