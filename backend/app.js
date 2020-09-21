const matchesRouter = require("./controllers/matches")
const kassaRouter = require("./controllers/kassa")

const mongoose = require("mongoose")
const express = require("express")
const app = express()
const cors = require("cors")
require("dotenv").config()

const URI = process.env.MONGODB_URI

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })

const connection = mongoose.connection

connection.once("open", () => {
  console.log("MongoDB database connection established successfully")
})

app.use(express.static("build"))
app.use(express.json())
app.use(cors())
app.use("/api/matches", matchesRouter)
app.use("/api/kassa", kassaRouter)

app.get("/", (req, res) => {
  res.send("Etusivu")
})

module.exports = app
