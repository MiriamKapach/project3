import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const DisplayPatient = ({ patients, onRemovePress }) => {
    const renderItem = ({ item }) => (
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 }}>
        <TouchableOpacity onPress={() => onRemovePress(item.id)}>
          <Icon name="trash-2" size={20} color="green" />
        </TouchableOpacity>
        <Text>{item.name}</Text>
      </View>
    );
    const renderSeparator = () => (
      <View style={{ height: 1, backgroundColor: 'gray', marginVertical: 5 }} />
    );
    
    return (
      <FlatList
        data={patients}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={renderSeparator}
      />
    );
  };
export default DisplayPatient;
