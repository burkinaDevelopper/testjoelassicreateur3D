'use client';
import Logo from "@/assets/appLogo.svg";
import { Progress } from "@/components/ui";
import Image from "next/image";

// ----------------------------------------------------------------------

export function SplashScreen() {
  return (
    <>
      <div className="fixed grid h-full w-full place-content-center">
        <Image src={Logo} alt="App Logo" width={112} height={112} />

        <Progress
          color="primary"
          isIndeterminate
          animationDuration="1s"
          className="mt-2 h-1"
        />
      </div>
    </>
  );
}
