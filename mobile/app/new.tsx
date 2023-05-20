import React, { useState } from "react";
import { View, Text, TouchableOpacity, Switch, TextInput, ScrollView, Image } from "react-native";
import { Link, useRouter } from "expo-router";
import { launchImageLibraryAsync, MediaTypeOptions } from "expo-image-picker";
import Icon from "@expo/vector-icons/Feather";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import Logo from "../assets/logo.svg";

import api from "../services/api";

export default function NewMemory() {
  const router = useRouter();

  const { top, bottom } = useSafeAreaInsets();

  const [isPublic, setIsPublic] = useState(false);
  const [content, setContent] = useState("");
  const [preview, setPreview] = useState("");

  async function openImagePicker() {
    const result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (result && result.assets[0]) {
      setPreview(result.assets[0].uri);
    }
  }

  async function handleCreateMemory() {
    let coverUrl = "";

    if (preview) {
      const uploadFormData = new FormData();
      uploadFormData.append("file", { name: "image.jpg", type: "image/jpeg", uri: preview } as any);

      const uploadResponse = await api.post("/upload", uploadFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      coverUrl = uploadResponse.data.fileUrl;
    }

    api.post("/memories", {
      coverUrl,
      content,
      isPublic,
    });

    router.push("/memories");
  }

  return (
    <ScrollView className="flex-1 px-8" contentContainerStyle={{ paddingBottom: bottom, paddingTop: top }}>
      <View className="mt-4 flex-row items-center justify-between">
        <Link href="/memories" asChild>
          <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full bg-purple-500">
            <Icon name="arrow-left" size={16} color="white" />
          </TouchableOpacity>
        </Link>

        <Logo />
      </View>

      <View className="mt-6 space-y-6">
        <View className="flex-row items-center gap-2">
          <Switch
            value={isPublic}
            onValueChange={setIsPublic}
            thumbColor={isPublic ? "#9b79ea" : "#9e9ea0"}
            trackColor={{ false: "#767577", true: "#372560" }}
          />

          <Text className="font-body text-base text-gray-200">Tornar memória pública</Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          className="h-32 items-center justify-center rounded-lg border border-dashed border-gray-500 bg-black/20"
          onPress={openImagePicker}
        >
          {preview ? (
            <Image source={{ uri: preview }} className="h-full w-full rounded-lg object-cover" />
          ) : (
            <View className="flex-row items-center gap-2">
              <Text className="font-body text-sm text-gray-200">Adicionar foto ou vídeo de capa</Text>
            </View>
          )}
        </TouchableOpacity>

        <TextInput
          multiline
          textAlignVertical="top"
          className="p-0 font-body text-lg text-gray-50"
          placeholderTextColor="#56565a"
          placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre."
          onChangeText={setContent}
          value={content}
        />

        <TouchableOpacity
          activeOpacity={0.7}
          className="items-center rounded-full bg-green-500 px-5 py-2"
          onPress={handleCreateMemory}
        >
          <Text className="font-alt text-sm uppercase text-black">Salvar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
