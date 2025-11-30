import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Linking,
} from "react-native";
import React from "react";
import { Mid, Body, Caption } from "./Typography";
import { Ionicons } from "@expo/vector-icons";
import useThemeStore from "../store/themeStore";
import { webProjects } from "../data/webProjects";

const RecentWebProjects = () => {
  const { colors } = useThemeStore();
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
        Web Projects
      </Mid>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: 10 }}
      >
        {webProjects.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => Linking.openURL(item.link)}
            style={{
              width: 240,
              padding: 15,
              borderWidth: 1,
              borderColor: colors.border,
              backgroundColor: colors.bg,
              borderRadius: 10,
              marginHorizontal: 8,
            }}
            className="gap-1"
          >
            <Image
              source={item.img}
              style={{ height: 120, width: "80%" }}
              className="mx-auto object-fit-contain"
            />

            <Mid
              style={{
                color: colors.text,
                fontSize: 16,
                textAlign: "center",
              }}
            >
              {item.title}
            </Mid>
            <Caption style={{fontSize:13}}>{item.desc}</Caption>
            <Caption style={{fontSize:10}}>{item.type} • {item.category}</Caption>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default RecentWebProjects;
