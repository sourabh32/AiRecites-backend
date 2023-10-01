import express from "express"
import dotenv from "dotenv"
import router from "./routes/userRoutes.js"
import storyRouter from "./routes/storyRoutes.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import { notFound,errorHandler } from "./middleware/errorMiddleware.js"
import connectDb from "./config/db.js"

dotenv.config()

const port  = process.env.PORT || 4000

connectDb()
const app = express()
app.use(cors({
  origin:"https://airecites-frontend.vercel.app"
}));
app.use(cookieParser())


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/",(req,res)=> res.send("server is working fine"))
app.use("/api/users",router)
app.use("/api/story",storyRouter)

app.use(notFound)
app.use(errorHandler)

app.listen(
    port,()=> console.log(`server is running at ${port}`)
)