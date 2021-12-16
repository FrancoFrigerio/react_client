import { getRoles } from '@testing-library/dom';
import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'


const Cliente = (props) => {
    const navigate = useNavigate();
    const [roles, setRoles] = useState('')
    
    const verDetalle =()=>{
       props.setclient(props.client)
        navigate(`/cliente/${props.client.id}`)
    }

    useEffect(() => {
       setRoles(props.listRoles)
        
    }, [props.listRoles])
    
    
    return (
         <div className="d-flex flex-column justify-content-evenly">
             <div className="mr-3">
                <h5>{props.client.name} {props.client.surname}</h5>
                <h6>{props.client.email}</h6>
                <p>{props.client.dress}</p>
             </div>
             {
                 roles!==undefined?(
                    <div className="d-flex flex-row w-100 justify-content-evenly">
                    <div className={roles.includes('ROLE_ADMIN')?('d-flex'):('d-none')}>
                        <button className="btn btn-outline-dark btn-sm mx-2"><i className='bx bxs-pencil' ></i></button>
                    </div>
                    <div>
                        <button className="btn btn-outline-secondary btn-sm mx-2" onClick={verDetalle}><i className='bx bx-detail'></i></button>
                    </div>
                    
                    <div className={roles.includes('ROLE_ADMIN')?('d-flex'):('d-none')}>
                        <button className="btn btn-outline-danger btn-sm mx-2"><i className='bx bxs-trash-alt' ></i></button>
                    </div>
                 </div>
                 ):(<p>los roles no fueron cargados</p>)
             }

         </div>
       
    )
}

export default Cliente
