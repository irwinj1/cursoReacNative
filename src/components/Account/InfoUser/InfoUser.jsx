import { View, Text } from "react-native";
import React from "react";
import { Avatar } from "@rneui/base";
import { getAuth } from "firebase/auth";
import { styles } from "./InfoUserStyle";

export function InfoUser() {
  return (
    <View style={styles.content}>
      <Avatar
        size="large"
        rounded
        icon={{ type: "material-community", name: "person" }}
        style={styles.avatar}
      ></Avatar>
      <View>
        <Text>Anonimous</Text>
      </View>
    </View>
  );
}
