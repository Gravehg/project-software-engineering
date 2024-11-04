import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useEffect } from "react";
import { useState } from "react";
import { getSupportTickets } from "@/app/services/ticketesService";
import { getSupportCategories } from "@/app/services/suppService";
import { SuppTicket } from "@/models/SuppTicket";
import ParallaxScrollViewJammer from "@/components/ParallaxScrollViewJammer";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import CardSupp from "@/components/CardSupp";
import { Category } from "@/models/Category";
import ModalComponent from "@/components/ModalComp";

const SupportTickets = () => {
  const [tickets, setTickets] = useState<SuppTicket[]>([]);
  const [ticketsFilter, setTicketsFilter] = useState<SuppTicket[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryMap, setCategoryMap] = useState<{
    [key: string]: { name: string };
  }>({});
  let categories: Category[] = [];

  useEffect(() => {
    getSupportTickets()
      .then((data) => {
        setTickets(data);
        setTicketsFilter(data);
      })
      .catch((err) => {
        console.log("There has been an error" + err);
      });
    getSupportCategories().then((data) => {
      const map = data.reduce((map, category) => {
        map[category._id] = { name: category.name };
        return map;
      }, {} as { [key: string]: { name: string } });
      setCategoryMap(map);
    });
    setIsLoading(false);
  }, []);

  if (isLoading && ticketsFilter.length == 0) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Cargando tickets...</Text>
      </View>
    );
  }

  return (
    <ParallaxScrollViewJammer
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
    >
      <ThemedView style={styles.filterView}>
        <ModalComponent
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          tickets={tickets}
          setTicketsFilter={setTicketsFilter}
          isSupp={true}
        />
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}
        >
          <ThemedText style={styles.textStyle}>Apply filters</ThemedText>
        </Pressable>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setTicketsFilter(tickets)}
        >
          <ThemedText style={styles.textStyle}>Reset filters</ThemedText>
        </Pressable>
      </ThemedView>
      <ThemedView style={styles.container}>
        {ticketsFilter.length == 0 && (
          <View style={styles.centerContainer}>
            <Text style={styles.loadingText}>
              No tickets with the selected filters.
            </Text>
          </View>
        )}
        {ticketsFilter.map((ticket: SuppTicket) => {
          return (
            <CardSupp
              _id={ticket._id}
              category={categoryMap[ticket.category]?.name}
              closureState={ticket.closureState}
              creationDate={ticket.creationDate}
              topic={ticket.topic}
              userName={ticket.userName}
              resolutionState={ticket.resolutionState}
              key={ticket._id}
            />
          );
        })}
      </ThemedView>
    </ParallaxScrollViewJammer>
  );
};

export default SupportTickets;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  title: {
    marginBottom: 16,
  },
  subtitle: {
    marginBottom: 16,
  },
  input: {
    width: "80%",
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  reactLogo: {
    width: 200,
    height: 200,
  },
  filterView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#757575",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
