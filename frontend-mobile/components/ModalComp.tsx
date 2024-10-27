import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View, Dimensions} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { Picker } from "@react-native-picker/picker";
const { width, height } = Dimensions.get('window');
interface CustomModalProps {
  visible: boolean;
  onClose: () => void;
}
const ModalComponent: React.FC<CustomModalProps> = ({visible, onClose}) =>{
  const category = "XD"

  return (

        <Modal
          animationType="slide"
          transparent={true}
          visible={visible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            //setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Hello World!</Text>
                <Text style={styles.label}>closure</Text>
                <View style={styles.pickerContainer}>
                    <Picker
                    selectedValue={category}
                    style={styles.picker}
                    //onValueChange={(itemValue: any) => setCategory(itemValue)}
                    >
                    <Picker.Item label="Select" value="" />
                    <Picker.Item label="Category 1" value="category1" />
                    <Picker.Item label="Category 2" value="category2" />
                    </Picker>
                </View>
                <Text style={styles.label}>Category</Text>
                <View style={styles.pickerContainer}>
                    <Picker
                    selectedValue={category}
                    style={styles.picker}
                    // onValueChange={(itemValue: any) => setCategory(itemValue)}
                    >
                    <Picker.Item label="Select" value="" />
                    <Picker.Item label="Category 1" value="category1" />
                    <Picker.Item label="Category 2" value="category2" />
                    </Picker>
                </View>
                <Text style={styles.label}>Resolution</Text>
                <View style={styles.pickerContainer}>
                    <Picker
                    selectedValue={category}
                    style={styles.picker}
                    //onValueChange={(itemValue: any) => setCategory(itemValue)}
                    >
                    <Picker.Item label="Select" value="" />
                    <Picker.Item label="Category 1" value="category1" />
                    <Picker.Item label="Category 2" value="category2" />
                    </Picker>
                </View>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={onClose}>
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        // <Pressable
        //   style={[styles.button, styles.buttonOpen]}
        //   onPress={() => setModalVisible(true)}>
        //   <Text style={styles.textStyle}>Show Modal</Text>
        // </Pressable>

  );
};
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 5,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: width * 0.8,
    height: height * 0.8 ,
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
    width:270,
    color: "#FFFFFF",
  },
  
});

export default ModalComponent;