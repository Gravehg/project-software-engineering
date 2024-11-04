import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { SupportService } from "../../../services/supportService";
import { SupportTicket } from "../../models/supportTicket.model";
import { ThemedText } from "@/components/ThemedText";

const TicketsPool: React.FC = () => {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadSupportPoolTickets = async () => {
    setIsLoading(true);
    try {
      const data = await SupportService.getSupportPoolTickets();
      setTickets(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching tickets:", err);
      setError(
        "No se pudieron cargar los tickets. Por favor, intente nuevamente."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const refresh = async () => {
    loadSupportPoolTickets();
  };

  useEffect(() => {
    loadSupportPoolTickets();
  }, []);

  const renderTicket = ({ item }: { item: SupportTicket }) => (
    <View style={styles.ticketContainer}>
      <View style={styles.ticketHeader}>
        <Text style={styles.userName}>{item.userName}</Text>
        <Text style={styles.date}>{item.creationDate}</Text>
      </View>
      <View style={styles.ticketContent}>
        <Text style={styles.label}>Categoría:</Text>
        <Text style={styles.value}>{item.category}</Text>
      </View>
      <View style={styles.ticketContent}>
        <Text style={styles.label}>Tema:</Text>
        <Text style={styles.value}>{item.topic}</Text>
      </View>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Cargando tickets...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Pressable style={[styles.button, styles.buttonOpen]} onPress={refresh}>
        <ThemedText style={styles.textStyle}>Refresh tickets</ThemedText>
      </Pressable>
      {tickets.length === 0 ? (
        <View style={styles.centerContainer}>
          <Text style={styles.noTicketsText}>No hay tickets disponibles</Text>
        </View>
      ) : (
        <FlatList
          data={tickets}
          keyExtractor={(item) => item._id}
          renderItem={renderTicket}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  listContainer: {
    padding: 16,
  },
  ticketContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  ticketHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1a73e8",
  },
  date: {
    fontSize: 14,
    color: "#666",
  },
  ticketContent: {
    flexDirection: "row",
    marginBottom: 8,
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#444",
    width: 80,
  },
  value: {
    fontSize: 15,
    color: "#666",
    flex: 1,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  errorText: {
    fontSize: 16,
    color: "#dc3545",
    textAlign: "center",
  },
  noTicketsText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    margin: 20,
    marginBottom: 10,
  },
  buttonOpen: {
    backgroundColor: "#757575",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default TicketsPool;
