import { C } from '../../constants/theme';

export default function Select({ label, value, onChange, options }) {
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
      <select
        value={value}
        onChange={onChange}
        style={{
          width: '100%',
          padding: '10px 14px',
          border: `1.5px solid ${C.border}`,
          borderRadius: 10,
          fontSize: 14,
          background: '#fff',
          color: C.text,
          boxSizing: 'border-box',
          cursor: 'pointer'
        }}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
