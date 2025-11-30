import { View, Text } from "react-native";
import {useState,useEffect} from "react";
import LottieView from "lottie-react-native";
import infinity1 from "../assets/animations/infinity1.json";
import { Heading, Body } from "./Typography";
import useThemeStore from '../store/themeStore';

const Welcome = () => {
  const{colors} = useThemeStore();
  const [time, setTime] = useState(0);
  const [i, setI] = useState(0);
  const [emoji, setEmoji] = useState("😎");
  const emojis = [
    "😎",
    "😍",
    "🤩",
    "🎉",
    "🥳",
    "💐",
    "✨",
    "😊",
    "👋",
    "💖",
    "🤗",
  ];
  useEffect(() => {
    const timer = setTimeout(() => {
      setTime(time + 1);
    }, 2000);
    const indx = (i + 1) % emojis.length;
    setI(indx);
    setEmoji(emojis[indx]);
    return () => clearTimeout(timer);
  }, [time]);
  return (
    <View className="flex-row flex-wrap justify-between item-center pl-4 mt-6">
      <View className="w-[55%] relative justify-end">
        <Heading style={{ fontSize: 30 }}> Hey There!</Heading>
        <View className="flex-row w-64 items-center">
          <Heading style={{ fontSize: 24,color:colors.primary }}>
            Welcome Back
          </Heading>
          <Text
            style={{ fontSize: 24 }}
            className="animate-float-up relative top-3"
          >
            {" "}
            {emoji}
          </Text>
        </View>
        <Body style={{ fontSize: 13 }}></Body>
      </View>
      <View className="w-[45%] justify-center items-center ">
        <LottieView
          source={infinity1}
          autoPlay
          loop
          style={{ width: 120, height: 120 }}
        />
      </View>
    </View>
  );
};

export default Welcome;
