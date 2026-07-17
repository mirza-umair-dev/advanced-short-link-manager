import express,{ Router } from "express";
import { getmyProfile, logoutUser, registerUser, resetPassword, resetPasswordToken, sendVerifyOtp, signinUser, verifyOtp } from "../controllers/authController.js";
import protect from "../middlewares/authMiddleware.js";
import limiter from "../middlewares/limiter.js";
import validate from "../middlewares/validator.js";
import { registerSchema, resetPasswordSchema, resetPasswordTokenSchema, signinSchema } from "../schemas/authSchemas.js";

const router = express.Router();

router.post('/register',validate(registerSchema),registerUser);
router.post('/signin',limiter,validate(signinSchema),signinUser);
router.post('/logout',logoutUser);
router.get('/myprofile',protect,getmyProfile);
router.post('/sendotp',protect,sendVerifyOtp);
router.post('/verifyotp',protect,verifyOtp);
router.post('/reset-password-token',limiter,validate(resetPasswordTokenSchema),resetPasswordToken);
router.post('/reset-password/:token',limiter,validate(resetPasswordSchema),resetPassword);
export default router;