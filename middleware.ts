import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // ログイン状態を確認するためのトークン
  const token = req.cookies.get('token');

  // 保護されたルートのリスト
  const protectedRoutes = ['/devices', '/account'];

  // 現在のリクエストURLが保護対象か確認
  const isProtectedRoute = protectedRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );

  if (isProtectedRoute && !token) {
    // トークンがない場合はログインページにリダイレクト
    const url = req.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // 他のリクエストはそのまま進行
  return NextResponse.next();
}