type LogoProps = {
  size?: number;
  className?: string;
};

/**
 * شعار تشارك — دائرة + نقاط متصلة + خط نمو.
 */
export default function Logo({ size = 28, className }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="20" cy="20" r="18.5" stroke="currentColor" strokeOpacity="0.18" />
      <circle cx="20" cy="20" r="12" stroke="currentColor" strokeOpacity="0.28" />
      <path
        d="M11 25 L18 18 L23 22.5 L30 14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="11" cy="25" r="1.9" fill="currentColor" />
      <circle cx="18" cy="18" r="1.9" fill="currentColor" />
      <circle cx="23" cy="22.5" r="1.9" fill="currentColor" />
      <circle cx="30" cy="14" r="2.4" fill="currentColor" />
    </svg>
  );
}
