import { Card, Btn } from '../../components/common';
import { C } from '../../constants/theme';

export default function CartPage({
  t,
  lang,
  cart,
  cartTotal,
  onRemove,
  onUpdateQty,
  setPage,
  user
}) {
  const delivery = cart.length > 0 ? 30 : 0;

  if (!cart.length)
    return (
      <div style={{ textAlign: 'center', padding: '80px 0', animation: 'fadeIn .3s ease' }}>
        <div style={{ fontSize: 72, marginBottom: 16 }}>🛒</div>
        <h2
          style={{
            fontFamily: "'Playfair Display',serif",
            fontSize: 24,
            color: C.text,
            marginBottom: 8
          }}
        >
          {t.emptyCart}
        </h2>
        <p style={{ color: C.muted, marginBottom: 24 }}>Add some delicious items!</p>
        <Btn onClick={() => setPage('menu')}>{t.menu}</Btn>
      </div>
    );

  return (
    <div style={{ animation: 'fadeIn .3s ease', maxWidth: 720, margin: '0 auto' }}>
      <h1
        style={{
          fontFamily: "'Playfair Display',serif",
          fontSize: 28,
          color: C.text,
          marginBottom: 24
        }}
      >
        🛒 {t.cart}
      </h1>
      <div style={{ display: 'grid', gap: 12, marginBottom: 24 }}>
        {cart.map(({ product, qty }) => (
          <Card key={product.id} style={{ padding: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 12,
                  flexShrink: 0,
                  background: `linear-gradient(135deg,${product.bg}99,${product.bg}44)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 34
                }}
              >
                {product.emoji}
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontFamily: "'Playfair Display',serif",
                    fontWeight: 600,
                    fontSize: 15,
                    color: C.text
                  }}
                >
                  {product.name[lang] || product.name.en}
                </div>
                <div style={{ color: C.primary, fontWeight: 700, marginTop: 2 }}>
                  {product.price} {t.currency}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <button
                  onClick={() => onUpdateQty(product.id, -1)}
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: '50%',
                    border: `1.5px solid ${C.border}`,
                    background: C.bg,
                    cursor: 'pointer',
                    fontSize: 16,
                    fontFamily: 'inherit'
                  }}
                >
                  −
                </button>
                <span style={{ fontWeight: 700, fontSize: 16, minWidth: 24, textAlign: 'center' }}>
                  {qty}
                </span>
                <button
                  onClick={() => onUpdateQty(product.id, 1)}
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: '50%',
                    border: 'none',
                    background: C.primary,
                    color: '#fff',
                    cursor: 'pointer',
                    fontSize: 16,
                    fontFamily: 'inherit'
                  }}
                >
                  +
                </button>
              </div>
              <div
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontWeight: 700,
                  fontSize: 16,
                  color: C.text,
                  minWidth: 64,
                  textAlign: 'center'
                }}
              >
                {product.price * qty} {t.currency}
              </div>
              <button
                onClick={() => onRemove(product.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 18,
                  color: C.red
                }}
              >
                🗑️
              </button>
            </div>
          </Card>
        ))}
      </div>
      <Card style={{ padding: 24 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 10,
            fontSize: 14
          }}
        >
          <span style={{ color: C.muted }}>{t.subtotal}</span>
          <span style={{ fontWeight: 600 }}>
            {cartTotal} {t.currency}
          </span>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 14,
            fontSize: 14
          }}
        >
          <span style={{ color: C.muted }}>{t.deliveryFee}</span>
          <span style={{ fontWeight: 600, color: C.green }}>
            {delivery === 0 ? t.free : `${delivery} ${t.currency}`}
          </span>
        </div>
        <div style={{ height: 1, background: C.border, marginBottom: 14 }} />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 20,
            fontSize: 18
          }}
        >
          <span style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700 }}>{t.total}</span>
          <span
            style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, color: C.primary }}
          >
            {cartTotal + delivery} {t.currency}
          </span>
        </div>
        <Btn
          full
          onClick={() => {
            user ? setPage('checkout') : setPage('login');
          }}
          style={{ borderRadius: 12, padding: 14 }}
        >
          {t.checkout} →
        </Btn>
      </Card>
    </div>
  );
}
