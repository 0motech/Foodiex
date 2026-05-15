import { C } from '../../constants/theme';

export default function Card({ children, style: sx = {}, hover = false }) {
  return (
    <div
      style={{
        background: C.card,
        borderRadius: 16,
        boxShadow: '0 2px 16px rgba(192,57,43,.07)',
        border: `1px solid ${C.border}`,
        overflow: 'hidden',
        transition: hover ? 'transform .2s, box-shadow .2s' : undefined,
        ...sx
      }}
      onMouseEnter={(e) => {
        if (hover) {
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.boxShadow = '0 12px 40px rgba(192,57,43,.15)';
        }
      }}
      onMouseLeave={(e) => {
        if (hover) {
          e.currentTarget.style.transform = '';
          e.currentTarget.style.boxShadow = '0 2px 16px rgba(192,57,43,.07)';
        }
      }}
    >
      {children}
    </div>
  );
}
