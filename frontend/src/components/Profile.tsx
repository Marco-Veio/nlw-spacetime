import React from "react";
import Image from "next/image";

import getUser from "@/services/auth";

export default function Profile() {
  const { name, avatarUrl } = getUser();

  return (
    <div className="flex items-center gap-3 text-left">
      <Image src={avatarUrl} alt="Avatar do usuário" width={40} height={40} className="h-10 w-10 rounded-full" />
      <p className="text-sm leading-snug">
        {name}
        <a href="/api/auth/logout" className="block text-red-400 hover:text-red-300">
          Sair
        </a>
      </p>
    </div>
  );
}
