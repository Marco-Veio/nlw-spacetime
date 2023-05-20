import React from "react";
import Link from "next/link";

export default function EmptyMemories() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <p className="w-96 text-center leading-relaxed">
        Você ainda não registrou nenhuma lembrança, comece a{" "}
        <Link href="" className="underline hover:text-gray-50">
          criar agora
        </Link>
      </p>
    </div>
  );
}
