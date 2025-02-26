import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import "./globals.css";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className="min-h-screen flex flex-col items-center bg-gray-100 p-4">
        <SignedOut>
          <SignInButton mode="modal" />
        </SignedOut>
        <SignedIn>
          <UserButton />
          <Navbar />
          <main className="mt-4">{children}</main>
        </SignedIn>
      </body>
    </html>
  </ClerkProvider>
  );
}
