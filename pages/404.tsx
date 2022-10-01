import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-xl font-bold text-zinc-800">
        Uh oh. Page Not Found.
      </h1>
      <Image width={300} height={300} src="/images/john-travolta-lost.gif" />
      <Link href="/">
        <a className="bg-black text-white px-4 py-2 rounded mt-3 hover:bg-slate-800 hover:-translate-y-1 duration-300">
          🏠 Back to home
        </a>
      </Link>
    </div>
  );
}
