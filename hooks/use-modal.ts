import { useState } from 'react';

export const useModal = (intialTitle: string, intialText: string) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [title, setTitle] = useState(intialTitle);
  const [description, setDescription] = useState(intialText);
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  return {
    values: {
      isOpen,
      isPending,
      title,
      description,
    },
    actions: {
      setIsOpen,
      setIsPending,
      setTitle,
      setDescription,
      closeModal,
      openModal,
    },
  };
};
