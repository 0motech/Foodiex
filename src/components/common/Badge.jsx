import { C } from '../../constants/theme';

export default function Badge({ children, color = C.primary }) {
  return (
    <span
      style={{
        background: color + '22',
        color,
        border: `1px solid ${color}44`,
        borderRadius: 20,
        padding: '3px 10px',
        fontSize: 12,
        fontWeight: 700
      }}
    >
      {children}
    </span>
  );
}
