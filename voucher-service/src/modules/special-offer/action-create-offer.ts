import {IAppRequest} from "../../types/app-request";
import {IAppResponse} from "../../types/app-response";
import {NextFunction} from "express";
import {IOfferModel} from "./model";
import { daOffer} from "./da.offer";
import {msgCode} from "../../utils/msg-code";
import {ApiError} from "../../error/api-error";

export async function actionCreateOffer(req: IAppRequest, res: IAppResponse, next: NextFunction):Promise<IAppResponse> {
    try {
        const { name, discount} = req.body
        const customer:IOfferModel =  await  daOffer.insert({name, discount})
        return res.status(200).json({_id: customer._id, name, discount, created_at: customer.created_at })
    }catch (e) {
        console.log(e)
        const err = new ApiError(null ,msgCode.OFFER_ALREADY_EXIST,'offer already exist')
        next(err)
       return
    }
}
