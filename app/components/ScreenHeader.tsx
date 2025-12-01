import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Heading } from "./Typography";
import useThemeStore from "../../store/themeStore";
import { useRouter } from "expo-router";

export default function ScreenHeader({ name, icon, fun }) {
  const { colors } = useThemeStore();
  const router = useRouter();
  return (
    <View
      className="pt-16 pb-4"
      style={{
        backgroundColor: colors.bg,
        elevation: 2,
        borderBottomWidth: 2,
        borderColor: colors.border,
      }}
    >
      <View className="flex-row items-center">
        <TouchableOpacity className="ml-4" onPress={() => router.back()}>
          <Ionicons name="arrow-back-outline" color={colors.text} size={30} />
        </TouchableOpacity>
        <Heading className="ml-4">{name}</Heading>
        {icon && (
          <TouchableOpacity className="ml-4 absolute right-7" onPress={fun}>
            <Ionicons name={icon} color={colors.text} size={25} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
