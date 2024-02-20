

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Pressable, ActivityIndicator, TextInput, Modal } from 'react-native';
import therapistService from '../services/backendServices/therapistService';
import GenericButton from '../components/shared/button';
import { Ionicons } from '@expo/vector-icons';

export default function TherapistScreen() {
  const [listOfPatients, setListOfPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [patientUsername, setPatientUsername] = useState('');
  const therapistId = '658447a9bb5c468fcfc375b6';

  useEffect(() => {
    fetchData();
  }, [therapistId]);

  //gets patients list by therapist id
  const fetchData = async () => {
    try {
      const patientsList = await therapistService.getTherapistPatients(therapistId);
      if (!patientsList || patientsList.length <= 0) {
        setListOfPatients([]);
      } else {
        setListOfPatients(patientsList);      
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    finally {
      setIsLoading(false);
    }
  };

  //set modal visibility to true to display the input field for entering patient's name
  const handleAddPatient = () => {
    setModalVisible(true);
  };

  // Handle changes in the patient username input field
  const handleUsernameChange = (text) => {
    setPatientUsername(text);
  };

  // Handle submission of the entered patient username
  const handleUsernameSubmit = () => {
    // Associate patient logic here
    handleAssociatePatientConfirm(patientUsername);
    // Close modal
    setModalVisible(false);
  };

  const handleAssociatePatientConfirm = async (patientUsername) => {
    try {
      // Check if the username exists in patients
      const isUserNameExists = listOfPatients.some(patient => (
        `${patient.patientDetails.userName}` === patientUsername
      ));
      if (!isUserNameExists) {
        // Associate patient
        const patientData = await therapistService.associatePatient(therapistId, patientUsername);
        if (patientData.success === true) {
          fetchData();
          console.log('Patient added successfully');
        }
     }} catch (error) {
      console.error('Error associating patient:', error);
    }
  };

  const handleRemovePatient = async (patient) => {
    try {
      const deletion = await therapistService.unAssociatePatient(therapistId, patient.patientDetails._id)
      if (deletion) {
        setListOfPatients(listOfPatients.filter(p => p.patientDetails._id !== patient.patientDetails._id));
        console.log('Patient deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting patient:', error);
    }
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="green" />
        </View>
      ) : (
        <>
          <View>
            {listOfPatients.length > 0 && (
              <Text style={styles.header}>my patients</Text>
            )}
            {listOfPatients.length === 0 ? (
              <View style={styles.noPatientsContainer}>
                <Text style={styles.noPatientsText}>no patients yet</Text>
              </View>
            ) : (
              <FlatList
                data={listOfPatients}
                keyExtractor={(item) => item.patientDetails._id}
                renderItem={({ item }) => (
                  <View style={[styles.patientContainer]}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text style={styles.patientName}>{item.patientDetails.firstName}{' '}{item.patientDetails.lastName}</Text>
                      <Pressable onPress={() => handleRemovePatient(item)}>
                        <Ionicons name='trash' style={styles.icon} />
                      </Pressable>
                    </View>
                  </View>
                )}
              />
            )}
            <GenericButton
              style={styles.addButton}
              onPress={handleAddPatient}
              title="add patient"
              buttonWidth={160}
            />
          </View>
        </>
      )}

      {/* Modal for adding a patient */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Enter Patient Username:</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleUsernameChange}
              value={patientUsername}
            />
            <Pressable style={styles.modalButton} onPress={handleUsernameSubmit}>
              <Text style={styles.modalButtonText}>Submit</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  patientContainer: {
    borderColor: 'green', 
    borderWidth: 4, 
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  patientName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  modalButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  modalButton: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 8,
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  noPatientsContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  noPatientsText: {
    fontSize: 18,
    marginBottom: 16,
  },
  noPatientsImage: {
    width: 200,
    height: 100,
  },
  icon: {
    color: 'green',
    fontSize: 24,
  },
  toggleButtonContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  toggleButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 250,
  },
  
});

// export default TherapistScreen;
