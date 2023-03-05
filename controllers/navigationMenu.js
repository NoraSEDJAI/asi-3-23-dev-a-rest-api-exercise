const Menu = require("../models/NavigationMenu")

exports.getMenu  = async(req,res,next) =>{
  try {
    let query
    query = Menu.find()

    const menu = await query
    res.status(200).json(
      res.result
    )
  }
  catch (error) {
    next(error)
  }
}

exports.getOneMenu  = async(req,res,next) =>{
  try {
    const menu =await Menu.findById(req.params.id).populate({
      path: "pages",
      select :"title",
      match: { status: "published" }
    })

    if (!menu) {
      return next((`No menu found with this id: ${req.params.id}`),404)
    }

    res.status(200).json({
      success:true,
      data: menu
    })
  }
  catch (error) {
    next(error)
  }
}

exports.addMenu  = async(req,res,next) =>{
  try {
    const menu = await Menu.create(req.body)
    res.status(200).json({
      success:true,
      data: menu
    })
  }
  catch (error) {
    next(error)
  }
}

exports.updateMenu  = async(req,res,next) =>{
  try {
    let menu = await Menu.findById(req.params.id)

    if (!menu) {
      return next((`No menu found with this id: ${req.params.id}`),400)
    }

    menu = await Menu.findByIdAndUpdate(req.params.id,req.body,{
      new:true,
      runValidators : true
    })
    res.status(200).json({
      success:true,
      data: menu
    })
  }
  catch (error) {
    next(error)
  }
}

exports.deleteMenu  = async(req,res,next) =>{
  try {
    const  menu = await Menu.findById(req.params.id)

    if (!menu) {
      return next((`No menu found with this id: ${req.params.id}`),400)
    }

    await menu.remove()
    res.status(200).json({
      success:true,
      data: {}
    })
  }
  catch (error) {
    next(error)
  }
}