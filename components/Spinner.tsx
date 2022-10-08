import { ArrowPathIcon } from '@heroicons/react/24/solid';

interface SpinnerProps {
  width: number;
  height: number;
}

export const Spinner = ({ width = 25, height = 25 }: SpinnerProps) => {
  return (
    <ArrowPathIcon width={width} height={height} className="animate-spin" />
  );
};
