import { validationResult } from 'express-validator';
import { IAppRequest } from '../types/app-request';
import { IAppResponse } from '../types/app-response';
import { NextFunction } from 'express';
import { echo } from '../utils/echo';
import {ApiError} from "../error/api-error";
import {msgCode} from "../utils/msg-code";

export async function reqValidationResult(req: IAppRequest, res: IAppResponse, next: NextFunction): Promise<void> {
  // todo move to general
  const errors: any = validationResult(req);

  if (!errors.isEmpty()) {

    const errArr: any[] = errors.array();
    const msgArr: string[] = errArr.map((v: any): string => `${v.param} ${v.msg.toLowerCase()}`);

    const err = new ApiError(null ,4001,[...new Set(msgArr)].join(' \n '),  )
    next(err)
    return

  }

  next();
}
