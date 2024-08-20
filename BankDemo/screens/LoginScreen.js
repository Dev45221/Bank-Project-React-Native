import React, { useState } from "react";
import { colors } from "../config/theme";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ToastAndroid,
  Alert
} from "react-native";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

import CustomButton from "../components/CustomButton";
import InputField from "../components/InputField";
import axios from "axios";
import { APPNAME, Customer_Login } from "../constants/constants";
import { useDispatch } from "react-redux";
import { SignIn } from "../reduxCode/ActionCreator";

const LoginScreen = ({ navigation }) => {
  // const [email, setEmail] = useState("ram@gmail.com")
  // const [pass, setPass] = useState("7410")
  const [email, setEmail] = useState("devansh@google.com")
  const [pass, setPass] = useState("963369")
  const dispatch = useDispatch()

  const login = () => {
    let params = {
      email: email,
      password: pass
    }
    axios.post(Customer_Login, params)
      .then((res) => {
        // console.log(res.data)
        const { msg, token } = res.data
        const { role, _id, status } = res.data.record
        if (status) {
          // console.log(`_ID: ${_id}`)
          // console.log(`Role: ${role}`)
          // console.log(`Status: ${status}`)
          console.log(res.data.msg);
          Alert.alert(APPNAME, res.data.msg)
          dispatch(SignIn(token, role, _id, email, pass))
        }
      })
      .catch((error) => {
        // console.log(error.response.data.msg)
        Alert.alert(APPNAME, error.response.data.msg)
      })
  }

  return (
    <View style={{ paddingHorizontal: 25 }}>
      <View style={{ alignItems: "center" }}>
        <Image
          source={require("../images/login.png")}
          style={{
            height: 200,
            width: 300,
            transform: [{ rotate: "-5deg" }],
          }}
        />
      </View>

      <Text
        style={{
          fontSize: 28,
          fontWeight: "500",
          color: colors.light.tint,
          marginBottom: 30,
        }}
      >
        Login
      </Text>

      <InputField
        label={"Email ID"}
        values={email}
        setText={setEmail}
        icon={<MaterialIcons
          name="alternate-email"
          size={20}
          color="#666"
          style={{ marginRight: 5 }}
        />
        }
        keyboardType="email-address"
        selectionColor={colors.light.tint}
      />

      <InputField
        label={"Password"}
        values={pass}
        setText={setPass}
        icon={
          <Ionicons
            name="lock-closed-outline"
            size={20}
            color="#666"
            style={{ marginRight: 5 }}
          />
        }
        inputType="password"
        fieldButtonLabel={"Forgot?"}
        fieldButtonFunction={() => navigation.navigate('Forget Password')}
      />

      <CustomButton label={"Login"} onPress={login} />

      <Text
        style={{
          textAlign: "center",
          color: colors.light.tint,
          marginBottom: 30,
        }}
      >
        Or, login with ...
      </Text>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginBottom: 30,
        }}
      >
        <TouchableOpacity
          onPress={() => { }}
          style={{
            backgroundColor: colors.light.secondary,
            borderRadius: 10,
            paddingHorizontal: 30,
            paddingVertical: 10,
          }}
        >
          <Image
            source={require("../images/google.png")}
            style={{ height: 24, width: 24 }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => { }}
          style={{
            backgroundColor: colors.light.secondary,
            borderRadius: 10,
            paddingHorizontal: 30,
            paddingVertical: 10,
          }}
        >
          <Image
            source={require("../images/apple.png")}
            style={{ height: 24, width: 24 }}
          />
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginBottom: 30,
        }}
      >
        <Text style={{ color: colors.light.tint }}>New to the app? </Text>
        <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.navigate("Register")}>
          <Text style={{ color: colors.light.accent, fontWeight: "700" }}>
            {" "}
            Register
          </Text>
        </TouchableOpacity>
      </View>

    </View>

  );
};

export default LoginScreen;