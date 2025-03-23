import moment from 'jalali-moment';
export const grigorianTojalaliObjFormat = (value: any) => {
    const obj: any = {
        year: parseInt(moment(value, 'YYYY-MM-DD').locale('fa').format('YYYY')),
        month: parseInt(moment(value,'YYYY-MM-DD').locale('fa').format('M')),
        day: parseInt(moment(value, 'YYYY-MM-DD').locale('fa').format('DD')),
    }
    return obj;
}