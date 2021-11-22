import React, { Fragment } from 'react';
import Header from '../Component/DashBoard/Header'
import Footer from '../Component/DashBoard/Footer';
const DashBoard = (props) => {
    const {children} =props; 
    return (
        <Fragment>
             <Header/>
             {children}
             <Footer />
        </Fragment>
    );
};

export default DashBoard;