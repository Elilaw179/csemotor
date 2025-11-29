


// controllers/invController.js
import inventoryModel from "../models/inventory-model.js"
import classificationModel from "../models/classification-model.js"

const invController = {}

// VEHICLES BY CLASSIFICATION
invController.buildByClassificationId = async (req, res) => {
  const classification_id = req.params.classificationId
  const data = await inventoryModel.getInventoryByClassificationId(classification_id)

  res.render("inventory/inventory", {
    title: data.length ? `${data[0].classification_name} Vehicles` : "Vehicles",
    vehicles: data,
    message: req.flash("message")
  })
}

// MANAGEMENT VIEW
invController.buildManagement = async (req, res) => {
  const classifications = await classificationModel.getClassifications()

  res.render("inventory/management", {
    title: "Vehicle Management",
    classifications,
    message: req.flash("message")
  })
}

// ADD CLASSIFICATION VIEW
invController.buildAddClassification = (req, res) => {
  res.render("inventory/add-classification", {
    title: "Add New Classification",
    message: req.flash("message")
  })
}

// PROCESS CLASSIFICATION
invController.addClassification = async (req, res) => {
  const { classification_name } = req.body
  const result = await classificationModel.addClassification(classification_name)

  if (result) {
    req.flash("message", "Classification added successfully.")
    return res.redirect("/inv")
  }

  req.flash("message", "Failed to add classification.")
  res.redirect("/inv/add-classification")
}

// ADD VEHICLE VIEW
invController.buildAddVehicle = async (req, res) => {
  const classifications = await classificationModel.getClassifications()

  res.render("inventory/add-vehicle", {
    title: "Add New Vehicle",
    classifications,
    errors: null,
    message: req.flash("message")
  })
}

// PROCESS VEHICLE
invController.addVehicle = async (req, res) => {
  const vehicleData = req.body
  const insert = await inventoryModel.addVehicle(vehicleData)

  if (insert) {
    req.flash("message", "Vehicle added successfully.")
    return res.redirect("/inv")
  }

  req.flash("message", "Failed to add vehicle.")
  res.redirect("/inv/add-vehicle")
}

export default invController

