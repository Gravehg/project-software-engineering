const User = require("../models/userModel");
const Support = require("../models/supportModel");
const Ticket = require("../models/ticketModel");
const { format } = require("date-fns");

const getSupportTicketsByEmial = async (req, res) => {
  try {
    const email = req.params.email;
    console.log('email', email);
    const user = await User.findOne({ email: email });
    console.log('user', user);
    if (user) {
      const tickets = await Ticket.find({ idSupport: user._id });
      console.log('tickets', tickets);
      if (!tickets) {
        return res.status(404).json({ success: false, msg: "No tickets found" });
      }
      return res.status(200).json(tickets);
    }
    return res.status(404).json({ success: false, msg: "User not found" });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "There has been an error",
      error: error.msg,
    });
  }
};

const createNewSupportWithUser = async (req, res) => {
  try {
    // Busca el usuario con el correo proporcionado
    const user = await User.findOne({ email: req.body.email }).exec();
    user.roles.push("Support");
    await user.save();

    // Crear un nuevo soporte con el id del usuario recién creado

    const cateries = req.body.categoris.map((category) => {
      return category.category;
    });

    const newSupport = new Support({
      idUser: user._id,
      name: user.name,
      supportCategories: cateries,
    });
    await newSupport.save();

    // Devolver ok=true
    return res.status(200).json({ ok: true });
  } catch (error) {
    // Manejo de errores del servidor
    return res.status(500).json({
      success: false,
      msg: "There has been an error",
      error: error.msg,
    });
  }
};

const createNewUserSupport = async (req, res) => {
  try {
    // Crear un nuevo usuario con el correo proporcionado
    const newUser = new User({
      email: req.body.email,
      roles: ["Support"],
      name: req.body.name,
    });
    await newUser.save();

    // Crear un nuevo soporte con el id del usuario recién creado
    const cateries = req.body.categoris.map((category) => {
      return category.category;
    });

    const newSupport = new Support({
      idUser: newUser._id,
      name: newUser.name,
      supportCategories: cateries,
    });
    await newSupport.save();

    // Devolver ok=true
    return res.status(200).json({ ok: true });
  } catch (error) {
    // Manejo de errores del servidor
    return res
      .status(500)
      .json({ success: false, msg: "There has been an error" });
  }
};

const getExistingUsers = async (req, res) => {
  try {
    // Buscar un usuario por el correo proporcionado
    const user = await User.findOne({ email: req.params.email }).exec();

    // Si no se encuentra el usuario, devolver error 404
    if (!user) {
      return res
        .status(200)
        .json({ success: false, msg: "No users found with this email" });
    }

    // Si se encuentra el usuario, devolver ok=true
    return res.status(200).json({ ok: true });
  } catch (error) {
    // Manejo de errores del servidor
    return res
      .status(500)
      .json({ success: false, msg: "There has been an error" });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    const formattedUsers = users.map((user) => {
      const userRole = getUserRole(user);
      return {
        _id: user._id,
        name: user.name,
        email: user.email,
        creationDate: format(user.creationDate, "dd/MM/yyyy"),
        role: userRole,
      };
    });

    return res.status(201).json(formattedUsers);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, msg: "There has been an error" });
  }
};

const getExistingSupports = async (req, res) => {
  try {
    // Buscar el usuario por el correo proporcionado
    const user = await User.findOne({ email: req.params.email }).exec();

    // Si no se encuentra el usuario, devolver error 404
    if (!user) {
      return res.status(200).json({ success: false, msg: "User not found" });
    }

    // Verificar si el rol "Support" está presente en la lista de roles
    const hasSupportRole = user.roles.includes("Support");

    // Si tiene el rol "Support", devolver ok=true
    if (hasSupportRole) {
      return res.status(200).json({ ok: true });
    } else {
      // Si no tiene el rol, devolver ok=false
      return res
        .status(200)
        .json({ ok: false, msg: "User does not have Support role" });
    }
  } catch (error) {
    // Manejo de errores de servidor
    return res
      .status(500)
      .json({ success: false, msg: "There has been an error" });
  }
};

const getUserRole = (user) => {
  if (user.roles.includes("GlobalOrganizer")) {
    return "Global Organizer";
  } else if (user.roles.includes("Support")) {
    return "Support";
  } else {
    return "User";
  }
};

const getUserAndTickets = async (req, res) => {
  try {
    const { findUserId } = req.body;
    const user = await User.findById(findUserId);
    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }
    const userRole = getUserRole(user);
    const response = {
      _id: user._id,
      name: user.name,
      email: user.email,
      creationDate: format(user.creationDate, "dd/MM/yyyy"),
      role: userRole,
    };

    const isSupp = await Support.findOne({
      idUser: findUserId,
    });

    let query = {};

    if (isSupp) {
      query = { idSupport: isSupp._id };
    } else {
      query = { idUserIssued: findUserId };
    }

    const tickets = await Ticket.find(query).sort({ creationDate: -1 }).exec();

    const ticketsformmated = tickets.map((item) => ({
      _id: item._id,
      userName: item.idUserIssued.name,
      category: item.category,
      topic: item.topic,
      creationDate: format(new Date(item.creationDate), "dd/MM/yyyy"),
      closureState: item.closureState,
      resolutionState: item.resolutionState,
    }));
    return res.status(201).json({
      user: response,
      tickets: ticketsformmated,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, msg: "There has been an error" });
  }
};

const assignTicket = async (req, res) => {
  try {
    const userPayLoad = req.userPayLoad;
    const supportPayLoad = userPayLoad.supportInfo;
    const ticketId = req.body.ticketId;
    const ticket = await Ticket.findOne({
      _id: ticketId,
      $or: [{ idSupport: { $exists: false } }, { idSupport: null }],
    });

    if (!ticket) {
      return res.status(400).json({
        success: false,
        msg: "Ticket already assigned to support",
        assigned: true,
      });
    }

    ticket.idSupport = supportPayLoad.id;
    await ticket.save();

    return res
      .status(200)
      .json({ success: true, msg: "The ticket has been assigned correctly" });
  } catch {
    res.status(500).json({ success: false, msg: "There has been an error" });
  }
};

module.exports = {
  getExistingUsers,
  getExistingSupports,
  createNewUserSupport,
  createNewSupportWithUser,
  getUsers,
  getUserAndTickets,
  assignTicket,
  getSupportTicketsByEmial,
};
