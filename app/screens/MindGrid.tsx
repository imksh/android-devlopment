import {
  TouchableOpacity,
  View,
  Image,
  StatusBar,
  Platform,
} from "react-native";
import { useState, useEffect } from "react";
import { makeSnakeBoard } from "../../utils/makeSnakeBoard.ts";

import celebrate from "../../assets/animations/celebrate.json";
import trophy from "../../assets/animations/trophy.json";
import { Heading, Mid, SubHeading, Body } from "../components/Typography";
import { Audio } from "expo-av";
import { LinearGradient } from "expo-linear-gradient";
import useThemeStore from "../../store/themeStore";
import ScreenHeader from "../components/ScreenHeader";
import LottieView from "lottie-react-native";
import { Ionicons } from "@expo/vector-icons";
import { save, getData } from "../../utils/storage";

const MindGrid = () => {
  const { colors, statusBarStyle, theme, toggleTheme } = useThemeStore();
  const [volume, setVolume] = useState(true);
  const [selected, setSelected] = useState(null);
  const [winner, setWinner] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [grid, setGrid] = useState([]);
  const [size, setSize] = useState(4);
  const [isProgress, setIsProgress] = useState(false);

  const toggleDark = async () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    toggleTheme();
    await save("theme", nextTheme);
  };

  async function playVictory() {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/sounds/victory.mp3")
    );
    await sound.playAsync();
  }
  async function playSuccess() {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/sounds/sucess.mp3")
    );
    await sound.playAsync();
  }

  async function playError() {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/sounds/error.mp3")
    );
    await sound.playAsync();
  }
  async function playButton() {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/sounds/button2.mp3")
    );
    await sound.playAsync();
  }

  async function playButton1() {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/sounds/button.mp3")
    );
    await sound.playAsync();
  }

  function generate() {
    return Math.floor(Math.random() * size);
  }

  useEffect(() => {
    create();
  }, []);

  const create = () => {
    let arr = Array.from({ length: size }, () =>
      Array.from({ length: size }, () => null)
    );
    let id = 0;
    for (let i = 1; i <= size * 2; i++) {
      while (true) {
        let x = generate();
        let y = generate();
        if (!arr[x][y]) {
          arr[x][y] = { digit: i, id: id, isSelected: false };
          id = id + 1;
          break;
        }
      }
      while (true) {
        let x = generate();
        let y = generate();
        if (!arr[x][y]) {
          arr[x][y] = { digit: i, id: id, isSelected: false };
          id = id + 1;
          break;
        }
      }
    }
    setGrid(arr);
  };

  const handle = (item) => {
    if (!gameStarted) return;
    setIsProgress(true);
    if (volume) playButton();
    const temp = grid.map((row) => {
      row.map((i) => {
        if (i.id === item.id) {
          i.isSelected = true;
        }
        return i;
      });
      return row;
    });
    setGrid(temp);
    if (!selected) {
      setSelected(item);
      setIsProgress(false);
      return;
    }
    if (item.digit !== selected.digit) {
      setTimeout(() => {
        const temp2 = grid.map((row) => {
          row.map((i) => {
            if (i.id === item.id || i.id === selected.id) {
              i.isSelected = false;
            }
            return i;
          });
          return row;
        });
        setGrid(temp2);
        setIsProgress(false);
      }, 1000);
      if (volume) playError();
    } else {
      if (volume) playSuccess();
      setIsProgress(false);
    }
    setSelected(null);
    check();
  };

  const check = () => {
    let flag = true;
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (!grid[i][j].isSelected) flag = false;
      }
    }
    if (flag) {
      if (volume) playVictory();
      setWinner(true);
    }
  };

  const restart = () => {
    if (volume) playButton1();
    setGameStarted(true);
    create();
    setWinner(false);
    setSelected(null);
  };

  return (
    <View className="flex-1" style={{ backgroundColor: colors.bg }}>
      <StatusBar
        barStyle={statusBarStyle}
        backgroundColor={Platform.OS === "android" ? colors.bg : undefined}
        animated
      />
      <ScreenHeader name="MindGrid" />
      <View className="flex flex-row  items-center justify-around mt-8">
        <TouchableOpacity
          className={`px-8 py-4 justify-center items-center  rounded text-white cursor-pointer min-w-32 ${
            gameStarted ? "bg-red-500" : "bg-green-500"
          }`}
          onPress={restart}
        >
          <Mid style={{ color: "white" }}>
            {!gameStarted ? "Start" : "Reset"}
          </Mid>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setVolume(!volume);
          }}
        >
          {volume ? (
            <Ionicons
              name="volume-high-outline"
              size={30}
              color={colors.text}
            />
          ) : (
            <Ionicons
              name="volume-mute-outline"
              size={30}
              color={colors.text}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleDark}>
          {theme === "light" ? (
            <Ionicons name="sunny-outline" size={30} color={colors.text} />
          ) : (
            <Ionicons name="moon-outline" size={30} color={colors.text} />
          )}
        </TouchableOpacity>
      </View>
      <View
        className="flex justify-center items-center m-auto gap-1"
        style={{ width: size * 70 + size * 2 }}
      >
        {winner && (
          <View className="absolute w-[80vw] h-[50vh]   justify-center items-center z-[99] ">
            <View className="absolute">
              <LottieView
                source={celebrate}
                autoPlay
                loop
                style={{ width: 500, height: 500 }}
              />
            </View>
            <View className="absolute">
              <LottieView
                source={trophy}
                autoPlay
                loop
                style={{ width: 500, height: 500 }}
              />
            </View>
          </View>
        )}
        {grid.map((x, i) => (
          <View
            key={i}
            className="flex flex-row justify-center items-center gap-1 "
          >
            {x.map((item, j) => (
              <TouchableOpacity
                key={j}
                className={`rounded-2xl flex justify-center items-center`}
                style={{
                  width: 70,
                  height: 70,
                  borderWidth: 1,
                  borderColor: colors.border,
                  backgroundColor: item.isSelected
                    ? colors.primary
                    : gameStarted
                      ? colors.textMuted
                      : "#9CA3AF",
                }}
                onPress={() => handle(item)}
                disabled={isProgress || item.isSelected}
              >
                <Heading style={{ color: "white" }}>
                  {item.isSelected && item.digit}
                </Heading>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

export default MindGrid;
