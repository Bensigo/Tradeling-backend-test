import express from 'express';
import * as core from 'express-serve-static-core';
import { body } from 'express-validator';
import {reqValidationResult} from "../../mw/req-validation-result";
import {actionCreateOffer} from "./action-create-offer";


const router: core.Router = express.Router();


router.route('/offer/create').post([
    body([ 'name']).exists().isString(),
    body(['discount']).exists().isNumeric()
], reqValidationResult, actionCreateOffer)

export default router;
