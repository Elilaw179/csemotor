




import pool from "../database/connection.js";

async function getVehicleByInvId(inv_id) {
  const sql = `
    SELECT inv_id, inv_make, inv_model, inv_year, inv_price,
           inv_miles, inv_image, inv_description, inv_color
    FROM inventory
    WHERE inv_id = $1
  `;
  const data = await pool.query(sql, [inv_id]);
  return data.rows[0];
}


async function getVehiclesByClassification(name) {
  const sql = `
    SELECT i.inv_id, i.inv_make, i.inv_model, i.inv_price, i.inv_image
    FROM inventory i
    JOIN classification c
      ON i.classification_id = c.classification_id
    WHERE c.classification_name = $1
  `;
  const data = await pool.query(sql, [name]);
  return data.rows;
}

export default {
  getVehicleByInvId,
  getVehiclesByClassification
};
