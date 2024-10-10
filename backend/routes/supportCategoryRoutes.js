const express = require("express");
const {
  addCategory,
  getCategories,getCategoriesLessOne
} = require("../controllers/supportCategoryController");
const router = express.Router();

router.get("/get-categories", getCategories);
router.get("/getCategoriesLessOne", getCategoriesLessOne);
router.post("/add-category", addCategory);

module.exports = router;
