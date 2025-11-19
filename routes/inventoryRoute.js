// import express from "express";
// import invController from "../controllers/invController.js";
// import utilities from "../utilities/index.js";

// const router = new express.Router();

// // Example classification listing (placeholder)
// router.get("/classification/:classificationName", utilities.handleErrors(invController.buildByClassification));

// // Detail route (assignment requirement)
// router.get("/detail/:inv_id", utilities.handleErrors(invController.buildDetailView));

// export default router;


// import express from "express";
// import invController from "../controllers/invController.js";
// import utilities from "../utilities/index.js";

// const router = new express.Router();

// // List inventory by classification (given)
// router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassification));

// // Vehicle detail page (working)
// router.get("/detail/:invId", utilities.handleErrors(invController.buildDetailView));

// // ⭐ REQUIRED: Inventory home page
// router.get("/", utilities.handleErrors(invController.buildInventoryHome));

// export default router;







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
