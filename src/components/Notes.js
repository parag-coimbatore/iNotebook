import React, { useContext } from 'react'
import noteContext from "../context/notes/noteContext"
import NoteItem from './NoteItem';
import AddNote from './AddNote';


const Notes = () => {
    const context = useContext(noteContext);
    const { notes, addNote } = context; //destructuring to remove notes from body
    return (
        <>
            <AddNote />
            <div className="row my-3">
                <h2 className='text-center my-4'>Your notes</h2>
                {notes.map((note) => {  //Getting our notes here
                    return <NoteItem key={note._id} note={note} />
                })}
            </div>
        </>

    )
}

export default Notes
