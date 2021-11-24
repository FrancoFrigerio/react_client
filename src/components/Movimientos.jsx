import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Movimientos = () => {
   
    const [movimientos, setMovimientos] = useState(null)
    const [nextLink, setNextLink] = useState(null)
    const [previousLink, setpreviousLink] = useState(null)
    const url='http://localhost:8080/bill/dto'
    const [numberpage, setNumberpage] = useState(0)
    const [lastPage, setLastPage] = useState(null)
    const [totalElements, setTotalElements] = useState(null)
    const [body, setBody] = useState({
        sizePage:5,
        page:0,
        sort:'created_At',
        order:'asc'
    })

    
    const fetchMovimientos =async()=>{
       
        try{
            await axios({
                method:'POST',
                url:url,
                headers:{
                    'Authorization':'Bearer '+ localStorage.getItem('token'),
                },
               data:body
                
            }).then(res =>{
                console.log(res.data)
                setMovimientos(res.data.content)
                setNextLink(res.data.utils.next)
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
                url:url,
                headers:{
                    'Authorization':'Bearer '+localStorage.getItem('token')
                },
                data:{
                    sizePage:5,
                    page:nextLink,
                    sort:'created_At',
                    order:'asc'
                }
            }).then(res =>{
                setMovimientos(res.data.content)
                setNextLink(res.data.utils.next)
                setNumberpage(numberpage+1)
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
                url:url,
                headers:{
                    'Authorization':'Bearer '+localStorage.getItem('token')
                },
                data:{
                    sizePage:5,
                    page:previousLink,
                    sort:'created_At',
                    order:'asc'
                }
            }).then(res =>{
                setMovimientos(res.data.content)
                setpreviousLink(res.data.utils.previous)
                setNumberpage(numberpage-1)
                setNextLink(res.data.utils.next)
            }).catch(error=>{console.log(error)})
        }catch(error){
            console.log(error)
        }
    }


    useEffect(() => {
        fetchMovimientos();
        
    }, [])
   
    return (
        <div>
            <div className="shadow p-3 mx-3" id='contMovimientos'>
            <h4 className="text-start">Listado de movimientos</h4>
            </div>
            {
                movimientos !=null?(
                    <div>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th className="scop">#</th>
                                    <th className="scop">Fecha</th>
                                    <th className="scop">Cliente</th>
                                    <th className="scop">Descripcion</th>
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
                                            <th scope="row" className="text-muted">{e.description}</th>
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
