import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import styles from "../styles/loginStyles";

const Login = ({ navigation }) => {
  // also check if already marked attendance
  const onPressLogin = () => {
    // Do something about login operation
    // login krna hai or successfull hai to next page
    // () => navigation.navigate("Scan")
  };

  const [state, setState] = useState({
    email: "",
    password: "",
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Login Screen</Text>

      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setState({ email: text })}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          secureTextEntry
          placeholder="Password"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setState({ password: text })}
        />
      </View>

      <TouchableOpacity onPress={onPressLogin} style={styles.loginBtn}>
        <Text style={styles.loginText}>LOGIN </Text>
      </TouchableOpacity>
    </View>
  );
};
export default Login;
