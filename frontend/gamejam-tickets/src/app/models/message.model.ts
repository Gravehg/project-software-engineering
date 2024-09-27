export interface Message{
    idChat: string;
    idUser: string;
    userName: string;
    idSupport: string | null;
    supportName:string;
    text: string;
    textDate: Date;
    remitent: string;
}