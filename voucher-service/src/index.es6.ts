import express, {NextFunction} from 'express';
import * as core from 'express-serve-static-core';
import * as http from 'http';
import { expressConfig } from './config/express-config';
import { echo } from './utils/echo';
import { appConfig } from './config/config';
import { routesConfig } from './config/routes';
import {errorHandlerMw} from "./mw/error-handler-mw";
import {errorHandler} from "./error/error-handler";
import  mongoose from "mongoose";
import {IAppRequest} from "./types/app-request";
import {IAppResponse} from "./types/app-response";



// make instance of express
export const app: core.Express = express();

// express config and middleware
expressConfig(app);
routesConfig(app);
errorHandlerMw(app)

// connect mongodb
mongoose.Promise = global.Promise;
mongoose.set('debug', appConfig.mongo.debug);
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.set('bufferCommands', true);
mongoose.connect(
    appConfig.mongo.dbUri,
    {
        family: 4,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        poolSize: appConfig.mongo.poolSize,
    },
    (err: any): void => {
        if (err) {
            errorHandler.handleError(err)
        } else {
            echo(`[MongoDB] connected: ${appConfig.mongo.dbUri}`);
        }
    }
);

type HealthMessageType = {
    version: string,
    name: string,
    status: boolean
}

/**
 * handle handle  promises error
 * */
process.on('unhandledRejection', (reason, Promise) =>{
    throw reason
} )

/**
 *  handle programmers error
 * */
process.on('uncaughtException', (error: Error) => {
    errorHandler.handleError(error);
    // check is is not operational error restart the server gracefully
    if(!errorHandler.isTrustedError(error)){
        process.exit(1)
    }
})
// allow you to set port fromm terminal
let port:number;
port = appConfig.apiPort
if(process.argv[2]){
    port = parseInt(process.argv[2], 10)
}

export function server(): http.Server {
    return app.listen(port, (): void => {
        echo(`[Server] listening http://localhost:${port}`);
    });
}
