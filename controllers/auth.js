
const User = require("../models/Users")

exports.register = async(req,res,next) =>{
  try {
    const {firstName,lastName,email,password,role} = req.body
    
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      role
    })

    sendTokenRes(user,200,res)
  } catch (error) {
    next(error)
  }
}

exports.login = async(req,res,next) =>{
  try {
    const {email,password} = req.body

    if (!email || !password) {
      return next(("Veuillez mettre un email et un mot de passe",400))
    }

    const user = await User.findOne({email}).select("+password")

    if (!user) {
      return next(("Email ou mot de passe incorrecte",401))
    }

    const isPass = await user.matchPassword(password)

    if (!isPass) {
      return next(("Email ou mot de passe incorrecte",401))
    }

    sendTokenRes(user,200,res)
  } catch (error) {
    next(error)
  }
}

exports.updateUser  = async(req,res,next) =>{
  try {
    let user = await User.findById(req.params.id)

    if (!user) {
      return next((`No user found with this id: ${req.params.id}`),400)
    }

    user = await User.findByIdAndUpdate(req.params.id,req.body,{
      new:true,
      runValidators : true
    })
    res.status(200).json({
      success:true,
      data: user
    })
  }
  catch (error) {
    next(error)
  }
}

exports.deleteUser  = async(req,res,next) =>{
  try {
    const  user = await User.findById(req.params.id)

    if (!user) {
      return next((`No user found with this id: ${req.params.id}`),400)
    }

    await user.remove()
    res.status(200).json({
      success:true,
      data: {}
    })
  }
  catch (error) {
    next(error)
  }
}

//les infos de la perso logé 
exports.getMyInfo = async(req,res,next) =>{
  try {
    const user = await User.findById(req.user.id)
    res.status(200).json({
      success: true,
      data:user
    })
  } catch (error) {
    next(error)
  }
}

const sendTokenRes = (user,statusCode,res)=>{
  const token = user.getSignedJwtToken()

  const options ={
    expires: new Date(Date.now()+process.env.COOKIE_EXPIRE * 24* 60*60*1000),
    httpOnly:true
  }

  if (process.env.NODE_ENV ==="production") {
    options.secure = true
  }

  res
    .status(statusCode)
    .cookie("token",token,options)
    .json({
      success:true,
      token
    })
}