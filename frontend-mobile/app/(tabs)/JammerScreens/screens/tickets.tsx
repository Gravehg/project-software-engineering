import { StyleSheet } from "react-native";
import React, { useEffect, useState } from 'react';
import ParallaxScrollViewJammer from '@/components/ParallaxScrollViewJammer';
import { ThemedView } from "@/components/ThemedView";
import { getTickets } from "@/app/services/ticketesService";
import { Link, Redirect, router } from "expo-router";

import Card from '@/components/Card';
import { ThemedText } from "@/components/ThemedText";

export default function TicketsScreen() {
  const [tickets, setTickets] = useState([]);
  const [ticketsFilter, setTicketsFilter] = useState([]);

  const temporal = () => {
    // console.log("Chat 2");
    // const userId = "66f36d3ba20c17e7b1b6a67d";
    // getTickets(userId).then((data) => {
    //   console.log(data);
    //   setTickets(data);
    //   setTicketsFilter(data);
    // }).catch((error) => {
    //   console.log("Entro al error");
    //   console.log(error);
    // });
  }


  useEffect(() => {
    console.log("Chat 2");
    const userId = "66f36d3ba20c17e7b1b6a67d";
    getTickets(userId).then((data) => {
      console.log(data);
      setTickets(data);
      setTicketsFilter(data);
    }).catch((error) => {
      console.log("Entro al error");
      console.log(error);
    });
  }, []);

    return (
        <ParallaxScrollViewJammer
            headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
            >
            <ThemedView style={styles.container}>
              {tickets.length === 0 && <ThemedText>Loading...</ThemedText>}
              {
                tickets.map((ticket: any) => {
                  return (
                    <Card 
                      supportEmail={ticket.supportEmail}
                      id={ticket._id}
                      topic={ticket.topic}
                      lookChat={temporal}/>
                  );
                })
              }
            </ThemedView>
        </ParallaxScrollViewJammer>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginBottom: 16,
  },
  subtitle: {
    marginBottom: 16,
  },
  input: {
    width: '80%',
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  reactLogo: {
    width: 200,
    height: 200,
  },
});