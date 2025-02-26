import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

// Protect all routes, including API routes, except sign-in, `_next` (for assets), and static files
export const config = {
  matcher: ["/((?!sign-in|_next/static|_next/image|favicon.ico).*)"],
};
