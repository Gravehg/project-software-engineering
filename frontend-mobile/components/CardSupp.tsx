import { PropsWithChildren, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, Pressable } from "react-native";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { useRouter, router } from "expo-router";
import { ThemedIcon } from "@/components/ThemedIcon";
import InfoModalComponent from "./InfoModal";

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
  const [modalVisible, setModalVisible] = useState(false);
  const toggleModal = () => setModalVisible(!modalVisible);

  const closureStateStyle =
    closureState === "Open" ? styles.badgeOpen : styles.badgeClosed;

  return (
    <ThemedView style={[styles.row, closureStateStyle]}>
      <ThemedView
        style={styles.col1}
        lightColor={closureStateStyle.backgroundColor}
      >
        <ThemedText
          type="default"
          numberOfLines={1}
          style={styles.title}
          adjustsFontSizeToFit
        >
          ID: {_id}
        </ThemedText>
        <ThemedView
          style={styles.infoRow}
          lightColor={closureStateStyle.backgroundColor}
        >
          <ThemedText type="defaultMini" numberOfLines={1} adjustsFontSizeToFit>
            {userName}
          </ThemedText>
          <ThemedText
            type="defaultMini"
            numberOfLines={1}
            adjustsFontSizeToFit
            style={{ marginLeft: 5 }}
          >
            {creationDate}
          </ThemedText>
          <TouchableOpacity style={styles.moreInfo} onPress={toggleModal}>
            <ThemedText
              type="defaultMini"
              numberOfLines={1}
              adjustsFontSizeToFit
            >
              More
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
      <ThemedView lightColor={closureStateStyle.backgroundColor}>
        <Pressable
          onPress={() =>
            router.push({
              pathname: "/hiddenScreens/[jammerChat]",
              params: { jammerChat: _id },
            })
          }
          style={styles.arrow}
        >
          {/* <ion-icon name="arrow-dropright" /> */}
          <ThemedIcon name="arrow-forward" color={"white"} />
        </Pressable>
      </ThemedView>
      <InfoModalComponent
        visible={modalVisible}
        onClose={toggleModal}
        resolutionState={resolutionState}
        closureState={closureState}
        topic={topic}
        date={creationDate}
        category={category}
        userName={userName}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  arrow: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  moreInfo: {
    padding: 2,
    backgroundColor: "#f59e4c",
    marginLeft: 5,
  },
  infoRow: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignContent: "center",
    marginTop: 5,
  },
  col1: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 8,
  },
  col12: {
    flex: 0,
    width: "100%",
  },
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
    borderRadius: 5,
    marginBottom: 8,
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
    backgroundColor: "#257DC0", // Blue
  },
  badgeClosed: {
    backgroundColor: "#D9534F", // Red
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
  title: {
    marginBottom: "auto",
    marginTop: "auto",
    fontWeight: "bold",
    fontSize: 12,
  },
});
