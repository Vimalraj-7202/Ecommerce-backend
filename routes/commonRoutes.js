import express from "express";
import userRoute from './userRoute.js'
import productRoute from './productRoute.js'
import cartRoute from './cartRoute.js'
import authRoute from './authRoute.js'

const router=express.Router();
router.use('/users',userRoute);
router.use('/product',productRoute);
router.use('/cart',cartRoute);
router.use('/login',authRoute);

export default router;