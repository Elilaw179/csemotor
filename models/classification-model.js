import pool from "../database/connection.js";

const classificationModel = {};

// GET all classifications
classificationModel.getClassifications = async () => {
  const result = await pool.query("SELECT * FROM classification ORDER BY classification_name ASC");
  return result.rows;
};

// INSERT new classification
classificationModel.addClassification = async (name) => {
  try {
    const sql = "INSERT INTO classification (classification_name) VALUES ($1) RETURNING *";
    const result = await pool.query(sql, [name]);
    return result.rows[0];
  } catch (err) {
    console.log("Classification insert error:", err);
    return null;
  }
};

export default classificationModel;
