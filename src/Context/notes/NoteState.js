import { useState } from "react";
import noteContext from "./notecontext";
// import { useState } from "react";
const host="http://localhost:5000";
const NoteState=(props)=>{
//      const a={
//         "name":"Kritika",
//         "Class":"3rd"
//      }
//      const [state,setState]=useState(a);
//      const update=()=>{
//         setTimeout(()=>{
//               setState({
//                 "name":"Kittu",
//                 "Class":"3rd"
//               })
//         },1000)
//      }
const notesInitial=[];
           
            
const [notes,setNotes]=useState(notesInitial);
const getallnotes=async()=>{
  const response=await fetch(`${host}/api/notes/fetchnotes`,{
    method:'GET',
    headers:{
      'Content-Type':'application/json',
      "auth-token":localStorage.getItem('token')

    },
  });
  const json=await response.json();
  setNotes(json);
}
const addNote=async(title,description,tag)=>{
  const response=await fetch(`${host}/api/notes/addnotes`,{
    method:'POST',
    headers:{
      'Content-Type':'application/json',
      "auth-token":localStorage.getItem('token')
    },
   body: JSON.stringify({title,description,tag})
  });

 const note=await response.json();
 setNotes(notes.concat(note));
  // console.log("Adding new note");
// const note=[ {
//   "_id": "64dba219c5fb3b3d36aae58e",
//   "user": "64d87d915c81c32239020ded",
//   "title":title,
//   "description": description,
//   "tag": tag,
//   "__v": 0
// }]
// setNotes(notes.concat(note))

}
const deletenote=async(id)=>{
  const response=await fetch(`${host}/api/notes/deleteuser/${id}`,{
    method:'DELETE',
    headers:{
      'Content-Type':'application/json',
      "auth-token":localStorage.getItem('token')

    },
  });
  const json=response.json();
  console.log(json);
  // console.log("Deleting note of id:"+id);
  const newnote=notes.filter((note)=>{return note._id!==id});
  setNotes(newnote);
}

const editnote=async(id,title,description,tag)=>{
  const response=await fetch(`${host}/api/notes/updateuser/${id}`,{
    method:'PUT',
    headers:{
      'Content-Type':'application/json',
      "auth-token":localStorage.getItem('token')

    },
    body: JSON.stringify({title,description,tag})
  });
  const json=response.json();
console.log(json);
let newnote=JSON.parse(JSON.stringify(notes));
     for (let index = 0; index < newnote.length; index++) {
      const element = newnote[index];
      if(element._id===id){
        newnote[index].title=title;
        newnote[index].description=description;
        newnote[index].tag=tag;
        break;
      }
     }
     setNotes(newnote);
}

// const deletenote=()=>{
  
// }
// const editnote=()=>{
  
// }
     
    return (
      //     <noteContext.Provider value={{state,update}}>
         <noteContext.Provider value={{notes,addNote,deletenote,editnote,getallnotes}}>

                  {props.children}
          </noteContext.Provider>
    )
}
export default NoteState;