import React, { useEffect, useState, useRef } from "react";
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  StatusBar,
} from "react-native";
import {
  getTicketById,
  getChatID,
  getMessagesByChatID,
  sendMessage,
  updateClosureState,
  updateSupp,
} from "@/app/services/chatService";

type Ticket = {
  _id: string;
  idUserIssued: string;
  userName: string;
  idSupport: string | null;
  supportName: string | null;
  resolutionState: string;
  closureState: string;
  topic: string;
};

type Message = {
  idChat: string;
  idUser: string;
  userName: string;
  idSupport: string | null;
  supportName: string | null;
  text: string;
  textDate: Date;
  remitent: string;
};

export default function ChatScreen() {
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [chatID, setChatID] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [jammer, setJammer] = useState<string>("");
  const [jammerName, setJammerName] = useState<string>("");
  const [support, setSupport] = useState<string | null>("");
  const [supportName, setSupportName] = useState<string | null>("");
  const [closureState, setClosureState] = useState<string | null>(null); 
  const { jammerChat } = useLocalSearchParams<{jammerChat: string}>()
  const flatListRef = useRef<FlatList<Message>>(null);
  const router = useRouter();
  

  // Función para gestionar el envío de mensajes
  const sendMessageHandler = async () => {
    if (closureState === "Closed") {
      Alert.alert(
        "Confirmar envío",
        "The ticket currently has a status of Closed so sending a message again would put it in 'Open' and you will have to wait for a new support to get assigned, do you want to send the message?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "OK",
            onPress: async () => {
              await sendMessageHandler_aux();
              await updateTicketClosureState("Open");
              await updateAssignedSupp();
              router.back();
            },
          },
        ]
      );
    } else {
      await sendMessageHandler_aux();
    }
  };

  
  const updateTicketClosureState = async (newClosureState: string) => {
    if (ticket) {
      try {
        const response = await updateClosureState(ticket._id, newClosureState);
        if (response.success) {
          setClosureState("Open");
        } else {
          console.error("Error updating closure state:", response.msg);
        }
      } catch (error) {
        console.error("Error updating closure state:", error);
      }
    }
  };

  const updateAssignedSupp = async () => {
    if (ticket) {
      try {
        const response = await updateSupp(ticket._id);
        if (response.success) {
          setClosureState("Open");
        } else {
          console.error("Error updating closure state:", response.msg);
        }
      } catch (error) {
        console.error("Error updating closure state:", error);
      }
    }
  };


  const sendMessageHandler_aux = async () => {
    const userMessage = {
      idChat: chatID || "",
      idUser: jammer,
      userName: jammerName,
      idSupport: support === "" ? null : support,
      supportName: supportName,
      text: newMessage,
      textDate: new Date(),
      remitent: "Jammer",
    };
    try {
      const response = await sendMessage(userMessage);
      if (response.success) {
        setMessages((prevMessages) => [...prevMessages, userMessage]);
        setNewMessage("");
        flatListRef.current?.scrollToEnd({ animated: true });
      } else {
        console.error("Error sending message:", response.msg);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const renderMessage = ({ item }: { item: Message }) => {
    const isUser = item.remitent === "Jammer";

    const messageDate =
      typeof item.textDate === "string"
        ? new Date(item.textDate)
        : item.textDate;

    const formattedTime = messageDate.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    });
    flatListRef.current?.scrollToEnd({ animated: true });
    return (
      <View
        style={[
          styles.messageContainer,
          isUser ? styles.userMessage : styles.supportMessage,
        ]}
      >
        <Text style={styles.sender}>
          {isUser ? item.userName : item.supportName}{" "}
          <Text style={styles.time}>{formattedTime}</Text>
        </Text>
        <Text style={styles.messageText}>{item.text}</Text>
      </View>
    );
  };

  
  useEffect(() => {
    const initializeData = async () => {
      try {
        setLoading(true); 
        const ticketData = await getTicketById(jammerChat);
        const chatData = await getChatID(jammerChat);

        setTicket(ticketData.ticket);
        setChatID(chatData.chatID);

        if (chatData) {
          const messagesData = await getMessagesByChatID(chatData.chatID);
          setMessages(messagesData);
          
        }

        if (ticketData.ticket) {
          setJammer(ticketData.ticket.idUserIssued);
          setJammerName(ticketData.ticket.userName);
          setSupport(ticketData.ticket.idSupport);
          setSupportName(ticketData.ticket.supportName);
          setClosureState(ticketData.ticket.closureState); 
        }
      } catch (err) {
        setError("Error fetching ticket or chat data");
        console.error(err);
      } finally {
        setLoading(false); 
      }
    };

    initializeData();
  }, []);

 
  if (loading || closureState === null) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#257dc0" />
      {error ? (
        <View style={styles.ticketInfo}>
          <Text>Error: {error}</Text>
        </View>
      ) : ticket ? (
        <View style={styles.ticketInfo}>
          <Text style={styles.ticketTopic}>{ticket.topic}</Text>
          <Text
            style={
              closureState === "Closed"
                ? styles.ticketStatusClosed
                : styles.ticketStatusOpen
            }
          >
            Ticket Status: {closureState}
          </Text>
        </View>
      ) : null}

      <FlatList
        ref={flatListRef} 
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item, index) => index.toString()}
        style={styles.chatContainer}
      />
      

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={newMessage}
          onChangeText={setNewMessage}
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={sendMessageHandler}
        >
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  ticketInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#e1e1e1",
  },
  ticketTopic: {
    fontSize: 14,
    color: "#000",
  },
  ticketStatusClosed: {
    fontSize: 14,
    color: "red",
  },
  ticketStatusOpen: {
    fontSize: 14,
    color: "green",
  },
  chatContainer: {
    flex: 1,
    padding: 10,
  },
  messageContainer: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    maxWidth: "75%",
    minWidth: 150,
  },
  supportMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#257dc0",
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#f59e4c",
  },
  sender: {
    fontWeight: "bold",
    color: "#fff",
  },
  time: {
    fontWeight: "normal",
    fontSize: 12,
  },
  messageText: {
    color: "#fff",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#a4a5a9",
    alignItems: "center",
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: "#e1e1e1",
    borderRadius: 20,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: "#257dc0",
    padding: 10,
    borderRadius: 20,
  },
  sendButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});