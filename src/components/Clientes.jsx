import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Cliente from './Cliente'

const Clientes = (props) => {
    
    const [clients, setClients] = useState([])
    const [listRoles, setlistRoles] = useState([])
    const fetchClients =async()=>{
        try{
            await axios({
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
    const fetchRoles =()=>{
        setlistRoles(localStorage.getItem('roles'))
    }
    
    useEffect(() => {
        fetchClients()
        fetchRoles();
       
    }, [])
    
    return (
        <div>
            <div className="shadow p-3 mx-3 rounded" id='contClientes'>
                <div className='pb-2'>
                    <h3 className="text-start">Listado de clientes</h3>
                </div>
            </div>
            <div className="contTargets m-auto p-4">
              {
                clients !== null?(
                    clients.map((client)=>
                        <div className="target rounded" key={client.id}>
                            <Cliente client={client} setclient={props.setclient} listRoles={listRoles}></Cliente>
                        </div>)
                ):(console.log('vacio'))
               }
            </div>
        </div>
    )
}

export default Clientes
