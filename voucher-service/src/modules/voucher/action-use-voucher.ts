import {IAppRequest} from "../../types/app-request";
import {IAppResponse} from "../../types/app-response";
import {NextFunction} from "express";
import {IVoucherModel} from "./model";
import {daVoucher} from "./da.voucher";
import {msgCode} from "../../utils/msg-code";
import {IOfferModel} from "../special-offer/model";
import {ApiError} from "../../error/api-error";
import moment from "moment";

export async function actionUseVoucher(req: IAppRequest, res: IAppResponse, next: NextFunction):Promise<IAppResponse> {
    const {code, email}  = req.body
    // check if voucher exist
    const voucher:IVoucherModel = await daVoucher.findOneBy({code, email});
    if(!voucher){
        const err = new ApiError(null ,msgCode.VOUCHER_DOES_NOT_EXIT, 'no vouchers found'  )
        next(err)
        return;

    }
    const date = moment(voucher.expiry_date).format('MM/DD/YYYY')
    // check if offer is expired
    const isExpired = moment(date).isBefore()
    if(isExpired || voucher.is_used){
        const err = new ApiError(null ,msgCode.VOUCHER_EXPIRED, 'expired voucher'  )
        next(err)
        return;
    }

    // if voucher update voucher
    const resp: Partial<IOfferModel> = await daVoucher.updateVoucher({code, email, name: voucher.name})
    return res.status(200).json(resp)
}
