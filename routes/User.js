const express =require("express")
const router =express.Router()
const{createUser,getAllUserDetails,updateUserDetails,deleteUser}=require("../controllers/Profile")
router.post("/createUser",createUser);
router.get("/getUser",getAllUserDetails)
router.put("/updateUser",updateUserDetails)
router.delete("/deleteUser",deleteUser)
module.exports =router;