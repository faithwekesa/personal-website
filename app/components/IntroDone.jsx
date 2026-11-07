'use client';

import { useEffect } from 'react';

export default function IntroDone() {
  useEffect(() => {
    document.documentElement.dataset.intro = 'done';
  }, []);
  return null;
}
