import React, { useContext } from 'react'
import noteContext from '../Context/notes/notecontext';

const Newitem = (props) => {
    const {note,updatenote}=props;
    const context=useContext(noteContext)
    const {deletenote}=context;
  return (
    
        <div className="col-md-3">
      <div className="card my-3">
     <div className="card-body">
        <div className="d-flex align-item-center"> <h5 className="card-title">{note.title}</h5> <i className="fa-solid fa-trash-can mx-2" onClick={()=>{deletenote(note._id);props.showAlert("Deleted Note","danger")}}></i> 
        <i className="fa-solid fa-pen-to-square mx-2"onClick={()=>{updatenote(note)}}></i></div> 
    <p className="card-text" style={{justifyContent:"center"}}>{note.description}</p>
    {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
  </div>
</div>
</div>

  )
}

export default Newitem

