import React from 'react'
import { Outlet } from "react-router"
import Navbar from './components/Navbar/Navbar'
import HeroMain from './components/HeroMain/HeroMain'
import CoinsTable from './components/CoinsTable/CoinsTable'

export default function Root() {
    return (
        <>
            {/* <Navbar /> */}
            <HeroMain />
            <Outlet />
        </>

    )
}
