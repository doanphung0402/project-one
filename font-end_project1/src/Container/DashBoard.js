import React, { Fragment } from 'react';
import Header from '../Component/Header';
import Footer from '../Component/Footer';
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