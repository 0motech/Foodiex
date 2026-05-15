import { Card, Badge } from '../../components/common';
import StatusTimeline from '../../components/domain/StatusTimeline';
import { C } from '../../constants/theme';

export default function OrdersPage({ t, lang, isRTL, user, orders }) {
  const myOrders = orders.filter((o) => !user || o.userId === user.id);

  if (!myOrders.length)
    return (
      <div style={{ textAlign: 'center', padding: '80px 0', animation: 'fadeIn .3s ease' }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>📦</div>
        <h2
          style={{
            fontFamily: "'Playfair Display',serif",
            fontSize: 22,
            color: C.text,
            marginBottom: 8
          }}
        >
          {t.noOrders}
        </h2>
      </div>
    );

  const statusColor = {
    pending: C.accent,
    preparing: C.blue,
    onWay: C.accentLight,
    delivered: C.green
  };

  return (
    <div style={{ animation: 'fadeIn .3s ease' }}>
      <h1
        style={{
          fontFamily: "'Playfair Display',serif",
          fontSize: 28,
          color: C.text,
          marginBottom: 24
        }}
      >
        📦 {t.myOrders}
      </h1>
      <div style={{ display: 'grid', gap: 18 }}>
        {myOrders.map((order) => (
          <Card key={order.id} style={{ padding: 22 }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 14,
                flexWrap: 'wrap',
                gap: 8
              }}
            >
              <div>
                <span
                  style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: 16 }}
                >
                  {t.orderNum} {order.id}
                </span>
                <span style={{ fontSize: 12, color: C.muted, marginLeft: 10 }}>
                  {new Date(order.time).toLocaleString(lang === 'ar' ? 'ar-SA' : 'en-US')}
                </span>
              </div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <Badge color={statusColor[order.status] || C.muted}>
                  {t.statusLabels[order.status] || order.status}
                </Badge>
                <Badge color={C.blue}>{t.paymentLabels[order.payment] || order.payment}</Badge>
              </div>
            </div>
            <div
              style={{ background: C.bg, borderRadius: 10, padding: '10px 14px', marginBottom: 14 }}
            >
              {order.items.map(({ product, qty }, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: 13,
                    padding: '3px 0'
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
              <div
                style={{
                  borderTop: `1px solid ${C.border}`,
                  marginTop: 8,
                  paddingTop: 8,
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontWeight: 700
                }}
              >
                <span>{t.total}</span>
                <span style={{ color: C.primary }}>
                  {order.total} {t.currency}
                </span>
              </div>
            </div>
            {order.status !== 'delivered' && (
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.muted, marginBottom: 10 }}>
                  🗺️ {t.trackYourOrder}
                </div>
                <StatusTimeline status={order.status} t={t} isRTL={isRTL} />
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
