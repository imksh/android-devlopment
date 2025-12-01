import { View, TouchableOpacity } from "react-native";
import React from "react";
import { Heading } from "./Typography";
import useThemeStore from "../../store/themeStore";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function AppsHeader({ name }) {
  const { colors } = useThemeStore();
  const router = useRouter();
  return (
    <View
      className="pt-16 pb-2 pl-4 flex-row items-center justify-between"
      style={{ backgroundColor: colors.bg, elevation: 2 }}
    >
      <Heading style={{ fontSize: 28, color: colors.primary }}>{name}</Heading>
      <TouchableOpacity onPress={() => router.back()} className="mr-8">
        <Ionicons name="log-out-outline" color={colors.text} size={28} />
      </TouchableOpacity>
    </View>
  );
}
