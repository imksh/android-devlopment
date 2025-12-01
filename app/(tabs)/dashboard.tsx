import {
  Text,
  View,
  ScrollView,
  StatusBar,
  Platform,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Heading, Mid, Body } from "../components/Typography";
import { LinearGradient } from "expo-linear-gradient";
import HomeHeader from "../components/HomeHeader";
import useThemeStore from "../../store/themeStore";
import { useRouter } from "expo-router";
import Footer from '../components/Footer';

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
      {/* <LinearGradient colors={colors.gradients.background} style={{ flex: 1 }}> */}
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
          style={{backgroundColor:colors.bg}}
        >
          <Mid
            style={{
              color: colors.text,
              marginTop: 10,
              fontSize: 16,
              textAlign: "center",
            }}
          >
            Explore all my projects and modules.
          </Mid>
          <View className="p-5">
            {cards.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => router.push(item.screen)}
                style={{
                  padding: 20,
                  marginTop: 16,
                  borderWidth: 1,
                  borderRadius: 12,
                  borderColor: colors.border,
                  backgroundColor: colors.bg,
                }}
              >
                <Body style={{ color: colors.text, fontSize: 18 }}>
                  {item.title}
                </Body>
              </TouchableOpacity>
            ))}
          </View>
          <Footer/>
        </ScrollView>
      {/* </LinearGradient> */}
    </>
  );
};

export default dashboard;
