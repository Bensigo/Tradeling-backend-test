import { Document, DocumentQuery, Model, Query } from 'mongoose';


export class DaBase {
  model: Model<any>;

  constructor(model: typeof Model) {
    this.model = model;
  }

  async insert(json: any): Promise<Document | any> {
    const item: Document = new this.model(json);

    return item.save();
  }

  async upsertOneBy(filter: any, data: any): Promise<any> {
    return this.model
      .findOneAndUpdate(
        filter,
        { $set: { ...data } },
        {
          upsert: true,
          new: true,
          setDefaultsOnInsert: true,
        }
      )
      .lean();
  }

  async upsertAllBy(filter: any, data: any): Promise<any> {
    return this.model.updateMany(filter, { $set: { ...data } }, { upsert: true, new: true, setDefaultsOnInsert: true });
  }

  async updateAllBy(filter: any, data: any): Promise<any> {
    return this.model.updateMany(filter, { $set: { ...data } });
  }

  async findOneBy(filter: any, sort?: any, lean: boolean = true): Promise<any> {
    const res: Query<any> = this.model.findOne(filter).sort(sort);

    return lean === true ? res.lean() : res;
  }

  async findBy(filter: any, sort?: any, lean: boolean = true, projection?: string | any): Promise<Query<any> | DocumentQuery<any, any>> {
    const res: Query<any> = this.model.find(filter, projection).sort(sort);

    return lean === true ? res.lean() : res;
  }

  async count(filter: any, lean: boolean = true): Promise<number> {
    const res: Query<any> = this.model.countDocuments(filter);

    return lean === true ? res.lean() : res;
  }

  async softDelete(filter: any, sort?: any, lean: boolean = false): Promise<any> {
    const res: Query<any> = this.model.findOneAndUpdate(filter, { $set: { deleted_at: Date.now(), is_deleted: true } });

    return lean === true ? res.lean() : res;
  }

  async deleteAll(filter: any): Promise<any> {
    if (filter) {
      return this.model.deleteMany(filter);
    }
  }
}
