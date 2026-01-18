import { useEffect, useState } from "react";
import toast, { LoaderIcon } from "react-hot-toast";
import { api } from "../lib/axios.js";
import { Link, useNavigate, useParams } from "react-router";

export default function NoteDetailPage() {
  const [note, setNote] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  const handleDelete = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this note?",
    );
    if (!confirm) return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted successfully");
      navigate("/");
    } catch (err) {
      toast.error("Failed to delete note");
      console.log(err);
    } finally {
      setSaving(false);
    }
  };

  const handleSave = async () => {
    if(!note.title || !note.content){
      toast.error("Title and content cannot be empty");
      return;
    }
    setSaving(true);
    try {
      await api.put(`/notes/${id}`, note);
      toast.success("Note updated successfully");
      navigate(`/`)
    } catch (err) {
      toast.error("Failed to update note");
      console.log(err);
    } finally {
      setSaving(false);
    }
  };

  console.log({ id });

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (err) {
        toast.error("Failed to fetch note");
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  console.log(note);

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <LoaderIcon size={20} className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 ">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to={"/"} className="btn btn-outline">
              back to notes
            </Link>
            <button className="btn btn-error" onClick={handleDelete}>
              delete note
            </button>
          </div>

          <div className="card bg-base-100">
            <div className="card-body min-w-2xl">
              <div className="flex flex-col items-center">
                <div className="form-control mb-4 flex flex-col">
                  <label className="label-text">Title</label>
                  <input
                    type="text"
                    placeholder="Note Title"
                    className="input input-bordered min-w-xl"
                    value={note.title}
                    onChange={(e) => {
                      setNote({ ...note, title: e.target.value });
                    }}
                  />
                </div>

                <div className="form-control mb-4 flex flex-col">
                  <label className="label">
                    <span className="label-text">Content</span>
                  </label>
                  <textarea
                    placeholder={"write your note here..."}
                    className="textarea textarea-bordered h-32 min-w-xl"
                    value={note.content}
                    onChange={(e) =>
                      setNote({ ...note, content: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary"
                  disabled={saving}
                  onClick={handleSave}
                >
                  {saving ? "saving..." : "save changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
