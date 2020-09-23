import {actionCreateCustomer} from "../../customer/test/create-customer.test";
import {actionCreateOffer} from "../../special-offer/test/create-offer.test";
import {superTestRequest} from "../../../config/supertest.config";
import moment from "moment";



export async function actionCreateVoucher(name: string, email: string, date: string) {
    let response = {}
    const run = async () => {

        await superTestRequest.post('/api/v1/voucher/create')
            .send({name, email, expiry_date: date})
            .expect(200)
            .expect(function (res) {
                response = res.body
            })
    }
    await run()
    return {...response}
}

export const generateText = () => Array(8).fill(0).map(x => Math.random().toString(36).charAt(2)).join('')

export type KeyValueAny = Record<string, any>

let customer:KeyValueAny
let offer:KeyValueAny
describe('Should Create a new  voucher', function () {
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
});
