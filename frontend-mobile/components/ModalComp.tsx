import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View, Dimensions} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { Picker } from "@react-native-picker/picker";
const { width, height } = Dimensions.get('window');
interface CustomModalProps {
  visible: boolean;
  onClose: () => void;
  tickets: Array<interTicket>;
  setTicketsFilter: (filteredTickets: Array<interTicket>) =>void; 
}

interface interTicket{
  _id:string,
  category:string,
  closureState:string,
  creationDate:string,
  date:string,
  email: string,
  idSupport:string,
  idUserIssued:string
  resolutionState:string,
  topic:string
}
const ModalComponent: React.FC<CustomModalProps> = ({visible, onClose, tickets, setTicketsFilter}) =>{


  const [closure,setclosureState]= useState("");
  const [category,setCategory]= useState("");
  const [resolution,setResolutionState]= useState("");
  
  const applyAllFilters = () => {
    let result = tickets;

    if (closure !== "") {
      result = result.filter(ticket => ticket.closureState === closure);
    }
    if (category !== "") {
      result = result.filter(ticket => ticket.category === category);
    }
    if (resolution !== "") {
      result = result.filter(ticket => ticket.resolutionState === resolution);
    }

    setTicketsFilter(result); // Actualiza el estado filtrado
    console.log(result); // Para depuración, muestra el resultado filtrado en consola
  };
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
              <Text style={styles.modalText}>Filter</Text>
                <Text style={styles.label}>closure</Text>
                <View style={styles.pickerContainer}>
                    <Picker
                    selectedValue={closure}
                    style={styles.picker}
                    onValueChange={(itemValue: any) => setclosureState(itemValue)}
                    >
                    <Picker.Item label="Select" value="" />
                    <Picker.Item label="Open" value="Open" />
                    <Picker.Item label="Close" value="Close" />
                    </Picker>
                </View>
                <Text style={styles.label}>Category</Text>
                <View style={styles.pickerContainer}>
                    <Picker
                    selectedValue={category}
                    style={styles.picker}
                    onValueChange={(itemValue: any) => setCategory(itemValue)}
                    >
                    <Picker.Item label="Select" value="" />
                    <Picker.Item label="Fellows" value="Fellows" />
                    <Picker.Item label="Technology" value="Technology" />
                    <Picker.Item label="Events" value="Events" />
                    <Picker.Item label="Acceleration" value="Acceleration" />
                    </Picker>
                </View>
                <Text style={styles.label}>Resolution</Text>
                <View style={styles.pickerContainer}>
                    <Picker
                    selectedValue={resolution}
                    style={styles.picker}
                    onValueChange={(itemValue: any) => setResolutionState(itemValue)}
                    >
                    <Picker.Item label="Select" value="" />
                    <Picker.Item label="Resolve" value="Resolve" />
                    <Picker.Item label="Not resolved" value="Not resolved" />
                    </Picker>
                </View>
              <View style={styles.containerB}>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={applyAllFilters}>
                  <Text style={styles.textStyle}>Aplay Filter</Text>
                </Pressable>

                <Pressable
                style={[styles.buttonAplay]}
                onPress={onClose}>
                <Text style={styles.textStyle}>Close Filter</Text>
              </Pressable>
              </View>
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
  buttonAplay: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    borderColor: "#a4a5a9",
    backgroundColor: "#f59e4c", 
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
  containerB:{
    display:"flex",
    flexDirection:"row",
    width: "100%",
    justifyContent: "space-between"
  }
});

export default ModalComponent;