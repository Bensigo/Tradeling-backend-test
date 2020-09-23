import * as core from 'express-serve-static-core';
import { IncomingHttpHeaders } from 'http';



export interface IAppRequest extends core.Request {
  query: Record<string, string>;
  headers: any;
}
