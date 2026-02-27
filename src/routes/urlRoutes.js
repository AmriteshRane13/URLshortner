const express = require("express");
const router = express.Router();
const urlController = require("../controllers/urlController");

router.get("/", (req, res) => {
  res.render("index");
});
router.post("/shorten", urlController.acceptURL);
router.get("/:short_code", urlController.shortURL);

module.exports = router;
