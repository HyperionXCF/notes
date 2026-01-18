import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RateLimitWarning from "../components/RateLimitWarning";
import toast from "react-hot-toast"
import { LoaderIcon } from "lucide-react";
import NoteCard from "../components/NoteCard";
import {api} from "../lib/axios.js"
import { Inbox } from "lucide-react";
import { Link } from "react-router";

export default function Homepage() {
  // all component states
  const [isRateLimited, setRateLimited] = useState(false)
  const [notes, setNotes] = useState([])
  // as soon as we are on the homepage we will start loading notes
  const [isLoading, setLoading] = useState(true) 

  useEffect(() => {
    const fetchNotes = async () => {
      try{
        const res = await api.get("/notes")
        
        setNotes(res.data)
        setRateLimited(false)

      }catch(err){
        if(err.response.status === 429){
          setRateLimited(true)
        }else{
          toast.error("failed to load notes")
        }
      }finally{
        setLoading(false)
      }
    }

    fetchNotes()
  }, [])

  return (
    <div className="relative">
      <Navbar/>
      {
        isRateLimited && <RateLimitWarning/>
      }
      <div className="max-w-7xl mx-auto p-4 mt-6">
        {isLoading && <div className="h-screen flex flex-col gap-2 items-center justify-center">
          <LoaderIcon className="animate-spin text-base-content size-10"/>
        </div>}
        {!isLoading && notes.length <= 0 && <div className="h-screen flex gap-2 flex-col items-center justify-center">
          <Inbox className="text-base-content size-10"/> Empty Here!
          <p>get started by creating a few notes</p> 
          <Link to={"/create"}>
            <button className="btn btn-primary">create your first note</button>
          </Link>
          </div>}
        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map(note => <NoteCard key={note._id} note={note} setNotes={setNotes}/>)}
          </div>
        ) }
      </div>
    </div>
  )
}
