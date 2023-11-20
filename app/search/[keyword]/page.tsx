import db from "@/db";
import { RowDataPacket } from "mysql2";
import Link from "next/link";
import React from "react";

export default async function SearchResult({
  params,
}: {
  params?: { keyword: string };
}) {
  const keywords = params?.keyword !== undefined ? params.keyword : "";
  const decodedKeyword = decodeURIComponent(keywords);

  const [results] = await db.query<RowDataPacket[]>(
    "select * from jun_database.board where title Like ?",
    [`%${decodedKeyword}%`]
  );
  console.log(results);
  return (
    <div>
      <p>검색 결과 : {decodedKeyword}</p>
      {results.length === 0 && <p>아무것도 없다!</p>}
      {results &&
        results.length > 0 &&
        results.map((e, i) => {
          return (
            <div className="border-b p-2 w-[400px]" key={i}>
              <Link href={`/post/${e.id}`}>
                <p className="font-bold text-lg">{e.title}</p>
              </Link>
              <p className="text-sm">{e.userid}</p>
            </div>
          );
        })}
    </div>
  );
}
