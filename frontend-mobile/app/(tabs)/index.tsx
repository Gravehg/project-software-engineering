import { Alert, Image, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from 'react';
import { mobileLogin } from "../services/mobileLogInService";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Link, Redirect, router } from "expo-router";


export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState('');


  const handleLogin = async () => {
    if (!email) {
      Alert.alert('Error', 'Please write a full email address');
      return;
    }
    try {
      const data = await mobileLogin(email);
      if (!data.success) {
        Alert.alert("Error", data.msg);
      } else {

        console.log(data.user.roles[0]);
        setUserType(data.user.roles[0]);
        router.replace("./JammerScreens")
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <Image
        source={require("@/assets/images/gj-logo.png")}
        style={styles.reactLogo}
        resizeMode="contain"
      />
      <ThemedText type="title" style={styles.title}>
        Welcome Back!
      </ThemedText>
      <ThemedText type="subtitle" style={styles.subtitle}>
        Please log in with your email
      </ThemedText>

      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        placeholderTextColor="#a4a5a9"
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={setEmail}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <ThemedText type="defaultSemiBold" style={styles.buttonText}>
          Log In
        </ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
  reactLogo: {
    height: 178,
    width: 290,
    marginBottom: 20,
  },
  title: {
    color: "#257dc0",
    marginBottom: 10,
    fontSize: 28,
  },
  subtitle: {
    color: "#a4a5a9",
    marginBottom: 30,
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#a4a5a9",
    borderRadius: 8,
    width: "100%",
    padding: 15,
    marginBottom: 20,
    color: "#257dc0",
    backgroundColor: "#f9f9f9",
  },
  button: {
    backgroundColor: "#f59e4c",
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});
