import express,{ Router } from "express";
import { getmyProfile, logoutUser, registerUser, resetPassword, resetPasswordToken, sendVerifyOtp, signinUser, verifyOtp } from "../controllers/authController.js";
import protect from "../middlewares/authMiddleware.js";
import limiter from "../middlewares/limiter.js";

const router = express.Router();

router.post('/register',registerUser);
router.post('/signin',limiter,signinUser);
router.post('/logout',logoutUser);
router.get('/myprofile',protect,getmyProfile);
router.post('/sendotp',protect,sendVerifyOtp);
router.post('/verifyotp',protect,verifyOtp);
router.post('/reset-password-token',limiter,resetPasswordToken);
router.post('/reset-password/:token',limiter,resetPassword);
export default router;