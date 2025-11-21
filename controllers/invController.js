



import inventoryModel from "../models/inventory-model.js";
import utilities from "../utilities/index.js";

const invController = {};


invController.buildByClassification = async (req, res, next) => {
  const classificationName = req.params.classificationName;

  try {
    const vehicles = await inventoryModel.getVehiclesByClassification(classificationName);

    if (!vehicles || vehicles.length === 0) {
      const err = new Error("No vehicles found for this classification");
      err.status = 404;
      return next(err);
    }

    const listHTML = utilities.buildClassificationGrid(vehicles);

    res.render("inventory/classification", {
      title: `${classificationName} Vehicles`,
      nav: await utilities.getNav(),
      classificationName,
      listHTML
    });
  } catch (error) {
    next(error);
  }
};

// Detail page
invController.buildDetailView = async (req, res, next) => {
  const inv_id = parseInt(req.params.inv_id);

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
    next(error);
  }
};

export default invController;
