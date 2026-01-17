import {Routes, Route} from "react-router"
import Homepage from "./pages/Homepage"
import Createpage from "./pages/Createpage"
import NoteDetailpage from "./pages/NoteDetailpage"

export default function App(){
  return(
    <div>
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/create" element={<Createpage/>}/>
        <Route path="/note/:id" element={<NoteDetailpage/>}/>
      </Routes>
    </div>
  )
}