import {BaseError} from "./base-error";
import {echo} from "../utils/echo";
import {ApiError} from "./api-error";


export class ErrorHandler {
    /**
     * handle error logging
     * @constructor
     * @param {Error} err - instance and of BaseError
     * */
    public  handleError(err: Error ){
        if(err instanceof ApiError){
            echo(`:::APIError::: ${err.getMessage()}`)
        }else {
            echo(`:::Error::: ${err}`)
            // can add sentry and  other error handle too her
        }


    }
    /**
     * check if error is an operational error or not
     * @constructor
     * @param {Error} err - instance of BaseError
     * */
    public isTrustedError(err: Error) {
        if (err instanceof BaseError) {
            return err.isOperational;
        }
        return false;
    }
}

export const errorHandler = new ErrorHandler()
