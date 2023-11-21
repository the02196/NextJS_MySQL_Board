"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCustomSession } from "../sessions";

interface userInfo {
  user: {
    name: string;
    email: any;
    password: string;
    level: number;
  };
}

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { data: session } = useCustomSession();
  const [preUrl, setPreUrl] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const prevPage = sessionStorage.getItem("preUrl") || "/";
      // console.log(prevPage);
      setPreUrl(prevPage);
    }
  }, []);

  const SignIn = () => {
    const credentials = {
      email: email,
      password: password,
    };

    signIn("credentials", { ...credentials, callbackUrl: preUrl });
  };

  if (session && session.user) {
    return <p>You are already logged in.</p>;
  }

  return (
    <>
      <div className="flex justify-between w-full flex-wrap items-center py-48">
        <div className="basis-9/12 sm:basis-7/12 md:basis-5/12 lg:basis-4/12 mx-auto">
          <div className="text-start">
            <p>E-mail</p>
            <input
              type="text"
              className="rounded-md px-2 border border-l-gray-500 border-l-2 w-full focus:outline-gray-400 h-[50px] mx-auto"
              placeholder="example@naver.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="text-start mt-3">
            <p>Password</p>
            <input
              type="password"
              className="rounded-md px-2 border border-l-gray-500 border-l-2 h-[50px] w-full mx-auto focus:outline-gray-400"
              placeholder="Please enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mt-5 flex justify-between">
            <button
              className="basis-[48%] px-6 py-2.5 bg-gray-800 text-white font-medium text-base mt-2 leading-tight  rounded shadow-md hover:bg-gray-900 hover:shadow-lg focus:bg-gray-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-900 active:shadow-lg transition duration-150 ease-in-out"
              onClick={SignIn}
            >
              login
            </button>
            <button className="basis-[48%] px-6 py-2.5 bg-slate-400 text-white font-medium text-base mt-2 leading-tight  rounded shadow-md hover:bg-slate-500 hover:shadow-lg focus:bg-slate-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-slate-500 active:shadow-lg transition duration-150 ease-in-out">
              <Link href="/register">signin</Link>
            </button>
          </div>

         
          <div className="w-full flex mt-7 justify-between">
            <button
              className="font-bold  btn bg-[#fdfdfd] basis-1/5 mt-3 py-2 "
              onClick={() => signIn("kakao")}
            >
              {/* <Image
                src="./sns/kakao_talk.svg"
                width={50}
                height={50}
                alt="naver"
                className="mx-auto"
              /> */}
              Kakao
            </button>
            <button
              className="font-bold  btn bg-[#fdfdfd] basis-1/5 mt-3  py-2"
              onClick={() => signIn("google")}
            >
              {/* <Image
                src="./sns/google.svg"
                width={50}
                height={50}
                alt="naver"
                className="mx-auto"
              /> */}
              Google
            </button>
            <button
              className="font-bold btn bg-[#fdfdfd] basis-1/5 mt-3  py-2 "
              onClick={() => signIn("naver")}
            >
              {/* <Image
                src="./sns/naver.svg"
                width={50}
                height={50}
                alt="naver"
                className="mx-auto"
              /> */}
              Naver
            </button>
            <button
              className="font-bold  btn bg-[#fdfdfd] basis-1/5 mt-3 py-2  "
              onClick={() => signIn("github")}
            >
              {/* <Image
                src="./sns/github-mark.svg"
                width={50}
                height={50}
                alt="naver"
                className="mx-auto"
              /> */}
              Github
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
