import { useSession } from 'next-auth/react';
import { LoggedInLinks } from './LoggedInLinks';
import { GuestLinks } from './GuestLinks';
import { UserCircleIcon } from '@heroicons/react/24/outline';

export const Header = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <header className="mb-7 flex justify-end">
        <UserCircleIcon width={40} height={40} className="animate-pulse" />
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
