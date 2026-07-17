import express,{ Router } from "express";
import { deleteLink, generateLink, getDashboardData, getLinkandAnlytics } from "../controllers/linkController.js";
import protect from "../middlewares/authMiddleware.js";
import isAdmin from "../middlewares/isAdmin.js";
import adminDashboardData from "../controllers/adminDashboardData.js";
import validate from "../middlewares/validator.js";
import { generateLinkSchema } from "../schemas/linkSchemas.js";


const router = express.Router();
router.post('/api/link/generate-link',protect,validate(generateLinkSchema),generateLink);
router.get('/:shortId',getLinkandAnlytics);
router.delete('/:shortId',protect,deleteLink);
router.get('/api/link/get-data',protect,getDashboardData);
router.get('/admin/dashboard',protect,isAdmin,adminDashboardData);
export default router;