import inventoryModel from "../models/inventory-model.js";
import utilities from "../utilities/index.js";

const invController = {};


invController.buildByClassification = async (req, res, next) => {
  const classification = req.params.classificationName || "All";
  // In a full solution you would fetch vehicles by classification here.
  // For now Irender a simple page (you can expand with DB queries).
  res.render("inventory/classification", {
    title: `${classification} Vehicles`,
    classification,
    nav: await utilities.getNav()
  });
};

/**
 * Build the detail view for a single vehicle.
 * Path: /inventory/detail/:inv_id
 */
invController.buildDetailView = async (req, res, next) => {
  const inv_id = parseInt(req.params.inv_id, 10);

  if (Number.isNaN(inv_id)) {
    // invalid id -> 404
    const err = new Error("Invalid vehicle id");
    err.status = 404;
    return next(err);
  }

  try {
    const vehicle = await inventoryModel.getVehicleByInvId(inv_id);
    if (!vehicle) {
      const err = new Error("Vehicle not found");
      err.status = 404;
      return next(err);
    }

    const detailHTML = utilities.buildVehicleDetailHTML(vehicle);

    res.render("inventory/detail", {
      title: `${vehicle.inv_make} ${vehicle.inv_model}`,
      nav: await utilities.getNav(),
      detailHTML
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * Trigger an intentional server error (Task 3)
 */
invController.triggerError = (req, res, next) => {
  // throw synchronous error to be caught by error middleware
  throw new Error("Intentional 500 error triggered for testing");
};

export default invController;
