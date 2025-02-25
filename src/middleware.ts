import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

// Protect all routes except public ones
export const config = {
  matcher: ["/((?!sign-in|api|_next|.*\\..*).*)"],
};
