import React, { useEffect, useState } from "react";
import { getItemAsync } from "expo-secure-store";

import { ImageBackground } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SplashScreen, Stack } from "expo-router";

import { styled } from "nativewind";
import { useFonts, Roboto_400Regular, Roboto_700Bold } from "@expo-google-fonts/roboto";
import { BaiJamjuree_700Bold } from "@expo-google-fonts/bai-jamjuree";

import api from "../services/api";

import blurBg from "../assets/bg-blur.png";
import stripes from "../assets/stripes.svg";

const Stripes = styled(stripes);

export default function Layout() {
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  const [loaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold,
  });

  useEffect(() => {
    getItemAsync("token").then(token => {
      setAuthenticated(!!token);
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
    });
  }, []);

  if (!loaded) {
    return <SplashScreen />;
  }

  return (
    <ImageBackground source={blurBg} className="relative flex-1 bg-gray-900">
      <StatusBar style="light" translucent />
      <Stripes className="absolute left-2" />

      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: "transparent",
          },
          animation: "fade",
        }}
      >
        <Stack.Screen name="index" redirect={authenticated} />
        <Stack.Screen name="memories" />
        <Stack.Screen name="new" />
      </Stack>
    </ImageBackground>
  );
}
