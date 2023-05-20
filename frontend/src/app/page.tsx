import Copyright from "@/components/Copyright";
import EmptyMemories from "@/components/EmptyMemories";
import HomeSection from "@/components/HomeSection";
import Profile from "@/components/Profile";
import SignIn from "@/components/SignIn";

import { cookies } from "next/headers";

export default function Home() {
  const authenticated = cookies().has("token");

  return (
    <main className="grid min-h-screen grid-cols-2 bg-stars bg-cover">
      <aside className="relative flex flex-col items-start justify-between overflow-hidden border-r border-white/10 px-28 py-16">
        <div className="absolute right-0 top-1/2 h-[288px] w-[526px] -translate-y-1/2 translate-x-1/2 rounded-full bg-purple-700 opacity-50 blur-full" />

        <div className="absolute bottom-0 right-2 top-0 z-10 w-2 bg-stripes" />

        {authenticated ? <Profile /> : <SignIn />}

        <HomeSection />

        <Copyright />
      </aside>

      <aside className="flex flex-col bg-stars bg-cover p-16">
        <EmptyMemories />
      </aside>
    </main>
  );
}
