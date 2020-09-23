import {superTestRequest} from "../../../config/supertest.config";

export async function actionCreateCustomer(name: string, email: string) {
    let response = {};
    const run = async () => {
        await superTestRequest.post('/api/v1/customer/create')
            .send({name, email})
            .expect(200)
            .expect(function (res) {
                response =  res.body
            })
    }
    await  run()
    return {...response}
}

export const generateText = () => Array(8).fill(0).map(x => Math.random().toString(36).charAt(2)).join('')
describe('Should create a new user', function () {
   it('it should create a new customer successfully', async () => {
       const email = `${generateText()}@test.com`
       const name = `${generateText()}-user`
       const res = await actionCreateCustomer(name, email)
       expect(res).toHaveProperty('name')
       expect(res).toHaveProperty('email')
   })
});
