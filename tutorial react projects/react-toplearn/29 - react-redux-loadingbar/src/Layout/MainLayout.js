import React from 'react';
import TopNave from '../components/Navs/TopNave';
import Header from '../components/common/Header';
import MainMenu from '../components/Navs/MainMenu';
import Footer from '../components/common/Footer';
import {withRouter} from 'react-router-dom'
import { Helmet } from 'react-helmet';
import  LoadingBar  from 'react-redux-loading-bar';
const MainLayout = (props) => {
    const {pathname}=props.location
    return ( 

        <>
            
                <Helmet>
                    <title> خود اموز تاپلرن میثم </title>
                </Helmet>
              
            <div className="landing-layer">
            <LoadingBar style={{backgroundColor:"red",height:"5px"}} />
                <div className="container">
                    <TopNave />
                    {pathname === "/"? <Header />: null}
                
                </div>
            </div>
            <MainMenu />
            <main id="home-page">
                <div className="container">
                   {props.children}

                </div>
            </main>
            <Footer />

        </>
     );
}
 
export default withRouter(MainLayout) ;