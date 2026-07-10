import express,{ Router } from "express";
import { getmyProfile, registerUser, resetPassword, sendOtpMail, signinUser, verifyToken } from "../controllers/authController.js";
import protect from "../middlewares/protect.js";

const router = express.Router();

router.post('/register',registerUser);
router.post('/signin',signinUser);
router.get('/myprofile',protect,getmyProfile);
router.post('/reset-password',resetPassword);
router.post('reset-password/verify-token',verifyToken);
router.post('/sendotp',sendOtpMail);
export default router;