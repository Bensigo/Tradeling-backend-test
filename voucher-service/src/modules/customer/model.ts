import  { Document, model, Model, Schema } from 'mongoose';

export interface ICustomerModel extends ICustomerDocument,Document {

}

export interface ICustomerDocument {
   name: string;
   email: string;
    updated_at?: Date;
    created_at?: Date;
}

const customerSchema: Schema = new Schema({
    name: {
        type: String,
        default: null,
        required: true
    },
    email: {
        required: true,
        unique: true,
        type: String
    }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    collection: 'customer',
    strict: true,
})
customerSchema.index({email: 1})

export const customerModel: Model<ICustomerModel> = model<ICustomerModel>('Customer', customerSchema)
