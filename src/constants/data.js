export const CAT_KEYS = [
  'All',
  'Italian',
  'Burgers',
  'Middle Eastern',
  'Salads',
  'Snacks',
  'Desserts',
  'Drinks'
];
export const USERS = [
  { id: 1, name: 'Admin User', email: 'admin@foodiex.com', password: 'admin123', role: 'admin' },
  { id: 2, name: 'Mohamed Ibrahim', email: 'user@foodiex.com', password: 'user123', role: 'user' }
];
export const PRODUCTS0 = [
  {
    id: 1,
    name: { en: 'Margherita Pizza', ar: 'بيتزا مارغريتا' },
    price: 250,
    category: 'Italian',
    emoji: '🍕',
    desc: { en: 'Classic tomato & fresh mozzarella', ar: 'طماطم وموزاريلا طازجة' },
    rating: 4.8,
    bg: '#FF6B6B'
  },
  {
    id: 2,
    name: { en: 'Beef Burger', ar: 'برجر لحم بقري' },
    price: 200,
    category: 'Burgers',
    emoji: '🍔',
    desc: { en: 'Juicy beef patty with fresh veggies', ar: 'شريحة لحم طازجة مع خضروات' },
    rating: 4.7,
    bg: '#FF9F43'
  },
  {
    id: 3,
    name: { en: 'Caesar Salad', ar: 'سلطة قيصر' },
    price: 120,
    category: 'Salads',
    emoji: '🥗',
    desc: { en: 'Crispy romaine with Caesar dressing', ar: 'خس مقرمش مع صلصة قيصر' },
    rating: 4.5,
    bg: '#48C774'
  },
  {
    id: 4,
    name: { en: 'Pasta Bolognese', ar: 'باستا بولونيز' },
    price: 180,
    category: 'Italian',
    emoji: '🍝',
    desc: { en: 'Rich meat sauce over al dente pasta', ar: 'صلصة لحم غنية مع الباستا' },
    rating: 4.6,
    bg: '#FF6B6B'
  },
  {
    id: 5,
    name: { en: 'Chicken Wings', ar: 'أجنحة الدجاج' },
    price: 150,
    category: 'Snacks',
    emoji: '🍗',
    desc: { en: 'Crispy BBQ wings with dipping sauce', ar: 'أجنحة مقرمشة مع صلصة الشواء' },
    rating: 4.8,
    bg: '#FFA502'
  },
  {
    id: 6,
    name: { en: 'French Fries', ar: 'بطاطس مقلية' },
    price: 60,
    category: 'Snacks',
    emoji: '🍟',
    desc: { en: 'Golden crispy potato fries with ketchup', ar: 'بطاطس ذهبية مقرمشة' },
    rating: 4.4,
    bg: '#FFA502'
  },
  {
    id: 7,
    name: { en: 'Chocolate Cake', ar: 'كعكة الشوكولاتة' },
    price: 90,
    category: 'Desserts',
    emoji: '🎂',
    desc: { en: 'Rich dark chocolate layer cake', ar: 'كعكة شوكولاتة داكنة غنية' },
    rating: 4.9,
    bg: '#A29BFE'
  },
  {
    id: 8,
    name: { en: 'Fresh Mango Juice', ar: 'عصير مانجو طازج' },
    price: 50,
    category: 'Drinks',
    emoji: '🥭',
    desc: { en: '100% fresh squeezed mango', ar: 'مانجو طازج 100%' },
    rating: 4.7,
    bg: '#74B9FF'
  },
  {
    id: 9,
    name: { en: 'Chicken Shawarma', ar: 'شاورما دجاج' },
    price: 140,
    category: 'Middle Eastern',
    emoji: '🌯',
    desc: { en: 'Juicy chicken with garlic sauce & veggies', ar: 'دجاج طازج مع ثوم وخضروات' },
    rating: 4.9,
    bg: '#E17055'
  },
  {
    id: 10,
    name: { en: 'Falafel Plate', ar: 'طبق فلافل' },
    price: 70,
    category: 'Middle Eastern',
    emoji: '🧆',
    desc: { en: 'Crispy falafel balls with tahini', ar: 'فلافل مقرمشة مع طحينة' },
    rating: 4.6,
    bg: '#E17055'
  },
  {
    id: 11,
    name: { en: 'Tiramisu', ar: 'تيراميسو' },
    price: 110,
    category: 'Desserts',
    emoji: '☕',
    desc: { en: 'Classic Italian coffee dessert', ar: 'حلوى إيطالية كلاسيكية بالقهوة' },
    rating: 4.8,
    bg: '#A29BFE'
  },
  {
    id: 12,
    name: { en: 'Soft Drink', ar: 'مشروب غازي' },
    price: 30,
    category: 'Drinks',
    emoji: '🥤',
    desc: { en: 'Pepsi, 7-Up or Mirinda – your choice', ar: 'بيبسي أو سفن أب أو ميرندا' },
    rating: 4.2,
    bg: '#74B9FF'
  }
];
export const ORDERS0 = [
  {
    id: 'ORD-001',
    userId: 2,
    items: [
      { product: PRODUCTS0[0], qty: 1 },
      { product: PRODUCTS0[1], qty: 2 }
    ],
    status: 'delivered',
    payment: 'cod',
    total: 680,
    time: new Date(Date.now() - 7200000).toISOString()
  },
  {
    id: 'ORD-002',
    userId: 2,
    items: [
      { product: PRODUCTS0[8], qty: 1 },
      { product: PRODUCTS0[5], qty: 1 }
    ],
    status: 'preparing',
    payment: 'online',
    total: 230,
    time: new Date(Date.now() - 900000).toISOString()
  }
];
export const STATUS_STEPS = ['pending', 'preparing', 'onWay', 'delivered'];
export const STATUS_ICONS = ['🕐', '👨‍🍳', '🛵', '✅'];
