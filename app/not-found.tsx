// not-found.tsx
import { headers } from 'next/headers'
export default async function NotFound(){
  const headerList = headers();
  const domain = headerList.get('referer');
  // const data = await getSiteData(domain);
  console.log(headerList.get('referer'))
  return (
    <>

      <p>입력 하신 {domain}은 없는 페이지 입니다.</p>
    
    </>
  )
}