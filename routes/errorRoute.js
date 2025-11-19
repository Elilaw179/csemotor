import express from "express";
import invController from "../controllers/invController.js";
import utilities from "../utilities/index.js";

const router = new express.Router();

// Footer link target to intentionally cause a 500 error (Task 3)
router.get("/cause-error", utilities.handleErrors(invController.triggerError));

export default router;
