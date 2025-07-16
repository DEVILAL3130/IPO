import express from "express"
import dotenv from "dotenv"
import connectDb from "./config/db.js"
import authRouter from "./routes/auth.route.js"
import cookieParser from "cookie-parser"
dotenv.config()

let app= express()

let port=process.env.PORT 

// two other middleware
app.use(express.json())
app.use(cookieParser())

// middleware bna lete hai
app.use("/api/auth",authRouter)


app.listen(port,()=>{
    connectDb()
console.log(`listen at the port:${port}`)
})


