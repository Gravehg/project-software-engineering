const express = require("express");
const {
  addCategory,
  getCategories,
} = require("../controllers/supportCategoryController");
const router = express.Router();

router.get("/get-categories", getCategories);
router.post("/add-category", addCategory);

module.exports = router;
