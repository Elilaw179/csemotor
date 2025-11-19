import pool from "../database/connection.js";


export async function getVehicleByInvId(inv_id) {
  try {
    const sql = `SELECT inv_id, inv_make, inv_model, inv_year, inv_price, inv_miles,
                        inv_image, inv_description, inv_color
                 FROM inventory
                 WHERE inv_id = $1`;
    const result = await pool.query(sql, [inv_id]);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
}

export default {
  getVehicleByInvId
};
