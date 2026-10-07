import express from "express";
import isAuthenticated from "../Middleware/isAuthenticated.middleware.js";
import { applyJob, getApplicants, updateStatus, getAppliedJob } from "../controllers/application.controller.js";

const router = express.Router();

router.route("/apply/:id").get(isAuthenticated, applyJob);
router.route("/get").get(isAuthenticated, getAppliedJob);
router.route("/:id/applicants").get(isAuthenticated, getApplicants);
router.route("/status/:id/update").post(isAuthenticated, updateStatus)

export default router;