import { useState } from 'react';
import { Modal, Inp, Sel, Btn } from '../common';
import { CAT_KEYS } from '../../constants/data';

export default function ProductModal({ t, product, onSave, onClose }) {
  const isEdit = !!product;
  const [form, setForm] = useState(
    product || {
      name: { en: '', ar: '' },
      price: '',
      category: 'Italian',
      emoji: '🍕',
      desc: { en: '', ar: '' },
      bg: '#FF6B6B'
    }
  );
  const set = (field, val) => setForm((f) => ({ ...f, [field]: val }));
  const setName = (l, v) => setForm((f) => ({ ...f, name: { ...f.name, [l]: v } }));
  const setDesc = (l, v) => setForm((f) => ({ ...f, desc: { ...f.desc, [l]: v } }));

  return (
    <Modal title={isEdit ? t.editProductTitle : t.addProductTitle} onClose={onClose}>
      <Inp
        label={`${t.pName} (English)`}
        value={form.name.en}
        onChange={(e) => setName('en', e.target.value)}
      />
      <Inp
        label={`${t.pName} (عربي)`}
        value={form.name.ar}
        onChange={(e) => setName('ar', e.target.value)}
      />
      <Inp
        label={t.pPrice}
        type="number"
        step="0.01"
        value={form.price}
        onChange={(e) => set('price', e.target.value)}
      />
      <Sel
        label={t.pCategory}
        value={form.category}
        onChange={(e) => set('category', e.target.value)}
        options={CAT_KEYS.filter((k) => k !== 'All').map((k) => ({ value: k, label: k }))}
      />
      <Inp label={t.pEmoji} value={form.emoji} onChange={(e) => set('emoji', e.target.value)} />
      <Inp
        label={`${t.pDesc} (EN)`}
        value={form.desc.en}
        onChange={(e) => setDesc('en', e.target.value)}
      />
      <Inp
        label={`${t.pDesc} (AR)`}
        value={form.desc.ar}
        onChange={(e) => setDesc('ar', e.target.value)}
      />
      <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
        <Btn full onClick={() => onSave({ ...form, price: parseFloat(form.price) || 0 })}>
          {t.save}
        </Btn>
        <Btn full variant="outline" onClick={onClose}>
          {t.cancel}
        </Btn>
      </div>
    </Modal>
  );
}
