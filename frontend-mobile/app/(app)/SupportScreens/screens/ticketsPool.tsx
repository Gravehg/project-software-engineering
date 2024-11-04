import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Button } from "react-native";
import { SupportService } from "../../../services/supportService";
import { SupportTicket } from "../../models/supportTicket.model";

const TicketsPool: React.FC = () => {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSupportPoolTickets = async () => {
      try {
        const data = await SupportService.getSupportPoolTickets();
        setTickets(data);
      } catch (error) {
        setError("Error loading support pool tickets");
      }
    };

    loadSupportPoolTickets();

    const intervalId = setInterval(() => {
      loadSupportPoolTickets();
    }, 30000);

    return () => clearInterval(intervalId);
  }, []);

  const renderTicket = ({ item }: { item: SupportTicket }) => (
    <View style={styles.ticketContainer}>
      <Text style={styles.ticketText}>Usuario: {item.userName}</Text>
      <Text style={styles.ticketText}>Categoría: {item.category}</Text>
      <Text style={styles.ticketText}>Tema: {item.topic}</Text>
      <Text style={styles.ticketText}>
        Fecha de Creación: {item.creationDate}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <FlatList
          data={tickets}
          keyExtractor={(item) => item._id}
          renderItem={renderTicket}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  ticketContainer: {
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: "#f5f5f5",
  },
  ticketText: {
    fontSize: 16,
    color: "#333",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },
});

export default TicketsPool;
