import React from 'react';
import './Header.css'; // Import CSS file for styling
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from '@mui/material';

const Header = () => {
    let isLoggedin = localStorage.getItem('token') === null ? false : true;
    const navigate = useNavigate();

    const logOutHandler = () => {
        localStorage.clear();
        navigate("/login")
    }


    return (
        <div>
            <div className="header">
                <div className="logo">ECOMMERCE</div>
                <div className="navMenu">
                    <div>Categories</div>
                    <div>Sale</div>
                    <div>Clearance</div>
                    <div>New Stock</div>
                    <div>Trending</div>
                </div>
                <div className="rightSection">
                    <div className="helpOrder">
                        <div>Help</div>
                        <div>Orders and returns</div>
                        <div>Hi user</div>
                        {isLoggedin && <div onClick={logOutHandler}>logout</div>}
                    </div>
                    <div className="icons">
                        <span className="icon">🔍</span>
                        <span className="icon">🛒</span>

                    </div>
                </div>
            </div>
            <div className='banner'>Get 10% off on business sign up</div>
        </div>
    );
};

export default Header;
