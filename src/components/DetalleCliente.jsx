import axios from 'axios'
import React, { useEffect, useState } from 'react'
// import moment from 'moment';
import { useParams } from 'react-router';
import ProductModal from './ProductModal';
import TableProducts from './TableProducts';


const  DetalleCliente = (props) => {
    const [clientCompleto, setClientCompleto] = useState(null)
    const [listadoFacturas, setListadoFacturas] = useState([])
    const [saldo, setSaldo] = useState(0)
    const [form, setForm] = useState(false)
    const [factura, setFactura] = useState({created_At:'',description:'',total:0})
    const [product, setProduct] = useState('')  //producto par buscar
    const [productsFromApi, setProductsFromApi] = useState(null)
   
    const [itemsFactura, setItemsFactura] = useState([]) //items de la factura que van al back
    const [itemFactura, setItemFactura] = useState({productID:0,productCount:0}) //cada item agregado
    
    const [listProducts, setListProducts] = useState([]) //listado de productos agregados que se muestra en el front
   


    const [viewProduct, setViewProduct] = useState(null)
    const {id} = useParams();

    const getFacturas = async()=>{
        try{
             await axios({
                method:'GET',
                url:`http://localhost:8080/client/${id}`,
                headers:{
                    'Authorization':'Bearer '+ localStorage.getItem('token')
                }
            }).then(res=>{
                setClientCompleto(res.data)
                setListadoFacturas(res.data.bills)
                setSaldo(res.data.saldo)
                localStorage.setItem('client',JSON.stringify(res.data))
                })
            .catch(error=> console.log(error))
        }catch(error){
            console.log(error)
        }
    }
    
    const sendFactura= async(e)=>{
     e.preventDefault();    
     try{
        await axios({
            method:'POST',
            url:`http://localhost:8080/bill/save/${props.client.id}`,
            headers:{
                'Authorization':'Bearer '+ localStorage.getItem('token')
            },
            data:{
                created_At: factura.created_At,
                description:factura.description,
                total:factura.total
            }
        }).then(res =>{
            setListadoFacturas([...listadoFacturas,factura])
            setForm(false)
            setSaldo(saldo+factura.total)
            console.log('el saldo ')
        }).catch(error=>console.log(error))
     }catch(error){
        console.log(error)
     }
      console.log("enviando la factura")
    }

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

    const reset =()=>{
        setFactura({created_At:'',description:'',total:0})
        setForm(false);
        setProductsFromApi([])
        setProduct('')
        setItemFactura({productID:0,productCount:0})
        setItemsFactura([])
    }
    const addItem=()=>{
        if(itemFactura.productID != 0){
            setItemsFactura([...itemsFactura,itemFactura])
        }

    }
    const calculateSaldo=()=>{
        listProducts.map(e => setSaldo(saldo + e.price))
    }
    const addProduct =(e)=>{
        if(itemsFactura.filter(element => element.productID === e.id).length == 0 ){
           setItemFactura({
            productID:e.id,
            productCount:5
           })
           setListProducts([...listProducts,e])
           
        }
    }

    const searchProduct=(e)=>{
         if(product.length > 3 ){
             fetchProduct();
         }
    }
    
    useEffect(() => {
        addItem();
        calculateSaldo();
    }, [itemFactura])

    useEffect(() => {
        getFacturas();
    }, [])

    useEffect(() => {
        searchProduct();
    
    }, [product])
    
    return (
       <div>
           <div className={form?('d-flex contForm'):('d-none')}>
               <div>
                  {
                      viewProduct !=null?(
                           <ProductModal viewProduct={viewProduct} setViewProduct={setViewProduct}/>
                      ):(null)
                  }
                   <div>
                   </div>
               </div>
                <form className="form p-2 rounded" onSubmit={sendFactura}>
                    <h4 className="text-center mt-2">Carga de Factura: {form?(<span>{clientCompleto.name} {clientCompleto.surname}</span>):(null)}</h4>
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
                                                <div key={e.id} className='m-1 d-flex justify-content-between  border border-bottom p-1 rounded' key={e.id}>
                                                    <div>
                                                       <button type='button' className='btn btn-outline-info btn-sm mx-1' onClick={()=>setViewProduct(e)}>
                                                       <span className='text-uppercase'> {e.name} </span>
                                                            <i className='bx bx-expand-alt'></i>
                                                       </button>
                                                       <button type='button' onClick={()=>addProduct(e)} className='btn btn-outline-success btn-sm mx-1'>
                                                            <i className='bx bx-message-square-add'></i>
                                                       </button>
                                                    </div>
                                                    {/* <span className='text-uppercase'>$ {e.price}</span> */}
                                                    {/* <button className='btn btn-sm'  type='button'>
                                                        <span>Agregar</span>
                                                    </button> */}
                                                </div>)
                                             }
                                        </div>
                                    ):(null)
                                }
                        <div>
                            {
                                listProducts.length !== 0 ?(
                                    <TableProducts listProducts={listProducts} itemsFactura={itemsFactura}/>
                                ):(null)
                            }
                        </div>

                        <h6 className="mt-4">Total: </h6>
                        <div className="input-group">
                        <span className="input-group-text">$</span>
                                <input type="number" className="form-control" name="total" onChange={inputChange} value={factura.total}/>
                            <span className="input-group-text">.00</span>
                        </div>
                    </div>
                   <div className="d-flex justify-content-end p-2">
                        <button className="btn btn-outline-primary mx-1" type="submit">Agregar</button>
                        <button onClick={()=>reset()} className="btn btn-outline-danger mx-2" type="button">Cerrar</button>
                    </div> 
                </form>
           </div>
            {
                clientCompleto != null?(
                <div>
                    <div className="shadow p-3 mb-5 rounded mx-3" id="contCliente">
                        <div className="px-3 d-flex flex-row justify-content-between">
                            <div>
                                <h4>{clientCompleto.name} {clientCompleto.surname}</h4>
                                <h6>{clientCompleto.email}</h6>
                            </div>
                            <div>
                                <div>
                                    <i className="bx bxl-whatsapp fs-4 text-success"></i>
                                    <span className="fs-4 text-muted"> {clientCompleto.phone}</span>
                                </div>
                                <div>
                                    <i className="bx bxs-map fs-4 text-primary"></i>
                                    <span className="fs-4 text-muted"> {clientCompleto.dress}</span>
                                </div>
                            </div>
                            <div>
                            <div>
                                <i className='bx bx-money fs-4 text-danger'></i>
                                <span className="fs-4 text-muted">$ {saldo},00</span>
                            </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-5 px-4">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th className="scop">#</th>
                                    <th className="scop">Fecha</th>
                                    <th className="scop">Descripcion</th>
                                    <th className="scop">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                    {
                                        listadoFacturas.map((item,index) =>
                                        <tr key={index}>
                                            <th scope="row" className="text-muted">{index + 1}</th>
                                            <th className="fst-italic fw-normal">{item.created_At}</th>
                                            <th>{item.description}</th>
                                            <th>$ {item.total},00</th>
                                        </tr>)
                                    }
                            </tbody>

                        </table>
                        
                        
                    </div>
                </div>
                
                ):(<p>...cargando</p>)
            }
            <div className="p-3">
                <button onClick={()=>setForm(true)} className="btn btn-outline-success">Agregar Factura</button>
            </div>
        </div>
    )
}

export default DetalleCliente
