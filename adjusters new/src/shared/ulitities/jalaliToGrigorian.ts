import moment from 'jalali-moment';
export const jalaliToGrigorian = (value: any) => {
    let date: string = value.year + '/' + value.month + '/' + value.day;
    return moment.from(date, 'fa', 'YYYY/M/DD').format('YYYY-MM-DD'); 
}