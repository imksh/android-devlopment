import {
  Text,
  View,
  ScrollView,
  StatusBar,
  Platform,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useState, useEffect } from "react";
import { Heading, Mid, Body } from "../../components/Typography";
import { LinearGradient } from "expo-linear-gradient";
import HomeHeader from "../../components/HomeHeader";
import useThemeStore from "../../../store/themeStore";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const projects = () => {
  const { colors, statusBarStyle } = useThemeStore();
  const [input, setInput] = useState("");
  const [data, setData] = useState([]);
  const router = useRouter();
  const [focused, setFocused] = useState(false);
  const [listFocused, setListFocused] = useState("");
  const projectList = [
    { name: "Calculator", icon: "calculator", screen: "/screens/Calculator" },
    { name: "Portfolio", icon: "apps", screen: "/screens/Calculator" },
    { name: "Form", icon: "person-circle", screen: "/screens/Calculator" },
  ];

  useEffect(() => {
    const filtered = projectList.filter((item) =>
      item.name.toLowerCase().includes(input.toLowerCase())
    );
    setData(filtered);
  }, [input]);

  return (
    <>
      <LinearGradient colors={colors.gradients.background} style={{ flex: 1 }}>
        <StatusBar
          barStyle={statusBarStyle}
          backgroundColor={Platform.OS === "android" ? colors.bg : undefined}
          animated
        />
        <HomeHeader name="Search" />
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}
          showsVerticalScrollIndicator={false}
        >
          
        </ScrollView>
      </LinearGradient>
    </>
  );
};

export default projects;
