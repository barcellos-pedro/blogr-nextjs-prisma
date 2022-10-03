import { useSession } from 'next-auth/react';
import { LoggedInLinks } from './LoggedInLinks';
import { GuestLinks } from './GuestLinks';

export const Header = () => {
  const { data: session, status } = useSession();

  return (
    <header className="mb-7">
      <nav className="flex items-center justify-between flex-wrap gap-2">
        {!session ? (
          <GuestLinks />
        ) : (
          <LoggedInLinks user={{ ...session.user }} />
        )}
        {status === 'loading' && <p>Validation session...</p>}
      </nav>
    </header>
  );
};
