import express,{ Router } from "express";
import { getmyProfile, registerUser, resetPassword, sendVerifyOtp, signinUser, verifyOtp, verifyToken } from "../controllers/authController.js";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post('/register',registerUser);
router.post('/signin',signinUser);
router.get('/myprofile',protect,getmyProfile);
router.post('/sendotp',protect,sendVerifyOtp);
router.post('/verifyotp',protect,verifyOtp);

router.post('/reset-password',resetPassword);
router.post('reset-password/verify-token',verifyToken);
export default router;