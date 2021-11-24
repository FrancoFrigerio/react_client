import React from 'react'
import {Link, useNavigate} from 'react-router-dom'


const Navbar = (props) => {
   const navigate=useNavigate();
    const logOut=()=>{
        localStorage.removeItem('token')
        props.setauth(false)
        navigate("/login")
    }
   
    return (
        <div className="p-3">
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
                <li>
                    <button onClick={logOut} className="btn btn-outline-dark">Salir</button>
                </li>
            </ul>
        </div>
    )
}

export default Navbar
