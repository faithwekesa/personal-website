'use client';

export default function CvLink({ href, children }) {
  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault();
        window.dispatchEvent(new Event('open-cv'));
      }}
    >
      {children}
    </a>
  );
}
