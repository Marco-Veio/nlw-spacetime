import { Camera, ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <Link href="/" className="flex items-center gap-1 text-sm text-gray-100 hover:text-gray-200">
        <ChevronLeft className="h-4 w-4" />
        Voltar à timeline
      </Link>

      <form className="flex flex-1 flex-col gap-2">
        <div className="flex items-center gap-4">
          <label
            htmlFor="midia"
            className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
          >
            <input type="file" id="midia" className="hidden" />
            <Camera className="h-4 w-4" />
            Anexar mídia
          </label>

          <label htmlFor="isPublic" className="flex items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100">
            <input
              value="true"
              type="checkbox"
              name="isPublic"
              id="isPublic"
              className="h-4 w-4 rounded border-gray-400 bg-gray-400 text-purple-500"
            />
            Tornar memória pública
          </label>
        </div>

        <textarea
          name="content"
          spellCheck={false}
          className="text-large w-full flex-1 resize-none rounded border-0 bg-transparent p-0 leading-relaxed text-gray-100 placeholder:text-gray-500 focus:ring-0"
          placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre."
        />
      </form>
    </div>
  );
}
