import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { api } from "../lib/axios.js";
import toast, { LoaderIcon } from "react-hot-toast";
import { Link } from "react-router";
import { ArrowLeftIcon } from "lucide-react";

export default function NoteDetailpage() {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBeingEdited, setIsBeingEdited] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async (id) => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (err) {
        toast.error("failed to fetch the note");
      } finally {
        setLoading(false);
      }
    };
    fetchNote(id);
  }, [id]);

  const handleDelete = async () => {
    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted successfully");
      navigate("/");
    } catch (err) {
      toast.error("Failed to delete the note");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link to={"/"} className="flex gap-2 items-center btn btn-outline">
            <ArrowLeftIcon className="size-4" />
            Back to Notes
          </Link>
          <div className="flex gap-3">
            <button className="btn btn-primary" onClick={() => setIsBeingEdited((prev) => !prev)}>Edit Note</button>
            <button onClick={handleDelete} className="btn btn-error">
              Delete Note
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center">
        {isBeingEdited ? <NoteEditForm note={note}/> : <NoteReadForm note={note}/> }
        </div>
      </div>
    </div>
  );
}

function NoteReadForm({note}){
  return(
        <div className="mt-12 bg-base-200 p-6 rounded-lg">
          <p className="text-2xl">{note.title}</p>
          <p className="mt-6">{note.content}</p>
        </div>
  )
}

function NoteEditForm({note}){

  return(
        <div className="mt-12 bg-base-200 p-6 rounded-lg flex flex-col">
          <form>
            <input type="text" defaultValue={note.title} className="text-2xl min-w-2xl" />
            <input type="text" defaultValue={note.content} className="min-w-2xl mt-6 textarea"/>
          </form>
        </div>
  )
}