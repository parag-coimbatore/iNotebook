import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from "../context/notes/noteContext"
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';


const Notes = (props) => {
    const context = useContext(noteContext);
    let history = useNavigate()
    const { notes, getNotes, editNote } = context; //destructuring to remove notes from body
    useEffect(() => {
        if(localStorage.getItem('token'))
        {
            getNotes()
        }
        else{
            history("/login")
        }
       
    }, [])
    const updateNote = (currentNote) => {
        ref.current.click()
        setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag})
    }

    const handleClick = (e) => {
        editNote(note.id,note.etitle, note.edescription, note.etag)
        refClose.current.click()  //to close the edit model ui
        props.showAlert("Updated Successfully","success")
    }
    const onChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value})
    }

    const ref = useRef(null)
    const refClose = useRef(null)
    const [note, setNote] = useState({id: "",etitle: "", edescription: "", etag: ""})

    return (
        <>
            <AddNote showAlert={props.showAlert} />
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>


            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form my-3>
                                <div className="form-group" className="text-center my-5">
                                    <h5 htmlFor="title" >Title</h5>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" placeholder="Enter title" onChange={onChange} />
                                </div>
                                <div className="form-group" className="text-center my-5">
                                    <h5 htmlFor="tag">Tag</h5>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} placeholder="Enter tag" onChange={onChange}  minLength={5} required/>
                                </div>
                                <div className="form-group col-lg-1" className="text-center my-5">
                                    <h5 htmlFor="description">Description</h5>
                                    <input type="text" className="form-control" id="edescription" value={note.edescription} name="edescription" placeholder="Enter description" onChange={onChange} minLength={5} required/>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" disabled={note.etitle.length<5 || note.edescription.length<5} onClick={handleClick} className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h2 className='text-center my-4'>Your notes</h2>
                {notes.length === 0 && <h5 className="text-center">No notes to display. Please add notes</h5>}
                {notes.map((note) => {  //Getting our notes here
                    return <NoteItem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />
                })}
            </div>
        </>

    )
}

export default Notes
