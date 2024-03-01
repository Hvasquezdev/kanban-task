import React, { useEffect } from 'react';

interface UseClickOutsideProps {
  ref?: React.MutableRefObject<any>;
  onClickOutside?: () => void;
}

const useClickOutside = ({ ref, onClickOutside }: UseClickOutsideProps) => {
  let hasListener = false;

  const handleClickOutside = (event: MouseEvent) => {
    if (ref?.current && !ref.current.contains(event.target)) {
      onClickOutside?.();
    }
  };

  const setListener = () => {
    document.addEventListener('mousedown', handleClickOutside);
  };

  const removeListener = () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };

  const handleListenersState = () => {
    if (!hasListener) {
      setListener();
      hasListener = true;
      return;
    }

    removeListener();
    setListener();
  };

  useEffect(() => {
    handleListenersState();

    return () => {
      removeListener();
    };

    // eslint-disable-next-line
  }, [ref]);
};

export default useClickOutside;
