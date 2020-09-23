import  { Document, model, Model, Schema } from 'mongoose';

export interface IVoucherModel extends IVoucherDocument,Document {

}

export interface IVoucherDocument {
    name: string;
    email: string;
    code: string
    is_used: boolean;
    updated_at?: Date;
    expiry_date: Date;
    used_at: Date
    created_at?: Date;
}

const voucherSchema: Schema = new Schema({
    name: {
        type: String,
        default: null,
        required: true
    },
    email: {
        required: true,
        type: String
    },
    code: {
        required: true,
        type: String,
        unique: true
    },
    is_used: {
        type: Boolean,
        default: false
    },
    used_at: { type: Date, default: null },
    expiry_date: {type: Date}

}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    collection: 'voucher',
    strict: true,
})
voucherSchema.index({name: 1, email: 1})

export const voucherModel: Model<IVoucherModel> = model<IVoucherModel>('voucher', voucherSchema)
