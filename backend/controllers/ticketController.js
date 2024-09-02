const Ticket = require("../models/ticketModel");
const Chat = require("../models/chatModel");
const Message = require("../models/messageModel");


//Crea el tickete de manera completa, añadiendo su chat correspondiente y su primer mensaje.
const addTicket = async (req, res) => {
    console.log("mensaje addticket");
    const userID = req.userPayLoad.userId;
    const newTicket = new Ticket({
        idUserIssued: userID,
        resolutionState:'Not resolved',
        closureState:'Open',
        category:req.body.category,
        topic:req.body.topic,
        creationDate:new Date()
    });
    newTicket.save().then(nTicket=>{
        addNewChat(nTicket._id, userID,''/*'idSupport'*/,req.body.text);
    })
    return res
    .status(201)
    .json({ success: true, msg: "Created category successfully" });

}
//Función encargada de agregar un chat nuevo
function addNewChat(idTicket,idUserIssued,idSupport,idText){
    const newChat = new Chat({
        id_ticket:idTicket
    });
    newChat.save().then(nChat=>{
        addMessage(nChat._id,idUserIssued,idSupport,idText);
        console.log("mensaje",idText);
    });
}
//Funcion encargada de agregar cualquier mensaje
function addMessage(nIdChat,nIdUser,nIdSupport,idText){    
    const newMessage = new Message({
        idChat:nIdChat,
        idUser:nIdUser,
        idSupport:nIdSupport,
        text:idText,
        remitent:'Jammer',
        dateHour:new Date()
    });
    newMessage.save();
}


module.exports = { addTicket };
