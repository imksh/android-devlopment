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
  Linking,
} from "react-native";
import { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import HomeHeader from "../../components/HomeHeader";
import useThemeStore from "../../store/themeStore";
import { Heading, Caption, Body, Mid } from "../../components/Typography";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Footer from "../../components/Footer";

const profile = () => {
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
        <HomeHeader
          name="Developer"
          icon="settings"
          fun={() => router.push("screens/settings")}
        />
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}
          showsVerticalScrollIndicator={false}
          style={{backgroundColor:colors.bg}}
        >
          <View className="p-5">
            <View style={{ alignItems: "center", marginTop: 20 }}>
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: "screens/ImageViewScreen",
                    params: {
                      uri: "",
                      img: require("../../assets/images/karan.png"),
                    },
                  })
                }
              >
                <Image
                  source={require("../../assets/images/karan.png")}
                  style={{
                    width: 120,
                    height: 120,
                    borderRadius: 60,
                    borderWidth: 2,
                    borderColor: colors.primary,
                  }}
                />
              </TouchableOpacity>
            </View>

            <View className="flex flex-row justify-around items-center my-8">
              <TouchableOpacity
                onPress={() => Linking.openURL("https://github.com/imksh")}
              >
                <Ionicons name="logo-github" size={40} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL("https://www.linkedin.com/in/imksh3/")
                }
              >
                <Ionicons name="logo-linkedin" size={40} color="#0077B5" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL("https://www.instagram.com/imksh.3/")
                }
              >
                <Ionicons name="logo-instagram" size={40} color="#E1306C" />
              </TouchableOpacity>
              <TouchableOpacity
                className=" p-2 rounded-2xl"
                style={{ backgroundColor: colors.primary }}
                onPress={() => Linking.openURL("https://imksh3.netlify.app/")}
              >
                <Ionicons name="code-slash-outline" size={25} color="white" />
              </TouchableOpacity>
            </View>

            <View className="mt-4 ">
              <Text
                style={{ color: colors.text, fontSize: 18, marginBottom: 12 }}
              >
                <Text style={{ fontWeight: "bold" }}>Name: </Text>
                Karan Sharma
              </Text>

              <Text
                style={{ color: colors.text, fontSize: 18, marginBottom: 12 }}
              >
                <Text style={{ fontWeight: "bold" }}>Qualification: </Text>
                Bachlore of Technology (B.Tech)
              </Text>

              <Text
                style={{ color: colors.text, fontSize: 18, marginBottom: 12 }}
              >
                <Text style={{ fontWeight: "bold" }}>Stream: </Text>
                Computer Science & Engineering
              </Text>

              <TouchableOpacity
                onPress={() => Linking.openURL("mailto:karan03945@gmail.com")}
              >
                <Text
                  style={{ color: colors.text, fontSize: 18, marginBottom: 12 }}
                >
                  <Text style={{ fontWeight: "bold" }}>Email: </Text>
                  karan03945@gmail.com
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => Linking.openURL("tel:7295038835")}>
                <Text
                  style={{ color: colors.text, fontSize: 18, marginBottom: 12 }}
                >
                  <Text style={{ fontWeight: "bold" }}>Phone: </Text>
                  7295038835
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Footer />
        </ScrollView>
      {/* </LinearGradient> */}
    </>
  );
};

export default profile;
