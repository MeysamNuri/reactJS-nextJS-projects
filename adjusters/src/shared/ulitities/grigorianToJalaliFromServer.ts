import moment from 'jalali-moment';
export const grigorianToJalaliFromServer = (value: any) => {
    let date: string = value.split('T')[0];
    return moment(date, 'YYYY-MM-DD').locale('fa').format('YYYY/MM/DD'); // 1367/11/04
}