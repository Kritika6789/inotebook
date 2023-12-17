import React, { useState } from 'react'
import { useNavigate} from 'react-router';


const Signup = (props) => {
    const [credentials,setCredentials]=useState({name:"",email:"",password:""});
    const history=useNavigate();
  
    const handleClick=async(e)=>{
        e.preventDefault();
         
        const response=await fetch("http://localhost:5000/api/auth/createuser",{
            method:'POST',
            headers:{
              'Content-Type':'application/json',
            },
           body: JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password})}
           );
           const json=await response.json();
           console.log(json);
          
          
           if(json.success){
            localStorage.setItem('token',json.authtoken);
            history('/');
            props.showAlert("Sign Up Successfully","success");
            
           }
           else{
            props.showAlert("Invalid","danger");
           } 
          
         
    }
    const onChange=(e)=>{
        setCredentials({...credentials, [e.target.name]:e.target.value})
      }
      
     const handleCheck=()=>{
      let a=document.getElementById('password').value;
      let b=document.getElementById('cpassword').value;
      if(a===0){
        props.showAlert("Password is required","danger");
      }
      if(a!==b){
        document.getElementById("submit").disabled=true;
        setTimeout(()=>{
          document.getElementById('exampleCheck1').checked=false;
        },100);
        alert('Password don not match');
      }
      else{
        document.getElementById("submit").disabled=false;
        
      }
     }
  return (

    <div className='container mt-2'>
        <h1 classNmae="my-2">Create an Account to use iNotebook </h1>
      <form onSubmit={handleClick}>
      <div className="form-group my-3" onSubmit={handleClick}>

<div className="row mx-1"><label htmlFor="exampleInputEmail1 my-2">User Name</label></div>
<input type="text" className="form-control" id="name" aria-describedby="emailHelp"  name="name" value={credentials.name} onChange={onChange} />

</div>
  <div className="form-group">

    <div className="row mx-1"><label htmlFor="exampleInputEmail1">Email address</label></div>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"  name="email" value={credentials.email}onChange={onChange}/>
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
    <div class="invalid-feedback">
         Email Exist
        </div>
  </div>
  <div className="form-group">
    <div className="row mx-1"><label htmlFor="exampleInputPassword1">Password</label></div>
    <input type="password" className="form-control" id="password"  name="password" onChange={onChange} value={credentials.password} minLength={5} required/>
  </div>
  <div className="form-group">
   <div className="row mx-1"> <label htmlFor="confirmPassword">Confirm Password</label></div>
    <input type="password" className="form-control" id="cpassword" name="cpassword"  minLength={5} required  />
  </div>
  <div class="form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1" onClick={handleCheck}/>
    <label class="form-check-label" for="exampleCheck1">Check me out</label>
  </div>
  
  <button type="submit" className="btn btn-primary my-2" id="submit">Submit</button>
</form>
    </div>
  )
}

export default Signup
