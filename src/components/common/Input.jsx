import { C } from '../../constants/theme';

export default function Input({ label, ...props }) {
  return (
    <div style={{ marginBottom: 14 }}>
      {label && (
        <label
          style={{
            display: 'block',
            fontSize: 13,
            fontWeight: 600,
            color: C.muted,
            marginBottom: 6
          }}
        >
          {label}
        </label>
      )}
      <input
        {...props}
        style={{
          width: '100%',
          padding: '10px 14px',
          border: `1.5px solid ${C.border}`,
          borderRadius: 10,
          fontSize: 14,
          background: '#fff',
          color: C.text,
          transition: 'border .15s',
          boxSizing: 'border-box',
          ...props.style
        }}
        onFocus={(e) => (e.target.style.borderColor = C.primary)}
        onBlur={(e) => (e.target.style.borderColor = C.border)}
      />
    </div>
  );
}
