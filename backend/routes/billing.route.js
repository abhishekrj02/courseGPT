import express from "express";
import {
    getSubscription,
    subscribe,
    cancelSubscription,
} from "../controllers/billing.controller.js";

const router = express.Router();

router.get("/", getSubscription);
router.post("/subscribe", subscribe);
router.post("/cancel", cancelSubscription);

export default router;
