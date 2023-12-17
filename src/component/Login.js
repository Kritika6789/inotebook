import React, { useState } from 'react'
import { useNavigate } from 'react-router';

const Login = (props) => {
    const [credentials,setCredentials]=useState({email:"", password:""});
    const history=useNavigate();
    const handleClick=async(e)=>{
        e.preventDefault();
        const response=await fetch("http://localhost:5000/api/auth/login",{
            method:'POST',
            headers:{
              'Content-Type':'application/json',
            },
           body: JSON.stringify({email:credentials.email, password:credentials.password})}
           );
           const json=await response.json();
           console.log(json);
           if(json.success){
            localStorage.setItem('token',json.authtoken);
            props.showAlert("Login Succesfully","success");
            history('/');
           }
           else{
            props.showAlert("Invalid credentials","danger");
           }
    }
    const onChange=(e)=>{
        setCredentials({...credentials, [e.target.name]:e.target.value})
      }
  return (
    <div>
  <h2>Login to Continue to iNotebook</h2>
      <form onSubmit={handleClick}>
  <div className="form-group">
   <div className="row mx-1"> <label htmlFor="exampleInputEmail1">Email address</label></div>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" name="email" value={credentials.email} onChange={onChange} />
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div className="form-group">
   <div className="row mx-1"> <label htmlFor="exampleInputPassword1">Password</label></div>
    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" name="password" value={credentials.password} onChange={onChange}/>
  </div>

  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Login
