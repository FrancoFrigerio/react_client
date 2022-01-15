import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ProductModal from './ProductModal'


const AddFacturaComponent = (props) => {
    const [viewProduct, setViewProduct] = useState(null)
    const [factura, setFactura] = useState({created_At:'',description:'',total:0})
    const [product, setProduct] = useState('')
    const [saldo, setSaldo] = useState(0)
    const [cantidad, setCantidad] = useState(1)
    const [productsFromApi, setProductsFromApi] = useState(null)
    const [listProducts, setListProducts] = useState([]) 
    const [itemsFactura, setItemsFactura] = useState([])
    const [itemFactura, setItemFactura] = useState({productID:0,productCount:0}) 
    
   
    const inputChange =(e)=>{
        if(e.target.name === 'total'){
            setFactura({
                ...factura, [e.target.name]:parseInt(e.target.value)
            })
        }else{
            setFactura({
                ...factura,[e.target.name]:e.target.value
            })
        }
    }

    const fetchProduct=async()=>{
        try{
            await axios({
                method:'GET',
                url:'http://localhost:8080/product/like/'+product,
                headers:{
                    'Authorization':'Bearer ' + localStorage.getItem('token')
                }
            }).then(res => setProductsFromApi(res.data))
        }catch(error){
            console.log(error)
        }
    }

    const searchProduct=(e)=>{
        if(product.length > 3 ){
            fetchProduct();
        }
   }

   const reset =()=>{
    props.setForm(false);
     setFactura({created_At:'',description:'',total:0})
     setProductsFromApi([])
     setProduct('')
     setItemFactura({productID:0,productCount:0})
     setItemsFactura([])
    }

    const addItem =()=>{
        if(itemFactura.productID != 0){
            setItemsFactura([...itemsFactura,itemFactura])
        }
    }

    const addProduct =(e)=>{
        if(itemsFactura.filter(elemento => elemento.productID === e.id).length == 0 ){
            setItemFactura({
            productID:e.id,
            productCount:parseInt(cantidad)
        })
         e.quantity = parseInt(cantidad)
         setSaldo(saldo + Math.round(e.price * cantidad * 100)/100)
         setListProducts([...listProducts,e])
         
         setProductsFromApi([])
         setProduct('')
         setCantidad(1)
        }else{
            console.log('no entra en el if')
            alert('El producto seleccionado ya se encuentra agregado')
        }
    }

    const sendFactura= async(e)=>{
        e.preventDefault();    
        
        try{
           await axios({
               method:'POST',
               url:`http://localhost:8080/bill/save/${props.clientCompleto.id}`,
               headers:{
                   'Authorization':'Bearer '+ localStorage.getItem('token')
               },
               data:{
                   created_At: factura.created_At,
                   description:factura.description,
                   total:factura.total,
                   itemsProducts:itemsFactura
               }
           }).then(res =>{
               props.setListadoFacturas([...props.listadoFacturas,factura])
               props.setForm(false)
               props.setSaldo(props.saldo+factura.total)
           }).catch(error=>console.log(error))
        }catch(error){
           console.log(error)
        }
         console.log("enviando la factura")
    }


    const deleteMov =(object)=>{
        setListProducts(listProducts.filter(e => e.id !== object.id))
        alert('se eliminara el producto ' + object.name)
        setItemsFactura(itemsFactura.filter(e => e.productID !== object.id))
        setSaldo(saldo - object.price * object.quantity)
    }


    useEffect(() => {
        addItem();
    }, [itemFactura])
    
    useEffect(() => {
        setFactura({...factura , total:saldo})
    }, [listProducts])

    useEffect(() => {
        searchProduct();
    }, [product])


    return (
        <div>
                {
                    viewProduct !=null?(
                    <div id='cont_targetProduct'>
                        <ProductModal viewProduct={viewProduct} setViewProduct={setViewProduct}/>
                    </div>
                    ):(null)
                }
            <div className='contForm pt-5'>
                <form className="form p-2 rounded" onSubmit={sendFactura}>
                        <h4 className="text-center mt-2">Carga de Factura: {<span>{props.clientCompleto.name} {props.clientCompleto.surname}</span>}</h4>
                        <div className="p-3">
                            <h6 className="mt-2">Fecha</h6>
                                    <input type="date" className="form-control" name="created_At" onChange={inputChange}></input>
                            <h6 className="mt-4">Descripcion: </h6>
                                    <textarea type="text-area" className="form-control" name="description" onChange={inputChange} value={factura.description}></textarea>
                            <h6 className="mt-4">Productos: </h6>
                                    <input className='form-control' onChange={(e)=> setProduct(e.target.value)} value={product}></input>
                                    {
                                        productsFromApi !== null ?(
                                            <div className='mt-2'>{
                                                    productsFromApi.map(e=>
                                                    <div key={e.id} className='m-2 d-flex justify-content-between  border border-bottom p-1 rounded'>
                                                        <div className='input-group'>
                                                        <button type='button' className='btn btn-outline-info btn-sm mx-1' onClick={()=>setViewProduct(e)}>
                                                        <span className='text-uppercase'> {e.name}</span>
                                                        <span className='text-uppercase fw-bolder'> $ {e.price} </span>
                                                                <i className='bx bx-expand-alt'></i>
                                                        </button>
                                                        <div className='col-2'>
                                                            <input type='number' className='form-control' onChange={(e)=>setCantidad(e.target.value)} placeholder='cantidad'></input>
                                                        </div>
                                                        <div className='mt-1'>
                                                            <button type='button' onClick={()=>addProduct(e)} className='btn btn-outline-success btn-sm mx-1'>
                                                                    <i className='bx bx-message-square-add'></i>
                                                            </button>
                                                        </div>

                                                        
                                                        </div>
                                                    </div>)
                                                }
                                                        <div className={productsFromApi.length != 0 ?('d-flex justify-content-end'):('d-none')}>
                                                            <button type='button' className='btn btn-sm' onClick={()=>setProductsFromApi([])}>
                                                                    <i class='bx bxs-x-circle fw-bolder fs-4'></i>
                                                            </button>
                                                        </div>
                                            </div>
                                        ):(null)
                                    }
                            <div>
                                {
                                    listProducts.length !== 0 & itemsFactura.length !== 0?(
                                        <table className='table'>
                                            <thead>
                                                <tr className='bg-secondary'>
                                                    <th scope='col'>Id Producto</th>
                                                    <th scope='col'>Nombre Producto</th>
                                                    <th scope='col'>Cantidad</th>
                                                    <th scope='col'>Precio</th>
                                                    <th scope='col'>Sub-total</th>
                                                    <th scope='col'>
                                                        <div className='d-flex justify-content-center'>
                                                            <span>Acciones</span>
                                                        </div>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                listProducts.map((e,index)=>
                                                <tr key={e.id}>
                                                        
                                                    <td >{e.id}</td>
                                                    <td >{e.name}</td>
                                                    <td  className='pl-3'>
                                                    {itemsFactura[index] !== undefined?(itemsFactura[index].productCount):(1)}
                                                    </td>
                                                    <td className='fw-bolder '>$ {e.price}</td>
                                                    <td className='fw-bolder '>$ {
                                                        itemsFactura[index] !== undefined?(
                                                            Math.round(itemsFactura[index].productCount * e.price * 100)/100
                                                            ):(1)
                                                        }</td>
                                                    <td className=''>
                                                       <div className='d-flex justify-content-center'>
                                                        <button className='btn btn-danger btn-sm mr-2' onClick={()=>deleteMov(e)}> X </button>
                                                       </div>
                                                        
                                                    </td>
                                                </tr>
                                                )
                                            }
                                            </tbody>
                                        </table>
                                    ):(null)
                                }
                                
                            </div>
                            <div className="d-flex justify-content-end pt-5">
                                <h5 className='m-3'>Total: $<span className='fw-bolder'>{Math.round(saldo * 100)/100}</span></h5>
                            </div>
                        </div>
                    <div className="d-flex justify-content-end p-2">
                            <button className="btn btn-outline-primary mx-1" type="submit">Agregar</button>
                            <button onClick={()=>reset()} className="btn btn-outline-danger mx-2" type="button">Cerrar</button>
                        </div> 
                    </form>
                    
               </div>
        </div>
    )
}

export default AddFacturaComponent
