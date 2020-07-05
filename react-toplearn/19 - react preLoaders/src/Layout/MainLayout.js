import React from 'react';
import TopNave from '../components/Navs/TopNave';
import Header from '../components/common/Header';
import MainMenu from '../components/Navs/MainMenu';
import Footer from '../components/common/Footer';
import {withRouter} from 'react-router-dom'
const MainLayout = (props) => {
    const {pathname}=props.location
    return ( 

        <>
            <div className="landing-layer">
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