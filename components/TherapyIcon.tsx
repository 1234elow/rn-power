export default function TherapyIcon() {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mx-auto"
    >
      <circle cx="32" cy="32" r="30" stroke="#2563eb" strokeWidth="2" fill="none" />

      {/* Center circle */}
      <circle cx="32" cy="32" r="8" stroke="#2563eb" strokeWidth="1.5" fill="none" />

      {/* Petals/atoms around center */}
      <ellipse cx="32" cy="18" rx="4" ry="6" stroke="#2563eb" strokeWidth="1.5" fill="none" />
      <ellipse cx="32" cy="46" rx="4" ry="6" stroke="#2563eb" strokeWidth="1.5" fill="none" />
      <ellipse cx="18" cy="32" rx="6" ry="4" stroke="#2563eb" strokeWidth="1.5" fill="none" />
      <ellipse cx="46" cy="32" rx="6" ry="4" stroke="#2563eb" strokeWidth="1.5" fill="none" />

      {/* Diagonal petals */}
      <ellipse
        cx="32"
        cy="32"
        rx="4"
        ry="6"
        stroke="#2563eb"
        strokeWidth="1.5"
        fill="none"
        transform="rotate(45 32 32)"
      />
      <ellipse
        cx="32"
        cy="32"
        rx="4"
        ry="6"
        stroke="#2563eb"
        strokeWidth="1.5"
        fill="none"
        transform="rotate(-45 32 32)"
      />
      <ellipse
        cx="32"
        cy="32"
        rx="4"
        ry="6"
        stroke="#2563eb"
        strokeWidth="1.5"
        fill="none"
        transform="rotate(135 32 32)"
      />
      <ellipse
        cx="32"
        cy="32"
        rx="4"
        ry="6"
        stroke="#2563eb"
        strokeWidth="1.5"
        fill="none"
        transform="rotate(-135 32 32)"
      />
    </svg>
  );
}
