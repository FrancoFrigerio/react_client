import React from 'react'
import {Doughnut} from 'react-chartjs-2'
 import { ArcElement} from 'chart.js'

import { Chart as ChartJS,
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        BarElement,
        Title,
        Tooltip,
        Legend,
        Filler} from 'chart.js'
ChartJS.register(ArcElement,
        CategoryScale, 
        LinearScale,
        PointElement,
        LineElement,
        BarElement,
        Title,
        Tooltip,
        Legend,
        Filler)

const DoughnutData2 = (props) => {
    
    return (
            <div className='col-5'>
            <Doughnut 
            data={{
                labels: props.labels,
                datasets: [{
                    label: '# of Votes',
                    data: props.data,
                    tension:0.3,
                    fill:true,
                    pointRadius:6,
                    backgroundColor: [
                         'rgb(53, 133, 139, 0.75)',
                         'rgba(54, 162, 235, 0.5)',
                         'rgb(255, 208, 130, 0.45)',
                        
                    ],
                    borderColor: [
                        ' rgb(174, 254, 255)',
                         'rgba(30, 140, 235)',
                         'rgb(255, 190, 135)',
                        
                    ],
                    borderWidth: 1.2
                }]
            }}
            height={380}
            width={600}
            options= {{
                responsive:true,
                plugins:{
                    legend:{
                        labels:{
                            font:{
                                display:true,
                                size:14,
                            }
                        },
                        display:true,
                        position:'left'
                    }
                }
            }}
            />
        </div>
    )
}

export default DoughnutData2
