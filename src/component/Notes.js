import React, { useEffect, useRef, useState } from 'react'
import { useContext } from 'react';
import noteContext from '../Context/notes/notecontext';
import Newitem from './Newitem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router';
const Notes = (props) => {
  let history=useNavigate();
  const {showAlert}=props;
const [note,setNote]=useState({id:"",etitle:"",edescription:"",etag:""})
  const context=useContext(noteContext);
  
  const {notes,getallnotes,editnote}=context;
  useEffect(()=>{
    if(localStorage.getItem('token')){
    getallnotes()}
    else{
       history('/login');
    }
    //eslint-disable-next-line
  },[]);
  const onChange=(e)=>{
    setNote({...note, [e.target.name]:e.target.value})
  }
  const updatenote=(currentnote)=>{
      ref.current.click();
      setNote({id:currentnote._id,etitle:currentnote.title, edescription:currentnote.description, etag:currentnote.tag})
      

  }
  const ref=useRef(null);
  const refclose=useRef(null);
  const handleclick=()=>{
    console.log("handle click");
    editnote(note.id, note.etitle, note.edescription, note.etag);
     refclose.current.click();
     showAlert("Updated!","success");
  }
  return (
    <>
    <AddNote showAlert={showAlert}/>
    {/* <!-- Button trigger modal --> */}
<button type="button" ref={ref} class="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModal">
  Launch demo modal
</button>

{/* <!-- Modal --> */}
<div class="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <form>
  <div className="form-group">
  <label htmlFor="title">Title</label> 
  <input type="text" className="form-control" id="etitle" value={note.etitle} placeholder="Enter title" name="etitle" onChange={onChange}/>
  </div>
  <div className="form-group">
    <label htmlFor="description">Description</label>
    <input type="text" className="form-control" id="edescription" value={note.edescription} name="edescription" onChange={onChange}/>
  </div>
  <div className="mb-3">
     <label htmlFor="tag" className="form-label">Tag</label>
     <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
     </div>
</form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal" ref={refclose}>Close</button>
        <button type="button"  disabled={note.etitle.length<5||note.edescription.length<5||note.etag.length<5} class="btn btn-primary" onClick={handleclick} >Update Note</button>
      </div>
    </div>
  </div>
</div>
   <div>
    <div className="row mx-1">
<h1>Your Notes</h1>
</div>
< div className="row mx-1">
{notes.length===0 && 'No notes to display'}

{ notes.map((note)=>{return <Newitem key={note._id} note={note} updatenote={updatenote} showAlert={showAlert}/>})}
</div>
    </div>
    
    </>
  )
}

export default Notes
