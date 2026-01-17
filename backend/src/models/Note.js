import mongoose from "mongoose"

// 1. create a schema 
const noteSchema = new mongoose.Schema({
    title : {
        type: String,
        required : true
    },
    content : {
        type : String,
        required : true
    },
}, { timestamps : true }
)

// 2. create a model based on that schema 
const Note = mongoose.model("Note", noteSchema)

// 3. export the model to use in other files
export default Note