import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { createTicket } from "@/app/services/createTicketService";

export default function CreateTicketScreen() {
  const [category, setCategory] = useState("");
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");
  const navigation = useNavigation();

  const resetForm = () => {
    setCategory("");
    setTopic("");
    setMessage("");
  };

  const handleBackPress = () => {
    if (!category && !topic && !message) {
      navigation.goBack();
      return true;
    }

    Alert.alert(
      "Confirm exit",
      "Are you sure you want to leave this page? All unsaved changes will be lost.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Leave",
          onPress: () => {
            resetForm();
            navigation.goBack();
          },
          style: "default",
        },
      ],
      {
        cancelable: true,
      }
    );
    return true;
  };

  const handleSubmit = async () => {
    if (!category || category === "Select") {
      alert("Please select a valid category.");
      return;
    }
    if (!topic) {
      alert("Please enter a topic.");
      return;
    }
    if (!message) {
      alert("Please enter a message.");
      return;
    }
    try {
      const data = await createTicket(category, topic, message);
      if (!data.success) {
        Alert.alert("Error", data.msg);
      } else {
        resetForm();
        Alert.alert("Success", "Ticket created successfully!");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor="#257dc0" />

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Submit your intrigue</Text>

          {/* Category */}
          <Text style={styles.label}>Category</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={category}
              style={styles.picker}
              onValueChange={(itemValue: any) => setCategory(itemValue)}
            >
              <Picker.Item label="Select" value="" />
              <Picker.Item label="Category 1" value="category1" />
              <Picker.Item label="Category 2" value="category2" />
            </Picker>
          </View>

          {/* Topic */}
          <Text style={styles.label}>Topic</Text>
          <TextInput
            style={styles.input}
            placeholder="Type here"
            placeholderTextColor="#FFFFFF"
            value={topic}
            onChangeText={setTopic}
          />

          {/* Message */}
          <Text style={styles.label}>Message</Text>
          <TextInput
            style={[styles.input, styles.messageInput]}
            placeholder="Type your message"
            placeholderTextColor="#FFFFFF"
            value={message}
            onChangeText={setMessage}
            multiline={true}
          />

          {/* Submit */}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#257dc0",
    borderBottomWidth: 1,
    borderBottomColor: "#a4a5a9",
    marginTop: 20,
    justifyContent: "space-between",
  },
  backButton: {
    marginRight: 16,
  },
  backButtonText: {
    fontSize: 18,
    color: "#FFFFFF",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    position: "absolute",
    left: "50%",
    transform: [{ translateX: -50 }],
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  formContainer: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignSelf: "center",
    width: "100%",
    maxWidth: 400,
    borderColor: "#a4a5a9",
    borderWidth: 1,
    marginTop: 20,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#257dc0",
    textAlign: "left",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#257dc0",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#a4a5a9",
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: "#f59e4c",
  },
  picker: {
    height: 50,
    color: "#FFFFFF",
  },
  input: {
    height: 40,
    borderColor: "#a4a5a9",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#f59e4c",
    color: "#FFFFFF",
    marginBottom: 16,
  },
  messageInput: {
    height: 100,
  },
  submitButton: {
    backgroundColor: "#257dc0",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
