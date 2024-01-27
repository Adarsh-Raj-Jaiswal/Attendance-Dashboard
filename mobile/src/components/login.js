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
import { login } from "../api-helper/api-helper";

const Login = ({ navigation }) => {
  const [data, setData] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onPressLogin = async () => {
    try {
      const responseData = await login(email, password);
      setData(JSON.stringify(responseData));
      navigation.navigate("Scan");
    } catch (error) {
      setData(JSON.stringify(error));
    }
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
