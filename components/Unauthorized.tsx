import Link from 'next/link';

export const Unauthorized = () => {
  return (
    <main className="flex flex-col gap-3 justify-center items-center h-screen">
      <h1 className="text-xl font-bold">Access denied</h1>
      <p className="text-zinc-500">
        You need to be logged in to view this page.
      </p>
      <Link href="/login">
        <a className="bg-black text-white px-5 py-2 rounded">Login</a>
      </Link>
    </main>
  );
};
