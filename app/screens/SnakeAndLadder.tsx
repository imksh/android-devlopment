import {
  TouchableOpacity,
  TextInput,
  View,
  Image,
  StatusBar,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { useState, useRef, useEffect } from "react";
import { makeSnakeBoard } from "../../utils/makeSnakeBoard.ts";

import celebrate from "../../assets/animations/celebrate.json";
import { Heading, Mid, SubHeading, Body } from "../../components/Typography";
import { Audio } from "expo-av";
import { LinearGradient } from "expo-linear-gradient";
import useThemeStore from "../../store/themeStore";
import ScreenHeader from "../../components/ScreenHeader";
import LottieView from "lottie-react-native";

const SnakeAndLadder = () => {
  const { colors, statusBarStyle } = useThemeStore();
  const cells = makeSnakeBoard();
  const [dice1, setDice1] = useState(6);
  const [dice2, setDice2] = useState(6);
  const [player1Name, setPlayer1Name] = useState("Player 1");
  const [player2Name, setPlayer2Name] = useState("Player 2");
  const [gameStarted, setGameStarted] = useState(false);
  const [winner, setWinner] = useState("");
  const [chance, setChance] = useState(1);
  const [spin1, setSpin1] = useState(false);
  const [spin2, setSpin2] = useState(false);
  const [p1, setP1] = useState(1);
  const [p2, setP2] = useState(1);
  const [six, setSix] = useState(0);
  const diceImages = {
    1: require("../../assets/images/ludo/1.png"),
    2: require("../../assets/images/ludo/2.png"),
    3: require("../../assets/images/ludo/3.png"),
    4: require("../../assets/images/ludo/4.png"),
    5: require("../../assets/images/ludo/5.png"),
    6: require("../../assets/images/ludo/6.png"),
  };

  async function playSuccess() {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/sounds/sucess.mp3")
    );
    await sound.playAsync();
  }

  async function playDice() {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/sounds/dice.mp3")
    );
    await sound.playAsync();
  }

  async function playSnake() {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/sounds/snake.mp3")
    );
    await sound.playAsync();
  }

  function generate() {
    return Math.floor(Math.random() * 6) + 1;
  }
  const player1 = () => {
    setSpin1(true);
    setTimeout(() => {
      if (chance !== 6) {
        setChance(2);
      }
      setSpin1(false);
    }, 300);
    playDice();
    if (six === 3) {
      setChance(2);
      setSix(0);
      return;
    }
    const n = generate();

    setDice1(n);
    for (let i = 1; i <= n; i++) {
      if (p1 === 100) break;
      setTimeout(() => {
        setP1((prev) => prev + 1);
        if (i === n) {
          setTimeout(() => {
            jump(p1 + n, setP1);
          }, 100);
        }
      }, i * 300);
    }

    if (p1 + n >= 100) {
      setWinner(player1Name);
      setGameStarted(false);
      setP1(100);
    }
    if (n !== 6) {
      setChance(2);
      setSix(0);
    } else {
      setSix(six + 1);
    }
  };
  const player2 = () => {
    setSpin2(true);
    setTimeout(() => {
      if (chance !== 6) {
        setChance(1);
      }
      setSpin2(false);
    }, 300);
    playDice();
    const n = generate();

    setDice2(n);
    for (let i = 1; i <= n; i++) {
      if (p2 === 100) break;
      setTimeout(() => {
        setP2((prev) => prev + 1);
        if (i === n) {
          setTimeout(() => {
            jump(p2 + n, setP2);
          }, 100);
        }
      }, i * 300);
    }
    setDice2(n);
    if (p2 + n >= 100) {
      setWinner(player2Name);
      setP2(100);
      setGameStarted(false);
    }
    if (n !== 6) {
      setSix(0);
    } else {
      setSix(six + 1);
    }
  };

  const restart = () => {
    setGameStarted(true);
    setP1(1);
    setP2(1);
    setDice1(6);
    setDice2(6);
    setWinner("");
    setChance(1);
  };

  const jump = (n, fun) => {
    switch (n) {
      case 61:
        playSuccess();
        fun(82);
        break;
      case 16:
        playSuccess();
        fun(46);
        break;
      case 28:
        playSuccess();
        fun(74);
        break;
      case 69:
        playSuccess();
        fun(91);
        break;
      case 37:
        playSuccess();
        fun(58);
        break;
      case 45:
        playSuccess();
        fun(64);
        break;
      case 99:
        playSnake();

        fun(77);
        break;
      case 62:
        fun(45);
        playSnake();

        break;
      case 22:
        fun(5);
        playSnake();
        break;

      case 35:
        fun(12);
        playSnake();
        break;
      case 87:
        fun(70);
        playSnake();
        break;

      default:
        break;
    }
  };
  return (
    <LinearGradient colors={colors.gradients.background} style={{ flex: 1 }}>
      <StatusBar
        barStyle={statusBarStyle}
        backgroundColor={Platform.OS === "android" ? colors.bg : undefined}
        animated
      />
      <ScreenHeader name="Snake & Ladder" />

      <View className="">
        <View className="flex flex-row  items-center justify-around m-4">
          <TouchableOpacity
            className={`px-8 py-3  rounded text-white cursor-pointer ${
              gameStarted ? "bg-gray-400" : "bg-green-500"
            }`}
            onPress={() => setGameStarted(true)}
            disabled={gameStarted}
          >
            <Mid style={{ color: "white" }}>Start</Mid>
          </TouchableOpacity>
          <TouchableOpacity
            className={`px-8 py-3  rounded text-white cursor-pointer ${
              gameStarted ? " bg-red-500" : "bg-gray-400"
            }`}
            onPress={restart}
            disabled={!gameStarted}
          >
            <Mid style={{ color: "white" }}>Restart</Mid>
          </TouchableOpacity>
        </View>
        <View className="flex flex-col min-w-screen justify-center items-center mt-15">
          {winner && (
            <View className="absolute bg-green-600 text-white w-[80vw] h-[50vh]  rounded-2xl flex justify-center gap-8 items-center flex-col z-[99] text-center">
              <Heading
                className="text-4xl bold text-center"
                style={{ color: "white" }}
              >
                {winner} is Winner
              </Heading>
              <TouchableOpacity
                className={`px-8 py-3  rounded text-white cursor-pointer z-50 bg-red-500`}
                onPress={restart}
              >
                <Mid style={{ color: "white" }}>Restart</Mid>
              </TouchableOpacity>
              <View className="absolute">
                <LottieView
                  source={celebrate}
                  autoPlay
                  loop
                  style={{ width: 150, height: 150 }}
                />
              </View>
            </View>
          )}

          <View
            className=" flex flex-row flex-wrap relative w-[100%] h-[410px]"
            style={{ padding: 3 }}
          >
            <Image
              source={require("../../assets/images/ludo/ladder.png")}
              className="absolute z-50 top-16"
              style={{ width: 70, height: 90 }}
            />
            <Image
              source={require("../../assets/images/ludo/ladder.png")}
              className="absolute z-50  -rotate-3 bottom-16 left-40"
              style={{ width: 75, height: 120 }}
            />
            <Image
              source={require("../../assets/images/ludo/ladder.png")}
              className="absolute z-50 bottom-28 right-12 "
              style={{
                width: 140,
                height: 220,
                transform: [{ rotateY: "120deg" }],
              }}
            />

            <Image
              source={require("../../assets/images/ludo/ladder.png")}
              className="absolute z-50 top-8 -right-2"
              style={{
                width: 90,
                height: 120,
                transform: [{ rotateY: "10deg" }],
              }}
            />

            <Image
              source={require("../../assets/images/ludo/ladder.png")}
              className="absolute z-50 bottom-40 left-16 "
              style={{
                width: 100,
                height: 90,
                transform: [{ rotateY: "200deg" }],
              }}
            />

            <Image
              source={require("../../assets/images/ludo/ladder.png")}
              className="absolute z-50 top-40 left-32 "
              style={{
                width: 70,
                height: 80,
                transform: [{ rotateY: "180deg" }],
              }}
            />

            <Image
              source={require("../../assets/images/ludo/snake.png")}
              className="absolute z-50 top-4 left-10 "
              style={{ width: 100, height: 90 }}
            />

            <Image
              source={require("../../assets/images/ludo/snake.png")}
              className="absolute z-40 top-40 left-12"
              style={{ width: 110, height: 100 }}
            />
            <Image
              source={require("../../assets/images/ludo/snake.png")}
              className="absolute z-40 bottom-4 left-12"
              style={{ width: 110, height: 100 }}
            />
            <Image
              source={require("../../assets/images/ludo/snake.png")}
              className="absolute z-40 bottom-14 right-16"
              style={{ width: 110, height: 100 }}
            />
            <Image
              source={require("../../assets/images/ludo/snake.png")}
              className="absolute z-40 top-14 right-2"
              style={{ width: 125, height: 120 }}
            />
            {cells.map((n) => (
              <View
                key={n}
                className=" border border-black relative flex  flex-row justify-center items-center gap-2 w-[10%] h-[40px]"
                style={{ borderColor: colors.border, borderWidth: 1 }}
              >
                <View
                  className={`z-30 absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] ${
                    (p1 === n || p2 === n) && p1 !== p2 ? "text-white" : ""
                  }`}
                >
                  <Mid>{n}</Mid>
                </View>
                {p1 === n && (
                  <View
                    className={`${
                      p1 === p2 ? "w-3 h-3 " : "w-5 h-5 "
                    } bg-red-500 rounded-full`}
                  ></View>
                )}
                {p2 === n && (
                  <View
                    className={`${
                      p1 === p2 ? "w-3 h-3 " : "w-5 h-5 "
                    } bg-green-500 rounded-full`}
                  ></View>
                )}
              </View>
            ))}
          </View>

          <View className="flex flex-row w-full justify-around my-5">
            <TouchableOpacity
              onPress={player1}
              disabled={!gameStarted || chance === 2}
              className="flex flex-col border  justify-center items-center rounded-2xl w-[40%]  px-5 py-8 gap-4"
              style={
                gameStarted && chance === 1
                  ? {
                      borderColor: colors.border,
                      borderWidth: 2,
                      backgroundColor: colors.primary,
                    }
                  : {
                      borderColor: colors.border,
                      borderWidth: 2,
                    }
              }
            >
              <Mid>Player 1</Mid>
              <Image
                key={spin1 ? "spin1" : "spin0"}
                source={diceImages[dice1]}
                style={{ width: 50, height: 50, resizeMode: "cover" }}
                className={spin1 ? "animate-dice1" : ""}
              />
            </TouchableOpacity>

            <TouchableOpacity
              className="flex flex-col border  justify-center items-center rounded-2xl w-[40%] px-5 py-8 gap-4"
              style={
                gameStarted && chance === 2
                  ? {
                      borderColor: colors.border,
                      borderWidth: 2,
                      backgroundColor: colors.primary,
                    }
                  : {
                      borderColor: colors.border,
                      borderWidth: 2,
                    }
              }
              onPress={player2}
              disabled={!gameStarted || chance === 1}
            >
              <Mid>Player 2</Mid>
              <Image
                key={spin2 ? "spin2" : "spin0"}
                source={diceImages[dice2]}
                style={{ width: 50, height: 50, resizeMode: "cover" }}
                className={spin2 ? "animate-dice2" : ""}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

export default SnakeAndLadder;
