import { Aerospike_Service } from "./aerospike_service";
import {Request,Response} from "express";
import Aerospike from "aerospike";

const namespace = "test";
const set = 'users';

export class Aerospike_controller{
    aerospike_service : Aerospike_Service

    constructor() {
        this.aerospike_service = new Aerospike_Service
    }

        insertClientController = async (req: Request, res: Response): Promise<void> => {
            try {
                const record = req.body;
                await this.aerospike_service.insertClient(record);
                res.status(200).send("Record inserted successfully");
            } catch (error) {
                console.error("Error inserting record:", error);
                res.status(500).send("Error inserting record");
            }
        };

        readClientController = async (req: Request, res: Response): Promise<void> => {
            try {
                const id = req.params.id;
                const record = await this.aerospike_service.readClient(id);
                res.status(200).send(record);
            } catch (error) {
                console.error("Error reading record:", error);
                res.status(500).send("Error reading record");
            }
        };
    
        updateClientController = async (req: Request, res: Response): Promise<void> => {
            try {
                const id = req.params.id;
                const record = req.body;
                await this.aerospike_service.updateClient(record);
                res.status(200).send("Record updated successfully");
            } catch (error) {
                console.error("Error updating record:", error);
                res.status(500).send("Error updating record");
            }
        };
    
        deleteClientController = async (req: Request, res: Response): Promise<void> => {
            try {
                const id = req.params.id;
                await this.aerospike_service.deleteClient(id);
                res.status(200).send("Record deleted successfully");
            } catch (error) {
                console.error("Error deleting record:", error);
                res.status(500).send("Error deleting record");
            }
        };

        incrementCounterController = async(req:Request,res:Response):Promise<void> => {
            try{
                // const { record, counter } = req.body
                await this.aerospike_service.incrementCounter(req.body);
                res.status(200).send("record incremented successfully");
            }
            catch(error){
                console.error("Error incremented record:",error);
                res.status(500).send("Error incremented record");
            }   

        }
}