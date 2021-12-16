import axios from 'axios'
import React, { useEffect, useState } from 'react'
// import moment from 'moment';
import { useParams } from 'react-router';


const  DetalleCliente = (props) => {
    const [clientCompleto, setClientCompleto] = useState(null)
    const [listadoFacturas, setListadoFacturas] = useState([])
    const [saldo, setSaldo] = useState(0)
    const [form, setForm] = useState(false)
    const [factura, setFactura] = useState({created_At:'',description:'',total:0})
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
        console.log(e.target.name)
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
    
    useEffect(() => {
        getFacturas();
    }, [])
    
    return (
       <div>
           <div className={form?('d-flex'):('d-none')} id="contForm">
                <form className="form p-2 rounded" onSubmit={sendFactura}>
                    <h4 className="text-center mt-2">Carga de Factura: {form?(<span>{clientCompleto.name} {clientCompleto.surname}</span>):(null)}</h4>
                    <div className="p-3">
                        <h6 className="mt-2">Fecha</h6>
                                <input type="date" className="form-control" name="created_At" onChange={inputChange}></input>
                        <h6 className="mt-4">Descripcion</h6>
                                <textarea type="text-area" className="form-control" name="description" onChange={inputChange}></textarea>
                        <h6 className="mt-4">Total</h6>
                        <div className="input-group">
                        <span className="input-group-text">$</span>
                                <input type="number" className="form-control" name="total" onChange={inputChange}/>
                            <span className="input-group-text">.00</span>
                        </div>
                    </div>
                   <div className="d-flex justify-content-end p-2">
                        <button className="btn btn-outline-primary mx-1" type="submit">Agregar</button>
                        <button onClick={()=>setForm(false)} className="btn btn-outline-dark mx-2" type="button">cerrar</button>
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
