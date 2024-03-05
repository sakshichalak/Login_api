import * as dotenv from "dotenv";
import express from "express"; 
import helmet from "helmet";

dotenv.config();   
import { Aerospike_route } from "./aerospike_route";



const PORT: number = 8000;
const app: express.Application = express();


app.use(helmet());
app.use(express.json());


const aerospike_route = new Aerospike_route(app);
aerospike_route.configureRoutes();

console.log("PORT", PORT);
app.listen(PORT ,() => {
    console.log(`Listening on port ${PORT}`);
});
