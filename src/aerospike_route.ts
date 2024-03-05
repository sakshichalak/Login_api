import { AerospikeService } from "./aerospike";
import { Aerospike_controller } from "./aerospike_controller";
import express from "express";

export class Aerospike_route{
    app: express.Application;
    aerospike_controller : Aerospike_controller

    constructor(app:express.Application){
        this.app = app;
        this.aerospike_controller = new Aerospike_controller()
    }

    configureRoutes(){

    // create 
        this.app.route("/api/create")
            .put(
                this.aerospike_controller.insertClientController
            );
    
    // Read 
        this.app.route("/api/read/:id")
            .post(
                this.aerospike_controller.readClientController
            );
        
    // update 
        this.app.route("/api/update/:id")
            .put(
                this.aerospike_controller.updateClientController
            );

    // delete 
    
        this.app.route("/api/delete/:id")
            .delete(
                this.aerospike_controller.deleteClientController
            );

    // increment 

        this.app.route("/api/increment")
            .put(
                this.aerospike_controller.incrementCounterController
            );
    }
}


