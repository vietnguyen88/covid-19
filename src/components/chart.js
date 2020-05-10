import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2';

const Chart = () => {

    const [dailyData, setdailyData] = useState([

    ])

    const fetchDailySummary = () => {
        fetch('https://covid19.mathdro.id/api/daily')
            .then(res => res.json())
            .then(output => {
                let collection = []
                output.map((item) => {
                    return collection = [...collection, item]
                })
                setdailyData(collection)
            })
    }

    useEffect(() => {
        fetchDailySummary()
    }, [setdailyData])

    return (
        <div className='daily'>
            <h2>Daily Summary</h2>
            <Line
                data={{
                    labels: dailyData.map((item) => item.reportDate),
                    datasets: [{
                        label: 'Infected',
                        data: dailyData.map((item) => item.totalConfirmed),
                        fill: true,
                        lineTension: 0.1,
                        backgroundColor: 'rgba(0, 128, 0,0.4)',
                        borderColor: 'rgba(0, 128, 0,1)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(0, 128, 0,1)',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(0, 128, 0,1)',
                        pointHoverBorderColor: 'rgba(0, 128, 0,1)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                    }, {
                        label: 'Deaths',
                        data: dailyData.map((item) => item.deaths.total),
                        fill: true,
                        lineTension: 0.1,
                        backgroundColor: 'rgba(255, 0, 0,0.4)',
                        borderColor: 'rgba(255, 0, 0,1)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(255, 0, 0,1)',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(255, 0, 0,1)',
                        pointHoverBorderColor: 'rgba(255, 0, 0,1)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                    }]
                }}
                width={500}
                height={300}
                options={{ maintainAspectRatio: true }}
            />
        </div>
    )
}

export default Chart
