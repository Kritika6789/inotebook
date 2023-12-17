import React from 'react'
// import { useContext } from 'react'
// import noteContext from '../Context/notes/notecontext'
// import { useLocation } from 'react-router-dom';
export default function About() {
  
  // const a=useContext(noteContext);
  // useEffect(()=>{
  //   a.update();
  //   //eslint-disable-next-line
  // },[])
  // const [accordian, setAccordian]=useState({title:"Accordian item", content:"iNotebook is a application used to store notes and this application is very secure. Only login users can access their notes and edit them also.Users can perfom CRUD(create, delete, update , delete) operation on notes",display:"true"});
  // const showData=()=>{
  //   if(accordian.display==="true"){
  //     setAccordian({title:"Accordian item",content:"",display:"false"})
  //   }
  //   else{
  //     setAccordian({title:"Accordian item",content:"iNotebook is a application used to store notes and this application is very secure. Only login users can access their notes and edit them also.Users can perfom CRUD(create, delete, update , delete) operation on notes",display:"true"})

  //   }
  
  return (
    <div>
      {/* <h1>This is a about {a.state.name} and class is {a.state.Class}</h1> */}
      
      <h1>About iNotebook</h1>
      {/* <div className="container" style={{border:"2px solid black"}}>
         <div className='d-flex '><div>{accordian.title}</div><i className="fa-solid fa-angle-down" style={{marginLeft:"900px"}} onClick={showData}></i></div> 
           <div  className="great" style={{backgroundColor:"#c9d9f2"}}>{accordian.content}</div>
        </div>       */}
        <div className="row  mx-3 my-3">
        <div className="card bg-light mb-3 mx-3" style={{maxWidth: "18rem"}}>
  <div className="card-header">Header</div>
  <div className="card-body">
    <h5 className="card-title">Light card title</h5>
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
  </div>
  <div className="card bg-light mb-3 mx-3 " style={{maxWidth: "18rem"}}>
  <div className="card-header">Header</div>
  <div className="card-body">
    <h5 className="card-title">Light card title</h5>
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
  </div>
  <div className="card bg-light mb-3 mx-3" style={{maxWidth: "18rem"}}>
  <div className="card-header">Header</div>
  <div className="card-body">
    <h5 className="card-title">Light card title</h5>
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
  </div> 
  </div>
    </div>
  )
}
