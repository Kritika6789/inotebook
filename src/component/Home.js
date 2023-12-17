import React from 'react'
import Notes from './Notes'
// import Notes from '../../backend/Models/Notes'
// import noteContext from '../Context/notes/notecontext';
export default function Home(props) {
    const {showAlert}=props;
  return (
    <div>
   
<Notes showAlert={showAlert}/>
    </div>

  )
}
