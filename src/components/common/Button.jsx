import { C } from '../../constants/theme';

export default function Button({
  children,
  onClick,
  variant = 'primary',
  small = false,
  full = false,
  disabled = false,
  style: sx = {}
}) {
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    border: 'none',
    borderRadius: 12,
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontWeight: 600,
    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
    opacity: disabled ? 0.6 : 1,
    padding: small ? '8px 16px' : '12px 24px',
    fontSize: small ? 13 : 14,
    width: full ? '100%' : undefined,
    boxShadow:
      variant === 'primary' || variant === 'accent' ? '0 4px 12px rgba(192,57,43,0.15)' : 'none',
    position: 'relative',
    overflow: 'hidden'
  };

  const variants = {
    primary: { background: C.primary, color: '#fff' },
    danger: { background: C.red, color: '#fff' },
    outline: { background: 'transparent', color: C.primary, border: `2px solid ${C.primary}` },
    ghost: { background: 'transparent', color: C.muted },
    accent: { background: C.accent, color: '#fff' },
    success: { background: C.green, color: '#fff' }
  };

  return (
    <button
      onClick={disabled ? undefined : onClick}
      style={{ ...base, ...variants[variant], ...sx }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.filter = 'brightness(1.05)';
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow =
            variant === 'primary' || variant === 'accent'
              ? '0 8px 20px rgba(192,57,43,0.25)'
              : '0 4px 12px rgba(0,0,0,0.05)';
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.currentTarget.style.filter = '';
          e.currentTarget.style.transform = '';
          e.currentTarget.style.boxShadow = base.boxShadow;
        }
      }}
    >
      {children}
    </button>
  );
}
