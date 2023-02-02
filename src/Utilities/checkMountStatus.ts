import {useEffect, useState} from 'react';

const useMountStatus = () => {
  const [unmounted, setUnmounted] = useState<boolean>(false);

  useEffect(() => {
    setUnmounted(false);
    return () => {
      setUnmounted(true);
    };
  });

  return unmounted;
};

export default useMountStatus;
