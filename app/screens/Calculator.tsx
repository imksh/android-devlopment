import {
  View,
  Text,
  ScrollView,
  StatusBar,
  Platform,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import { useState, useEffect } from "react";
import useThemeStore from "../../store/themeStore";
import { Heading } from "../components/Typography";
import { LinearGradient } from "expo-linear-gradient";
import ScreenHeader from "../components/ScreenHeader";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { save } from "../../utils/storage";

const Calculator = () => {
  const { colors, statusBarStyle, theme, toggleTheme } = useThemeStore();
  const [input, setInput] = useState("");
  const [show, setShow] = useState(false);

  const btn = (char) => {
    char = String(char);

    if (char === "=") {
      try {
        setInput(eval(input) + "");
        setShow(true);
      } catch (error) {
        console.log("Error in Calculation: ", error);
        ToastAndroid.show("Invalid Expression", ToastAndroid.SHORT);
      }
    } else if (char === "c") {
      setShow(false);
      setInput("");
    } else if (char === "x") {
      setShow(false);
      setInput(input.slice(0, input.length - 1));
    } else {
      setShow(false);
      if (("*/+".includes(char) || char === "**") && input.length === 0) return;
      if (
        "*/+-".includes(input.charAt(input.length - 1)) &&
        "*/+".includes(char)
      ) {
        setInput(input.slice(0, input.length - 1) + char);
      } else {
        setInput(input + char);
      }
    }
  };

  const toggleDark = async () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    toggleTheme();
    await save("theme", nextTheme);
  };

  return (
    <LinearGradient colors={colors.gradients.background} style={{ flex: 1 }}>
      <StatusBar
        barStyle={statusBarStyle}
        backgroundColor={Platform.OS === "android" ? colors.bg : undefined}
        animated
      />
      <ScreenHeader
        name="Calculator"
        icon={theme === "light" ? "sunny-outline" : "moon-outline"}
        fun={toggleDark}
      />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingVertical: 10,
          width: "92%",
          marginHorizontal: "auto",
        }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 justify-end items-end px-8">
          <Heading
            style={
              show ? { fontSize: 40, color: colors.primary } : { fontSize: 30 }
            }
          >
            {input.replace("**", "^")}
          </Heading>
        </View>
        <View className="my-8">
          <View className="flex flex-row gap-4 justify-center my-2">
            <TouchableOpacity
              className="w-20 h-20 rounded-2xl flex justify-center items-center"
              style={{ backgroundColor: colors.primary }}
              onPress={() => btn("c")}
            >
              <Heading style={{ color: "white" }}>AC</Heading>
            </TouchableOpacity>
            <TouchableOpacity
              className="w-20 h-20 rounded-2xl flex justify-center items-center"
              style={{ backgroundColor: colors.bg }}
              onPress={() => setInput((prev) => prev.slice(0, -1))}
            >
              <MaterialCommunityIcons
                name="backspace-outline"
                size={20}
                color={colors.primary}
              />
            </TouchableOpacity>
            <TouchableOpacity
              className="w-20 h-20 rounded-2xl flex justify-center items-center"
              style={{ backgroundColor: colors.bg }}
              onPress={() => {
                btn("%");
              }}
            >
              <Heading style={{ color: colors.primary }}>%</Heading>
            </TouchableOpacity>
            <TouchableOpacity
              className="w-20 h-20 rounded-2xl flex justify-center items-center"
              style={{ backgroundColor: colors.bg }}
              onPress={() => {
                btn("/");
              }}
            >
              <Heading style={{ color: colors.primary }}>/</Heading>
            </TouchableOpacity>
          </View>

          <View className="flex flex-row gap-4 justify-center my-2">
            <TouchableOpacity
              className="w-20 h-20 rounded-2xl flex justify-center items-center"
              style={{ backgroundColor: colors.bg }}
              onPress={() => btn("7")}
            >
              <Heading>7</Heading>
            </TouchableOpacity>
            <TouchableOpacity
              className="w-20 h-20 rounded-2xl flex justify-center items-center"
              style={{ backgroundColor: colors.bg }}
              onPress={() => btn("8")}
            >
              <Heading>8</Heading>
            </TouchableOpacity>
            <TouchableOpacity
              className="w-20 h-20 rounded-2xl flex justify-center items-center"
              style={{ backgroundColor: colors.bg }}
              onPress={() => btn("9")}
            >
              <Heading>9</Heading>
            </TouchableOpacity>
            <TouchableOpacity
              className="w-20 h-20 rounded-2xl flex justify-center items-center"
              style={{ backgroundColor: colors.bg }}
              onPress={() => {
                btn("*");
              }}
            >
              <Heading style={{ color: colors.primary }}>x</Heading>
            </TouchableOpacity>
          </View>

          <View className="flex flex-row gap-4 justify-center my-2">
            <TouchableOpacity
              className="w-20 h-20 rounded-2xl flex justify-center items-center"
              style={{ backgroundColor: colors.bg }}
              onPress={() => btn("4")}
            >
              <Heading>4</Heading>
            </TouchableOpacity>
            <TouchableOpacity
              className="w-20 h-20 rounded-2xl flex justify-center items-center"
              style={{ backgroundColor: colors.bg }}
              onPress={() => btn("5")}
            >
              <Heading>5</Heading>
            </TouchableOpacity>
            <TouchableOpacity
              className="w-20 h-20 rounded-2xl flex justify-center items-center"
              style={{ backgroundColor: colors.bg }}
              onPress={() => btn("6")}
            >
              <Heading>6</Heading>
            </TouchableOpacity>
            <TouchableOpacity
              className="w-20 h-20 rounded-2xl flex justify-center items-center"
              style={{ backgroundColor: colors.bg }}
              onPress={() => {
                btn("-");
              }}
            >
              <Heading style={{ color: colors.primary }}>-</Heading>
            </TouchableOpacity>
          </View>

          <View className="flex flex-row gap-4 justify-center my-2">
            <TouchableOpacity
              className="w-20 h-20 rounded-2xl flex justify-center items-center"
              style={{ backgroundColor: colors.bg }}
              onPress={() => btn("1")}
            >
              <Heading>1</Heading>
            </TouchableOpacity>
            <TouchableOpacity
              className="w-20 h-20 rounded-2xl flex justify-center items-center"
              style={{ backgroundColor: colors.bg }}
              onPress={() => btn("2")}
            >
              <Heading>2</Heading>
            </TouchableOpacity>
            <TouchableOpacity
              className="w-20 h-20 rounded-2xl flex justify-center items-center"
              style={{ backgroundColor: colors.bg }}
              onPress={() => btn("3")}
            >
              <Heading>3</Heading>
            </TouchableOpacity>
            <TouchableOpacity
              className="w-20 h-20 rounded-2xl flex justify-center items-center"
              style={{ backgroundColor: colors.bg }}
              onPress={() => {
                btn("+");
              }}
            >
              <Heading style={{ color: colors.primary }}>+</Heading>
            </TouchableOpacity>
          </View>

          <View className="flex flex-row gap-4 justify-center my-2">
            <TouchableOpacity
              className="w-20 h-20 rounded-2xl flex justify-center items-center flex-row"
              style={{ backgroundColor: colors.bg }}
              onPress={() => {
                btn("**");
              }}
            >
              <Heading style={{ color: colors.primary }}>x</Heading>
              <Heading
                style={{
                  fontSize: 10,
                  lineHeight: 10,
                  top: -8,
                  position: "relative",
                  color: colors.primary,
                }}
              >
                Y
              </Heading>
            </TouchableOpacity>
            <TouchableOpacity
              className="w-20 h-20 rounded-2xl flex justify-center items-center"
              style={{ backgroundColor: colors.bg }}
              onPress={() => btn("0")}
            >
              <Heading>0</Heading>
            </TouchableOpacity>
            <TouchableOpacity
              className="w-20 h-20 rounded-2xl flex justify-center items-center"
              style={{ backgroundColor: colors.bg }}
              onPress={() => {
                btn(".");
              }}
            >
              <Heading>.</Heading>
            </TouchableOpacity>
            <TouchableOpacity
              className="w-20 h-20 rounded-2xl flex justify-center items-center"
              style={{ backgroundColor: colors.primary }}
              onPress={() => {
                btn("=");
              }}
            >
              <Heading style={{ color: "white" }}>=</Heading>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default Calculator;
