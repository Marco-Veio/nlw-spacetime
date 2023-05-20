import React from "react";

export default function EmptyMemories() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <p className="w-96 text-center leading-relaxed">
        Você ainda não registrou nenhuma lembrança, comece a{" "}
        <a href="" className="underline hover:text-gray-50">
          criar agora
        </a>
      </p>
    </div>
  );
}
