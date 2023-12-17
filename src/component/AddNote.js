import React, { useState } from 'react'
import { useContext } from 'react';
import noteContext from '../Context/notes/notecontext';
const AddNote = (props) => {
    const context=useContext(noteContext);
const {addNote}=context;
const [note,setNote]=useState({title:"",description:"",tag:""})
const handleClick=(e)=>{
  e.preventDefault();
  addNote(note.title, note.description, note.tag);
  props.showAlert("New Note Added","success");
  setNote({title:"",description:"",tag:""})
}
const onChange=(e)=>{
  setNote({...note, [e.target.name]:e.target.value})
}
  return (
    <div className="my-3"> 

    <div>
      <div className="row mx-2">
       <h1 style={{justifyContent:"left"}}>Add Notes</h1>
       </div>
    <form className="my-3">

  < div className="mb-3">

 <div className="row mx-2"> <label htmlFor="title">Title</label> </div>
  <input type="text" className="form-control" id="title" aria-describedby="emailHelp"  name="title" onChange={onChange} value={note.title}/>
  
  </div>
  <div className="mb-3">
    <div className="row mx-2"><label htmlFor="description">Description</label></div>
    <input type="text" className="form-control" id="description" name="description"  onChange={onChange} value={note.description}/>
  </div>
  <div className="mb-3">
     <div className="row mx-2"><label htmlFor="tag" className="form-label">Tag</label></div>
     <input type="text" className="form-control" id="tag" name="tag"  onChange={onChange} value={note.tag} />
     </div>
  
</form>

<button  disabled={note.title.length<5||note.description.length<5||note.tag.length<5}  className="btn btn-primary" onClick={handleClick}>Add Note</button>

</div>
</div>

  )
}

export default AddNote
