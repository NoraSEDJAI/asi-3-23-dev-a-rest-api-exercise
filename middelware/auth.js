const jwt = require("jsonwebtoken")
const User = require("../models/Users")

exports.protect  = async(req,res,next) =>{
  try {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1]
    }

    if (!token) {
      return next(("access denied",401))
    }

    const decrypted = jwt.verify(token,process.env.JWT_SEC)
    req.user = await User.findById(decrypted.id)
    next()
  }
  catch (error) {
    next(error)
  }
}

exports.checkPermission =(...roles)=>{
  return (req,res,next)=>{
    if (!roles.includes(req.user.role)) {
      return next((`${req.user.role} is not authorized to perform this operation`,403))
    }

    next()
  }
}

exports.readAllOrNot=async(req,res,next) =>{
  const statusFilter = !req.user ? "published" : ["published", "draft"]

  if (req.query.status) {
    if (Array.isArray(req.query.status)) {
      req.query.status = req.query.status.filter((status) =>
        statusFilter.includes(status)
      )
    } else if (!statusFilter.includes(req.query.status)) {
      req.query.status = statusFilter
    }
  } else {
    req.query.status = statusFilter
  }

  next()
}