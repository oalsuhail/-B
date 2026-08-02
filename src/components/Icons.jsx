// Minimal, dependency-free SVG icon set (24x24, stroke-based).
// Keeping icons hand-rolled avoids pulling in an icon library just for a
// dozen glyphs, which keeps the JS bundle small.

const base = {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

function Svg({ children, ...props }) {
  return (
    <svg {...base} aria-hidden="true" focusable="false" {...props}>
      {children}
    </svg>
  )
}

export function IconMenu(props) {
  return (
    <Svg {...props}>
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </Svg>
  )
}

export function IconClose(props) {
  return (
    <Svg {...props}>
      <line x1="6" y1="6" x2="18" y2="18" />
      <line x1="18" y1="6" x2="6" y2="18" />
    </Svg>
  )
}

export function IconArrowRight(props) {
  return (
    <Svg {...props}>
      <line x1="4" y1="12" x2="20" y2="12" />
      <polyline points="13 5 20 12 13 19" />
    </Svg>
  )
}

export function IconPhone(props) {
  return (
    <Svg {...props}>
      <path d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.3 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20.7c0 .6-.4 1-1 1C11 21.7 2.3 13 2.3 2.7c0-.6.4-1 1-1H7.4c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1L6.6 10.8z" />
    </Svg>
  )
}

export function IconMail(props) {
  return (
    <Svg {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <polyline points="3 7 12 13 21 7" />
    </Svg>
  )
}

export function IconMapPin(props) {
  return (
    <Svg {...props}>
      <path d="M12 21s7-6.6 7-11.5A7 7 0 0 0 5 9.5C5 14.4 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.4" />
    </Svg>
  )
}

export function IconClock(props) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 7 12 12 16 14" />
    </Svg>
  )
}

export function IconCheck(props) {
  return (
    <Svg {...props}>
      <polyline points="20 6 9 17 4 12" />
    </Svg>
  )
}

export function IconCheckCircle(props) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="9" />
      <polyline points="8 12.5 11 15.5 16 9" />
    </Svg>
  )
}

export function IconStar(props) {
  return (
    <Svg fill="currentColor" stroke="none" {...props}>
      <path d="M12 2.5l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.4l-5.8 3 1.1-6.5-4.7-4.6 6.5-.9L12 2.5z" />
    </Svg>
  )
}

export function IconShield(props) {
  return (
    <Svg {...props}>
      <path d="M12 3l7 3v5c0 4.6-3 8.4-7 10-4-1.6-7-5.4-7-10V6l7-3z" />
      <polyline points="9 12 11 14 15 10" />
    </Svg>
  )
}

export function IconUsers(props) {
  return (
    <Svg {...props}>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <circle cx="17" cy="8.5" r="2.6" />
      <path d="M15.5 14.2c2.6.5 4.5 2.7 4.5 5.8" />
    </Svg>
  )
}

export function IconCompass(props) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="9" />
      <polygon points="15 9 13 13 9 15 11 11 15 9" />
    </Svg>
  )
}

export function IconBuilding(props) {
  return (
    <Svg {...props}>
      <rect x="5" y="3" width="14" height="18" rx="1" />
      <line x1="9" y1="7" x2="9" y2="7.01" />
      <line x1="15" y1="7" x2="15" y2="7.01" />
      <line x1="9" y1="11" x2="9" y2="11.01" />
      <line x1="15" y1="11" x2="15" y2="11.01" />
      <path d="M10 21v-4h4v4" />
    </Svg>
  )
}

export function IconWrench(props) {
  return (
    <Svg {...props}>
      <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2-2 2.6-2.6z" />
    </Svg>
  )
}

export function IconClipboard(props) {
  return (
    <Svg {...props}>
      <rect x="5" y="4" width="14" height="17" rx="2" />
      <rect x="8.5" y="2.5" width="7" height="3" rx="1" />
      <line x1="8" y1="11" x2="16" y2="11" />
      <line x1="8" y1="15" x2="13" y2="15" />
    </Svg>
  )
}

export function IconPalette(props) {
  return (
    <Svg {...props}>
      <path d="M12 3a9 9 0 1 0 0 18c1.1 0 1.8-.9 1.4-1.9-.2-.5-.1-1.1.4-1.4.3-.2.7-.3 1.1-.3H16a4 4 0 0 0 4-4c0-5.8-4-10.4-8-10.4z" />
      <circle cx="7.5" cy="10.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="9.5" cy="7" r="1" fill="currentColor" stroke="none" />
      <circle cx="14.5" cy="7" r="1" fill="currentColor" stroke="none" />
    </Svg>
  )
}

export function IconLeaf(props) {
  return (
    <Svg {...props}>
      <path d="M20 4c-9 0-16 5-16 14 9 0 16-5 16-14z" />
      <path d="M6 20c2-6 6-9 12-12" />
    </Svg>
  )
}

export function IconCrane(props) {
  return (
    <Svg {...props}>
      <line x1="5" y1="21" x2="5" y2="4" />
      <line x1="5" y1="4" x2="19" y2="4" />
      <line x1="19" y1="4" x2="19" y2="8" />
      <line x1="5" y1="9" x2="12" y2="4" />
      <line x1="2" y1="21" x2="10" y2="21" />
    </Svg>
  )
}

// Skyline mark: three towers over a base arc, echoing the ABC Company logo.
export function BrandMark({ width = 24, height = 24, ...props }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M4.6 20.4V13l3-2.1v9.5z" />
      <path d="M10.4 20.4V7.6l3.2-2.3v1.9l1.6 1.1v12.1z" />
      <path d="M16.8 20.4v-9.6l3-2.1v11.7z" />
      <path d="M3.4 18.3c0 1.6 3.9 2.9 8.6 2.9s8.6-1.3 8.6-2.9c0-.5-.4-.9-1.1-1.3-1.1 1-4.2 1.7-7.5 1.7s-6.4-.7-7.5-1.7c-.7.4-1.1.8-1.1 1.3z" opacity="0.85" />
    </svg>
  )
}
