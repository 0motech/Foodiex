import { useState } from 'react';
import { Card, Inp, Btn } from '../../components/common';
import { C } from '../../constants/theme';

export default function CheckoutPage({ t, lang, cart, cartTotal, onPlaceOrder }) {
  const [method, setMethod] = useState('cod');
  const [cardNum, setCardNum] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [loading, setLoading] = useState(false);
  const delivery = 30;

  const submit = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    onPlaceOrder(method);
    setLoading(false);
  };

  return (
    <div style={{ animation: 'fadeIn .3s ease', maxWidth: 560, margin: '0 auto' }}>
      <h1
        style={{
          fontFamily: "'Playfair Display',serif",
          fontSize: 28,
          color: C.text,
          marginBottom: 24
        }}
      >
        💳 {t.checkout}
      </h1>
      <Card style={{ padding: 20, marginBottom: 20 }}>
        <h3
          style={{
            fontFamily: "'Playfair Display',serif",
            fontSize: 16,
            marginBottom: 14,
            color: C.text
          }}
        >
          📋 Order Summary
        </h3>
        {cart.map(({ product, qty }) => (
          <div
            key={product.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: 8,
              fontSize: 13
            }}
          >
            <span>
              {product.emoji} {product.name[lang] || product.name.en} × {qty}
            </span>
            <span style={{ fontWeight: 600 }}>
              {product.price * qty} {t.currency}
            </span>
          </div>
        ))}
        <div style={{ height: 1, background: C.border, margin: '12px 0' }} />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontWeight: 700,
            fontSize: 15
          }}
        >
          <span>{t.total}</span>
          <span style={{ color: C.primary }}>
            {cartTotal + delivery} {t.currency}
          </span>
        </div>
      </Card>
      <Card style={{ padding: 20, marginBottom: 20 }}>
        <h3
          style={{
            fontFamily: "'Playfair Display',serif",
            fontSize: 16,
            marginBottom: 14,
            color: C.text
          }}
        >
          {t.selectPayment}
        </h3>
        <div style={{ display: 'grid', gap: 10 }}>
          {[
            { key: 'cod', label: t.payCOD, icon: '💵' },
            { key: 'online', label: t.payOnline, icon: '💳' }
          ].map((m) => (
            <div
              key={m.key}
              onClick={() => setMethod(m.key)}
              style={{
                padding: '14px 16px',
                border: `2px solid ${method === m.key ? C.primary : C.border}`,
                borderRadius: 12,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                background: method === m.key ? C.primary + '0d' : C.card,
                transition: 'border .15s, background .15s'
              }}
            >
              <span style={{ fontSize: 24 }}>{m.icon}</span>
              <div style={{ flex: 1, fontWeight: 600, fontSize: 14, color: C.text }}>{m.label}</div>
              <div
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  border: `2px solid ${method === m.key ? C.primary : C.muted}`,
                  background: method === m.key ? C.primary : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {method === m.key && <span style={{ color: '#fff', fontSize: 10 }}>✓</span>}
              </div>
            </div>
          ))}
        </div>
        {method === 'online' && (
          <div style={{ marginTop: 16, paddingTop: 16, borderTop: `1px solid ${C.border}` }}>
            <Inp
              label={t.cardNum}
              placeholder="1234 5678 9012 3456"
              value={cardNum}
              onChange={(e) => setCardNum(e.target.value)}
              maxLength={19}
            />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <Inp
                label={t.expiry}
                placeholder="MM/YY"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                maxLength={5}
              />
              <Inp
                label={t.cvv}
                placeholder="123"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                maxLength={3}
                type="password"
              />
            </div>
          </div>
        )}
      </Card>
      <Btn
        full
        onClick={submit}
        disabled={loading}
        style={{ borderRadius: 12, padding: 15, fontSize: 15 }}
      >
        {loading ? '⏳ Processing…' : `${t.placeOrder} (${cartTotal + delivery} ${t.currency})`}
      </Btn>
    </div>
  );
}
