import {
  Modal,
  View,
  StyleSheet,
  Text,
  Pressable,
  Dimensions,
} from "react-native";
const { width, height } = Dimensions.get("window");

interface InfoModalProps {
  visible: boolean;
  onClose: () => void;
  resolutionState: string;
  closureState: string;
  topic: string;
  date: string;
  category: string;
  userName: string;
}

const InfoModalComponent: React.FC<InfoModalProps> = ({
  visible,
  onClose,
  resolutionState,
  closureState,
  topic,
  date,
  category,
  userName,
}) => {
  const closureStateStyle =
    closureState === "Open" ? styles.badgeOpen : styles.badgeClosed;
  const resolutionStateStyle =
    resolutionState === "Resolved"
      ? styles.badgeResolved
      : styles.badgeUnresolved;
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.label}>User</Text>
          <View>
            <Text style={styles.textStyle}>{userName}</Text>
          </View>
          <Text style={styles.label}>Creation date</Text>
          <View>
            <Text style={styles.textStyle}>{date}</Text>
          </View>
          <Text style={styles.label}>Topic</Text>
          <View>
            <Text style={styles.textStyle}>{topic}</Text>
          </View>
          <Text style={styles.label}>Category</Text>
          <View style={styles.category}>
            <Text style={styles.stateStyleText}>{category}</Text>
          </View>
          <Text style={styles.label}>Closure State</Text>
          <View style={closureStateStyle}>
            <Text style={styles.stateStyleText}>{closureState}</Text>
          </View>

          <Text style={styles.label}>Resolution State</Text>
          <View style={resolutionStateStyle}>
            <Text style={styles.stateStyleText}>{resolutionState}</Text>
          </View>

          <Pressable style={[styles.buttonClose]} onPress={onClose}>
            <Text style={styles.closeBtnText}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 5,
    backgroundColor: "white",
    padding: 20,
    width: width,
    height: height,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    flex: 1,
    flexDirection: "column",
  },
  closeBtnText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonClose: {
    marginTop: 30,
    marginBottom: 15,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    borderColor: "#a4a5a9",
    backgroundColor: "#f59e4c",
  },
  badgeOpen: {
    backgroundColor: "#0D6EFD",
    borderRadius: 10,
    padding: 10,
  },
  badgeClosed: {
    backgroundColor: "#DC3545",
    borderRadius: 10,
    padding: 10,
  },
  badgeResolved: {
    backgroundColor: "#0D6EFD",
    borderRadius: 10,
    padding: 10,
  },
  badgeUnresolved: {
    backgroundColor: "#DC3545",
    borderRadius: 10,
    padding: 10,
  },
  label: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 15,
    marginTop: 15,
    color: "#257dc0",
  },
  stateStyleText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
  },
  textStyle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
  },
  category: {
    backgroundColor: "#212529",
    borderRadius: 10,
    padding: 10,
  },
});

export default InfoModalComponent;
