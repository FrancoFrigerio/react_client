import React from 'react'
import {useNavigate} from 'react-router-dom'


const Cliente = (props) => {
    const navigate = useNavigate();
    
    
    const verDetalle =()=>{
       props.setclient(props.client)
        navigate(`/cliente/${props.client.id}`)
    }
    
    return (
         <div className="d-flex flex-column justify-content-evenly">
             <div className="mr-3">
                <h5>{props.client.name} {props.client.surname}</h5>
                <h6>{props.client.email}</h6>
                <p>{props.client.dress}</p>
             </div>
             <div className="d-flex flex-row w-100 justify-content-evenly">
                 <button className="btn btn-outline-dark btn-sm mx-2"><i className='bx bxs-pencil' ></i></button>
                 <button className="btn btn-outline-secondary btn-sm mx-2" onClick={verDetalle}><i className='bx bx-detail'></i></button>
                 <button className="btn btn-outline-danger btn-sm mx-2"><i className='bx bxs-trash-alt' ></i></button>
             </div>
         </div>
       
    )
}

export default Cliente
