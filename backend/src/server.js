import express from "express"
import notesRoutes from "./routes/notesRouter.js"
import { connectDB } from "./configs/db.js"
import dotenv from "dotenv"
import rateLimiter from "./middleware/rateLimiter.js"
import cors from "cors"

dotenv.config()

const app = express()

// cors config
const corsConfig = {
    origin : "http://localhost:5173"
}
app.use(cors(corsConfig))

// middlewares
app.use(express.json())
app.use(rateLimiter)


// router configured to /api/notes base url 
app.use("/api/notes", notesRoutes)

const PORT = process.env.PORT

// first connect to the database 
connectDB().then(() => {
    app.listen(PORT, ()=>{ 
        // then start listening requests
        console.log(`server started on port ${PORT}`)
    })
})