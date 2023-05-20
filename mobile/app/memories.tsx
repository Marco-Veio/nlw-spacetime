import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, ScrollView, Text, Image } from "react-native";
import { Link, useRouter } from "expo-router";
import Icon from "@expo/vector-icons/Feather";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import dayjs from "dayjs";
import ptBr from "dayjs/locale/pt-br";
import { deleteItemAsync, getItemAsync } from "expo-secure-store";

import Logo from "../assets/logo.svg";

import api from "../services/api";

dayjs.locale(ptBr);

interface Memory {
  coverUrl: string;
  excerpt: string;
  id: string;
  createdAt: string;
}

export default function Memories() {
  const [memories, setMemories] = useState<Memory[]>([]);
  const { top, bottom } = useSafeAreaInsets();

  const router = useRouter();

  async function logout() {
    api.defaults.headers.common.Authorization = undefined;
    await deleteItemAsync("token");
    router.push("/");
  }

  async function getMemories() {
    const token = await getItemAsync("token");
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    api.get("/memories").then(response => {
      setMemories(response.data);
    });
  }

  useEffect(() => {
    getMemories();
  }, []);

  return (
    <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: bottom, paddingTop: top }}>
      <View className="mt-4 flex-row items-center justify-between px-8">
        <View className="flex-row gap-2">
          <TouchableOpacity onPress={logout} className="h-10 w-10 items-center justify-center rounded-full bg-red-500">
            <Icon name="log-out" size={16} color="white" />
          </TouchableOpacity>

          <Link href="/new" asChild>
            <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full bg-green-500">
              <Icon name="plus" size={16} color="black" />
            </TouchableOpacity>
          </Link>
        </View>

        <Logo />
      </View>

      <View className="my-6 space-y-10">
        {memories.map(memory => (
          <View className="space-y-4" key={memory.id}>
            <View className="flex-row items-center gap-2">
              <View className="h-px w-5 bg-gray-50" />
              <Text className="font-body text-xs text-gray-100">
                {dayjs(memory.createdAt).format("D[ de ]MMMM[, ]YYYY")}
              </Text>
            </View>

            <View className="space-y-4 px-8">
              <Image source={{ uri: memory.coverUrl }} className="aspect-video w-full rounded-lg" alt="" />
              <Text className="font-body text-base leading-relaxed text-gray-100">{memory.excerpt}</Text>
              <Link href={`/memories/${memory.id}`} asChild>
                <TouchableOpacity className="flex-row items-center gap-2">
                  <Text className="font-body text-sm text-gray-200">Ler mais</Text>
                  <Icon name="arrow-right" size={16} color="#9e9ea0" />
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
