import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import DisplayPatient from './displayPatient';

const ListOfPatients = ({ listOfPatients }) => {
  const [patients, setPatients] = useState(listOfPatients || [
    { id: 1, name: 'adi', isInList: true },
    { id: 2, name: 'ori', isInList: false },
    { id: 3, name: 'yarden', isInList: false },
    { id: 4, name: 'talya', isInList: false },
    { id: 5, name: 'hila', isInList: false },

  ]);

  const handleRemovePatient = (patientId) => {
    setPatients((prevPatients) =>
      prevPatients.map((patient) =>
        patient.id === patientId ? { ...patient, isInList: false } : patient
      )
    );
    const removedPatient = patients.find((patient) => patient.id === patientId);
    if (removedPatient) {
      Alert.alert(`${removedPatient.name} is removed`);
    } else {
      Alert.alert('Patient not found');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <DisplayPatient patients={patients} onRemovePress={handleRemovePatient} />
    </View>
  );
};

export default ListOfPatients;
