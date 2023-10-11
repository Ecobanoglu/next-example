import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse, NextFetchEvent } from "next/server";
import { CustomUser } from "./app/api/auth/[...nextauth]/options";

export async function middleware(request: NextRequest, _next: NextFetchEvent) {
  const { pathname } = request.nextUrl;

  if (pathname == "/account/login") {
    return NextResponse.next();
  }
  /* admin, user, account sayfalarını url'de kontrol et */
  const protectedAdminPaths = ["/admin"];
  const matchesProtectedAdminPath = protectedAdminPaths.some((path) =>
    pathname.startsWith(path)
  );

  const protectedUserPaths = ["/user"];
  const matchesProtectedUserPath = protectedUserPaths.some((path) =>
    pathname.startsWith(path)
  );

  const accountPaths = ["/account"];
  const matchesAccountPaths = accountPaths.some((path) =>
    pathname.startsWith(path)
  );

  /* // kontrol sonu */

  const token = await getToken({ req: request });

  /* Eğer token yok ise ve korumalı url e erişmeye çalışıyor ise login e yönlendir. */
  if (
    token == null &&
    (matchesProtectedAdminPath || matchesProtectedUserPath)
  ) {
    return NextResponse.redirect(new URL("/account/login", request.url));
  }

  const user: CustomUser | null = token?.user as CustomUser;

  /* Eğer "admin" path e erişmeye çalışıyorsa ve kullanıcı rolü "admin" değilse login sayfasına yönlendir  */
  if (protectedAdminPaths && user?.role == "admin") {
    return NextResponse.redirect(new URL("/account/login", request.url));
  }
  /* Eğer "user" path e erişmeye çalışıyorsa ve kullanıcı rolü "user" değilse login sayfasına yönlendir */
  if (matchesProtectedUserPath && user?.role == "user") {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  /* Eğer kullanıcı giriş yapmış  ve login sayfasına erişemeye çalışıyor ise kendi anasayfasına yönlendir */
  if ((matchesAccountPaths && user?.role == "user") || user?.role == "admin") {
    return NextResponse.redirect(
      new URL(`/${user?.role}/dashboard`, request.url)
    );
  }
}
