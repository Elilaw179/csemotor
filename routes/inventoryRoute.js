

// routes/inventoryRoute.js
import express from "express"
import invController from "../controllers/invController.js"
import { 
  classificationRules, checkClassificationResult,
  vehicleRules, checkVehicleResult 
} from "../middleware/validators.js"

const router = express.Router()

// VEHICLES BY CLASSIFICATION
router.get("/type/:classificationId", invController.buildByClassificationId)

// MANAGEMENT VIEW
router.get("/", invController.buildManagement)

// ADD CLASSIFICATION
router.get("/add-classification", invController.buildAddClassification)
router.post(
  "/add-classification",
  classificationRules(),
  checkClassificationResult,
  invController.addClassification
)

// ADD VEHICLE
router.get("/add-vehicle", invController.buildAddVehicle)
router.post(
  "/add-vehicle",
  vehicleRules(),
  checkVehicleResult,
  invController.addVehicle
)

export default router
