"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-center space-x-6">
      <Link href="/dashboard" className={`px-4 py-2 rounded ${pathname === "/dashboard" ? "bg-blue-800" : ""}`}>Dashboard</Link>
      <Link href="/generate-code" className={`px-4 py-2 rounded ${pathname === "/generate-code" ? "bg-blue-800" : ""}`}>Generate OTP</Link>
      <Link href="/groups" className={`px-4 py-2 rounded ${pathname === "/groups" ? "bg-blue-800" : ""}`}>Manage Groups</Link>
    </nav>
  );
}
