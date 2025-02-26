"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
   
    router.push("/dashboard");
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <SignedOut>
        <h1 className="text-2xl font-bold mb-4">Welcome to TOTP Manager</h1>
        <SignInButton mode="modal" />
      </SignedOut>
    </div>
  );
}
