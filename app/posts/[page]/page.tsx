import db from "@/db";
import { RowDataPacket } from "mysql2/promise";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Search from "@/app/components/search";

interface userInfo {
  user: {
    name: string;
    email?: string;
    image?: string;
    level?: number;
  };
}

export default async function PostsList({
  params,
}: {
  params?: { page?: number };
}) {
  console.log(params);

  //  현재 파라미터가 값이 없다면 1페이지가 되고, 그게 아니라면 해당 페이지로 접속
  const currentPage = params?.page !== undefined ? params.page : 1;
  const perPage = 15;
  const offset = (currentPage - 1) * perPage;

  const [results] = await db.query<RowDataPacket[]>(
    "SELECT * FROM jun_database.board order by date DESC limit ? offset ?",
    [perPage, offset]
  );
  const [countResult] = await db.query<RowDataPacket[]>(
    "select count(*) as cnt from jun_database.board"
  );
  const totalCnt = countResult[0].cnt;

  const lastPage = Math.ceil(totalCnt / perPage);
  const totalPageCnt = 5;
  const startPage =
    Math.floor((currentPage - 1) / totalPageCnt) * totalPageCnt + 1;
  const endPage = Math.min(lastPage, startPage + totalPageCnt - 1);
  let prevStart = Math.floor((currentPage - 1) / 5) * 5 - 4;
  let nextStart = Math.ceil(currentPage / 5) * 5 + 1;

  let sessions = (await getServerSession(authOptions)) as userInfo;
  console.log(sessions);

  return (
    <>
      <Search />
    <div className="flex justify-center gap-x-5 mt-10">
        {currentPage > 5 && (
          <Link
            href={`/posts/${prevStart}`}
            className="bg-white border px-3 py-1 text-sm rounded"
          >
            이전
          </Link>
        )}
        {Array(endPage - startPage + 1)
          .fill(null)
          .map((_, i) => {
            const pageNumber = i + startPage;
            return (
              <Link
                key={i}
                href={`/posts/${pageNumber}`}
                className="bg-white border px-3 py-2 text-sm rounded"
              >
                {pageNumber}
              </Link>
            );
          })}
        {nextStart <= lastPage && (
          <Link
            href={`/posts/${prevStart}`}
            className="bg-white border px-1.5 py-1 text-sm rounded"
          >
            다음
          </Link>
        )}
      </div>
      <div className="mx-auto max-w-5xl p-6 font-mono">
        <div className="flex justify-end item-center mb-6">
          {sessions && (
            <Link href="/write" className="bg-[rgba(255,255,255,0.5)] backdrop-blur-md border-gray-200 shadow-md px-6 py-2 text-lg">
              post
            </Link>
          )}
        </div>
      
          <div className="min-w-full">
            {/* <ul className="bg-gray-800 px-6 py-3 text-white flex justify-between">
              <li className="basis-1/12 text-center font-bold">
                번호
              </li>
              <li className="basis-6/12 font-bold">
                제목
              </li>
              <li className="basis-2/12 text-center font-bold">
                작성자
              </li>
              <li className="basis-2/12 text-center font-bold">
                작성일
              </li>
            </ul>
             */}
              {results &&
                results.map((e, i) => {
                  const date = new Date(e.date);
                  const year = date.getFullYear();
                  const month = (date.getMonth() + 1)
                    .toString()
                    .padStart(2, "0");
                  const day = date.getDate().toString().padStart(2, "0");
                  const formatDate = `${year}-${month}-${day}`;
                  const number = totalCnt - ((currentPage - 1) * perPage + i);
                  return (
                    <ul key={i} className="mt-3 rounded-md backdrop-blur-xl bg-[rgba(255,255,255,0.5)] px-6 py-6 shadow-md flex items-center justify-between">
                      <li className="basis-1/12 text-center">
                        {number}
                      </li>
                      <li className="basis-6/12 text-xl font-bold">
                        <Link href={`/post/${e.id}`}>
                          <p>{e.title}</p>
                          <p className="two-lines text-slate-600 text-sm font-normal">{e.content}</p>
                          </Link>
                        
                      </li>
                      <li className="basis-2/12 text-center">
                        {e.username}
                      </li>
                      <li className="basis-2/12 text-center">
                        {formatDate}
                      </li>
                    </ul>
                  );
                })}
           
          </div>
       
      </div>
      
    </>
  );
}
