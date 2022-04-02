const express=require("express");

const {loginAdmin,logoutAdmin,loggedInAdmin,updateAdmin}=require("../controller/adminController");

const auth=require("../middleware/auth.js");

const router=express.Router();



// router.post("/addAdmin",addAdmin);
router.post("/login",loginAdmin);
router.get("/logout",logoutAdmin);
router.get("/loggedIn",loggedInAdmin);
router.put("/updateAdmin",auth,updateAdmin);


module.exports=router;