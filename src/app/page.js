
import { getServerSession } from 'next-auth'
import { authOptions } from "./api/(auth)/auth/[...nextauth]/options";
import Logout from './component/logout';




export default async function Home() {
  let session = await getServerSession(authOptions)
   

  console.log(session)
  


  return (
    <>
      <h1>{JSON.stringify(session)}</h1>
      <h1>this is home page</h1>
      <Logout/>
    </>
  );
}
