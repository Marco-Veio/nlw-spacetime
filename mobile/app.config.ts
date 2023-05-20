// @ts-nocheck
import "dotenv/config";

export default {
  expo: {
    name: "mobile",
    slug: "mobile",
    scheme: process.env.SCHEME,
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    extra: {
      API_URL: process.env.API_URL,
      GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
      SCHEME: process.env.SCHEME,
    },
  },
};