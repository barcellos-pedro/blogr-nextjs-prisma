import Link from 'next/link';

export const BackToHome = () => {
  return (
    <Link href="/">
      <a className={''}>&larr; Back to home</a>
    </Link>
  );
};
