import { useSession } from 'next-auth/react'
import NavLayout from '../layouts/NavLayout'
import Playlist from '../components/Playlist'
import { useEffect, useRef, useState } from 'react';

export default function Home( props ) {

  const { data: session, status } = useSession()
  if(session){
    return (
      <div className="text-white">
        <Playlist/>
      </div>
    )
  }

  return (
    <>
     Loading...
    </>
  )
}

Home.getLayout = function getLayout(page){
  return(
    <NavLayout> 
      { page }
    </NavLayout>
  )
}
// export async function getServerSideProps(ctx){
//   return {
//     props:{
//       session: null
//     }
//   }
// }
