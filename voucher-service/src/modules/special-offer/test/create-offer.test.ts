import {superTestRequest} from "../../../config/supertest.config";


export async function actionCreateOffer(name: string, discount: number) {
    let response = {}
    const run = async () => {

        await superTestRequest.post('/api/v1/offer/create')
            .send({name, discount})
            .expect(200)
            .expect(function (res) {
                response = res.body
            })
    }
    await run()
    return {...response}
}

export const generateText = () => Array(8).fill(0).map(x => Math.random().toString(36).charAt(2)).join('')
describe('Should Create a new offer', function () {
    it('it should create a new special offer successfully', async() => {
        const name = `${generateText()}-special-offer`
        const res = await actionCreateOffer(name, 50)
        expect(res).toHaveProperty('name')
        expect(res).toHaveProperty('discount')

    })
});
