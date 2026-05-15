import { useState } from 'react';
import { Card, Inp, Btn } from '../../components/common';
import { C } from '../../constants/theme';

export default function LoginPage({ t, isRTL, onLogin, setPage }) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setError('');
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    const ok = onLogin(email, pass);
    if (!ok) setError(t.loginError);
    setLoading(false);
  };

  return (
    <div
      style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Card style={{ width: '100%', maxWidth: 420, padding: 36, animation: 'slideIn .3s ease' }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ fontSize: 52, marginBottom: 8 }}>🍽️</div>
          <h1
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: 28,
              color: C.text,
              marginBottom: 4
            }}
          >
            {t.appName}
          </h1>
          <p style={{ color: C.muted, fontSize: 14 }}>{t.welcomeBack}</p>
        </div>
        {error && (
          <div
            style={{
              background: C.red + '15',
              border: `1px solid ${C.red}33`,
              borderRadius: 10,
              padding: '10px 14px',
              fontSize: 13,
              color: C.red,
              marginBottom: 16
            }}
          >
            {error}
          </div>
        )}
        <Inp
          label={t.email}
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Inp
          label={t.password}
          type="password"
          placeholder="••••••••"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && submit()}
        />
        <Btn
          onClick={submit}
          full
          disabled={loading}
          style={{ marginTop: 4, borderRadius: 12, padding: '13px' }}
        >
          {loading ? '⏳ …' : t.login}
        </Btn>
      </Card>
    </div>
  );
}
