// import { Stack, useRouter, useSegments } from "expo-router";
// import { SafeAreaProvider } from "react-native-safe-area-context";
// import SafeScreen from "../components/SafeScreen";
// import { useAuthStore } from "../store/authStore";
// import { useEffect } from "react";
// // import { StatusBar } from "react-native";

// export default function RootLayout() {
//   const router = useRouter();
//   const segments = useSegments();

//   const { checkAuth, user, token } = useAuthStore();

//   useEffect(() => {
//     checkAuth();
//   }, []);

//   // handle navigation based on the auth state
//   useEffect(() => {
//     const inAuthScreen = segments[0] === "(auth)";
//     const isSignedIn = user && token;

//     if (!isSignedIn && !inAuthScreen) router.replace("/(auth)");
//     else if (isSignedIn && inAuthScreen) router.replace("/(tabs)");
//   }, [user, token, segments]);

//   return (
//     <SafeAreaProvider>
//       <SafeScreen>
//         <Stack screenOptions={{ headerShown: false }}>
//           <Stack.Screen name="(tabs)" />
//           <Stack.Screen name="(auth)" />
//         </Stack>
//       </SafeScreen>
//       {/* <StatusBar barStyle={"default"} /> */}
//     </SafeAreaProvider>
//   );
// }

import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SafeScreen from "../components/SafeScreen";
import { useAuthStore } from "../store/authStore";
import { useEffect } from "react";
// import { StatusBar } from "react-native";

export default function RootLayout() {
  const { checkAuth, user, token } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  const isSignedIn = !!(user && token);
  // let isSignedIn;      // in expo router v6 replace logs an error
  // if (user && token) {
  //   isSignedIn = true;
  // } else if (!user || !token) {
  //   isSignedIn = false;
  // }

  return (
    <SafeAreaProvider>
      <SafeScreen>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Protected guard={isSignedIn}>
            <Stack.Screen name="(tabs)" />
          </Stack.Protected>
          <Stack.Protected guard={!isSignedIn}>
            <Stack.Screen name="(auth)" />
          </Stack.Protected>
        </Stack>
      </SafeScreen>
      {/* <StatusBar barStyle={"default"} /> */}
    </SafeAreaProvider>
  );
}
