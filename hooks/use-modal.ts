import { useState } from 'react';

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  return {
    values: {
      isOpen,
      isPending,
    },
    actions: {
      setIsOpen,
      setIsPending,
      closeModal,
      openModal,
    },
  };
};
