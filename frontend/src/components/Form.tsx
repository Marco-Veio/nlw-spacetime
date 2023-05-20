"use client";

import React, { FormEvent, ReactNode } from "react";

import Cookie from "js-cookie";
import { useRouter } from "next/navigation";

import api from "@/services/api";

interface Props {
  children: ReactNode;
}

export default function Form({ children }: Props) {
  const router = useRouter();

  async function handleCreateMemory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const fileToUpload = formData.get("coverUrl");

    let coverUrl = "";

    if (fileToUpload) {
      const uploadFormData = new FormData();
      uploadFormData.set("file", fileToUpload);

      const uploadResponse = await api.post("/upload", uploadFormData);

      coverUrl = uploadResponse.data.fileUrl;
    }

    await api.post(
      "/memories",
      {
        coverUrl,
        content: formData.get("content"),
        isPublic: formData.get("isPublic"),
      },
      {
        headers: {
          Authorization: `Bearer ${Cookie.get("token")}`,
        },
      },
    );

    router.push("/");
  }

  return (
    <form className="flex flex-1 flex-col gap-2" onSubmit={handleCreateMemory}>
      {children}
    </form>
  );
}
