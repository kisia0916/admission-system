import { NextRequest, NextResponse } from "next/server";

const username = process.env.BASIC_USER // 認証のユーザー名
const password = process.env.BASIC_PASS; // 認証のパスワード

export function middleware(req: NextRequest) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader) {
    return new NextResponse("Authentication required", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Secure Area"',
      },
    });
  }

  // Basic認証の処理
  const base64Credentials = authHeader.split(" ")[1];
  const credentials = Buffer.from(base64Credentials, "base64").toString("utf-8");
  const [inputUsername, inputPassword] = credentials.split(":");

  if (inputUsername !== username || inputPassword !== password) {
    return new NextResponse("Invalid credentials", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Secure Area"',
      },
    });
  }

  // 認証成功
  return NextResponse.next();
}

export const config = {
  matcher: ["/admission"], // 適用するルートを指定
};
