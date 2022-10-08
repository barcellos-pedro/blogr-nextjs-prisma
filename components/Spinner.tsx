import { ArrowPathIcon } from '@heroicons/react/24/solid';

interface SpinnerProps {
  width: number;
  height: number;
  fullscreen?: boolean;
}

export const Spinner = ({
  width = 25,
  height = 25,
  fullscreen = false,
}: SpinnerProps) => {
  if (fullscreen) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ArrowPathIcon width={width} height={height} className="animate-spin" />
      </div>
    );
  }

  return (
    <ArrowPathIcon width={width} height={height} className="animate-spin" />
  );
};
