import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

import  ModalComponent  from "@/components/ModalComp"//"../../../../components/ModalComp"
import ParallaxScrollViewJammer  from "@/components/ParallaxScrollViewJammer"
export default function ModalViewFunction(){
    const [modalVisible, setModalVisible] = useState(false);
    return(
        <ParallaxScrollViewJammer headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}>
        <SafeAreaProvider>
        <SafeAreaView style={styles.centeredView}>
          <ModalComponent
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
          />
          
          <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={() => setModalVisible(true)}>
            <Text style={styles.textStyle}>Show Modal</Text>
          </Pressable>
        </SafeAreaView>
      </SafeAreaProvider>
      </ParallaxScrollViewJammer>
    
    );
    
}

const styles = StyleSheet.create({
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