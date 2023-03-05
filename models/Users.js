const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


const UserSchema = new mongoose.Schema({
  firstName:{
    type:String,
    trim:true,
    required:[true,"First Name"]
  },
  lastName:{
    type:String,
    trim:true,
    required:[true,"Last Name"]
  },
  email:{
    type:String,
    unique:true,
    trim:true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please, enter a valid email"],
    required:[true,"Email"]
  },
  role:{
    type:String,
    enum:["manager","editor"],
    default: "editor"
  },
  password:{
    type:String,
    select:false,
    required:[true,"Password"],
    match:[/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/,"Please make sure Password Includes a special character - Please make sure Password Includes an UpperCase and LowerCase character - Please make sure Password Includes a Digit - Please make sure password is longer than 6 characters."]
  },
  createdAt:{
    type:Date,
    default: Date.now
  }
})

UserSchema.pre("save",async function(next) {
  if (!this.isModified("password")) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password,salt)
  next()
})

UserSchema.methods.getSignedJwtToken =function() {
  return jwt.sign({id:this._id },"122df56798gdtfZEF",{expiresIn: "10d"})
}

UserSchema.methods.matchPassword = async function(logedPassword) {
  return await  bcrypt.compare(logedPassword,this.password)
}

module.exports = mongoose.model("Users",UserSchema)