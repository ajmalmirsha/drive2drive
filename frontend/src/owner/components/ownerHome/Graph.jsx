
import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import { ownerApi } from '../../../utils/Apis';


export default function Graph () {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const [ revenue, setRevenue ] = useState([])
    useEffect(()=> {
        ownerApi.get('/get/owner/sales').then(({data:{revenue}}) => {
            setRevenue(revenue)
        })
    },[])


    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        const data = {
            labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            datasets: [
                {
                    label: 'Dataset 1',
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--green-500'),
                    yAxisID: 'y',
                    tension: 0.4,
                    data: revenue
                }
            ]
        };
        const options = {
            stacked: false,
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        drawOnChartArea: false,
                        color: surfaceBorder
                    }
                }
            }
        };

        setChartData(data);
        setChartOptions(options);
    }, [revenue]);

    return (
        <div className="col-md-9">
        <div className="card">
            <Chart type="line" data={chartData} options={chartOptions} />
        </div>
        </div>
    )
}