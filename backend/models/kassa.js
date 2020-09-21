const mongoose = require("mongoose")

const schema = new mongoose.Schema({
  Kassa: {
    type: Number,
    required: true
  },
  pelaajat: [
    {
      Riku: {
        type: Number,
        required: true
      }
    },
    {
      Panu: {
        type: Number,
        required: true
      }
    },
    {
      Valtteri: {
        type: Number,
        required: true
      }
    },
    {
      Mikko: {
        type: Number,
        required: true
      }
    }
  ]
})

schema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model("kassa", schema, "kassa")
