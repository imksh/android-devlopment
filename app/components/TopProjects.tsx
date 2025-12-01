import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Mid, Body } from "./Typography";
import { Ionicons } from "@expo/vector-icons";
import useThemeStore from "../../store/themeStore";
import { useRouter } from "expo-router";

const TopProjects = () => {
  const { colors } = useThemeStore();
  const router = useRouter();
  const data = [
    { name: "Tempelate", icon: "apps", screen: "/apps/(template)", img: "" },
    {
      name: "Calculator",
      icon: "calculator",
      screen: "/screens/Calculator",
      img: require("../../assets/images/logo/calculator.png"),
    },
    {
      name: "Snake & Ladder",
      icon: "",
      img: require("../../assets/images/ludo/logo.jpg"),
      screen: "/screens/SnakeAndLadder",
      type: "game",
      category: "classic",
    },
    {
      name: "ToDo",
      icon: "",
      img: require("../../assets/images/logo/todo.png"),
      screen: "/screens/ToDo",
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
        Top Projects
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
            className="gap-1 justify-between items-center"
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

export default TopProjects;
