const mongoose = require("mongoose")

const schema = new mongoose.Schema({
  Pelaaja1: {
    type: String,
    required: true
  },
  Pelaaja2: {
    type: String,
    required: true
  },
  Pelattu: {
    type: String,
    required: true
  },
  Panos: {
    type: Number
  },
  Kerroin: {
    type: Number
  },
  Tulos: {
    type: String
  }
})

schema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model("results", schema)
