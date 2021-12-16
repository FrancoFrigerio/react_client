import Login from './components/Login';
import React, {useEffect, useState } from 'react'
import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom';

import Inicio from './components/Inicio';
import Clientes from './components/Clientes';
import Navbar from './components/Navbar';
import DetalleCliente from './components/DetalleCliente';
import Movimientos from './components/Movimientos';
import Usuarios from './components/Usuarios';
import Productos from './components/Productos';

function App() {
 const [authenticated, setAuthenticated] = useState(false)
 const [client, setClient] = useState(false)
const [user, setUser] = useState(null); //usuario logueado
 
 useEffect(() => {
  if(localStorage.getItem('token')){
    setAuthenticated(true);
  }else{
    setAuthenticated(false)
  }
}, [])


  return (
    <div>
      <BrowserRouter>
      {
        authenticated?(<div>
          <Navbar setauth={setAuthenticated}></Navbar>
        </div>):(null)
      }     
      <Routes>
          <Route path="/login" element={!authenticated?(<Login setauth={setAuthenticated} auth={authenticated} setUser={setUser}/>):(<Navigate to="/inicio"/>)} exact={true}/>
          <Route path="/inicio" element={authenticated?(<Inicio user={user}/>):(<Navigate to="/login"/>)}></Route>
          <Route path="/clientes" element={authenticated?(<Clientes setclient={setClient} user={user}/>):(<Navigate to="/login"/>)}></Route>
          <Route path="/cliente/:id" element={authenticated?(<DetalleCliente setclient={setClient} client={client}/>):(<Navigate to="/login"/>)}></Route>
          <Route path="/movimientos" element={authenticated?(<Movimientos />):(<Navigate to="/login"/>)}></Route>
          <Route path="/usuarios" element={authenticated?(<Usuarios />):(<z to="/login"/>)}></Route>
          <Route path="/productos" element={authenticated?(<Productos />):(<Navigate to="/login"/>)}></Route>
        </Routes>
      </BrowserRouter>
    </div>
      

    
  );
}

export default App;
