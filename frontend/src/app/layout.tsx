import "./globals.css";

import HomeSection from "@/components/HomeSection";
import Profile from "@/components/Profile";
import SignIn from "@/components/SignIn";
import Copyright from "@/components/Copyright";

import { cookies } from "next/headers";

import { Roboto_Flex, Bai_Jamjuree } from "next/font/google";

const roboto = Roboto_Flex({ subsets: ["latin"], variable: "--font-roboto" });
const baiJamjure = Bai_Jamjuree({ subsets: ["latin"], weight: "700", variable: "--font-bai-jamjure" });

export const metadata = {
  title: "NLW Spacetime",
  description: "Uma cápsula do tempo",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const authenticated = cookies().has("token");

  return (
    <html lang="en">
      <body className={`${roboto.variable} ${baiJamjure.variable} bg-gray-900 font-sans text-gray-100`}>
        <main className="grid min-h-screen grid-cols-2 bg-stars bg-cover">
          <aside className="relative flex flex-col items-start justify-between overflow-hidden border-r border-white/10 px-28 py-16">
            <div className="absolute right-0 top-1/2 h-[288px] w-[526px] -translate-y-1/2 translate-x-1/2 rounded-full bg-purple-700 opacity-50 blur-full" />

            <div className="absolute bottom-0 right-2 top-0 z-10 w-2 bg-stripes" />

            {authenticated ? <Profile /> : <SignIn />}

            <HomeSection />

            <Copyright />
          </aside>

          <aside className="flex flex-col bg-stars bg-cover p-16">{children}</aside>
        </main>
      </body>
    </html>
  );
}
