import jwtDecode from "jwt-decode";
import { cookies } from "next/headers";

interface User {
  sub: string;
  name: string;
  avatarUrl: string;
}

export default function getUser() {
  const token = cookies().get("token")?.value;

  if (!token) {
    throw new Error("Unauthenticated");
  }

  return jwtDecode(token) as User;
}
