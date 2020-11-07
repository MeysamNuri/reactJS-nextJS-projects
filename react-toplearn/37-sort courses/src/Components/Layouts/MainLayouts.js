import React from 'react';
import Footer from '../Common/Footer';
import Header from '../Common/Header';
import MainNav from '../Navs/MainNav';
import TopNav from '../Navs/TopNav';
import {withRouter} from 'react-router-dom'
import { Helmet } from 'react-helmet';
import  LoadingBar  from 'react-redux-loading-bar';
const MaiLayouts = (props) => {
    const {pathname}=props.location
    return ( 
     <>
     <Helmet>
         <title>صفحه اصلی</title>
     </Helmet>
   <div class="landing-layer">
       <LoadingBar style={{backgroundColor:"lime",height:"5px"}}/>
        <div class="container">
            <TopNav />
            {pathname=== "/"?<Header />:null}
        </div>
    </div>
    <MainNav />
    <main id="home-page">
        <div class="container">
           {props.children}
        </div>
    </main>
    <Footer />
     </>

     );
}
 
export default withRouter(MaiLayouts);