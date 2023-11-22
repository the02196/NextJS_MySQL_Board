// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import ChartCom from "./chart";

// interface userInfo {
//   user: {
//     name: string;
//     email?: string;
//     image?: string;
//     level?: number;
//   };
// }

// export default async function Admin() {
 
//   let sessions = (await getServerSession(authOptions)) as userInfo;
//   // nextjs는 폴더 이름 자체가 라우터 이기 때문에, 여기서 바로 조건문을 걸면
//   // 라우터에 들어오는 즉시 유효성 검사를 한다.

//   if ((!sessions && sessions) || sessions?.user.level !== 10) {
//     return <p>관리자만 접속 가능한 페이지입니다.</p>;
//   }

//   return (
//     <>
//       <p>관리자 전용</p>
//       <ChartCom />
//     </>
//   );
// }
