import {
  View,
  Text,
  Animated,
  StatusBar,
  Platform,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
  Image,
} from "react-native";
import { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import HomeHeader from "../../components/HomeHeader";
import useThemeStore from "../../store/themeStore";
import { Heading, Body, Mid, Caption } from "../../components/Typography";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { projectList } from "../../data/projects";
import Welcome from "../../components/Welcome";
import RecentProjects from "../../components/RecentProjects";
import Footer from "../../components/Footer";
import RecentWebProjects from "../../components/RecentWebProjects";

const index = () => {
  const { colors, statusBarStyle } = useThemeStore();
  const router = useRouter();

  return (
    <>
      {/* <LinearGradient colors={colors.gradients.background} style={{ flex: 1 }}> */}
      <StatusBar
        barStyle={statusBarStyle}
        backgroundColor={Platform.OS === "android" ? colors.bg : undefined}
        animated
      />
      <HomeHeader name="IdioticMinds" />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: colors.bg }}
      >
        <Welcome />

        <RecentProjects />

        <RecentWebProjects />

        <View className="flex-1">
          <View style={{ paddingVertical: 20 }}>
            <Mid
              style={{ color: colors.text, fontSize: 20, fontWeight: "bold" }}
              className="ml-4"
            >
              Apps
            </Mid>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ marginTop: 10 }}
            >
              {projectList
                .filter((i) => i.type === "app")
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

          <View style={{ paddingVertical: 20 }}>
            <Mid
              style={{ color: colors.text, fontSize: 20, fontWeight: "bold" }}
              className="ml-4"
            >
              Games
            </Mid>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ marginTop: 10 }}
            >
              {projectList
                .filter((i) => i.type === "game")
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
                    className="gap-1 justify-center items-center"
                  >
                    {item.image !== "" ? (
                      <Image
                        source={item.img}
                        style={{ height: "70%", width: "90%",borderRadius:10 }}
                        class="object-contain rounded-2xl"
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
            </ScrollView>
          </View>
        </View>

        <Footer />
      </ScrollView>
      {/* </LinearGradient> */}
    </>
  );
};

export default index;
