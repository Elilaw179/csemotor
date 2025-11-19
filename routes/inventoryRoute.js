import express from "express";
import invController from "../controllers/invController.js";
import utilities from "../utilities/index.js";

const router = new express.Router();

// Example classification listing (placeholder)
router.get("/classification/:classificationName", utilities.handleErrors(invController.buildByClassification));

// Detail route (assignment requirement)
router.get("/detail/:inv_id", utilities.handleErrors(invController.buildDetailView));

export default router;
