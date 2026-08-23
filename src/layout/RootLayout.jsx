import React from 'react';
import Navbar from '../Shared/Navbar';
import { Outlet } from 'react-router-dom';
import Hero from '../Shared/Hero';
import Footer from '../Shared/Footer';

const RootLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Hero></Hero>
            <div>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;