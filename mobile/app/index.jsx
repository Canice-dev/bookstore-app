import { Text, View } from "react-native";
import { Image } from "expo-image"
import { Link } from "expo-router"

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen 123.</Text>
      <Link href={"/(auth)/signup"}>Signup</Link>
      <Link href={"/(auth)"}>login</Link>
      <Image  />
    </View>
  );
}
