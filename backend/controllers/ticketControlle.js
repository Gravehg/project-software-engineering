const Ticket = require("../models/ticketModel");
const Chat = require("../models/chatModel");
const Message = require("../models/messageModel");


//Crea el tickete de manera completa, añadiendo su chat correspondiente y su primer mensaje.
const addTicket = async (req, res) => {
    const newTicket = new Ticket({
        idUserIssued:'',
        idSupport:'',
        resolutionState:'',
        closureState:'',
        category:'',
        topic:''
    });
    newTicket.save().then(nTicket=>{
        //nTicket._id;
        addNewChat(nTicket._id,'idUserIssued','idSupport');
    })
    return res
    .status(201)
    .json({ success: true, msg: "Created category successfully" });

}
//Función encargada de agregar un chat nuevo
function addNewChat(idTicket,idUserIssued,idSupport){
    const newChat = new Chat({
        id_ticket:''
    });
    newChat.save().then(nChat=>{
        //nChat._id;
        addMessge(nChat._id,idUserIssued,idSupport);
    });
}
//Funcion encargada de agregar cualquier mensaje
function addMessge(nIdChat,nIdUser,nIdSupport){
    tempDateTime = getCurrentDateTime();
    const newMessage = new Message({
        idChat:nIdChat,
        idUser:nIdUser,
        idSupport:nIdSupport,
        dateHour:tempDateTime
    });
    newMessage.save();
}
//Funcion encargada de regresar fechas/hora actuales
function getCurrentDateTime() {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
}



