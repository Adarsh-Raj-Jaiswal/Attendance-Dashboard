import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const Result = () => {
  return (
    <View style={styles.container}>
      <Icon name="check-circle" size={50} color="#4CAF50" style={styles.icon} />
      <Text style={styles.text}>Attendance Marked Successfully</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
  },
});

export default Result;
