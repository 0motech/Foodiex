import { useState } from 'react';
import { Btn } from '../common';
import { C } from '../../constants/theme';

export default function Header({
  t,
  user,
  page,
  cartCount,
  setPage,
  lang,
  setLang,
  onLogout,
  isRTL
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navItems = [
    { key: 'menu', label: t.menu },
    { key: 'orders', label: t.myOrders, hide: !user },
    { key: 'admin', label: t.dashboard, hide: user?.role !== 'admin' }
  ].filter((i) => !i.hide);

  return (
    <header
      style={{
        background: 'rgba(150, 40, 27, 0.9)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        color: '#fff',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.07)',
        borderBottom: '1px solid rgba(255,255,255,0.1)'
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 24px',
          height: 72,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onClick={() => setPage('menu')}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = '')}
        >
          <span style={{ fontSize: 32, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}>🍽️</span>
          <div style={{ lineHeight: 1 }}>
            <div
              style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: 24,
                fontWeight: 700,
                letterSpacing: -0.5,
                color: '#fff'
              }}
            >
              {t.appName}
            </div>
            <div
              style={{
                fontSize: 10,
                opacity: 0.8,
                letterSpacing: 1.5,
                textTransform: 'uppercase',
                fontWeight: 600,
                color: C.accentLight
              }}
            >
              {t.slogan}
            </div>
          </div>
        </div>

        <nav style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {navItems.map((n) => (
            <button
              key={n.key}
              onClick={() => setPage(n.key)}
              style={{
                background: page === n.key ? 'rgba(255,255,255,0.15)' : 'transparent',
                color: '#fff',
                border: 'none',
                borderRadius: 10,
                padding: '10px 16px',
                fontWeight: page === n.key ? 700 : 500,
                fontSize: 14,
                cursor: 'pointer',
                fontFamily: 'inherit',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                if (page !== n.key) e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
              }}
              onMouseLeave={(e) => {
                if (page !== n.key) e.currentTarget.style.background = 'transparent';
              }}
            >
              {n.label}
            </button>
          ))}

          <button
            onClick={() => setPage('cart')}
            style={{
              position: 'relative',
              background: page === 'cart' ? C.accent : 'rgba(255,255,255,0.1)',
              color: '#fff',
              border: 'none',
              borderRadius: 10,
              padding: '10px 18px',
              fontWeight: 600,
              fontSize: 14,
              cursor: 'pointer',
              fontFamily: 'inherit',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              transition: 'all 0.2s'
            }}
          >
            🛒 {t.cart}
            {cartCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: -6,
                  right: -6,
                  background: '#fff',
                  color: C.primaryDark,
                  borderRadius: '50%',
                  width: 20,
                  height: 20,
                  fontSize: 11,
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                  animation: 'entranceFade 0.3s ease'
                }}
              >
                {cartCount}
              </span>
            )}
          </button>

          <div
            style={{ width: 1, height: 24, background: 'rgba(255,255,255,0.2)', margin: '0 8px' }}
          />

          <button
            onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
            style={{
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.3)',
              color: '#fff',
              borderRadius: 10,
              padding: '8px 14px',
              fontWeight: 700,
              fontSize: 13,
              cursor: 'pointer',
              fontFamily: 'inherit',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
          >
            {t.switchLang}
          </button>

          {user ? (
            <div style={{ position: 'relative', marginLeft: 8 }}>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                style={{
                  background: 'rgba(255,255,255,0.15)',
                  border: 'none',
                  borderRadius: 12,
                  color: '#fff',
                  padding: '8px 16px',
                  fontWeight: 600,
                  fontSize: 13,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8
                }}
              >
                <span style={{ fontSize: 16 }}>👤</span> {user.name.split(' ')[0]}{' '}
                <span style={{ opacity: 0.7, fontSize: 10 }}>{menuOpen ? '▲' : '▼'}</span>
              </button>
              {menuOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: '120%',
                    right: isRTL ? undefined : 0,
                    left: isRTL ? 0 : undefined,
                    background: C.card,
                    borderRadius: 16,
                    boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
                    minWidth: 180,
                    overflow: 'hidden',
                    zIndex: 200,
                    animation: 'entranceFade 0.2s ease',
                    border: `1px solid ${C.border}`
                  }}
                >
                  <div
                    style={{
                      padding: '16px 20px',
                      borderBottom: `1px solid ${C.border}`,
                      fontSize: 12,
                      color: C.muted
                    }}
                  >
                    {t.hi}, <strong>{user.name}</strong>
                  </div>
                  <button
                    onClick={() => {
                      onLogout();
                      setMenuOpen(false);
                    }}
                    style={{
                      width: '100%',
                      padding: '12px 20px',
                      background: 'none',
                      border: 'none',
                      textAlign: isRTL ? 'right' : 'left',
                      cursor: 'pointer',
                      fontSize: 14,
                      color: C.red,
                      fontWeight: 600,
                      fontFamily: 'inherit',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = C.bg)}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    🚪 {t.logout}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Btn
              onClick={() => setPage('login')}
              style={{
                marginLeft: 8,
                padding: '9px 20px',
                borderRadius: 12,
                background: '#fff',
                color: C.primaryDark,
                fontSize: 13
              }}
            >
              {t.login}
            </Btn>
          )}
        </nav>
      </div>
    </header>
  );
}
