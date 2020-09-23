import {BaseError} from "./base-error";
import {msgCode} from "../utils/msg-code";


export class ApiError extends BaseError {
    constructor(name: string ='API ERROR', code = msgCode.INTERNAL_SERVER, description = 'internal server error', isOperational = true) {
        super(name, code,  description, isOperational);
    }
}
