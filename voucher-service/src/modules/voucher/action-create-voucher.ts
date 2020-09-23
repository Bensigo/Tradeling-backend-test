import {IAppRequest} from "../../types/app-request";
import {IAppResponse} from "../../types/app-response";
import {NextFunction} from "express";
import {daOffer} from "../special-offer/da.offer";
import {IOfferModel} from "../special-offer/model";
import {msgCode} from "../../utils/msg-code";
import {IVoucherModel} from "./model";
import {daVoucher} from "./da.voucher";
import {ApiError} from "../../error/api-error";
import moment from "moment";
import {validateDate} from "./date-validation";



export async function actionCreateVoucher(req: IAppRequest, res: IAppResponse, next: NextFunction):Promise<IAppResponse> {
    const {name, email, expiry_date: expDate} = req.body
    // validate the date
    const isValidDate: boolean =  validateDate(expDate)
    if(!isValidDate){
        const err = new ApiError(null ,msgCode.INVALID_VOUCHER_EXPIRY_DATE,'invalid expiration date. e.g of a valid date 2020/9/11'  )
        next(err)

        return;
    }
    // check if offer exist if not return an error code of offer does not exist
    const offer: IOfferModel = await daOffer.findOneBy({name}, null)
    if(!offer){
        const err = new ApiError(null ,msgCode.INVALID_OFFER,'offer does not exist'  )
        next(err)
        return;
    }
    // if offer exist create new voucher
    const code = Array(8).fill(0).map(x => Math.random().toString(36).charAt(2)).join('')
    const voucher: IVoucherModel = await daVoucher.insert({code, email, name, expiry_date: expDate})

    return res.status(200).json(voucher.toJSON())
}
