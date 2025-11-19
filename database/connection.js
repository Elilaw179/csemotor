


 import pg from "pg";

const pool = new pg.Pool({
  host: "dpg-d4am8m7pm1nc7399tmig-a.oregon-postgres.render.com",
  database: "banner_db_rebuild_rsmt",
  user: "banner_db_rebuild_rsmt_user",
  password: "viucfBVpoQQExTRY0y8eVliJyjvkleWa",
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  }
});

export default pool;
