const SupportCategory = require("../models/supportCategoryModel");

const getCategories = async (req, res) => {
  try {
    const categories = await SupportCategory.find();
    if (!categories) {
      return res
        .status(400)
        .json({ success: false, msg: "Could not find categories" });
    }
    const r_categories = categories.map((category) => {
      const { __v, ...rest } = category.toObject();
      return rest;
    });
    return res.status(201).json(r_categories);
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, msg: "Error retrieving  categories" });
  }
};

const addCategory = async (req, res) => {
  const name = req.body.name;
  if (!name) {
    return res
      .status(500)
      .json({ success: false, msg: "Name must be a non empty string" });
  }

  const newCategory = await SupportCategory.create({ name: name });
  if (!newCategory) {
    return res
      .status(500)
      .json({ success: false, msg: "There was an error creating category" });
  }

  return res
    .status(201)
    .json({ success: true, msg: "Created category successfully" });
};

const getCategoriesLessOne = async (req, res) => {
  try {
    const categoryID = req.query.categoryID;
    const categories = await SupportCategory.find({ _id: { $ne: categoryID } });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getCategories, addCategory,getCategoriesLessOne };
