import React from "react";
import { View, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import GenericButton from "../components/shared/button";

export default function HomeScreen() {
  const navigation = useNavigation();

  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View>
      <GenericButton
        title="Register"
        onPress={() => navigateToScreen("Registration")}
      />
      <GenericButton
        title="Login"
        onPress={() => navigateToScreen("Login")}
      />
           <GenericButton
        title="Therapist"
        onPress={() => navigateToScreen("TherapistScreen")}
      />
    </View>
  );
}
