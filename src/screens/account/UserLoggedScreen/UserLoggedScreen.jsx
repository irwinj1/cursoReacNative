import React from "react";
import { View, ScrollView } from "react-native";
import { InfoUser } from "../../../components/Account";
import { styles } from "./UserLoggedStyle";


export function UserLoggedScreen() {
  return (
    <View style={styles.content}>
      
      <InfoUser />
    </View>
  );
}
