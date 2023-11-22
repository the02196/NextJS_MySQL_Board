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
      if (prevPage === "http://localhost:3000/register") {
        setPreUrl("/");
      } else {
        setPreUrl(prevPage);
      }
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
        <div className="basis-9/12 bg-white p-14 rounded-lg shadow-md sm:basis-7/12 md:basis-5/12 lg:basis-4/12 mx-auto">
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
          <button className="basis-[48%] px-6 py-2.5 bg-slate-400 text-white font-medium text-base mt-2 leading-tight  rounded shadow-md hover:bg-slate-500 hover:shadow-lg focus:bg-slate-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-slate-500 active:shadow-lg transition duration-150 ease-in-out">
              <Link href="/register">sign up</Link>
            </button>
            <button
              className="basis-[48%] px-6 py-2.5 bg-gray-800 text-white font-medium text-base mt-2 leading-tight  rounded shadow-md hover:bg-gray-900 hover:shadow-lg focus:bg-gray-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-900 active:shadow-lg transition duration-150 ease-in-out"
              onClick={SignIn}
            >
              login
            </button>
          
          </div>

          <div className="w-full flex mt-7 justify-between">
            <button
              className="flex items-center justify-center btn bg-[#fdfdfd] basis-1/5 mt-3 py-4 "
              onClick={() => signIn("kakao")}
            >
              <div className="basis-4/12">
                <Image
                  src="./sns/kakao_talk.svg"
                  width={20}
                  height={20}
                  alt="naver"
                />
              </div>
              <p className="basis-1/12">kakao</p>
            </button>
            <button
              className="flex items-center justify-center btn bg-[#fdfdfd] basis-1/5 mt-3  py-2"
              onClick={() => signIn("google")}
            >
              <div className="basis-4/12">
                {" "}
                <Image
                  src="./sns/google.svg"
                  width={20}
                  height={20}
                  alt="naver"
                />
              </div>
              <p className="basis-1/12">google</p>
            </button>
            <button
              className="flex items-center justify-center btn bg-[#fdfdfd] basis-1/5 mt-3  py-2 "
              onClick={() => signIn("naver")}
            >
              <div className="basis-4/12">
                <Image
                  src="./sns/naver.svg"
                  width={20}
                  height={20}
                  alt="naver"
                />
              </div>
              <p className="basis-1/12">naver</p>
            </button>
            <button
              className="flex items-center justify-center btn bg-[#fdfdfd] basis-1/5 mt-3 py-2  "
              onClick={() => signIn("github")}
            >
              <div className="basis-4/12">
                <Image
                  src="./sns/github-mark.svg"
                  width={20}
                  height={20}
                  alt="naver"
                />
              </div>
              <p className="basis-1/12">github</p>
            </button>
          </div>
          <Link href={"/"}>
            <button className="btn w-full bg-[#fdfdfd] mt-8">
              go to main page
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
