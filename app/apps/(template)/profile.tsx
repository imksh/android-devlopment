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
import useThemeStore from "../../../store/themeStore";
import { Heading,Caption,Body,Mid } from "../../components/Typography";
import { useRouter } from "expo-router";

const profile = () => {
  const { colors, statusBarStyle } = useThemeStore();
  const router = useRouter();
  const myDetails = {
    name: "Karan Sharma",
    institute: "RICR - Raj Institute of Coding & Robotics",
    course: "Full Stack Development",
    email: "karan03945@gmail.com",
    phone: "+91 7295038835",
  };

  return (
    <>
      <LinearGradient colors={colors.gradients.background} style={{ flex: 1 }}>
        <StatusBar
          barStyle={statusBarStyle}
          backgroundColor={Platform.OS === "android" ? colors.bg : undefined}
          animated
        />
        <HomeHeader
          name="Karan Sharma"
          icon="settings"
          fun={() => router.push("screens/settings")}
        />
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}
          showsVerticalScrollIndicator={false}
        >
          <View className="p-5">
            <View style={{ alignItems: "center", marginTop: 20 }}>
              <Image
                source={require("../../../assets/images/karan.png")}
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: 60,
                  borderWidth: 2,
                  borderColor: colors.primary,
                }}
              />
            </View>

            <View style={{ marginTop: 30 }}>
              <Text
                style={{ color: colors.text, fontSize: 18, marginBottom: 12 }}
              >
                <Text style={{ fontWeight: "bold" }}>Name: </Text>
                {myDetails.name}
              </Text>

              <Text
                style={{ color: colors.text, fontSize: 18, marginBottom: 12 }}
              >
                <Text style={{ fontWeight: "bold" }}>Email: </Text>
                {myDetails.email}
              </Text>

              <Text
                style={{ color: colors.text, fontSize: 18, marginBottom: 12 }}
              >
                <Text style={{ fontWeight: "bold" }}>Phone: </Text>
                {myDetails.phone}
              </Text>
            </View>
          </View>
          
        </ScrollView>
      </LinearGradient>
    </>
  );
};

export default profile;
