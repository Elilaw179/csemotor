

import express from "express";
import invController from "../controllers/invController.js";
import utilities from "../utilities/index.js";

const router = express.Router();

// Show classification list or default view
router.get(
  "/",
  utilities.handleErrors(invController.buildByClassification)
);

// Detail view
router.get(
  "/detail/:inv_id",
  utilities.handleErrors(invController.buildDetailView)
);

// Intentional error test (footer link)
router.get(
  "/error",
  utilities.handleErrors(invController.triggerError)
);

export default router;
