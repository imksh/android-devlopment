import { View, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import useThemeStore from "../../store/themeStore";

export default function ImageViewScreen() {
  const { uri, img } = useLocalSearchParams();
  const { colors } = useThemeStore();
  const router = useRouter();

  const downloadImage = async (url) => {
    // Ask permission
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission required");
      return;
    }

    const fileUri = FileSystem.documentDirectory + "image.jpg";

    // Download the file
    const res = await FileSystem.downloadAsync(url, fileUri);

    // Save to gallery
    await MediaLibrary.saveToLibraryAsync(res.uri);

    Alert.alert("Downloaded", "Image saved to gallery");
  };

  return (
    <>
      <View
        className="relative flex-row justify-between p-5"
        style={{
          backgroundColor: colors.surface,
          borderWidth: 1,
          borderColor: colors.border,
          paddingTop: 40,
        }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            zIndex: 10,
            backgroundColor: "rgba(0,0,0,0.5)",
            padding: 8,
            borderRadius: 50,
          }}
        >
          <Ionicons name="arrow-back" size={26} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={downloadImage}
          style={{
            zIndex: 10,
            backgroundColor: "rgba(0,0,0,0.5)",
            padding: 8,
            borderRadius: 50,
          }}
        >
          <Ionicons name="download" size={26} color="white" />
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1, backgroundColor: colors.bg }}>
        {uri === "" ? (
          <Image
            source={img}
            style={{
              width: "100%",
              height: "100%",
              resizeMode: "contain",
            }}
            className="m-auto"
          />
        ) : (
          <Image
            source={{ uri }}
            style={{
              width: "100%",
              height: "100%",
              resizeMode: "contain",
            }}
            className="m-auto"
          />
        )}
      </View>
    </>
  );
}
