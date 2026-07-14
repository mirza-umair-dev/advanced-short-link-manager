import express,{ Router } from "express";
import { deleteLink, generateLink, getLink } from "../controllers/linkController.js";
import protect from "../middlewares/authMiddleware.js";
import getAnalytics from "../controllers/clicktrackController.js";
import { getDashboardData } from "../controllers/dashboardDataController.js";


const router = express.Router();
router.post('/api/link/generate-link',protect,generateLink);
router.get('/:shortId',getAnalytics);
// router.get('/:shortId',getLink);
router.delete('/:shortId',protect,deleteLink);
router.get('/api/link/get-data',protect,getDashboardData);
export default router;