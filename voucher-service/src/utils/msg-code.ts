
export interface IMsgCode {
    OK:  number,
    BAD_REQUEST:  number,
    NOT_FOUND:  number,
    INTERNAL_SERVER: number,
    // voucher error code - 7xxx
    VOUCHER_HAS_BEEN_USED:number
    VOUCHER_EXPIRED: number
    INVALID_VOUCHER_EXPIRY_DATE: number
    VOUCHER_DOES_NOT_EXIT: number
    // offer error code - 8xxx
    OFFER_ALREADY_EXIST: number
    INVALID_OFFER: number
    // customer error code - 9xxx
    CUSTOMER_ALREADY_EXIST: number
}

export const msgCode: IMsgCode = {
    OK: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER: 500,
    VOUCHER_DOES_NOT_EXIT: 7004,
    VOUCHER_EXPIRED: 7003,
    INVALID_VOUCHER_EXPIRY_DATE: 7008,
    VOUCHER_HAS_BEEN_USED: 7009,
    INVALID_OFFER: 8005,
    OFFER_ALREADY_EXIST: 8004,
    CUSTOMER_ALREADY_EXIST: 9003
}
