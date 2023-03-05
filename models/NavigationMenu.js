const mongoose = require("mongoose")

const MenuSchema = new mongoose.Schema({
  name: {
    type:String,
    trim: true,
    unique:true,
    required: [true,"Please, enter name's menu"]
  },
  pages:[{
    type: mongoose.Schema.ObjectId,
    ref: "Pages"
  }]
    
})

module.exports = mongoose.model("NavigationMenu",MenuSchema)