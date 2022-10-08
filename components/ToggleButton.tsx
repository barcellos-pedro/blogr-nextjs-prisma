import { Switch } from '@headlessui/react';

interface ToggleButtonProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: () => void;
}

export const ToggleButton = ({
  id,
  label,
  checked,
  onChange,
}: ToggleButtonProps) => {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <Switch
        id={id}
        name={id}
        checked={checked}
        onChange={onChange}
        className={`${
          checked ? 'bg-blue-600' : 'bg-gray-300'
        } relative flex h-6 w-11 items-center rounded-full`}
      >
        <span
          className={`${
            checked ? 'translate-x-6' : 'translate-x-1'
          } inline-block h-4 w-4 transform rounded-full bg-white transition`}
        />
      </Switch>
    </>
  );
};
