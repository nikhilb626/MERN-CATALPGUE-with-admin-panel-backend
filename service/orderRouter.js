const express=require("express");

const {addOrder,getOrders,countOrders,getOrderbyId}=require("../controller/orderController");


const auth=require("../middleware/auth");


const router=express.Router();



router.post("/addOrder",addOrder);
router.get("/getOrder",auth,getOrders);
router.get('/countingorders',auth,countOrders);
router.get("/getOrderdetail/:id",auth,getOrderbyId);






module.exports=router;