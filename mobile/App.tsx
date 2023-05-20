import { useEffect } from "react";
import { setItemAsync } from "expo-secure-store";
import { styled } from "nativewind";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import { StatusBar } from "expo-status-bar";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { useFonts, Roboto_400Regular, Roboto_700Bold } from "@expo-google-fonts/roboto";
import { BaiJamjuree_700Bold } from "@expo-google-fonts/bai-jamjuree";

import api from "./services/api";

import blurBg from "./assets/bg-blur.png";
import stripes from "./assets/stripes.svg";
import Logo from "./assets/logo.svg";

const Stripes = styled(stripes);

const discovery = {
  authorizationEndpoint: "https://github.com/login/oauth/authorize",
  tokenEndpoint: "https://github.com/login/oauth/access_token",
  revocationEndpoint: "https://github.com/settings/connections/applications/ae68188e163c7afb0cb6",
};

export default function App() {
  const [loaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold,
  });

  const [, response, signIn] = useAuthRequest(
    {
      clientId: "ae68188e163c7afb0cb6",
      scopes: ["identity"],
      redirectUri: makeRedirectUri({
        scheme: "nlwspacetime",
      }),
    },
    discovery,
  );

  useEffect(() => {
    // console.log(
    //   makeRedirectUri({
    //     scheme: "nlwspacetime",
    //   }),
    // );

    if (response?.type === "success") {
      const { code } = response.params;

      api.post("register", { code }).then(res => {
        const { token } = res.data;

        setItemAsync("token", token);
      });
    }
  }, [response]);

  if (!loaded) {
    return null;
  }

  return (
    <ImageBackground source={blurBg} className="relative flex-1 items-center bg-gray-900 px-8 py-8">
      <StatusBar style="light" translucent />
      <Stripes className="absolute left-2" />

      <View className="flex-1 items-center justify-center gap-6">
        <Logo />

        <View className="space-y-2">
          <Text className="text-center font-title text-2xl leading-tight text-gray-50">Sua cápsula do tempo</Text>
          <Text className="text-center font-body text-base leading-relaxed text-gray-100">
            Colecione momentos marcantes da sua jornada e compartilhe (se quiser) com o mundo!
          </Text>
        </View>

        <TouchableOpacity activeOpacity={0.7} className="rounded-full bg-green-500 px-5 py-2" onPress={() => signIn()}>
          <Text className="font-alt text-sm uppercase text-black">Cadastrar lembrança</Text>
        </TouchableOpacity>
      </View>

      <Text className="text-center font-body text-sm leading-relaxed text-gray-200">
        Feito por Marco-Veio seguindo o NLW da Rocketseat
      </Text>
    </ImageBackground>
  );
}
