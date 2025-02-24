import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2';
import './coinschart.css'
import { Chart } from 'react-chartjs-2'
import { useSelector } from 'react-redux'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import { HistoricalChart } from '../../../config/api';


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

const chartDays = [
    {
        label: "24 Hours",
        value: 1,
    },
    {
        label: "30 Days",
        value: 30,
    },
    {
        label: "3 Months",
        value: 90,
    },
    {
        label: "1 Year",
        value: 365,
    },
];

export default function CoinsChart({ coin }) {
    const [flag, setFlag] = useState(false);
    const [days, setDays] = useState(1);
    const [historicData, setHistoricData] = useState();
    const currency = useSelector(state => state.currency.currency);
    const getHistoricData = async () => {
        try {
            const historicalDataFromAPI = await fetch(HistoricalChart(coin.id, days, currency));
            const res = await historicalDataFromAPI.json();
            setFlag(true)
            setHistoricData(res.prices)

        }
        catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getHistoricData()
    }, [days, currency])

    return (
        <>
            <div className='coins_chart'>
                {!historicData | flag === false ?
                    <div className="loader_chart_wrapper">
                        <p>Loading chart..</p>
                        <div className='loader_chart'></div></div> :
                    <>
                        <Line
                            data={{
                                labels: historicData.map((coin) => {
                                    let date = new Date(coin[0]);
                                    let time = date.getHours() > 12 ? `${date.getHours() - 12}: ${date.getMinutes()} PM` : `${date.getHours()} : ${date.getMinutes()} AM`
                                    return days === 1 ? time : date.toLocaleDateString();
                                }),
                                datasets: [
                                    {
                                        data: historicData.map((coin) => coin[1]),
                                        label: `Price ( Past ${days} Days ) in ${currency}`,
                                        borderColor: "#FAA64B",
                                        fill: false,
                                    },
                                ]
                            }}
                            options={{
                                elements: {
                                    point: {
                                        radius: 1,
                                    },
                                },
                            }}
                        />

                        <div style={{
                            display: "flex",
                            marginTop: 20,
                            justifyContent: "space-around",
                            width: "100%",
                        }} className='days_buttons'>
                            {chartDays.map((day) => (
                                <button key={day.value} style={{ backgroundColor: `${day.value === days ? '#FAA64B' : ''}`, color: `${day.value === days ? '#000' : ''}` }} onClick={() => {
                                    setDays(day.value);
                                    setFlag(day.value === days ? true : false);
                                }}

                                >
                                    {day.label}
                                </button>
                            ))}
                        </div>
                    </>
                }

            </div>
        </>
    )
}
