import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Producto from './Producto'

const Productos = () => {
    const [products, setProducts] = useState(null)
    const url= 'http://localhost:8080/product/'
    const fetchPorudcts=async()=>{
        try{
            await axios({
                method:'GET',
                url:url,
                headers:{
                    'Authorization':'Bearer '+localStorage.getItem('token')
                }
            }).then(res =>{
                setProducts(res.data)
            }).catch(error=>{
                console.log(error)
            })
        }catch(error){
            console.log(error)
        }
    } 

    useEffect(() => {
        fetchPorudcts();
    }, [])
    
    
    return (
        <div>
             <div className="shadow p-3 mx-3 rounded" id='contProductos'>
                <div className="pb-2">
                    <h3 className="text-start">Listado de productos</h3>
                </div>
            </div>
            <div className='mt-5 d-flex justify-content-center'>
                {
                    products !== null?(
                        <div className='d-flex justify-content-center flex-wrap'>
                            {products.map(e =>
                                <div key={e.id} className='border m-2 col-4 p-2'>
                                    <Producto product={e}></Producto>
                                </div>    
                            )}
                        </div>
                    ):(null)
                }
            </div>
        </div>
    )
}

export default Productos
