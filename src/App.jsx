import { useState, useEffect } from 'react';
import './index.css';
import { TX } from './i18n/translations';
import { C } from './constants/theme';
import { USERS, PRODUCTS0, ORDERS0 } from './constants/data';
import Header from './components/layout/Header';
import LoginPage from './pages/Login';
import MenuPage from './pages/Menu';
import CartPage from './pages/Cart';
import CheckoutPage from './pages/Checkout';
import OrdersPage from './pages/Orders';
import AdminPage from './pages/Admin';

export default function App() {
  const [lang, setLang] = useState(() => localStorage.getItem('fx_lang') || 'en');
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('fx_user')) || null);
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('fx_cart')) || []);
  const [orders, setOrders] = useState(
    () => JSON.parse(localStorage.getItem('fx_orders')) || ORDERS0
  );
  const [products, setProducts] = useState(
    () => JSON.parse(localStorage.getItem('fx_products')) || PRODUCTS0
  );

  const [page, setPage] = useState('menu');
  const [notif, setNotif] = useState(null);
  const [activeCat, setActiveCat] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => localStorage.setItem('fx_lang', lang), [lang]);
  useEffect(() => localStorage.setItem('fx_user', JSON.stringify(user)), [user]);
  useEffect(() => localStorage.setItem('fx_cart', JSON.stringify(cart)), [cart]);
  useEffect(() => localStorage.setItem('fx_orders', JSON.stringify(orders)), [orders]);
  useEffect(() => localStorage.setItem('fx_products', JSON.stringify(products)), [products]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  useEffect(() => {
    const el = document.createElement('link');
    el.rel = 'stylesheet';
    el.href =
      'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&display=swap';
    document.head.appendChild(el);
    return () => {
      try {
        document.head.removeChild(el);
      } catch {}
    };
  }, []);

  const t = TX[lang];
  const isRTL = lang === 'ar';

  const toast = (msg, type = 'success') => {
    setNotif({ msg, type });
    setTimeout(() => setNotif(null), 3000);
  };

  const addToCart = (p) => {
    setCart((prev) => {
      const ex = prev.find((i) => i.product.id === p.id);
      return ex
        ? prev.map((i) => (i.product.id === p.id ? { ...i, qty: i.qty + 1 } : i))
        : [...prev, { product: p, qty: 1 }];
    });
    toast(t.itemAdded);
  };
  const removeFromCart = (id) => setCart((prev) => prev.filter((i) => i.product.id !== id));
  const updateCartQty = (id, d) =>
    setCart((prev) =>
      prev
        .map((i) => (i.product.id !== id ? i : i.qty + d < 1 ? null : { ...i, qty: i.qty + d }))
        .filter(Boolean)
    );
  const cartTotal = cart.reduce((s, i) => s + i.product.price * i.qty, 0);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const placeOrder = (pm) => {
    if (!user) {
      setPage('login');
      return;
    }
    const o = {
      id: `ORD-${String(orders.length + 1).padStart(3, '0')}`,
      userId: user.id,
      items: [...cart],
      status: 'pending',
      payment: pm,
      total: cartTotal + 30,
      time: new Date().toISOString()
    };
    setOrders((prev) => [o, ...prev]);
    setCart([]);
    setPage('orders');
    toast(t.orderPlaced);
  };

  const handleLogin = (email, password) => {
    const u = USERS.find((u) => u.email === email && u.password === password);
    if (u) {
      setUser(u);
      setPage('menu');
      toast(`${t.hi}, ${u.name}! 👋`);
      return true;
    }
    return false;
  };
  const handleLogout = () => {
    setUser(null);
    setPage('menu');
    setCart([]);
  };

  const addProduct = (p) => setProducts((prev) => [...prev, { ...p, id: Date.now(), rating: 4.5 }]);
  const updateProduct = (id, u) =>
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...u } : p)));
  const deleteProduct = (id) => setProducts((prev) => prev.filter((p) => p.id !== id));
  const updateOrderStatus = (id, s) =>
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status: s } : o)));

  const commonProps = { t, lang, isRTL, user, products, orders, cart, cartTotal, cartCount };

  return (
    <div
      style={{
        fontFamily: "'DM Sans',sans-serif",
        background: C.bg,
        minHeight: '100vh',
        color: C.text,
        direction: isRTL ? 'rtl' : 'ltr'
      }}
    >
      {notif && (
        <div
          style={{
            position: 'fixed',
            top: 76,
            left: '50%',
            transform: 'translateX(-50%)',
            background: notif.type === 'error' ? C.red : C.green,
            color: '#fff',
            padding: '11px 22px',
            borderRadius: 12,
            fontWeight: 600,
            zIndex: 9999,
            animation: 'slideIn .3s ease',
            boxShadow: '0 4px 20px rgba(0,0,0,.25)',
            fontSize: 14,
            whiteSpace: 'nowrap'
          }}
        >
          {notif.msg}
        </div>
      )}
      <Header
        {...commonProps}
        page={page}
        setPage={setPage}
        setLang={setLang}
        onLogout={handleLogout}
      />
      <main
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '24px 16px',
          minHeight: 'calc(100vh - 65px)'
        }}
      >
        {page === 'login' && (
          <LoginPage t={t} isRTL={isRTL} onLogin={handleLogin} setPage={setPage} />
        )}
        {page === 'menu' && (
          <MenuPage
            {...commonProps}
            activeCat={activeCat}
            setActiveCat={setActiveCat}
            search={search}
            setSearch={setSearch}
            onAddToCart={addToCart}
            setPage={setPage}
          />
        )}
        {page === 'cart' && (
          <CartPage
            {...commonProps}
            onRemove={removeFromCart}
            onUpdateQty={updateCartQty}
            setPage={setPage}
          />
        )}
        {page === 'checkout' && (
          <CheckoutPage {...commonProps} onPlaceOrder={placeOrder} setPage={setPage} />
        )}
        {page === 'orders' && <OrdersPage {...commonProps} />}
        {page === 'admin' && user?.role === 'admin' && (
          <AdminPage
            {...commonProps}
            onAddProduct={addProduct}
            onUpdateProduct={updateProduct}
            onDeleteProduct={deleteProduct}
            onUpdateOrderStatus={updateOrderStatus}
          />
        )}
      </main>
    </div>
  );
}
