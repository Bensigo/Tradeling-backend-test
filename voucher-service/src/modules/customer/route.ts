import express from 'express';
import * as core from 'express-serve-static-core';
import { body } from 'express-validator';
import {reqValidationResult} from "../../mw/req-validation-result";
import {actionCreateCustomer} from "./action-create-customer";


const router: core.Router = express.Router();


router.route('/customer/create').post([
    body([ 'email']).exists().isString().isEmail(),
    body(['name']).exists().isString()
], reqValidationResult, actionCreateCustomer)

export default router;
