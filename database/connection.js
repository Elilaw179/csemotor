


// import pg from "pg";

// const pool = new pg.Pool({
//   host: "localhost",
//   port: 5432,
//   database: "RenderDB",
//   user: "postgres",
//   password: "12345"
// });

// export default pool;



import pg from "pg";

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

export default pool;
