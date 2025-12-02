import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Mid, Body } from "./Typography";
import { Ionicons } from "@expo/vector-icons";
import useThemeStore from "../../store/themeStore";
import { useRouter } from "expo-router";
import { projectList } from "../../data/projects";

const RecentGames = () => {
  const { colors } = useThemeStore();
  const router = useRouter();

  return (
    <View style={{ paddingVertical: 20 }}>
      <Mid
        style={{ color: colors.text, fontSize: 20, fontWeight: "bold" }}
        className="ml-4"
      >
        Recent Games
      </Mid>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: 10 }}
      >
        {projectList
          .reverse()
          .filter((i) => i.type === "game")
          .slice(0, 5)
          .map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => router.push(item.screen)}
              style={{
                width: 140,
                aspectRatio: 1,
                padding: 15,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: colors.bg,
                borderRadius: 10,
                marginHorizontal: 8,
              }}
              className="gap-1 justify-between"
            >
              {item.img !== "" ? (
                <Image
                  source={item.img}
                  style={{ height: 70, width: 70, borderRadius: 10 }}
                  className="mx-auto"
                />
              ) : (
                <Ionicons
                  name={item.icon}
                  size={40}
                  color={colors.primary}
                  className="m-auto"
                />
              )}
              <Body
                style={{
                  color: colors.text,
                  fontSize: 16,
                  textAlign: "center",
                }}
              >
                {item.name}
              </Body>
            </TouchableOpacity>
          ))}
        <TouchableOpacity
          onPress={() => router.push("/(tabs)/projects")}
          style={{
            width: 140,
            aspectRatio: 1,
            padding: 15,
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: colors.primary,
            borderRadius: 10,
            marginHorizontal: 8,
          }}
          className="flex-row gap-1 justify-center items-center"
        >
          <Mid style={{ color: "white" }}>View All</Mid>
          <Ionicons name="chevron-forward-outline" size={20} color="white" />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default RecentGames;
