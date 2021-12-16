import React, { useEffect, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'


const Navbar = (props) => {
    const [listRoles, setlistRoles] = useState(null)
    const [rol, setRol] = useState(null)
    const navigate=useNavigate();
   
   const fetchRoles=()=>{
       setlistRoles(localStorage.getItem('roles'))
       if(localStorage.getItem('roles').includes('ROLE_ADMIN')){
           setRol('ADMINISTRADOR')
       }else{
           setRol('USUARIO')
       }

   }
   useEffect(() => {
       fetchRoles();
   }, [])
   
   
   const logOut=()=>{
        localStorage.removeItem('token')
        props.setauth(false)
        navigate("/login")
    }
   
    return (
        <div>
            <div className='text-muted m-1'>
                {
                    rol ==='ADMINITRADOR'?(<span >{rol}</span>):(<span>{rol}</span>)
                }
            </div>
        <div className="p-3 mt-2">
            <ul className="nav justify-content-end">
                <li className="nav-item">
                    <Link to="/clientes" className="nav-link active">Clientes</Link>
                </li>
                <li className="nav-item">
                    <Link to="/usuarios" className="nav-link active">Usuarios</Link>    
                </li>
                <li className="nav-item">
                    <Link to="/movimientos" className="nav-link active">Movimientos</Link>
                </li>
                <li className="nav-item">
                    <Link to="/productos" className="nav-link active">Productos</Link>
                </li>
                <li>
                    <button onClick={logOut} className="btn btn-outline-dark">Salir</button>
                </li>
            </ul>
        </div>
        </div>
    )
}

export default Navbar
