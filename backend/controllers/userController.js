const Ticket = require("../models/ticketModel");
const User = require("../models/userModel");
const { format } = require("date-fns");

const comprobateTicketSupport = async (req, res) => {
  try {
    const { ticketId } = req.params; // Obtener el ID del ticket desde los parámetros de la URL

    // Buscar el ticket en la base de datos por su ID
    const ticket = await Ticket.findById(ticketId);
    console.log("Ticket: ", ticket);
    if (!ticket) {
      // Si el ticket no existe, devuelve un 404 (no encontrado)
      return res.status(404).json({ success: false, message: 'Ticket not found' });
    }

    // Comprobar si el campo idSupport es null
    const isSupportNull = !(ticket.idSupport === null);

    // Devolver true o false dependiendo del valor de idSupport
    return res.status(200).json({ success: true, isSupportNull });
  } catch (error) {
    // Manejar cualquier error que ocurra durante la ejecución
    console.error('Error in comprobateTicketSupport:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};


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

const getUserTicketsMovil = async (req, res) => {
  const userId = req.params.userId;
  console.log("userId: ", userId);
  try {
    const tickets = await Ticket.find({
      idUserIssued: userId,
    })
      .populate("idUserIssued")
      .populate("category")
      .sort({ creationDate: -1 })
      .exec();

    const formattedTickets = tickets.map((ticket) => {
      const formattedDate = format(new Date(ticket.creationDate), "dd/MM/yyyy");
      return {
        _id: ticket._id.toString(),
        idUserIssued: ticket.idUserIssued._id.toString(),
        idSupport: ticket.idSupport ? ticket.idSupport.toString() : null,
        resolutionState: ticket.resolutionState,
        closureState: ticket.closureState,
        category: ticket.category.name,
        topic: ticket.topic,
        creationDate: ticket.creationDate.toISOString(),
        email: ticket.idUserIssued.email,
        date: formattedDate,
      };
    });
    return res.status(200).json(formattedTickets);
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, msg: "There has been an error" });
  }
}
module.exports = { getUserTickets, getUserCategories, comprobateTicketSupport, getUserTicketsMovil };
