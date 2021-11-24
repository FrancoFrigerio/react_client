import axios from 'axios';
import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';




function Login(props){
  
    const navigate = useNavigate(); 
   
    const [data, setData] = useState({email:'',password:''})
    const inputChange=(e)=>{
      setData({
          ...data, [e.target.name]:e.target.value
      })
      
     }
    
    const loguearse = async(e) => {
      e.preventDefault();
      try{
            await axios({
              method:'POST',
              url:'http://localhost:8080/login',
              Headers:{},
              data:{
                  "username":data.email,
                  "password":data.password
                }
            }).then(res=> localStorage.setItem('token',res.data.accessToken))
            props.setauth(true)
            navigate("/inicio")
            .catch(error=>{console.log(error)})
        }catch(error){
                
        }
    }
    
    
    
    return (
        <div className ="mt-5 pt-5 d-flex justify-content-center bd-success">
        <div className="w-50 d-flex justify-content-center mt-5">
        <form className="d-flex flex-column w-50 mt-5 p-4 border rounded" onSubmit={loguearse}>
            <h5 type="text" className="text-secondary">ingrese email</h5>
            <input className="form-control mb-3" placeholder="ejemplo@gmail.com" onChange={inputChange} name="email"></input>
            <h5 type="text" className="text-secondary mt-3">ingrese su contraseña</h5>
            <input className="form-control" placeholder="8 caracteres minimo" type="password" onChange={inputChange} name="password"></input>
            <div className="d-flex justify-content-center">
                <button className="btn btn-outline-secondary mt-5 w-50" type="submit">ingresar</button>
            </div>
        </form>

        
        
            
        </div>
    </div>
    )
}

export default Login;
