import React from 'react';
import Tweet from './Tweet';

const TweetList = ({data}) => {
    return (  
        <div>
        
            {
                data.map(tweet=>(<Tweet datas={tweet}/>))
            }
            
            
        </div>
    );
}
 
export default TweetList
