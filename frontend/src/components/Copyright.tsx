import React from "react";
import Link from "next/link";

export default function Copyright() {
  return (
    <div className="text-sm leading-relaxed text-gray-200">
      Feito por{" "}
      <Link
        target="_blank"
        rel="noreferrer"
        href="https://github.com/Marco-Veio"
        className="underline hover:text-gray-100"
      >
        Marco-Veio
      </Link>{" "}
      seguindo o NLW da{" "}
      <Link target="_blank" rel="noreferrer" href="https://rocketseat.com.br" className="underline hover:text-gray-100">
        Rocketseat
      </Link>
    </div>
  );
}
