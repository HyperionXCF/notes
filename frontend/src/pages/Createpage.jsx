import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowLeftIcon } from "lucide-react";
import toast from "react-hot-toast"
import {api} from "../lib/axios.js"

export default function Createpage() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()

        if(!title.trim() || !content.trim()){
            toast.error("both fields are required")
            return
        }

        setLoading(true)

        try{
            await api.post("/notes", {
                title,
                content
            })

            toast.success("note created successfully!")
            navigate("/")

        }catch(err){
            if(err.response.status === 429){
                toast.error("slow down bro!")
            }else{
                toast.error("failed to create note")
                console.log("error creating note")
            }
        }finally{
            setLoading(false)
        }

        setTitle("")
        setContent("")
}

    return (
        <div className="min-h-screen bg-base-200">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto">
                    <Link
                        to={"/"}
                        className="flex gap-2 items-center w-40 btn btn-outline"
                    >
                        <ArrowLeftIcon className="size-4" /> back to notes
                    </Link>

                    <div className="card bg-base-100 mt-12">
                        <div className="card-body">
                            <h2 className="card-title text-2xl">Create new note</h2>
                            <form
                                onSubmit={handleSubmit}
                                className="mt-6 flex flex-col items-center"
                            >
                                <div className="flex flex-col gap-2 form-control mb-4">


                                    <div className="flex flex-col gap-1">
                                        <label className="label">
                                            <span className="label-text">Title</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="note title"
                                            className="input input-bordered w-xl"
                                            value={title}
                                            onChange={(e) => {
                                                setTitle(e.target.value);
                                            }}
                                        />
                                    </div>

                                    <div>
                                        <label className="label">
                                        <span className="label-text">Content</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="note content"
                                        className="textarea textarea-bordered h-32 w-xl flex text-wrap"
                                        value={content}
                                        onChange={(e) => {
                                            setContent(e.target.value);
                                        }}
                                    />
                                    </div>
                                </div>

                                <div className="card-actions justify-end">
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={loading}
                                    >
                                        {loading ? "Creating..." : "Create Note"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
