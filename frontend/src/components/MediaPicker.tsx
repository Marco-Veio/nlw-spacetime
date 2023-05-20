"use client";

import React, { ChangeEvent, useState } from "react";

export default function MediaPicker() {
  const [preview, setPreview] = useState<string | null>(null);

  function onFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target;

    if (!files) {
      return;
    }

    const previewUrl = URL.createObjectURL(files[0]);

    setPreview(previewUrl);
  }

  return (
    <>
      {preview && (
        // eslint-disable-next-line
        <img src={preview} alt="" className="aspect-video w-full rounded-lg object-cover" />
      )}
      <input name="coverUrl" type="file" id="midia" className="hidden" onChange={onFileSelected} accept="image/*" />
    </>
  );
}
