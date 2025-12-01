import {
  View,
  Text,
  ScrollView,
  StatusBar,
  Platform,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import { useEffect, useState } from "react";
import ScreenHeader from "../components/ScreenHeader";
import useThemeStore from "../../store/themeStore";
import { save, getData } from "../../utils/storage";
import { Heading, Mid, Body } from "../components/Typography";
import { Ionicons } from "@expo/vector-icons";

const ToDo = () => {
  const { colors, statusBarStyle, theme, toggleTheme } = useThemeStore();
  const [input, setInput] = useState("");
  const [focused, setFocused] = useState(false);
  const [tasks, setTasks] = useState([]);
  const toggleDark = async () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    toggleTheme();
    await save("theme", nextTheme);
  };

  useEffect(() => {
    const fetch = async () => {
      const t = await getData("todo");
      if (t) {
        setTasks(t);
      }
    };
    fetch();
  }, []);

  const editTask = async (id) => {
    const updated = tasks.map((t) => {
      if (t.id === id) {
        t.isDone = !t.isDone;
      }
      return t;
    });
    setTasks(updated);
    await save("todo", updated);
  };
  const deleteTask = async (id) => {
    const updated = tasks.filter((t) => t.id !== id);
    setTasks(updated);
    await save("todo", updated);
  };
  const addTask = async () => {
    if (input.trim() === "") {
      ToastAndroid.show("Enter the task", ToastAndroid.SHORT);
      return;
    }
    const newTask = {
      name: input,
      id: tasks.length,
      isDone: false,
    };
    const updated = [...tasks, newTask];
    setTasks(updated);
    setInput("");
    await save("todo", updated);
  };
  return (
    <>
      <StatusBar
        barStyle={statusBarStyle}
        backgroundColor={Platform.OS === "android" ? colors.bg : undefined}
        animated
      />
      <ScreenHeader
        name="ToDo"
        icon={theme === "light" ? "sunny-outline" : "moon-outline"}
        fun={toggleDark}
      />
      <View
        className="flex-row items-center justify-content-between p-8"
        style={{ backgroundColor: colors.bg }}
      >
        <TextInput
          placeholder="Add Task"
          placeholderTextColor={colors.text}
          style={{
            borderWidth: 1,
            borderColor: focused ? colors.primary : colors.border,
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
            color: colors.text,
            backgroundColor: colors.bg,
          }}
          className=" py-5 px-4 flex-1"
          value={input}
          onChangeText={setInput}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        <TouchableOpacity
          className="px-4 py-2 h-full text-center flex-row justify-center items-center"
          style={{
            backgroundColor: colors.primary,
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
          }}
          onPress={addTask}
        >
          <Mid style={{ color: "white" }}>Add Task</Mid>
        </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: colors.bg }}
        className="px-8 pb-8"
      >
        {tasks.map((task, indx) => (
          <View key={indx} className="flex-row items-center mb-4">
            <Body
              className={`flex-1 ${task.isDone ? "line-through" : ""}`}
              style={task.isDone ? { color: colors.textMuted } : {}}
            >
              {task.name}
            </Body>
            <View key={indx} className="flex-row items-center gap-4">
              <TouchableOpacity
                onPress={() => editTask(task.id)}
                className="p-3 bg-green-600 rounded"
              >
                <Ionicons
                  name="checkmark-done-circle-outline"
                  size={20}
                  color="white"
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => deleteTask(task.id)}
                className="p-3 bg-red-600 rounded"
              >
                <Ionicons name="trash-outline" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </>
  );
};

export default ToDo;
