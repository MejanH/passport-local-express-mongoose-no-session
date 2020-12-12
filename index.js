const express = require("express")
const mongoose = require("mongoose")
const cors = require('cors')
const passport = require("passport")

require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(passport.initialize())

app.get("/", (req, res) => {
    res.send("Hello world")
})

// setup routes
const router = require("./routes/userRoute")
const { urlencoded } = require("express")

app.use("/api", router)

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

const db = mongoose.connection

db.on("error", console.error.bind(console, "db conneection error"))
db.on("open", () => {
    console.log("Connected to database");
})

app.listen(PORT, () => {
    console.log("http://localhost:5000");
})