import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ---------EJS setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// -------------Static files--------
app.use(express.static(path.join(__dirname, "public")));

// -----------Index route---
app.get("/", (req, res) => {
  res.render("index");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`CSE Motors running on port ${PORT}`));
