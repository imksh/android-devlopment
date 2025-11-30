import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Mid, Body } from "./Typography";
import { Ionicons } from "@expo/vector-icons";
import useThemeStore from "../store/themeStore";
import { useRouter } from 'expo-router';

const RecentProjects = () => {
  const { colors } = useThemeStore();
  const router = useRouter();
  const data = [
    { name: "Calculator", icon: "calculator", screen: "/screens/Calculator" },
    { name: "Tempelate", icon: "apps", screen: "/apps/(template)" },
    {
      name: "Snake & Ladder",
      icon: "",
      img: require("../assets/images/ludo/snake.png"),
      screen: "/screens/SnakeAndLadder",
      type: "game",
      category: "classic",
    },
  ];

  return (
    <View style={{ paddingVertical: 20 }}>
      <Mid
        style={{ color: colors.text, fontSize: 20, fontWeight: "bold" }}
        className="ml-4"
      >
        Recent Projects
      </Mid>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: 10 }}
      >
        {data.map((item, index) => (
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
            className="gap-1"
          >
            {item.icon !== "" ? (
              <Ionicons
                name={item.icon}
                size={40}
                color={colors.primary}
                className="m-auto"
              />
            ) : (
              <Image
                source={item.img}
                style={{ height: "60%", width: "80%" }}
                className="mx-auto"
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
      </ScrollView>
    </View>
  );
};

export default RecentProjects;
