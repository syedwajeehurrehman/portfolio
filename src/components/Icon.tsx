type IconName =
  | 'arrow-up-right'
  | 'arrow-right'
  | 'arrow-down'
  | 'mail'
  | 'whatsapp'
  | 'behance'
  | 'menu'
  | 'close'
  | 'download'
  | 'check'
  | 'copy'
  | 'pin'

const paths: Record<IconName, React.ReactNode> = {
  'arrow-up-right': <path d="M7 17 17 7M8 7h9v9" />,
  'arrow-right': <path d="M5 12h14M13 6l6 6-6 6" />,
  'arrow-down': <path d="M12 5v14M6 13l6 6 6-6" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
    </>
  ),
  whatsapp: (
    <>
      <path d="M3.5 20.5 5 16a8.5 8.5 0 1 1 3.2 3.1L3.5 20.5Z" />
      <path d="M9 8.6c.2-.5.5-.6.8-.6h.5c.2 0 .4 0 .5.4l.7 1.7c.1.2 0 .4-.1.6l-.5.6c-.1.1-.2.3 0 .5.6 1 1.4 1.8 2.4 2.3.2.1.4.1.5 0l.6-.7c.2-.2.4-.2.6-.1l1.6.8c.3.1.3.3.3.5 0 .7-.6 1.5-1.4 1.6-.6.1-1.3.1-3-.7a9.5 9.5 0 0 1-3.6-3.4c-.6-1-.8-1.9-.8-2.5 0-.4.1-.7.3-1Z" fill="currentColor" stroke="none" />
    </>
  ),
  behance: (
    <>
      <path d="M3 6.5h5.2a2.6 2.6 0 0 1 .4 5.2H3V6.5Zm0 5.2h5.8a2.9 2.9 0 0 1 0 5.8H3v-5.8Z" />
      <path d="M14.5 13.6h6.3a3.2 3.2 0 1 0-.9 2.6M15 7.5h5" />
    </>
  ),
  menu: <path d="M4 8h16M4 16h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  download: <path d="M12 4v11m0 0-4.5-4.5M12 15l4.5-4.5M5 20h14" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  copy: (
    <>
      <rect x="8.5" y="8.5" width="11" height="11" rx="2" />
      <path d="M15.5 8.5V6a1.5 1.5 0 0 0-1.5-1.5H6A1.5 1.5 0 0 0 4.5 6v8A1.5 1.5 0 0 0 6 15.5h2.5" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" />
      <circle cx="12" cy="10" r="2.3" />
    </>
  ),
}

export function Icon({ name, size = 20, className }: { name: IconName; size?: number; className?: string }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {paths[name]}
    </svg>
  )
}
