import { signIn } from 'next-auth/react'


function Login() {

  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <button
      onAnimationEnd={(e) => { e.target.blur()}}
      onClick={() => signIn("spotify", { callbackUrl: "/" })}
      className='bg-green-500 py-2 px-3 rounded-xl focus:animate-click shadow-lg transition-all duration-150'>
        <p className="text-white font-sans font-semibold">
          Login with Spotify
        </p>
      </button>
    </div>
  )
}

export default Login
