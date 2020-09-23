import { voucherModel} from "./model";
import {DaBase} from "../../base/da-base";
import {Model} from "mongoose";
import {IOfferModel} from "../special-offer/model";
import {daOffer} from "../special-offer/da.offer";



class Da extends DaBase {
    public model: Model<any>;

    async updateVoucher({code, email, name}: {code: string, email:string , name: string}) {
        await this.upsertOneBy({code, email}, {is_used: true, used_at: new Date().toISOString()})
        const offer: IOfferModel = await daOffer.findOneBy({name}, null)
        return {discount: offer.discount, name: offer.name}
    }
}
export const daVoucher: Da = new Da(voucherModel);
