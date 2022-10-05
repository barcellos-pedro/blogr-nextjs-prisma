import Head from 'next/head';
import { Layout } from '../components/Layout';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function LoginPage() {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    router.push('/');
  }

  return (
    <Layout
      home
      className="flex justify-center items-center h-screen bg-gradient-to-t from-[#1d2a5e] to-[#40bda7]"
    >
      <Head>
        <title>Blog - Login</title>
      </Head>

      <div className="bg-white p-5 rounded ring-8 ring-sky-200/40">
        <h1 className="text-center text-2xl font-bold">Log in</h1>

        <hr className="w-10/12 mx-auto my-4 border-zinc-300" />

        <div className="flex flex-col items-center gap-5">
          <button
            onClick={() => signIn('github', { callbackUrl: '/' })}
            className="bg-black flex justify-between gap-3 items-center font-semibold px-3 py-2 text-white rounded border hover:bg-white/90 hover:text-black hover:border-black duration-300 "
          >
            <FaGithub />
            Continue with Github
          </button>
          <button
            onClick={() => signIn('google', { callbackUrl: '/' })}
            className="bg-red-500 flex justify-between gap-3 items-center font-semibold px-3 py-2 text-white rounded border hover:bg-white hover:text-red-500 hover:border-red-500 duration-300"
          >
            <FaGoogle />
            Continue with Google
          </button>
        </div>
      </div>
    </Layout>
  );
}
