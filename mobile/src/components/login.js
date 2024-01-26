import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import styles from "../styles/loginStyles";
import { useState } from "react";
import axios from "axios";

const Login = ({ navigation }) => {
  const [data, setData] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // also check if already marked attendance
  const onPressLogin = async () => {
    // Do something about login operation
    // login krna hai or successfull hai to next page
    try {
      const hash = "dummy";
      const obj = { email, password, hash };
      const config = { headers: { "Content-Type": "application/json" } };
      const response = await axios.post("/api/v1/login", obj, config);
      setData(JSON.stringify(response.data));
    } catch (error) {
      console.log(error.stack);
      setData(JSON.stringify(error));
    }
    // navigation.navigate("Scan");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Login Screen</Text>

      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setEmail({ email: text })}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          secureTextEntry
          placeholder="Password"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setPassword({ password: text })}
        />
      </View>

      <TouchableOpacity onPress={onPressLogin} style={styles.loginBtn}>
        <Text style={styles.loginText}>LOGIN </Text>
      </TouchableOpacity>
      <ScrollView style={styles.dummy}>
        <Text selectable={true}>Data : {data}</Text>
      </ScrollView>
      <Text>last line</Text>
    </View>
  );
};
export default Login;
