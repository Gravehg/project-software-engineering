import { PropsWithChildren } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { useRouter } from "expo-router";

type Prop = PropsWithChildren<{
  _id: string;
  userName: string;
  category: string;
  topic: string;
  creationDate: string;
  closureState: string;
  resolutionState: string;
}>;

export default function CardSupp({
  _id,
  userName,
  category,
  topic,
  creationDate,
  closureState,
  resolutionState,
}: Prop) {
  const closureStateStyle =
    closureState === "Open" ? styles.badgeOpen : styles.badgeClosed;
  const resolutionStateStyle =
    resolutionState === "Resolved"
      ? styles.badgeResolved
      : styles.badgeUnresolved;

  return (
    <ThemedView style={[styles.col12, closureStateStyle]}>
      <ThemedView style={styles.row}>
        <ThemedView style={styles.col1}>
          <ThemedText>ID: {_id}</ThemedText>
          <ThemedText>Username: {userName}</ThemedText>
          <ThemedText>Date: {creationDate}</ThemedText>
        </ThemedView>
        <ThemedView style={styles.col2}>
          <ThemedText>Topic: {topic}</ThemedText>
        </ThemedView>
        <ThemedView>
          <ThemedText>{closureState}</ThemedText>
          <ThemedText>{category}</ThemedText>
          <ThemedText>{resolutionState}</ThemedText>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  col2: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  col1: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  col12: {
    flex: 0,
    width: "100%",
  },
  row: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  card: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 16,
  },
  ticketInfo: {
    flex: 1,
    paddingRight: 8,
  },
  categoryInfo: {
    flex: 1,
    paddingHorizontal: 8,
    justifyContent: "center",
  },
  statusInfo: {
    flex: 0.9,
    paddingLeft: 8,
    alignItems: "center",
  },
  badgeOpen: {
    padding: 8,
    backgroundColor: "#007bff", // Blue
    borderRadius: 12,
    marginBottom: 8,
  },
  badgeClosed: {
    padding: 8,
    backgroundColor: "#dc3545", // Red
    borderRadius: 12,
    marginBottom: 8,
  },
  badgeResolved: {
    padding: 8,
    backgroundColor: "#007bff", // Blue
    borderRadius: 12,
    marginBottom: 8,
  },
  badgeUnresolved: {
    padding: 8,
    backgroundColor: "#dc3545", // Red
    borderRadius: 12,
    marginBottom: 8,
  },
  badgeCategory: {
    padding: 8,
    backgroundColor: "#343a40", // Dark
    borderRadius: 12,
  },
  cardThemedText: {
    color: "#fff",
  },
});
