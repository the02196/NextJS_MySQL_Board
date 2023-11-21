// 'use client';
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Logout from "./logout";
import Login from "./login";

interface userInfo {
  user: {
    name: string;
    email?: string;
    image?: string;
    level?: number;
    nickname?: string;
  };
}

import Link from "next/link";
// import { useCustomSession } from '../sessions';

export default async function Nav() {
  const session = (await getServerSession(authOptions)) as userInfo;
  // const {data: session, status } = useCustomSession();

  return (
    <>
      {session && session.user?.email ? (
        <>
          <div className="w-full h-12 flex items-center justify-end space-x-4 pr-5">
            <p>
              <span className="font-bold">{session && session.user?.nickname}</span>
              님 반갑습니다.
            </p>
            <Logout />
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-end space-x-3 border-y p-3">
            <Link href="/">메인</Link>
            <Link href="/admin">관리자</Link>
            <Link href="/register">회원가입</Link>
            <Login />
          </div>
        </>
      )}
    </>
  );
}
