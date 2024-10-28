import { StyleSheet, Pressable } from "react-native";
import React, { useEffect, useState } from 'react';
import ParallaxScrollViewJammer from '@/components/ParallaxScrollViewJammer';
import { ThemedView } from "@/components/ThemedView";
import { getTickets } from "@/app/services/ticketesService";
import { Link, Redirect, router } from "expo-router";
import  ModalComponent  from "@/components/ModalComp"
import Card from '@/components/Card';
import { ThemedText } from "@/components/ThemedText";

export default function TicketsScreen() {
  const [tickets, setTickets] = useState([]);
  const [ticketsFilter, setTicketsFilter] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
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
    // console.log("Chat 2");
    // const userId = "66ce887c7e1ac04b8f733ef8";
    getTickets().then((data) => {
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
          <ThemedView style={styles.centeredView}>
            <ModalComponent
              visible={modalVisible}
              onClose={() => setModalVisible(false)}
              tickets = {tickets}
              setTicketsFilter = {setTicketsFilter}
            />
          
            <Pressable
              style={[styles.button, styles.buttonOpen]}
              onPress={() => setModalVisible(true)}>
              <ThemedText style={styles.textStyle}>Show Modal</ThemedText>
            </Pressable>
          </ThemedView>
            <ThemedView style={styles.container}>
              {tickets.length === 0 && <ThemedText>Loading...</ThemedText>}
              {
                tickets.map((ticket: any) => {
                  return (
                    <Card 
                      supportEmail={ticket.supportEmail}
                      id={ticket._id}
                      topic={ticket.topic}
                      lookChat={temporal}
                      closed={ticket.closureState}
                      />
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  
});