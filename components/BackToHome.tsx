import Link from 'next/link';

export const BackToHome = () => {
  return (
    <Link href="/">
      <a className="hover:underline">&larr; Back to home</a>
    </Link>
  );
};
