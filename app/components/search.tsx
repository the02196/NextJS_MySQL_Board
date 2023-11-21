"use client";

import { useRef, useState } from "react";

/*

useRef = 해당 요소에 접근하기 위해 / 해당 요소의 값의 참조를
저장하기 위해 사용하며, useRef는 current 속성을 가진 객체를 반환.

? useRef의 특징 : 참조값이 변경되어도 컴포넌트가 '재렌더링'되지 않는다.

*/

export default function Search() {
  const [keyword, setKeyword] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const searchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };
  const searchSubmit = () => {
    if (keyword === "") {
      inputRef.current?.focus();
      alert("You haven't entered a keyword(s) in the search bar yet.");
    } else {
      window.location.href = `/search/${keyword}`;
    }
  };

  return (
    <div className="relative flex justify-center gap-x-5 max-w-5xl px-6 mx-auto ">
      <input
        ref={inputRef}
        placeholder="Please enter your keyword(s) to search"
        onChange={searchValue}
        type="text"
        className="text-mono px-8 placeholder:text-xl placeholder:text-slate-500 focus:border-[rgba(255,255,255,0.3)] focus:outline-[rgba(255,255,255,0.3)] w-[100%] py-5 text-xl rounded-full backdrop-blur-md bg-[rgba(255,255,255,0.5)] p-2"
      />
      <button
        className="text-mono absolute top-[50%] right-[23px] px-10 bg-[rgba(255,255,255,0.8)] w-50 text-lg translate-y-[-50%] rounded-full font-bold h-full "
        onClick={searchSubmit}
      >
        search
      </button>
    </div>
  );
}
