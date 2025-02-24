import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from "react-router"
import './navbar.css'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { useSelector, useDispatch } from 'react-redux'
import { curencyActions } from '../../store/currencySlice';
import supportedCurrencies, { timeZoneToCurrency } from '../../config/supportedCurrencies';
export default function Navbar() {
    const currency = useSelector(state => state.currency.currency);
    const dispatch = useDispatch();
    const [navOpen, setNavOpen] = useState(false);
    const handleChange = async (e) => {
        dispatch(curencyActions.updateCurrency(e.target.value))
        dispatch(curencyActions.updateCurrency(e.target.value))
    }

    const navigate = useNavigate();
    function reDirect() {
        navigate("/")
    }


    return (
        <>
            <div className='nav flex'>
                <div className="nav_wrapper w-[100%] max-w flex justify-between items-center">
                    <h2 className='logo' onClick={reDirect}>Catch Crypto</h2>
                    <div className="nav_group flex items-center gap-5 ">
                        <ul className="nav_links">
                            <li><a href="#">Home</a></li>
                            <li><a href="#">About</a></li>
                            <li><a href="#">Contact</a></li>
                        </ul>

                        <ul className={`nav_links-mobile ${navOpen ? 'nav_links-mobile-active' : ''}`}> <h2 className='logo'>Catch Crypto</h2>
                            <li><a href="#">Home</a></li>
                            <li><a href="#">About</a></li>
                            <li><a href="#">Contact</a></li>
                        </ul>

                        <Select
                            variant='outlined'
                            style={{
                                width: 100,
                                height: 40,
                            }}
                            value={currency}
                            onChange={handleChange}
                        >
                            {
                                Object.entries(supportedCurrencies).map(([currency]) => (
                                    <MenuItem key={currency} selected value={currency}>{currency}</MenuItem>
                                ))
                            }
                        </Select>
                        <MenuOutlinedIcon className='text-white cursor-pointer menu_icon' onClick={() => setNavOpen(true)} />
                        {navOpen && <div onClick={() => setNavOpen(false)} className="overlay"></div>}

                    </div>

                </div>
            </div>
            <Outlet /></>

    )
}
