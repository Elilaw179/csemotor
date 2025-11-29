import { body, validationResult } from "express-validator";

export const classificationRules = () => {
  return [
    body("classification_name")
      .trim()
      .isAlpha()
      .withMessage("Name must contain only letters.")
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters.")
  ];
};

export const checkClassificationResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash("message", errors.array()[0].msg);
    return res.redirect("/inventory/add-classification");
  }
  next();
};

export const vehicleRules = () => {
  return [
    body("inv_make").isLength({ min: 3 }).withMessage("Make must be 3+ chars"),
    body("inv_model").isLength({ min: 3 }).withMessage("Model must be 3+ chars"),
    body("inv_price").isNumeric().withMessage("Price must be a number"),
    body("inv_year").isLength({ min: 4, max: 4 }).withMessage("Year must be 4 digits"),
    body("inv_miles").isNumeric().withMessage("Miles must be a number")
  ];
};

export const checkVehicleResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash("message", errors.array()[0].msg);
    return res.redirect("/inventory/add-vehicle");
  }
  next();
};
