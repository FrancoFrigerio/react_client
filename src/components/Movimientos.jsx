import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DetalleFiltrado from './DetalleFiltrado'
import FacturaComponent from './FacturaComponent'

const Movimientos = () => {
   
    const [movimientos, setMovimientos] = useState(null)
   
    const [nextLink, setNextLink] = useState(null)
    const [previousLink, setpreviousLink] = useState(null)
    const url='http://localhost:8080/bill/'
    const [numberpage, setNumberpage] = useState(0)
    const [lastPage, setLastPage] = useState(null)
    const [totalElements, setTotalElements] = useState(null)
   
    
    const [sizePage, setsizePage] = useState(5);
    const [page, setPage] = useState(0)
    const [sort, setSort] = useState('cliente.name')
    const [order, setOrder] = useState('asc')
    const [desde, setDesde] = useState('2021-09-02')
    const [hasta, setHasta] = useState('2021-12-31')

    const [factura, setFactura] = useState(null)
    
    const fetchMovimientos =async()=>{
        try{
            await axios({
                method:'POST',
                url:url.concat('dto'),
                headers:{
                    'Authorization':'Bearer '+ localStorage.getItem('token'),
                },
               data:{
                   sizePage:sizePage,
                   page:page,
                   sort:sort,
                   order:order,
                   desde:desde,
                   hasta:hasta
               }
                
            }).then(res =>{
                setMovimientos(res.data.content)
                setNextLink(res.data.utils.next_page)
                setpreviousLink(res.data.utils.previous)
                setLastPage(res.data.utils.last_page)
                setTotalElements(res.data.utils.total_elements)
            }).catch(error=>console.log(error))    
           }catch(error){
               console.log(error)
           }
    }

    const fetchNext =async()=>{
       try{
            await axios({
                method:'POST',
                url:url.concat('dto'),
                headers:{
                    'Authorization':'Bearer '+localStorage.getItem('token')
                },
                data:{
                    sizePage:sizePage,
                    page:page+1,
                    sort:sort,
                    order:order,
                    desde:desde,
                    hasta:hasta
                }
            }).then(res =>{
                setMovimientos(res.data.content)
                setPage(page+1)
                setNextLink(res.data.utils.next_page)
                setNumberpage(page+1)
                setpreviousLink(res.data.utils.previous)
            }).catch(error=>{console.log(error)})
        }catch(error){
            console.log(error)
        }
    }
    const fetchPrevious =async()=>{
        try{
            await axios({
                method:'POST',
                url:url.concat('dto'),
                headers:{
                    'Authorization':'Bearer '+localStorage.getItem('token')
                },
                data:{
                    sizePage:sizePage,
                    page:page-1,
                    sort:sort,
                    order:order,
                    desde:desde,
                    hasta:hasta   
                }
            }).then(res =>{
                setPage(page-1)
                setMovimientos(res.data.content)
                setpreviousLink(res.data.utils.previous)
                setNumberpage(numberpage-1)
                setNextLink(res.data.utils.next_page)
            }).catch(error=>{console.log(error)})
        }catch(error){
            console.log(error)
        }
    }
    const fetchFactura=async(id)=>{
        try{
            await axios({
                method:'GET',
                url:url.concat(id),
                headers:{
                    'Authorization':'Bearer ' + localStorage.getItem('token')
                }
            }).then(res =>{
                console.log(res.data)
                setFactura(res.data)
            })
        }catch(error){
            console.log(error)
        } 
        
    } 

    
    const inputChange =(e)=>{
        if(e.target.name === 'desde'){
           setDesde(e.target.value)
        }else{
            setHasta(e.target.value)
        }
    }
    useEffect(() => {
        fetchMovimientos();
        
    }, [sort,desde,hasta])

    
    
   
    return (
        <div>
            {
                factura !== null?(
                    <FacturaComponent factura={factura} setFactura={setFactura}/>
                ):(null)
            }
            
            <DetalleFiltrado
                inputChange={inputChange}
                sort={sort}
                setSort={setSort}
                order={order}
                setOrder={setOrder}
            />
            {
                movimientos !=null?(
                    <div>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th className="scop">#</th>
                                    <th className="scop">Fecha</th>
                                    <th className="scop">Cliente</th>
                                    <th className="scop">Factura</th>
                                    <th className="scop">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    movimientos.map(e=>
                                        <tr key={e.id}>
                                            <th scope="row" className="text-muted">{e.id}</th>
                                            <th scope="row" className="text-muted">{e.created_At}</th>
                                            <th className="text-success">
                                                <Link  to={`/cliente/${e.client.id}`} scope="row" className="text-muted link">
                                                    <span className="link">{e.client.name} {e.client.surname}</span>
                                                    <span> <i className='bx bxs-right-top-arrow-circle'></i></span>
                                                </Link>
                                            </th>
                                         
                                            <th scope="row" className="text-muted">
                                                <button className='btn' onClick={()=>fetchFactura(e.id)}>
                                                    <span className='text-secondary fw-bolder'>{e.description}</span>
                                                    <i className='bx bx-expand'></i>
                                                </button>
                                            </th>
                                            <th scope="row" className="text-muted">$ {e.total},00</th>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                        <div className='d-flex justify-content-evenly px-1'>
                            <button onClick={fetchPrevious} className={previousLink!= null?('btn btn-outline-warning'):('btn btn-outline-secondary disabled')}> ver anteriores</button>
                            <div className="">
                                <span className="text-primary mx-2">Pagina N° {numberpage} de {lastPage} </span>
                                <span className="text-secondary fst-italic mx-2"> Total de elementos: {totalElements}</span>
                            </div>
                            <button onClick={fetchNext} className={nextLink != null?('btn btn-outline-warning'):('btn btn-outline-secondary disabled')}> ver siguientes</button>
                        </div>
                    </div>
                ):(
                    <p className="text-center">...cargando</p>
                )
            }
        </div>
    )
}
export default Movimientos
