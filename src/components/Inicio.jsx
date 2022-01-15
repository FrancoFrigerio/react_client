import React, { useEffect, useState } from 'react'
import axios from 'axios'
import DoughnutData2 from './chart_js/DoughnutData2'
import Data4 from './chart_js/Data4'
import DataBar from './chart_js/DataBar'


const Inicio = () => {
        const url= 'http://localhost:8080'
        const [data1, setData1] = useState([]) //dougnout - con mas gastos
        const [labels1, setLabels1] = useState([])//dougnout - etiquetas
        
        const [data2, setData2] = useState([]) //dougnout  - con mas facturas
        const [labels2, setLabels2] = useState([])//dougnout -etiquetas
       
        const [score, setScore] = useState([]) // gatos por mes
        const [labels, setLabels] = useState([])//meses
        
        const [score2, setScore2] = useState([])
        const [labelsProducts, setLabelsProducts] = useState([])

    

    
    
    const fetchClientMetrics = async()=>{
        try{
            await axios({
                method:'GET',
                url:url+'/client/clientsMetrics',
                headers:{
                    'Authorization':'Bearer ' + localStorage.getItem('token')
                }
            }).then(res => {
                res.data.more_expenses.map(element => {
                    setData1((prevData1) =>[...prevData1,element.total])
                    setLabels1((prevLabels1)=>[...prevLabels1,element.name +' '+element.surname])
                })
                res.data.more_bills.map(element=>{
                   setData2((prevData2)=>[...prevData2,element.total])
                   setLabels2((prevLabels2) =>[...prevLabels2,element.name + ' ' + element.surname])
                })
            })
        }catch(error){
            console.log(error)
        }
    }

    const fetchMetricsWithDate =async()=>{
        try{
            await axios({
                url:url+'/client/dateMetrics',
                method:'GET',
                headers:{
                    'Authorization':'Bearer ' + localStorage.getItem('token')
                }
            }).then(res=>{
                res.data.data.map(e=>{
                  setScore((prevScore) =>[...prevScore, e.total])
                  setLabels((prevLabels)=>[...prevLabels,e.month+'/'+e.year])
                })
            })
        }catch(error){
            console.log(error)
        }
    }

    const fetchProductsMectrics =async()=>{
        try{
            await axios({
                url:url+'/product/productsMetrics',
                method:'GET',
                headers:{
                    'Authorization':'Bearer ' + localStorage.getItem('token')
                }
            }).then(res =>{
                res.data.map(e=>{
                    setScore2((prevScore2)=>[...prevScore2, e.countProduct])
                    setLabelsProducts((prevLabesProducts)=>[...prevLabesProducts,e.nameProduct])
                })
            })
        }catch(error){
            console.log(error)
        }
    }


    useEffect(() => {
        fetchClientMetrics();
        fetchMetricsWithDate();
        fetchProductsMectrics();
    }, [])


    return (
        <div className="">
            
        <h2 className="text-center">Metricas de ventas</h2>
           
            <div className='col-11 m-auto p-3 shadow rounded'>
                <div className='d-flex justify-content-between'>
                    <h5>Mas gastaron</h5>
                    <h5>Mas veces compraron</h5>
                </div>
                <div className='p-3'>
                    <div className='d-flex justify-content-between'>
                            <DoughnutData2 data={data1} labels={labels1}/>
                            <DoughnutData2 data={data2} labels={labels2}/>
                    </div>
                </div>
            </div>
            
            
            <div className='col-10 m-auto my-5 pb-5'>
                        <Data4 data={score}labels={labels} />
            </div>
            <div className='col-10 m-auto my-5 pb-5'>
                        <DataBar data={score2}labels={labelsProducts} />
            </div>
        </div>
    )
}

export default Inicio
