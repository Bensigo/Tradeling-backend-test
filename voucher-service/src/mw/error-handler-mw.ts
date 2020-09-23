import {Application, NextFunction} from "express";
import {AppConfigType} from "../config/express-config";
import {IAppRequest} from "../types/app-request";
import {IAppResponse} from "../types/app-response";
import {errorHandler} from "../error/error-handler";
import {BaseError} from "../error/base-error";
import {ApiError} from "../error/api-error";

/**
 * Error handler middleware that checks if for an error occur in app
 * @constructor
 * @param {Application} app - an instance of express app
 * */
export const  errorHandlerMw: AppConfigType = (app: Application) => {
    app.use( (err:  ApiError, req: IAppRequest, res: IAppResponse, next: NextFunction) => {
        if(!errorHandler.isTrustedError(err)){
            next(err)
        }
        errorHandler.handleError(err)
        res.status(200).json(err.getMessage())
        return;
    })
}
