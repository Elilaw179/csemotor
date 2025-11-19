

import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import baseRoute from "./routes/baseRoute.js";
import inventoryRoute from "./routes/inventoryRoute.js";
import errorRoute from "./routes/errorRoute.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// static files
app.use(express.static(path.join(__dirname, "public")));

// parse urlencoded bodies (if you later need forms)
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/", baseRoute);
app.use("/inventory", inventoryRoute);
app.use("/", errorRoute); // route for /cause-error

// 404 handler
app.use((req, res) => {
  res.status(404).render("errors/error", {
    title: "404 - Not Found",
    message: "Sorry — the page you requested cannot be found.",
    nav: ""
  });
});

// 500 error handler (must be last)
app.use((err, req, res, next) => {
  console.error("ERROR:", err);
  res.status(500).render("errors/error", {
    title: "500 - Server Error",
    message: "An unexpected error occurred. Please try again later.",
    nav: ""
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`CSE Motors running on port ${PORT}`));


