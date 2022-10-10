import Link from 'next/link';

interface ErrorProps {
  title: string;
  description?: string;
  buttonText: string;
  navigateTo: string;
}

export const Error = ({
  title,
  description,
  buttonText,
  navigateTo = '/',
}: ErrorProps) => {
  return (
    <main className="flex flex-col gap-3 justify-center items-center h-screen">
      <h1 className="text-xl font-bold">{title}</h1>
      {description && <p className="text-zinc-500">{description}</p>}
      <Link href={navigateTo}>
        <a className="bg-black text-white px-5 py-2 rounded">{buttonText}</a>
      </Link>
    </main>
  );
};
