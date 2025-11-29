

import pool from "../database/connection.js";

const inventoryModel = {};



inventoryModel.getInventoryByClassificationId = async (id) => {
  try {
    const sql = `
      SELECT i.*, c.classification_name
      FROM inventory i
      JOIN classification c 
      ON i.classification_id = c.classification_id
      WHERE c.classification_id = $1
    `;

    const result = await pool.query(sql, [id]);
    return result.rows;
  } catch (err) {
    console.log("Error loading inventory by classification:", err);
    return [];
  }
};




inventoryModel.getVehiclesByClassificationId = async (classificationId) => {
  try {
    const sql = `
      SELECT i.*, c.classification_name 
      FROM inventory i
      JOIN classification c
      ON i.classification_id = c.classification_id
      WHERE i.classification_id = $1
    `;
    const result = await pool.query(sql, [classificationId]);
    return result.rows;
  } catch (err) {
    console.log("getVehiclesByClassificationId error:", err);
    return null;
  }
};




// ============================
// INSERT NEW VEHICLE
// ============================
inventoryModel.addVehicle = async (v) => {
  try {
    const sql = `
      INSERT INTO inventory 
      (classification_id, inv_make, inv_model, inv_description, inv_image, inv_thumbnail, inv_price, inv_year, inv_miles, inv_color) 
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
      RETURNING *
    `;

    const data = [
      v.classification_id,
      v.inv_make,
      v.inv_model,
      v.inv_description,
      v.inv_image,
      v.inv_thumbnail,
      v.inv_price,
      v.inv_year,
      v.inv_miles,
      v.inv_color
    ];

    const result = await pool.query(sql, data);
    return result.rows[0];

  } catch (err) {
    console.log("Vehicle insert error:", err);
    return null;
  }
};

export default inventoryModel;
