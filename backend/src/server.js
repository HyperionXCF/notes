import express from "express"
import notesRoutes from "./routes/notesRouter.js"
import { connectDB } from "./configs/db.js"
import dotenv from "dotenv"
import rateLimiter from "./middleware/rateLimiter.js"

dotenv.config()

const app = express()

// router configured to /api/notes base url 
app.use(express.json())
app.use(rateLimiter)
app.use("/api/notes", notesRoutes)


const PORT = process.env.PORT
app.listen(PORT, ()=>{ 
    // first connect to the database 
    connectDB()
    // then start listening
    console.log(`server started on port ${PORT}`)
})