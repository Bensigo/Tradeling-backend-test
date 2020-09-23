import  { Document, model, Model, Schema } from 'mongoose';

export interface IOfferModel extends IOfferDocument,Document {

}

export interface IOfferDocument {
    name: string;
    discount: number;
    updated_at?: Date;
    created_at?: Date;
}

const offerSchema: Schema = new Schema({
    name: {
        type: String,
        default: null,
        required: true
    },
    discount: {
        required: true,
        type: Number
    }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    collection: 'offer',
    strict: true,
})
offerSchema.index({name: 1})

export const offerModel: Model<IOfferModel> = model<IOfferModel>('offer', offerSchema)
