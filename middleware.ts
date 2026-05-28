import { NextResponse, type NextRequest } from "next/server";

/**
 * TAYIBA Middleware
 * ----------------
 * /account sahifasini himoya qiladi.
 * Supabase token cookie'si yo'q bo'lsa → /account/login'ga yo'naltiradi.
 *
 * Supabase ulanmagan bo'lsa (env yo'q) — middleware hech narsani to'sib qo'ymaydi,
 * sayt to'liq ishlashda davom etadi.
 */

const PROTECTED = ["/account/orders", "/account/profile"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Himoyalangan yo'llarni tekshirish
  const isProtected = PROTECTED.some((p) => pathname.startsWith(p));
  if (!isProtected) return NextResponse.next();

  // Supabase session cookie'sini tekshirish
  const hasSession =
    request.cookies.has("sb-access-token") ||
    // Supabase v2 cookie pattern
    [...request.cookies.getAll()].some((c) => c.name.includes("sb-") && c.name.includes("-auth-token"));

  if (!hasSession) {
    const loginUrl = new URL("/account", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/account/:path+"],
};
