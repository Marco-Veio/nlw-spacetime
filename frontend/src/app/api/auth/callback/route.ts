import api from "@/services/api";

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  const redirectTo = request.cookies.get("redirectTo")?.value;

  const registerResponse = await api.post("/register", { code });

  const { token } = registerResponse.data;

  const redirectURL = redirectTo ?? new URL("/", request.url);
  const cookieExpires = 60 * 60 * 24 * 30;

  api.defaults.headers.common.Authorization = `Bearer ${token}`;
  return NextResponse.redirect(redirectURL, {
    headers: {
      "Set-Cookie": `token=${token}; Path=/; max-age=${cookieExpires}`,
    },
  });
}
