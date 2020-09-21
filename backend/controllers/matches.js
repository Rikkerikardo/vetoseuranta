const matchesRouter = require("express").Router()
const Match = require("../models/match")

matchesRouter.get("/", async (request, response) => {
  const matches = await Match.find(
    {},
    { Pelattu: 1, Pelaaja1: 1, Pelaaja2: 1, Panos: 1, Kerroin: 1, Tulos: 1 }
  )
  response.json(matches.map((match) => match.toJSON()))
})
module.exports = matchesRouter
