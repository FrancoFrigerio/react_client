import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Cliente from './Cliente'

const Clientes = (props) => {
    
    const [clients, setClients] = useState([])
    
    const fetchClients =async()=>{
        try{
            const resp = await axios({
                method:'GET',
                url:'http://localhost:8080/client/',
                headers:{
                    'Authorization':'Bearer '+localStorage.getItem('token')
                }
            }).then(res =>setClients(res.data))
            .catch(error=>console.log(error))
        }catch(error){
            console.log(error)
        }
    }
    
    useEffect(() => {
        fetchClients()
        
    }, [])
    
    return (
        <div>
            <div className="shadow p-3 mx-3" id='contClientes'>
                <h4 className="text-start">Listado de clientes</h4>
            </div>
            <div className="contTargets m-auto p-4">
              {
                clients !== null?(
                    clients.map((client)=>
                        <div className="target rounded" key={client.id}>
                            <Cliente client={client} setclient={props.setclient}></Cliente>
                        </div>)
                ):(console.log('vacio'))
               }
            </div>
        </div>
    )
}

export default Clientes
