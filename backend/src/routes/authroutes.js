import express,{ Router } from "express";
import { getmyProfile, registerUser, resetPassword, resetPasswordToken, sendVerifyOtp, signinUser, verifyOtp } from "../controllers/authController.js";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post('/register',registerUser);
router.post('/signin',signinUser);
router.get('/myprofile',protect,getmyProfile);
router.post('/sendotp',protect,sendVerifyOtp);
router.post('/verifyotp',protect,verifyOtp);
router.post('/reset-password-token',resetPasswordToken);
router.post('/reset-password/:token',resetPassword);
export default router;