const express=require("express");
const { authMiddleware } = require("../middleware/auth");
const { placeOrder, verifyOrder, userOrder } = require("../controllers/orderController");
const router=express.Router();

router.post("/place",authMiddleware,placeOrder);


router.post("/verify",verifyOrder)

router.post("/userOrders",authMiddleware,userOrder)





module.exports=router