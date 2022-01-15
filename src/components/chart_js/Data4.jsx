import React from 'react'
import { Line } from 'react-chartjs-2'

const Data4 = (props) => {
    
    return (
            <div>
            <Line 
            data={{
                labels: props.labels,
                datasets: [{
                    data: props.data,
                    tension:0.3,
                    fill:true,
                    pointRadius:6,
                    yAxisID:'beginAtZeo',
                    backgroundColor: [
                        'rgba(75, 182, 192, 0.5)'
                    ],
                    borderColor: [
                         'rgba(75, 182, 192, 0.5)'
                    ],
                    borderWidth: 1
                }],
            }}
            options= {{
                responsive:true,
                plugins:{
                    legend:{
                        labels:{
                            font:{
                                size:25,
                            }
                        },
                        display:false,
                        position:'left'
                    }
                },
                scales:{
                    yAxes:[{
                        ticks:{
                            beginAtZero:false
                        }
                    }]
                }
            }}
            />
        </div>
    )
}
export default Data4
