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
import HomeHeader from "../../../components/HomeHeader";
import useThemeStore from "../../../store/themeStore";
import { Heading, Body, Mid, Caption } from "../../../components/Typography";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import AppsHeader from '../../../components/AppsHeader';

const index = () => {
  const { colors, statusBarStyle } = useThemeStore();
  const router = useRouter();
 

  return (
    <>
      <LinearGradient colors={colors.gradients.background} style={{ flex: 1 }}>
        <StatusBar
          barStyle={statusBarStyle}
          backgroundColor={Platform.OS === "android" ? colors.bg : undefined}
          animated
        />
        <HomeHeader
          name="Developer"
          icon="log-out-outline"
          fun={() => router.back()}
        />
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-1">
            
          </View>
        </ScrollView>
      </LinearGradient>
    </>
  );
};

export default index;
