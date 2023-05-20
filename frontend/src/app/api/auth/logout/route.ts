import api from "@/services/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const redirectURL = new URL("/", request.url);

  api.defaults.headers.common.Authorization = undefined;
  return NextResponse.redirect(redirectURL, {
    headers: {
      "Set-Cookie": `token=; Path=/; max-age=0`,
    },
  });
}
