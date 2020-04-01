import "reflect-metadata";
import {createConnection} from "typeorm";
import * as cors from "cors";
import * as helmet from "helmet";
import * as express from "express";
import * as bodyParser from "body-parser";
import routes from "./routes";

createConnection().then(async connection => {

    // create express app
    const app = express();

    app.use(cors());
    app.use(helmet());
    app.use(bodyParser.json());

    app.use("/", routes);
    
    app.listen(3000, () => {
        console.log("Server is running at PORT 3000!");
    });

}).catch(error => console.log(error));
