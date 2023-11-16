// 'use client';
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

interface userInfo {
  user: {
    name: string;
    email?: string;
    image?: string;
    level?: number;
  };
}

interface PropsData {
  session?: userInfo | null;
}

import { signIn, signOut } from "next-auth/react";

import Link from "next/link";
// import { useCustomSession } from '../sessions';

export default async function Login() {
  const session = (await getServerSession(authOptions)) as userInfo;
  // const {data: session, status } = useCustomSession();
  const redirectTo = () => {
    sessionStorage.setItem("preUrl", window.location.href);
    window.location.href = "/login";
  };

  return (
    <>
      {session && session.user?.email ? (
        <>
          <div className="w-full h-12 flex items-center justify-end space-x-4 pr-5">
            <p><span className="font-bold">{session && session.user?.name}</span>님 반갑습니다.</p>
            <Link href="/logout">로그아웃</Link>
          </div>
        </>
      ) : (
        <>
          <Link href="/register">회원가입</Link>
          <Link href="/login">로그인</Link>
        </>
      )}
    </>
  );
}
