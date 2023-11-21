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
      <div className="w-full flex flex-col items-center justify-center pt-14 py-5 px-5">
        
          <h1 className="text-[67px] font-extrabold text-slate-900 mb-8">
            Test Board with NextJS & MySQL
          </h1>
      
        {session && session.user?.email ? (
          <>
            <p className="w-[100%] justify-center text-xl py-6 flex space-x-4">
              <span className="font-bold">
                {session && session.user?.nickname}
              </span>
              님 반갑습니다.
            </p>
            <div className="btn-wrap">

            <Logout />
            </div>
          </>
        ) : (
          <>
            <div className="btn-wrap flex space-x-3">
              {/* <Link href="/">메인</Link> */}
              {/* <Link href="/admin">관리자</Link> */}
              <Link  href="/register">
                <button className="btn">signin</button></Link>
              <Login />
            </div>
          </>
        )}
      </div>
    </>
  );
}
