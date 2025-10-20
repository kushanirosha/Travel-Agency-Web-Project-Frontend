import React from "react";
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";

const Layout = ({children}) =>{
    return(
        <div>
             <div><Navbar /></div>
            <div className="main-content">
                {children}
            </div>
            <div><Footer /></div>
        </div>
    );
}

export default Layout;