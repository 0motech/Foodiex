import { useState } from 'react';
import { Card, Btn, Badge } from '../../components/common';
import ProductModal from '../../components/domain/ProductModal';
import { C } from '../../constants/theme';
import { STATUS_STEPS } from '../../constants/data';

export default function AdminPage({
  t,
  isRTL,
  products,
  orders,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onUpdateOrderStatus
}) {
  const [tab, setTab] = useState('menu');
  const [modal, setModal] = useState(null);
  const revenue = orders.reduce((s, o) => s + o.total, 0);
  const active = orders.filter((o) => o.status !== 'delivered').length;
  const statusColor = {
    pending: C.accent,
    preparing: C.blue,
    onWay: C.accentLight,
    delivered: C.green
  };
  const STAT_STEPS_OPTS = STATUS_STEPS.map((s) => ({ value: s, label: t.statusLabels[s] || s }));

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
        📊 {t.adminPanelTitle}
      </h1>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))',
          gap: 14,
          marginBottom: 28
        }}
      >
        {[
          { label: t.revenue, value: `${revenue} ${t.currency}`, icon: '💰', color: C.green },
          { label: t.ordersCount, value: orders.length, icon: '📦', color: C.blue },
          { label: t.activeOrders, value: active, icon: '🔥', color: C.accent },
          { label: 'Products', value: products.length, icon: '🍕', color: C.primary }
        ].map((s) => (
          <Card key={s.label} style={{ padding: 18, borderLeft: `4px solid ${s.color}` }}>
            <div style={{ fontSize: 28, marginBottom: 6 }}>{s.icon}</div>
            <div
              style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: 22,
                fontWeight: 700,
                color: s.color
              }}
            >
              {s.value}
            </div>
            <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>{s.label}</div>
          </Card>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {[
          { key: 'menu', label: t.manageMenu },
          { key: 'orders', label: t.manageOrders }
        ].map((tb) => (
          <button
            key={tb.key}
            onClick={() => setTab(tb.key)}
            style={{
              padding: '9px 20px',
              borderRadius: 10,
              border: `2px solid ${tab === tb.key ? C.primary : C.border}`,
              background: tab === tb.key ? C.primary : C.card,
              color: tab === tb.key ? '#fff' : C.text,
              fontWeight: 600,
              fontSize: 13,
              cursor: 'pointer',
              fontFamily: 'inherit',
              transition: 'all .15s'
            }}
          >
            {tb.label}
          </button>
        ))}
      </div>
      {tab === 'menu' && (
        <Card style={{ overflow: 'visible' }}>
          <div
            style={{
              padding: '16px 20px',
              borderBottom: `1px solid ${C.border}`,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <span style={{ fontWeight: 700, color: C.text }}>🍕 {t.manageMenu}</span>
            <Btn small onClick={() => setModal('add')}>
              {t.addProduct}
            </Btn>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 580 }}>
              <thead>
                <tr style={{ background: C.bg }}>
                  {[t.pEmoji, t.pName, t.pCategory, t.pPrice, 'Rating', 'Actions'].map((h) => (
                    <th
                      key={h}
                      style={{
                        padding: '10px 14px',
                        textAlign: isRTL ? 'right' : 'left',
                        fontSize: 12,
                        fontWeight: 700,
                        color: C.muted
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr
                    key={p.id}
                    style={{ borderBottom: `1px solid ${C.border}` }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = C.bg)}
                    onMouseLeave={(e) => (e.currentTarget.style.background = '')}
                  >
                    <td style={{ padding: '10px 14px', fontSize: 26 }}>{p.emoji}</td>
                    <td style={{ padding: '10px 14px' }}>
                      <div style={{ fontWeight: 600, fontSize: 13 }}>{p.name.en}</div>
                      <div style={{ fontSize: 11, color: C.muted }}>{p.name.ar}</div>
                    </td>
                    <td style={{ padding: '10px 14px' }}>
                      <Badge>{p.category}</Badge>
                    </td>
                    <td style={{ padding: '10px 14px', fontWeight: 700, color: C.primary }}>
                      {p.price} {t.currency}
                    </td>
                    <td style={{ padding: '10px 14px', color: C.accent }}>⭐ {p.rating}</td>
                    <td style={{ padding: '10px 14px' }}>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <Btn small variant="outline" onClick={() => setModal(p)}>
                          {t.editProduct}
                        </Btn>
                        <Btn
                          small
                          variant="danger"
                          onClick={() => {
                            if (window.confirm(t.confirmDelete)) onDeleteProduct(p.id);
                          }}
                        >
                          {t.deleteProduct}
                        </Btn>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
      {tab === 'orders' && (
        <div style={{ display: 'grid', gap: 14 }}>
          {[...orders]
            .sort((a, b) => new Date(b.time) - new Date(a.time))
            .map((order) => (
              <Card key={order.id} style={{ padding: 18 }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: 10
                  }}
                >
                  <div>
                    <span style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700 }}>
                      {t.orderNum} {order.id}
                    </span>
                    <span style={{ fontSize: 12, color: C.muted, marginLeft: 10 }}>
                      {new Date(order.time).toLocaleString()}
                    </span>
                    <div style={{ marginTop: 4, fontSize: 12, color: C.muted }}>
                      {order.items.map((i) => i.product.emoji + i.product.name.en).join(' • ')}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
                    <Badge color={statusColor[order.status] || C.muted}>
                      {t.statusLabels[order.status] || order.status}
                    </Badge>
                    <span
                      style={{
                        fontFamily: "'Playfair Display',serif",
                        fontWeight: 700,
                        color: C.primary
                      }}
                    >
                      {order.total} {t.currency}
                    </span>
                    <select
                      value={order.status}
                      onChange={(e) => onUpdateOrderStatus(order.id, e.target.value)}
                      style={{
                        padding: '6px 10px',
                        border: `1.5px solid ${C.border}`,
                        borderRadius: 8,
                        fontSize: 12,
                        background: C.card,
                        cursor: 'pointer',
                        fontFamily: 'inherit'
                      }}
                    >
                      {STAT_STEPS_OPTS.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </Card>
            ))}
        </div>
      )}
      {modal === 'add' && (
        <ProductModal
          t={t}
          product={null}
          onSave={(p) => {
            onAddProduct(p);
            setModal(null);
          }}
          onClose={() => setModal(null)}
        />
      )}
      {modal && modal !== 'add' && (
        <ProductModal
          t={t}
          product={modal}
          onSave={(p) => {
            onUpdateProduct(modal.id, p);
            setModal(null);
          }}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
}
