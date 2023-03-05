const mongoose = require("mongoose")

const PageSchema = new mongoose.Schema({
  title:{
    type: String,
    unique: true,
    trim: true,
    maxlength: [100, "the title do not do more than 70 character"]
  },
  content :{
    type: String,
    minlength: [200, "the page must contain a minimum of 200 characters"],
  },
  slug: {
    type: String,
    unique: true,
  },
  modifiedBy: [{
    type: mongoose.Schema.ObjectId,
    ref: "Users"
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String, 
    enum: ["published","draft"]
  },
  creator:{
    type: mongoose.Schema.ObjectId,
    ref: "Users",
    required:true                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
  }
})

module.exports = mongoose.model("Pages",PageSchema)