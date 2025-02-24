import React, { useEffect, useState } from 'react'
import { CoinList } from '../../config/api'
import { useSelector } from 'react-redux'
import TableHead from '@mui/material/TableHead';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import './coinstable.css'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Link, useNavigate } from 'react-router-dom'

export default function CoinsTable({ setLoadingTable }) {
    const [coins, setCoins] = useState([])
    const [query, setQuery] = useState("")
    const currency = useSelector(state => state.currency.currency);
    const currencySymbol = useSelector(state => state.currency.currencySymbol);
    const getAllCoins = async () => {
        try {
            const CoinListS = await fetch(CoinList(currency))
            setCoins(await CoinListS.json());
            setLoadingTable(false);
        }
        catch (e) {
            console.log(e);
            // setLoadingTable(false);
        }
    }

    const navigate = useNavigate();

    const handleNavigate = (e) => {
        navigate(e.id)
    }

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const handleSearch = () => {
        return coins.filter((c) =>
            c.id.toLowerCase().indexOf(query.trim().toLocaleLowerCase()) !== -1 || c.symbol.toLowerCase().indexOf(query.toLocaleLowerCase()) !== -1
        )
    }

    useEffect(() => {
        getAllCoins()
    }, [currency])

    return (
        <div className='coinstable max-w'>
            <h2>Cryptocurrency Prices by Market Cap</h2>
            <Box
                component="form"
                sx={{ '& > :not(style)': { width: '100%' } }}
                noValidate
                autoComplete="off"
                className='coinstable_input'
            >
                <TextField id="outlined-basic" label="Search For a Crypto Currency..
" variant="outlined" onChange={(e) => setQuery(e.target.value)} />

            </Box>
            <TableContainer component={Paper} >

                <Table aria-label="simple table">
                    <TableHead style={{ backgroundColor: "#FAA64B" }}>
                        <TableRow>
                            {["Coin", "Price", "24h Change", "Market Cap"].map((head) => {
                                return <TableCell
                                    key={head}
                                    style={{
                                        color: "black",
                                        fontWeight: "700",
                                        fontFamily: "Montserrat",
                                    }} align={head === "Coin" ? "" : "right"}> {head}
                                </TableCell>
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody style={{ backgroundColor: "#111315" }}>

                        {handleSearch()?.map((c) => {
                            return <TableRow key={c.id} hover style={{ cursor: "pointer" }} onClick={() => handleNavigate(c)}>
                                <TableCell style={{
                                    display: "flex",
                                    gap: 15,
                                }} component="th"
                                    scope="row">
                                    <img src={c.image} alt="" />
                                    <span><span className='coinstable_symbol'>{c.symbol}</span> <br /><span className='coinstable_id'>{c.id}</span></span>
                                </TableCell>

                                <TableCell align='right'>{currencySymbol}{numberWithCommas(c.current_price)}
                                </TableCell>

                                <TableCell align='right'>{c.price_change_percentage_24h > 0 ? <span className='coin_profit'>+{c.price_change_percentage_24h.toFixed(2)}%</span> : <span className='coin_loss'>{c.price_change_percentage_24h.toFixed(2)}%</span>}
                                </TableCell>

                                <TableCell align='right'>{currencySymbol}{numberWithCommas(c.market_cap.toString().slice(0, -6))}M
                                </TableCell>
                            </TableRow>

                        })}

                    </TableBody>

                </Table>
            </TableContainer >
        </div >
    )
}
