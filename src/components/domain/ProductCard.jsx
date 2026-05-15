import { Card, Btn } from '../common';
import { C } from '../../constants/theme';
import { CAT_KEYS } from '../../constants/data';

export default function ProductCard({ product, t, lang, onAdd, cartQty }) {
  return (
    <Card
      style={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 20,
        border: `1px solid ${C.border}`,
        boxShadow: '0 10px 30px rgba(44, 24, 16, 0.03)',
        transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-6px) scale(1.01)';
        e.currentTarget.style.boxShadow = '0 20px 50px rgba(44, 24, 16, 0.1)';
        e.currentTarget.style.borderColor = C.borderDark;
        e.currentTarget.querySelector('.product-emoji').style.transform = 'scale(1.2) rotate(5deg)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = '';
        e.currentTarget.style.boxShadow = '0 10px 30px rgba(44, 24, 16, 0.03)';
        e.currentTarget.style.borderColor = C.border;
        e.currentTarget.querySelector('.product-emoji').style.transform = '';
      }}
    >
      <div
        style={{
          background: `linear-gradient(150deg, ${product.bg}dd 0%, ${product.bg}33 100%)`,
          height: 160,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 80,
          position: 'relative',
          overflow: 'hidden',
          borderTopLeftRadius: 19,
          borderTopRightRadius: 19
        }}
      >
        <div
          className="product-emoji"
          style={{ transition: 'transform 0.4s ease', position: 'relative', zIndex: 2 }}
        >
          {product.emoji}
        </div>
        <div
          style={{
            position: 'absolute',
            width: 150,
            height: 150,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.2)',
            bottom: -50,
            right: -30,
            zIndex: 1
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 12,
            right: 12,
            background: 'rgba(255,255,255,0.7)',
            backdropFilter: 'blur(4px)',
            color: C.text,
            borderRadius: 20,
            padding: '4px 10px',
            fontSize: 11,
            fontWeight: 700,
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            display: 'flex',
            alignItems: 'center',
            gap: 3,
            zIndex: 3
          }}
        >
          ⭐ <span style={{ color: C.accent }}>{product.rating.toFixed(1)}</span>
        </div>
        <div
          style={{
            position: 'absolute',
            top: 12,
            left: 12,
            background: `${product.bg}ff`,
            color: '#fff',
            borderRadius: 20,
            padding: '4px 12px',
            fontSize: 10,
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: 1,
            zIndex: 3,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}
        >
          {t.catLabels[CAT_KEYS.indexOf(product.category)] || product.category}
        </div>
      </div>
      <div
        style={{ padding: '18px 20px', flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}
      >
        <h3
          style={{
            fontFamily: "'Playfair Display',serif",
            fontSize: 17,
            fontWeight: 700,
            color: C.text,
            marginBottom: 2,
            lineHeight: 1.3
          }}
        >
          {product.name[lang] || product.name.en}
        </h3>
        <p
          style={{
            fontSize: 12,
            color: C.muted,
            marginBottom: 12,
            flex: 1,
            lineHeight: 1.6,
            opacity: 0.8
          }}
        >
          {product.desc[lang] || product.desc.en}
        </p>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 'auto',
            borderTop: `1px solid ${C.border}`,
            paddingTop: 14
          }}
        >
          <span
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: 22,
              fontWeight: 700,
              color: C.primary,
              letterSpacing: -0.5
            }}
          >
            {product.price} {t.currency}
          </span>
          <Btn
            onClick={() => onAdd(product)}
            small
            variant={cartQty > 0 ? 'success' : 'primary'}
            style={{ borderRadius: 10, gap: 5, padding: '9px 18px' }}
          >
            {cartQty > 0 ? `✓ (${cartQty})` : `+ ${t.addToCart}`}
          </Btn>
        </div>
      </div>
    </Card>
  );
}
