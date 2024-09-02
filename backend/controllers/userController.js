const Ticket = require("../models/ticketModel");
const User = require("../models/userModel");

const getUserTickets = async (req, res) => {
  try {
    const userPayLoad = req.userPayLoad;
    
    // Buscar los tickets donde el usuario es el propietario
    const tickets = await Ticket.find({
      idUser: userPayLoad._id,
    })
      .sort({ creationDate: -1 })
      .exec();

    // Opcional: Si se necesita más información sobre el usuario
    const user = await User.findById(userPayLoad._id);

    // Agregar el nombre de usuario a los tickets
    const ticketsWithUserName = tickets.map((ticket) => ({
      ...ticket.toObject(),
      userName: user.name,
    }));

    return res.status(200).json(ticketsWithUserName);
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, msg: "There has been an error" });
  }
};

const getUserCategories = (req, res) => {
  const userPayLoad = req.userPayLoad;
  const supportPayLoad = userPayLoad.supportInfo;
  const supportCategories = supportPayLoad.supportCategories;
  const r_categories = supportCategories.map((category) => {
    const { __v, ...rest } = category.toObject();
    return rest;
  });
  return res.status(201).json(r_categories);
};

module.exports = { getUserTickets, getUserCategories };