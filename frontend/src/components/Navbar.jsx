import {Link} from "react-router"
import {PlusIcon} from "lucide-react"

export default function Navbar(){
    return(
        <header className="bg-base-300 border-b border-base-content/10">
            <div className="mx-auto max-w-6xl p-4">
                <div className="flex items-center justify-between">
                    <p className="text-3xl font-bold text-primary font-mono tracking-tighter">noto</p>
                    <div className="flex items-center gap-4">
                        <Link to={"/create"} className="btn btn-primary">
                        <PlusIcon className="size-4"/>new note 
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}