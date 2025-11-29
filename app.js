

 // app.js
import express from "express"
import path from "path"
import { fileURLToPath } from "url"
import session from "express-session"
import flash from "connect-flash"

// Routers
import classificationModel from "./models/classification-model.js";

import inventoryRouter from "./routes/inventoryRoute.js"

const app = express()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// View engine
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

// Static
app.use(express.static(path.join(__dirname, "public")))

// Body parsing
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Sessions
app.use(
  session({
    secret: "super-secret-key",
    resave: false,
    saveUninitialized: false,
  })
)
app.use(flash())

// Flash global availability
app.use((req, res, next) => {
    res.locals.message = req.flash("message")
    res.locals.errors = req.flash("errors")
    next()
})





// Routes
app.use(async (req, res, next) => {
  const classifications = await classificationModel.getClassifications();
  res.locals.classifications = classifications;
  next();
});





app.use("/inv", inventoryRouter)

app.get("/", (req, res) => {
  res.render("index", { title: "Home" })
})

// 404
app.use((req, res) => {
  res.status(404).render("error", {
    title: "404 Not Found",
    message: "The page you requested does not exist.",
  })
})

// 500
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).render("error", {
    title: "500 Error",
    message: "A server error occurred.",
  })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`CSE Motors running on ${PORT}`))
