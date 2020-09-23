import {IAppRequest} from "../../types/app-request";
import {IAppResponse} from "../../types/app-response";
import {NextFunction} from "express";
import {ICustomerModel} from "./model";
import {daCustomer} from "./da.customer";
import {msgCode} from "../../utils/msg-code";
import {ApiError} from "../../error/api-error";

export async function actionCreateCustomer(req: IAppRequest, res: IAppResponse, next: NextFunction):Promise<IAppResponse> {
   try {
       const { name, email} = req.body
       const customer:ICustomerModel =  await  daCustomer.insert({name, email})
       return res.status(200).json({_xid: customer._id, name, email, created_at: customer.created_at })
   }catch (e) {
       const err = new ApiError(null ,msgCode.CUSTOMER_ALREADY_EXIST,'customer already exist',  )
       next(err)
   }
}
