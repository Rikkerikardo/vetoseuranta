const kassaRouter = require("express").Router()
const Kassa = require("../models/kassa")

kassaRouter.get("/", async (request, response) => {
  const kassa = await Kassa.findOne()
  console.log("kassa", kassa)
  response.json(kassa)
})
module.exports = kassaRouter
