const Pages = require("../models/Pages")

exports.getPages = async(req,res,next) =>{
  try {
    console.log(req.user)
    res.status(200).json(res.result)
  } catch (error) {
    next(error)
  }
}

exports.getPage = async(req,res,next) =>{
  try {
    const page = await Pages.findById(req.params.id)

    if (!page) {
      return next((`No page found with this id: ${req.params.id}`,404))
    }

    res.status(200).json({succes:true,data:page})
  } catch (error) {
    next(error)
  }
}

exports.createPage = async(req,res,next) =>{
  try {
    req.body.creator =  req.user.id
    const page = await Pages.create(req.body)
    res.status(201).json({
      success: true,
      data: page
    })
  } catch (error) {
    next(error)
  }
}

exports.updatePage =async (req,res,next) =>{
  try {
    req.body.modifiedBy = req.user.id
    const page = await Pages.findByIdAndUpdate(req.params.id,req.body,{
      new :true,
      runValidators: true
    })

    if (!page) {
      return next((`No page found with this id: ${req.params.id}`,404))
    }

    res.status(200).json({success:true,data:page})
  } catch (error) {
    next(error)
  }
}

exports.deletePage = async(req,res,next) =>{
  try {
    const page = await Pages.findByIdAndDelete(req.params.id)

    if (!page) {
      return next((`No page found with this id: ${req.params.id}`,404))
    }

    res.status(200).json({success:true,data:{}})
  } catch (error) {
    next(error)
  }
}