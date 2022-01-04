import { getProviders, signIn } from 'next-auth/react'
import { useContext } from 'react';

function Login({ providers }) {
  
  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <button
        onAnimationEnd={(e) => { e.target.blur() }}
        onClick={() => signIn(providers.spotify.id, { callbackUrl: '/' })}
        className='bg-green-500 py-2 px-3 rounded-xl focus:animate-click shadow-lg transition-all duration-150'>
        <p className="text-white font-sans font-semibold">
          Login with {providers['spotify'].name}
        </p>
      </button>
    </div>
  )
}

export default Login

export async function getServerSideProps(ctx) {
  const providers = await getProviders()
  return {
    props: { providers }
  }
}