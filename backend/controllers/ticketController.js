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
        topic:'',
        creationDate:new Date()
    });
    newTicket.save().then(nTicket=>{
        //nTicket._id;
        addNewChat(nTicket._id,'idUserIssued','idSupport','creationDate');
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
    
    const newMessage = new Message({
        idChat:nIdChat,
        idUser:nIdUser,
        idSupport:nIdSupport,
        dateHour:new Date()

    });
    newMessage.save();
}


module.exports = { addTicket };
