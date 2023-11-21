import Search from "@/app/components/search";
import db from "@/db";
import { RowDataPacket } from "mysql2";
import Link from "next/link";
import React from "react";

export default async function SearchResult({
  params,
}: {
  params?: { keyword: string };
}) {
  const [countResult] = await db.query<RowDataPacket[]>(
    "select count(*) as cnt from jun_database.board"
  );
  const totalCnt = countResult[0].cnt;
  const keywords = params?.keyword !== undefined ? params.keyword : "";
  const decodedKeyword = decodeURIComponent(keywords);

  const [results] = await db.query<RowDataPacket[]>(
    "select * from jun_database.board where title Like ? order by date DESC",
    [`%${decodedKeyword}%`]
  );
  console.log(results);
  return (
    <>
      <Search />
      <div className="px-6 max-w-5xl mx-auto flex flex-col items-center">
        <Link href={"/"}>
          <button className="btn bg-[#fdfdfd] font-bold mt-10">go to main page</button>
        </Link>
        <p className="text-xl py-8">
          <b>keyword : </b>
          {decodedKeyword}
        </p>
        {results.length === 0 && <p className="text-xl">no results</p>}
        {results &&
          results.length > 0 &&
          results.map((e, i) => {
            const date = new Date(e.date);
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, "0");
            const day = date.getDate().toString().padStart(2, "0");
            const formatDate = `${year}-${month}-${day}`;

            return (
              <ul
                key={i}
                className="mt-3 rounded-md backdrop-blur-xl bg-[rgba(255,255,255,0.5)] px-6 py-6 shadow-md flex items-center justify-between"
              >
                <li className="basis-1/12 text-center">{results.length - i}</li>
                <li className="basis-6/12 text-xl font-bold">
                  <Link href={`/post/${e.id}`}>
                    <p>{e.title}</p>
                    <p className="two-lines text-slate-600 text-sm font-normal">
                      {e.content}
                    </p>
                  </Link>
                </li>
                <li className="basis-2/12 text-center">{e.username}</li>
                <li className="basis-2/12 text-center">{formatDate}</li>
              </ul>
            );
          })}
      </div>
    </>
  );
}
