import express from "express";
import path from "path";

const router = new express.Router();

router.get("/", (req, res) => {
  res.render("index", { title: "CSE Motors" });
});

export default router;
