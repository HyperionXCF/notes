// basically the structure of any endpoint is like 
// app.METHOD(url, controller)
// so we are separating the controller functions in their special file for more cleaner code 

// the mongoose model will provide the API functions to interact with collections
import Note from "../models/Note.js"


export const getAllNotes = async ( _, res) => {
    try{
        // get all notes
        const notes = await Note.find().sort({createdAt: -1})
        // createdAt == -1 will sort in descending order (newest first)
        res.status(200).json(notes)

    }catch (err){
        // logging the error for debugging purposes
        console.log(err.message)
        res.status(500).json({
            message : "internal server  error"
        })
    }
}

export const getNoteById = async (req,res) => {
    try{
        const id = req.params.id;
        const note = await Note.findById(id)
        if(!note){
            return res.status(404).json({
                message : "note not found"
            })
        }

        res.status(200).json(note)
    }catch (err){
        console.log(err.message)
        res.status(500).json({
            message : "Internal server error"
        })
    }
}

export const createNote = async (req,res) => {
    try{
        // get new data from the request body 
        const { title, content } = req.body; 
        // create a new note document
        const note = new Note({title, content})
        // add the document into the collection 
        const savedNote = await note.save()
        // return the saved note
        res.status(201).json(savedNote)

    }catch(err){
        console.log(err.message)
        res.status(500).json({
            message : "internal server error"
        })
    }
}

export const updateNote = async (req,res) => {
    try{
        const {title, content} = req.body
        const noteId = req.params.id;
        const updatedNote = await Note.findByIdAndUpdate(noteId, {title, content}, { new : true})

        if(!updatedNote){
            return res.status(404).json({
                message: "Note not found"
            })
        }
        res.status(200).json({
            message : "note updated successfully"
        })
    }catch (err){
        console.log(err.message)
        res.status(500).json({
            message :  `Internal Server Error`
        })
    }
}

export const deleteNote = async (req,res) => {
    try{
        const id = req.params.id
        const deletedNote = await Note.findByIdAndDelete(id)
        if(!deletedNote){
            return res.status(404).json({
                message : "note not found"
            })
        }

        res.status(200).json({
            message : "note deleted successfully"
        })
    }catch (err){
        console.log(err.message)
        res.status(500).json({
            message : "Internal server error"
        })
    }
}