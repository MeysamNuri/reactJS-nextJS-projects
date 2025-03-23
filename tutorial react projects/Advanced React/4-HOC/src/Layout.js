import React, {useEffect, useState} from 'react';
import Header from "./Header";
import Footer from "./Footer";

const Layout = (props) => {

  const [isAuth, setAuth] = useState(true);

  useEffect(() => {
    const apiKey = localStorage.getItem("API_KEY");
    if (apiKey)
      setAuth(true);
    else
      setAuth(false);
  }, []);

  const login = () => {
    localStorage.setItem("API_KEY", "5646154615");
    setAuth(true)
  }

  if (!isAuth)
    return <div>
      <h1 style={{color : 'red'}}>please login</h1>
      <button onClick={login}>ورود</button>
    </div>;

  return (
    <>
      <Header/>
      {props.children}
      <Footer/>
    </>
  );
};

export default Layout;