import { useSession } from 'next-auth/react';
import { LoggedInLinks } from './LoggedInLinks';
import { GuestLinks } from './GuestLinks';
import { Spinner } from './Spinner';

export const Header = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <header className="mb-7 flex justify-end">
        <Spinner />
      </header>
    );
  }

  return (
    <header className="mb-7">
      <nav className="flex items-center justify-between flex-wrap gap-2">
        {!session ? (
          <GuestLinks />
        ) : (
          <LoggedInLinks user={{ ...session.user }} />
        )}
      </nav>
    </header>
  );
};
