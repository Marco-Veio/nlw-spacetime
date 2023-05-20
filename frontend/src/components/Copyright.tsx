import React from "react";

export default function Copyright() {
  return (
    <div className="text-sm leading-relaxed text-gray-200">
      Feito por{" "}
      <a
        target="_blank"
        rel="noreferrer"
        href="https://github.com/Marco-Veio"
        className="underline hover:text-gray-100"
      >
        Marco-Veio
      </a>{" "}
      seguindo o NLW da{" "}
      <a target="_blank" rel="noreferrer" href="https://rocketseat.com.br" className="underline hover:text-gray-100">
        Rocketseat
      </a>
    </div>
  );
}
