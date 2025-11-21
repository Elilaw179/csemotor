


import express from "express";
import invController from "../controllers/invController.js";
import utilities from "../utilities/index.js";

const router = express.Router();


router.get(
  "/classification/:classificationName",
  utilities.handleErrors(invController.buildByClassification)
);

router.get(
  "/detail/:inv_id",
  utilities.handleErrors(invController.buildDetailView)
);

// Trigger error
router.get(
  "/error",
  utilities.handleErrors(invController.triggerError)
);

export default router;
