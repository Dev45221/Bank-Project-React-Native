import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from "../config/theme";

export default function InputField({
  label,
  values,
  setText,
  icon,
  length,
  inputType,
  keyboardType,
  fieldButtonLabel,
  fieldButtonFunction,
}) {
  // const { theme } = useContext(ThemeContext);
  // let colors.light = colors[theme.mode];
  const [show, setShow] = useState(false)

  return (
    <View
      style={{
        flexDirection: "row",
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
        paddingBottom: 8,
        marginBottom: 25,
      }}
    >
      {icon}
      {inputType == "password" ? (
        <TextInput
          value={values}
          onChangeText={(val) => setText(val)}
          placeholderTextColor={colors.light.text}
          placeholder={label}
          keyboardAppearance={colors.light.primary}
          keyboardType={keyboardType}
          style={{ flex: 1, fontSize: 17, paddingVertical: 0, color: colors.light.tint }}
          secureTextEntry={show ? false : true}
        />
      ) : (
        <TextInput
          value={values}
          onChangeText={(val) => setText(val)}
          placeholderTextColor={colors.light.text}
          placeholder={label}
          keyboardAppearance={colors.light.primary}
          keyboardType={keyboardType}
          maxLength={length}
          style={{ flex: 1, fontSize: 17, paddingVertical: 0, color: colors.light.tint }}
        />
      )}
      {
        inputType == "password" ? (
            show ?
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setShow(!show)}
              >
                <Image source={require('../images/show.png')} style={{ width: 25, height: 25, marginRight: 15 }} />
              </TouchableOpacity>
              : <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setShow(!show)}
              >
                <Image source={require('../images/hide.png')} style={{ width: 25, height: 25, marginRight: 15 }} />
              </TouchableOpacity>
          
        ) : null
      }
      <TouchableOpacity onPress={fieldButtonFunction}>
        <Text style={{ color: "#1DA1F2", fontWeight: "700" }}>
          {fieldButtonLabel}
        </Text>
      </TouchableOpacity>
    </View>
  );
}