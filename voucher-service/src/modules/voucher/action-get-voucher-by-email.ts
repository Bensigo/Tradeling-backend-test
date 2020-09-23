import {IAppRequest} from "../../types/app-request";
import {IAppResponse} from "../../types/app-response";
import {NextFunction} from "express";
import {IVoucherModel} from "./model";
import {daVoucher} from "./da.voucher";
import {msgCode} from "../../utils/msg-code";
import {ApiError} from "../../error/api-error";

export async function actionGetVouchersByEmail(req: IAppRequest, res: IAppResponse, next: NextFunction):Promise<IAppResponse> {
    const {email} = req.body;
    // return  vouchers with the given email
    const vouchers: Partial<IVoucherModel[]> = await daVoucher.findBy({email, is_used: false}, null,true, 'name code ' )

    if(!vouchers){
        const err = new ApiError(null ,msgCode.VOUCHER_DOES_NOT_EXIT, 'no vouchers found'  )
        next(err)
        return;

    }
    return res.status(200).json(vouchers)

}
