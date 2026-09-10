const paths = {
  arrow: (
    <>
      <path d="M4 12h16M13 5l7 7-7 7" />
    </>
  ),
  external: (
    <>
      <path d="M6 18 18 6M6 6h12v12" />
    </>
  ),
  download: (
    <>
      <path d="M12 3v12m-5-5 5 5 5-5M5 16v5h14v-5" />
    </>
  ),
  moon: <path d="M20 14a8.5 8.5 0 0 1-10-10 8.5 8.5 0 1 0 10 10Z" />,
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" />
    </>
  ),
  'arrow-left': <path d="M20 12H4m7-7-7 7 7 7" />,
  menu: <path d="M4 7h16M4 17h16" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  play: <path d="M8 5.5v13l10.5-6.5z" fill="currentColor" />,
};

export default function Icon({ name = 'arrow', size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {paths[name]}
    </svg>
  );
}
