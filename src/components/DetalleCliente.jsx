import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import AddFacturaComponent from './AddFacturaComponent';



const  DetalleCliente = (props) => {
    const [clientCompleto, setClientCompleto] = useState(null)
    const [listadoFacturas, setListadoFacturas] = useState([])
    const [saldo, setSaldo] = useState(0)
    const [form, setForm] = useState(false)

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
    
    
    
   

    useEffect(() => {
        getFacturas();
    }, [])
    
    return (
       <div>
            {
                form?(<AddFacturaComponent
                    clientCompleto={clientCompleto}
                    setForm={setForm}
                    setListadoFacturas={setListadoFacturas}
                    listadoFacturas={listadoFacturas}
                    saldo={saldo}
                    setSaldo={setSaldo}
                />):(null)
            }
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
