import { Link } from "react-router"
import {PenSquareIcon, Trash2Icon} from "lucide-react"
import { formatDate } from "../lib/util"
import {api} from "../lib/axios.js"
import toast from "react-hot-toast"

export default function NoteCard({note, setNotes}) {
    const handleDeleteNote = async (e,id) => {
        // get rid of the refresh behaviour
        e.preventDefault()

        if(!window.confirm("are you sure you want to delete this note ?")){
            return
        }

        try{
            await api.delete(`/notes/${id}`)
            // update the UI by filtering out the card with id which was deleted 
            setNotes((prev) => prev.filter(note => note._id !== id))
            toast.success("note deleted successfully")

        }catch(err){
            console.log("error in handleDelete", err)
            toast.error("failed deleting the note")
        }
    }

  return (
    <Link to={`/note/${note._id}`} className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-3 border-r-3 border-l border-b border-solid border-primary ">
        <div className="card-body">
            <h3 className="card-title text-base-content">{note.title}</h3>
            <p className="text-base-content/70 line-clamp-3">{note.content}</p>
            <div className="card-actions justify-between items-center mt-4">
                <span className="text-sm text-base-content">
                    {formatDate(new Date(note.createdAt))}
                </span>
                <div className="flex items-center gap-2">
                    <button className="btn">
                        <PenSquareIcon className="size-4"/>
                    </button>
                    <button className="btn" onClick={(e) => handleDeleteNote(e, note._id)}>
                        <Trash2Icon className="size-4 text-red-600"/>
                    </button>
                </div>
        </div>
        </div>
    </Link>
  )
}

