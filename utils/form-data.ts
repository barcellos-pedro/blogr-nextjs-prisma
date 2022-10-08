import { FormEvent } from 'react';

export const getFormData = (event: FormEvent) => {
  const formData = new FormData(event.target as HTMLFormElement);
  return Object.fromEntries(formData);
};
