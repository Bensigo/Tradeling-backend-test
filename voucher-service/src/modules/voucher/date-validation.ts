import moment from "moment";

export function validateDate(date: string) {
    // check different format if valid return true
    if (moment(date, 'MM/DD/YYYY', true).isValid()){
        return moment(date, 'MM/DD/YYYY').isAfter();
    }
    if( moment(date, 'DD/MM/YYYY', true).isValid()){
        return moment(date, 'DD/MM/YYYY').isAfter();
    }
    if( moment(date, 'YYYY/MM/DD', true).isValid()){
        return moment(date, 'YYYY/MM/DD').isAfter();
    }
    if (moment(date, 'MM-DD-YYYY', true).isValid()){
        return moment(date, 'MM-DD-YYYY').isAfter();
    }
    if( moment(date, 'DD-MM-YYYY', true).isValid()){
        return moment(date, 'DD-MM-YYYY').isAfter();
    }
    if( moment(date, 'YYYY-MM-DD', true).isValid()){
        return moment(date, 'YYYY-MM-DD').isAfter();
    }

    return false;
}
