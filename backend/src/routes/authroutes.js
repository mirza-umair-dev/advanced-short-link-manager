import express,{ Router } from "express";
import { getmyProfile, logoutUser, refreshAccessToken, registerUser, resetPassword, resetPasswordToken, sendVerifyOtp, signinUser, verifyOtp } from "../controllers/authController.js";
import {defend, protect} from "../middlewares/authMiddleware.js";
import {authLimiter} from "../middlewares/limiter.js";
import validate from "../middlewares/validator.js";
import { registerSchema, resetPasswordSchema, resetPasswordTokenSchema, signinSchema } from "../schemas/authSchemas.js";

const router = express.Router();

router.post('/register',validate(registerSchema),registerUser);
router.post('/signin',authLimiter,validate(signinSchema),signinUser);
router.post('/logout',logoutUser);
router.get('/myprofile',protect,getmyProfile);
router.post('/sendotp',authLimiter,defend,sendVerifyOtp);
router.post('/verifyotp',authLimiter,defend,verifyOtp);
router.post('/reset-password-token',authLimiter,validate(resetPasswordTokenSchema),resetPasswordToken);
router.post('/reset-password/:token',authLimiter,validate(resetPasswordSchema),resetPassword);
router.post('/refresh', refreshAccessToken);
export default router;