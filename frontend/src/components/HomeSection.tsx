import Image from "next/image";
import React from "react";

export default function HomeSection() {
  return (
    <div className="space-y-5">
      <Image alt="NLW logo" src="logo.svg" width={161} height={48} />
      <div className="max-w-[420px] space-y-1">
        <h1 className="font text-5xl font-bold leading-tight text-gray-50">Sua cápsula do tempo</h1>
        <p className="text-lg leading-relaxed">
          Colecione momentos marcantes da sua jornada e compartilhe (se quiser) com o mundo!
        </p>
      </div>
      <a
        href=""
        className="inline-block rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black hover:bg-green-600"
      >
        CADASTRAR LEMBRANÇA
      </a>
    </div>
  );
}
