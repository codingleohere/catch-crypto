import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { SingleCoin } from '../../config/api';
import './coinsdetails.css'
import CoinsChart from './CoinsChart/CoinsChart';
import Classic from '../loaders/Classic';

export default function CoinsDetails() {
  const currency = useSelector(state => state.currency.currency);
  const currencySymbol = useSelector(state => state.currency.currencySymbol);
  const params = useParams();
  const [size, setSize] = useState(0);
  const [coin, setCoin] = useState();
  const [loading, setLoading] = useState(true);
  console.log("Parent Re")
  const getSingleCoin = async () => {
    try {
      setSize(20);
      setLoading(true)
      const coinData = await fetch(SingleCoin(params.id));
      setSize(40);
      setSize(100);
      setCoin(await coinData.json())

      setLoading(false)
    }
    catch (e) {
      console.log("Internal Error")
    }
  }

  useEffect(() => {
    getSingleCoin()
  }, [currency])

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  if (!coin) return <Classic size={size} />;


  return (
    <div className='coin_page max-w'>
      <div className="coin_details">
        <img src={coin.image.large} alt="" />
        <h2>{coin.name}</h2>
        <p>{coin?.description.en.split(". ")[0]}</p>
        <h3>Rank: {numberWithCommas(coin?.market_cap_rank)}</h3>
        <h3>Current Price: {currencySymbol}{numberWithCommas(coin?.market_data.current_price[currency.toLowerCase()])}</h3>
        <h3>Market Cap: {currencySymbol}{numberWithCommas(coin?.market_data.market_cap[currency.toLowerCase()]
          .toString()
          .slice(0, -6))}</h3>
      </div>
      <CoinsChart coin={coin} />
    </div >
  )
}