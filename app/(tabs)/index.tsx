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
import HomeHeader from "../components/HomeHeader";
import useThemeStore from "../../store/themeStore";
import { useRouter } from "expo-router";
import Welcome from "../components/Welcome";
import Footer from "../components/Footer";
import RecentWebProjects from "../components/RecentWebProjects";
import RecentApps from "../components/RecentApps";
import RecentGames from "../components/RecentGames";
import TopProjects from "../components/TopProjects";

const index = () => {
  const { colors, statusBarStyle } = useThemeStore();

  return (
    <>
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

        <TopProjects />

        <RecentWebProjects />

        <RecentApps />

        <RecentGames />

        <Footer />
      </ScrollView>
    </>
  );
};

export default index;
