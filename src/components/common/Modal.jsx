import { C } from '../../constants/theme';

export default function Modal({ title, children, onClose }) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: C.overlay,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        style={{
          background: C.card,
          borderRadius: 20,
          padding: 28,
          width: '100%',
          maxWidth: 480,
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 20px 60px rgba(0,0,0,.25)',
          animation: 'slideIn .2s ease'
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 20
          }}
        >
          <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, color: C.text }}>
            {title}
          </h3>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: 22,
              cursor: 'pointer',
              color: C.muted
            }}
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
