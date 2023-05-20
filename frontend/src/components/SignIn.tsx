import React from "react";
import Link from "next/link";
import { User } from "lucide-react";

import { SIGN_IN } from "@/constants/urls";

export default function SignIn() {
  return (
    <Link href={SIGN_IN} className="flex items-center gap-3 text-left hover:text-gray-50">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400">
        <User className="h-5 w-5 text-gray-500 transition-colors" />
      </div>
      <p className="max-w-[140px] text-sm leading-snug">
        <span className="underline">Crie sua conta e salve suas memórias!</span>
      </p>
    </Link>
  );
}
