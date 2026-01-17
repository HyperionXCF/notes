import express from "express"
import notesRoutes from "./routes/notesRouters.js"
import { connectDB } from "./configs/db.js"
import dotenv from "dotenv"

dotenv.config()

const app = express()
connectDB()

// router configured to /api/notes base url 
app.use(express.json())
app.use("/api/notes", notesRoutes)


const PORT = process.env.PORT
app.listen(PORT, ()=>{ 
    console.log(`server started on port ${PORT}`)
})