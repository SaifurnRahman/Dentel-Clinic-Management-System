import React from 'react';
import Navbar from '../Shared/Navbar';
import { Outlet } from 'react-router-dom';
import Hero from '../Shared/Hero';

const RootLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Hero></Hero>
            <div>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default RootLayout;