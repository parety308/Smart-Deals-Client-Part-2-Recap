import React from 'react';
import Navbar from '../components/NavBar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../components/Footer/Footer';

const Root = () => {
    return (
        <div className='w-full'>
            <Navbar ></Navbar>
            <Outlet/>
            <Footer></Footer>
        </div>
    );
};

export default Root;