const express = require("express")
const {register,login, getMyInfo, updateUser, deleteUser} = require("../controllers/auth")

const router = express.Router()
const { protect,checkPermission } = require("../middelware/auth")

router.post("/register",protect,checkPermission("admin"),register)
router.post("/login",login)
router.get("/logged",protect,getMyInfo)

router.route("/:id")
  .put(protect,updateUser)
  .delete(protect,checkPermission("admin"),deleteUser)

module.exports = router