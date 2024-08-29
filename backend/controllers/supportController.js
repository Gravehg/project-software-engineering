const SupportCategory = require("./supportCategoryController");

const getAssignedTickets = (req, res) => {
  const userPayLoad = req.userPayLoad;
  const supportPayLoad = userPayLoad.supportInfo;
  console.log(supportPayLoad);
  return res.status(200).json({ success: true, msg: "Testing" });
};

const getSupportCategories = (req, res) => {
  const userPayLoad = req.userPayLoad;
  const supportPayLoad = userPayLoad.supportInfo;
  const supportCategories = supportPayLoad.supportCategories;
  const r_categories = supportCategories.map((category) => {
    const { __v, ...rest } = category.toObject();
    return rest;
  });
  return res.status(201).json(r_categories);
};

module.exports = { getAssignedTickets, getSupportCategories };
