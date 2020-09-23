import {actionCreateVoucher, generateText, KeyValueAny} from "./create-voucher.test";
import {actionCreateCustomer} from "../../customer/test/create-customer.test";
import {actionCreateOffer} from "../../special-offer/test/create-offer.test";
import {superTestRequest} from "../../../config/supertest.config";
// @ts-ignore
import moment from "moment";




let customer:KeyValueAny
let offer:KeyValueAny
let voucher:KeyValueAny;
describe('Should allow customer to use voucher', () => {
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
        voucher = res;
        expect(res).toHaveProperty('code')

    })
    it('should apply voucher', async () => {
        await superTestRequest.post('/api/v1/voucher/use')
            .send({ email: customer.email, code: voucher.code})
            .expect(200)
            .expect(function (res) {
                expect(res.body).toHaveProperty('name')
                expect(res.body).toHaveProperty('discount')
            })
    });
})
