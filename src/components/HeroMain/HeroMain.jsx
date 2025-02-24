import React, { useEffect, useState } from 'react'
import './heromain.css'
import CoinsTable from '../CoinsTable/CoinsTable'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const handleDragStart = (e) => e.preventDefault();
import { TrendingCoins } from '../../config/api'
import Classic from '../loaders/Classic';
const responsive = {
    0: {
        items: 2,
    },
    512: {
        items: 3,
    },
    1400: {
        items: 5,
    },
};

export default function HeroMain() {
    const currency = useSelector(state => state.currency.currency);
    const currencySymbol = useSelector(state => state.currency.currencySymbol);
    const [trendingCoins, setTrendingCoins] = useState([]);
    const [loadingCarousel, setLoadingCarousel] = useState(true);
    const [loadingTable, setLoadingTable] = useState(true);
    const [size, setSize] = useState(0);

    const navigate = useNavigate();

    const getTrendingCoins = async () => {
        try {
            setSize(20)
            const data = await fetch(TrendingCoins(currency))
            setSize(40)
            setTrendingCoins(await data.json())
            setSize(100)
            setLoadingCarousel(false);

        }
        catch (err) {
            console.log(err);
            // setLoadingCarousel(false);
        }
    }

    function redirect(id) {
        navigate(id)
    }

    const items = trendingCoins.map((t) => <div onClick={() => redirect(t.id)} className='cursor-pointer carousel_coins'>
        <img src={t.image} alt="" />
        <h2>{t.symbol} {t.price_change_percentage_24h > 0 ? <span className='coin_profit'>+{t.price_change_percentage_24h}%</span> : <span className='coin_loss'>{t.price_change_percentage_24h}%</span>}</h2>
        <p>{currencySymbol}{t.current_price.toFixed(2)}</p>
    </div >);

  

    useEffect(() => {
        getTrendingCoins();
    }, [currency, loadingTable])

    return (
        <>
            {loadingCarousel ? <Classic size={size} /> :
                <>
                    <div className='heromain' >
                        <h1 onClick={getTrendingCoins}>Catch Crypto</h1>
                        <p>Get all the Info regarding your favorite Crypto Currency</p>
                        <div className="carousel max-w">
                            {items.length > 0 && <AliceCarousel
                                mouseTracking
                                infinite
                                animationDuration={1500}
                                disableDotsControls
                                disableButtonsControls
                                responsive={responsive} autoPlayInterval={2000}
                                // autoPlay
                                items={items} />}
                        </div>
                    </div>
                    <CoinsTable setLoadingTable={setLoadingTable} />
                </>
            }
        </>
    )
}
