import {
  Text,
  View,
  ScrollView,
  StatusBar,
  Platform,
  TouchableOpacity,
  TextInput,
  Linking,
  Image,
} from "react-native";
import { useState, useEffect } from "react";
import { Heading, Mid, Body, Caption } from "../../components/Typography";
import { LinearGradient } from "expo-linear-gradient";
import HomeHeader from "../../components/HomeHeader";
import useThemeStore from "../../store/themeStore";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { projectList } from "../../data/projects";
import Footer from "../../components/Footer";
const projects = () => {
  const { colors, statusBarStyle } = useThemeStore();
  const [input, setInput] = useState("");
  const [data, setData] = useState([]);
  const router = useRouter();
  const [focused, setFocused] = useState(false);
  const [listFocused, setListFocused] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const filtered = projectList.filter((item) =>
      item.name.toLowerCase().includes(input.toLowerCase())
    );
    setData(filtered);
  }, [input]);

  function capitalize(text) {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  return (
    <>
      {/* <LinearGradient colors={colors.gradients.background} style={{ flex: 1 }}> */}
      <StatusBar
        barStyle={statusBarStyle}
        backgroundColor={Platform.OS === "android" ? colors.bg : undefined}
        animated
      />
      <HomeHeader name="Projects" />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: colors.bg }}
      >
        <View className="flex-row relative items-center">
          <TouchableOpacity className="absolute left-8">
            <Ionicons name="search" size={24} />
          </TouchableOpacity>

          <TextInput
            placeholder="Search Project..."
            placeholderTextColor={colors.text}
            style={{
              borderWidth: 1,
              borderColor: focused ? colors.primary : colors.border,
              borderRadius: 10,
              paddingVertical: 20,
              margin: 20,
              color: colors.text,
            }}
            className="w-[90%] pl-12 pr-8"
            value={input}
            onChangeText={setInput}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
        </View>

        <View className="">
          {data.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => router.push(item.screen)}
              style={{
                padding: 16,
              }}
              className="flex-row gap-4 items-center "
            >
              {item.icon !== "" ? (
                <Ionicons
                  name={item.icon}
                  size={70}
                  color={colors.primary}
                  className=""
                />
              ) : (
                <Image
                  source={item.img}
                  style={{ height: 70, width: 70 }}
                  className="rounded-2xl"
                />
              )}
              <View>
                <Body style={{ color: colors.text, fontSize: 16 }}>
                  {item.name}
                </Body>
                <Caption>
                  {capitalize(item.type)} • {capitalize(item.category)}
                </Caption>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <Footer />
      </ScrollView>
      {/* </LinearGradient> */}
    </>
  );
};

export default projects;
