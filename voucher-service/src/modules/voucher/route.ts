import express from 'express';
import * as core from 'express-serve-static-core';
import { body } from 'express-validator';
import {reqValidationResult} from "../../mw/req-validation-result";
import {actionCreateVoucher} from "./action-create-voucher";
import {actionGetVouchersByEmail} from "./action-get-voucher-by-email";
import {actionUseVoucher} from "./action-use-voucher";


const router: core.Router = express.Router();

router.route('/voucher/create').post([
    body(['email']).exists().isEmail(),
    body(['name', 'expiry_date']).exists().isString()
], reqValidationResult, actionCreateVoucher)


// get vouchers by email
router.route('/voucher').post([
    body(['email']).exists().isEmail(),
], reqValidationResult, actionGetVouchersByEmail)

// consume a valid voucher
router.route('/voucher/use').post([
    body(['email']).exists().isEmail(),
    body(['code']).exists().isString()
], reqValidationResult, actionUseVoucher)

export default router;
