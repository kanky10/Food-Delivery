import express from "express";
import { listOrders, placeOrder, updateStatus, userOrders } from "../controllers/orderController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.post("/place", authMiddleware, placeOrder);
router.post("/get-user-orders", authMiddleware, userOrders);
router.get("/list", authMiddleware, listOrders);
router.post("/list", authMiddleware, listOrders);
router.post("/update-status", authMiddleware, updateStatus);

export default router;