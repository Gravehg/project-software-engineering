const Ticket = require("../models/ticketModel");

const getTicketById = async (req, res) => {
    try {
      const ticketID = req.query.ticketID; 
      const ticket = await Ticket.findById(ticketID)
      .populate('idUserIssued') 
      .populate('idSupport') 
      .exec();
      if (!ticket) {
        return res.status(404).json({ success: false, msg: 'Ticket not found.' });
      }
      const ticketData = {
        _id: ticket._id,
        idUserIssued: ticket.idUserIssued._id,
        userName: ticket.idUserIssued.name,
        idSupport: ticket.idSupport._id,
        supportName: ticket.idSupport.name,
        resolutionState: ticket.resolutionState,
        closureState: ticket.closureState,
        topic: ticket.topic
      };
      return res.status(200).json({ success: true, ticket: ticketData });
    } catch (error) {
      console.error('Error al obtener el ticket:', error);
      return res.status(500).json({ success: false, msg: 'There have been an error while trying to get the Ticket' });
    }
};

const updateClosureState = async (req, res) => {
  try {
    const { ticketID, newClosureState } = req.body;
    if (!ticketID || !newClosureState) {
      return res.status(400).json({ success: false, msg: 'ticketID and newClosureState are required' });
    }
    const result = await Ticket.updateOne(
      { _id: ticketID},
      { $set: { closureState: newClosureState } }
    );
    
    if (result.modifiedCount > 0) {
      return res.status(200).json({ success: true, msg: 'closureState updated' });
    } else {
      return res.status(404).json({ success: false, msg: 'Ticket not found' });
    }
  } catch (error) {
    console.error('Error al actualizar el estado:', error);
    return res.status(500).json({ success: false, msg: 'There have been an error while changing closureState' });
  }
};

module.exports = { getTicketById,updateClosureState};