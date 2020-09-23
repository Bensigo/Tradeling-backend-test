import { Application, NextFunction } from 'express';
import { IAppRequest } from '../types/app-request';
import { IAppResponse } from '../types/app-response';
import packageJson from "../../package.json";
import {customerRoute} from "../modules/customer";
import {offerRoute} from "../modules/special-offer";
import {voucherRoute} from "../modules/voucher";


type RouteConfigType = (app: Application) => void;
const api: string = '/api/v1'

/**
 * set app route configuration for service
 * @param {Application} app - instance of an  app
 * */
export const routesConfig: RouteConfigType = (app: Application): void => {
  app.use(api, customerRoute);
  app.use(api, offerRoute)
  app.use(api, voucherRoute)
  app.use('/', (req: IAppRequest, res: IAppResponse, next: NextFunction)=> {
      return  res.status(200).json({ version: packageJson.version, name: packageJson.name, status: true })
  });
  app.use('*', async (req: IAppRequest, res: IAppResponse): Promise<IAppResponse> => {
      return res.sendStatus(404);
     });
};
