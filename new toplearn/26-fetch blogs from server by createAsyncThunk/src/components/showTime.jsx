import React from 'react';
import {parseISO,formatDistanceToNow} from 'date-fns-jalali'
const ShowTime = ({timeStamp}) => {
    let timAgo=""
    if(timeStamp){
        let date=parseISO(timeStamp)
        let time=formatDistanceToNow(date)
        timAgo=`${time} قبل`
    }
    return ( 

        <span>
            <i>{timAgo } </i> 
        </span>
     );
}
 
export default ShowTime;