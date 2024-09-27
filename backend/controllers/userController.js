const Ticket = require("../models/ticketModel");
const User = require("../models/userModel");
const { format } = require("date-fns");

const getUserTickets = async (req, res) => {
  try {
    const userPayLoad = req.userPayLoad;

    // Buscar los tickets donde el usuario es el propietario
    const tickets = await Ticket.find({
      idUserIssued: userPayLoad.userId,
    })
      .populate("idUserIssued")
      .populate("category")
      .sort({ creationDate: -1 })
      .exec();

    // Opcional: Si se necesita más información sobre el usuario
    const user = await User.findById(userPayLoad.userId);

    // Convertir los tickets al formato que coincida con la interfaz UsertTicket
    const formattedTickets = tickets.map((ticket) => {
      // Formatear la fecha al formato deseado
      const formattedDate = format(new Date(ticket.creationDate), "dd/MM/yyyy");

      return {
        _id: ticket._id.toString(),
        idUserIssued: ticket.idUserIssued._id.toString(),
        idSupport: ticket.idSupport ? ticket.idSupport.toString() : null,
        resolutionState: ticket.resolutionState,
        closureState: ticket.closureState,
        category: ticket.category.name, // Aquí es 'Technology', no el ID
        topic: ticket.topic,
        creationDate: ticket.creationDate.toISOString(),
        email: ticket.idUserIssued.email,
        date: formattedDate, // Fecha en formato 'dd/MM/yyyy'
      };
    });
    return res.status(200).json(formattedTickets);
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
