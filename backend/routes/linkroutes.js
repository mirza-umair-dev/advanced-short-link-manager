import express,{ Router } from "express";
import { generateLink, getLink } from "../controllers/linkController.js";


const router = express.Router();
router.post('/generate-link',generateLink);
router.get('/get-link',getLink);

export default router;