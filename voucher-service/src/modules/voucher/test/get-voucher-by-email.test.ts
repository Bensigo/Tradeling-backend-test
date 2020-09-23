import {actionCreateCustomer} from "../../customer/test/create-customer.test";
import {actionCreateOffer} from "../../special-offer/test/create-offer.test";
import moment from "moment";
import {actionCreateVoucher, generateText, KeyValueAny} from "./create-voucher.test";
import {superTestRequest} from "../../../config/supertest.config";



let customer:KeyValueAny
let offer:KeyValueAny

describe('Should get vouchers by email', () => {
    it('it should create new customer', async() => {
        const name = `${generateText()}-customer`
        const email = `${generateText()}@customer.com`
        const res = await actionCreateCustomer(name, email)
        expect(res).toHaveProperty('name')
        expect(res).toHaveProperty('email')
        customer = res
    })
    it('should be able t create new special offer', async ()=> {
        const name = `${generateText()}-special-offer`
        const res = await actionCreateOffer(name, 50)
        expect(res).toHaveProperty('name')
        expect(res).toHaveProperty('discount')
        offer = res
    })
    it('should create new voucher', async () => {
        const date = moment().add(3, 'days').format('YYYY/MM/DD');
        const res = await actionCreateVoucher(offer.name,customer.email, date)
        expect(res).toHaveProperty('code')
    })
    it('should find vouchers via email', async () => {
        await superTestRequest.post('/api/v1/voucher')
            .send({ email: customer.email})
            .expect(200)
            .expect(function (res) {
                 expect(res.body.length).toEqual(1)
                 expect(res.body[0]).toHaveProperty('name')
            })
    })
})
