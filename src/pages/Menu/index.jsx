import { C } from '../../constants/theme';
import { CAT_KEYS } from '../../constants/data';
import ProductCard from '../../components/domain/ProductCard';

export default function MenuPage({
  t,
  lang,
  isRTL,
  products,
  cart,
  onAddToCart,
  activeCat,
  setActiveCat,
  search,
  setSearch
}) {
  const filtered = products.filter((p) => {
    const catOk = activeCat === 'All' || p.category === activeCat;
    const q = search.toLowerCase();
    const nameOk = !search || (p.name.en + p.name.ar).toLowerCase().includes(q);
    return catOk && nameOk;
  });

  return (
    <div className="animate-entrance" style={{ animationDelay: '0.1s' }}>
      <div
        style={{
          background: `linear-gradient(135deg, ${C.primaryDark} 0%, ${C.primary} 50%, ${C.accent} 100%)`,
          borderRadius: 24,
          padding: '48px 40px',
          marginBottom: 32,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 24,
          boxShadow: '0 15px 40px rgba(192,57,43,0.2)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.05,
            fontSize: 150,
            userSelect: 'none'
          }}
        >
          🍕🍔🥗🍜
        </div>

        <div style={{ position: 'relative', zIndex: 2 }}>
          <h1
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: 40,
              color: '#fff',
              marginBottom: 10,
              letterSpacing: -1
            }}
          >
            {t.appName} 🍽️
          </h1>
          <p
            style={{
              color: 'rgba(255,255,255,0.9)',
              fontSize: 18,
              maxWidth: 400,
              lineHeight: 1.5,
              fontWeight: 300
            }}
          >
            {t.slogan}
          </p>
        </div>

        <div
          style={{ display: 'flex', gap: 16, flexWrap: 'wrap', position: 'relative', zIndex: 2 }}
        >
          {[
            { ic: '🚀', lb: '30 min', desc: 'Fast Delivery' },
            { ic: '⭐', lb: '4.8 Rating', desc: 'Trusted Service' },
            { ic: '🛵', lb: t.free, desc: t.deliveryFee }
          ].map((item) => (
            <div
              key={item.lb}
              style={{
                background: 'rgba(255,255,255,0.12)',
                border: '1px solid rgba(255,255,255,0.2)',
                backdropFilter: 'blur(4px)',
                borderRadius: 16,
                padding: '16px 20px',
                textAlign: 'center',
                color: '#fff',
                minWidth: 110,
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}
            >
              <div style={{ fontSize: 28, marginBottom: 4 }}>{item.ic}</div>
              <div style={{ fontSize: 14, fontWeight: 700 }}>{item.lb}</div>
              <div
                style={{
                  fontSize: 10,
                  opacity: 0.8,
                  marginTop: 2,
                  textTransform: 'uppercase',
                  letterSpacing: 1
                }}
              >
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ position: 'relative', marginBottom: 24 }}>
        <span
          style={{
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            [isRTL ? 'right' : 'left']: 18,
            fontSize: 18,
            opacity: 0.5
          }}
        >
          🔍
        </span>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t.searchPlaceholder}
          style={{
            width: '100%',
            paddingTop: '16px',
            paddingBottom: '16px',
            paddingRight: isRTL ? '50px' : '20px',
            paddingLeft: isRTL ? '20px' : '50px',
            border: `1px solid ${C.border}`,
            borderRadius: 16,
            fontSize: 15,
            background: C.card,
            color: C.text,
            boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
            outline: 'none',
            boxSizing: 'border-box'
          }}
        />
      </div>

      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 32 }}>
        {CAT_KEYS.map((key, i) => (
          <button
            key={key}
            onClick={() => setActiveCat(key)}
            style={{
              padding: '10px 20px',
              borderRadius: 100,
              border: `1px solid ${activeCat === key ? C.primary : C.border}`,
              background: activeCat === key ? C.primary : C.card,
              color: activeCat === key ? '#fff' : C.text,
              fontWeight: 600,
              fontSize: 14,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow:
                activeCat === key ? '0 4px 12px rgba(192,57,43,0.2)' : '0 2px 6px rgba(0,0,0,0.02)'
            }}
          >
            {t.catLabels[i]}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '80px 0',
            color: C.muted,
            fontSize: 18,
            background: C.card,
            borderRadius: 24,
            border: `1px dashed ${C.borderDark}`
          }}
        >
          <div style={{ fontSize: 48, marginBottom: 12, opacity: 0.5 }}>😔</div>
          {t.noProducts}
        </div>
      ) : (
        <div
          className="stagger-children"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: 24
          }}
        >
          {filtered.map((p) => {
            const cartItem = cart.find((c) => c.product.id === p.id);
            return (
              <ProductCard
                key={p.id}
                product={p}
                t={t}
                lang={lang}
                onAdd={onAddToCart}
                cartQty={cartItem?.qty || 0}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
