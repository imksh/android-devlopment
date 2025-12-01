import {
  Text,
  View,
  ScrollView,
  StatusBar,
  Platform,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Heading, Mid, Body } from "../../components/Typography";
import { LinearGradient } from "expo-linear-gradient";
import HomeHeader from "../../components/HomeHeader";
import useThemeStore from "../../../store/themeStore";
import { useRouter } from "expo-router";

const dashboard = () => {
  const { colors, statusBarStyle } = useThemeStore();
  const router = useRouter();
  const cards = [
    { title: "Projects", screen: "projects" },
    { title: "About RICR", screen: "(tabs)" },
    { title: "My Skills", screen: "(tabs)" },
    { title: "Contact", screen: "(tabs)" },
  ];

  return (
    <>
      <LinearGradient colors={colors.gradients.background} style={{ flex: 1 }}>
        <StatusBar
          barStyle={statusBarStyle}
          backgroundColor={Platform.OS === "android" ? colors.bg : undefined}
          animated
        />
        <HomeHeader name="Dashboard" />
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}
          showsVerticalScrollIndicator={false}
        ></ScrollView>
      </LinearGradient>
    </>
  );
};

export default dashboard;
