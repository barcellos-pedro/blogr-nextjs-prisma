import Link from 'next/link';

export default function Welcome() {
  return (
    <main className="flex flex-col gap-12 justify-center items-center h-screen">
      <h1 className="text-center text-4xl font-bold">
        Welcome to <span className="text-red-300">Stories</span>
      </h1>
      <p className="text-center text-xl text-zinc-600">
        Stories is all yours now. Have fun! 🎊
      </p>
      <Link href="/">
        <a className="bg-blue-500 py-2 px-6 rounded font-semibold text-white hover:bg-blue-600">
          Start
        </a>
      </Link>
    </main>
  );
}
