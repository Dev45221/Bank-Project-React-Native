import { Text, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { colors } from "../config/theme";
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';

export default function CustomButton({ label, onPress }) {
  // const { theme } = useContext(ThemeContext);
  // let colors.light = colors[theme.mode];

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={{
        backgroundColor: colors.light.accent,
        padding: 20,
        borderRadius: 10,
        marginBottom: 30,
      }}
    >
      <Text
        style={{
          textAlign: "center",
          fontWeight: "700",
          fontSize: 16,
          color: "#fff",
        }}
      >
        {label}
      </Text>

    </TouchableOpacity>
  );
}
