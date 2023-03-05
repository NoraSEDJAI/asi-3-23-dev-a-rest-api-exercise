const express = require("express")
const cookieParser = require("cookie-parser")
const connectDB = require("./config/db")

connectDB()

const pages = require("./routes/pages")
const menu = require("./routes/navigationMenu")
const auth = require("./routes/auth")

const app = express()

app.use(express.json())

app.use(cookieParser())

app.use("/api/v1/pages",pages)
app.use("/api/v1/menu",menu)
app.use("/api/v1/auth",auth)

const PORT = 5000

const server = app.listen(PORT)

//process.on("unhandeldRejection",(err)=>{
  //console.log(`error:${err.message}`.red)
  //server.close(()=>process.exit(1))
//})