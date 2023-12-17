// import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import NoteState from './Context/notes/NoteState';
import Navbar from './component/Navbar';
import Home from './component/Home';
import About from './component/About';
import Alert from './component/Alert';

import { useState } from 'react';
import Signup from './component/Signup';
import Login from './component/Login';
function App() {

  
  const [alert,setAlert]=useState(null);
  const showAlert=(message,type)=>{
    setAlert({
     message:message,
     type:type
    })
    setTimeout(()=>{
     setAlert(null);
    },1500);
 }
  return (
    <div className="App">
      <NoteState>
     <Router>
      <Navbar/>
      <Alert alert={alert}/>
     <div className="container align-left" >
     {/* <h1>This is a iNotebook</h1>
      */}
     <Routes>
     <Route exact path="/" element={<Home showAlert={showAlert}/>}>
            </Route>      
            <Route exact path="/about" element={<About showAlert={showAlert} />}>

            </Route>
            <Route exact path="/login" element={<Login showAlert={showAlert}/>}>
            </Route>
            <Route exact path="/signup" element={<Signup showAlert={showAlert}/>}>
            </Route>
        </Routes>
      </div> 

     </Router>
     </NoteState>
    </div>
  );
}

export default App;
