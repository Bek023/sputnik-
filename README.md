# Sputnik — Landing Page & Admin Panel

Sputnik — elektr xizmatlari kompaniyasi uchun tayyorlangan zamonaviy landing page va boshqaruv paneli. React 19, Vite va Tailwind CSS 4 yordamida yaratilgan.

---

## Loyiha tuzilishi

```
sputnik/
├── index.html                 # HTML kirish nuqtasi
├── package.json               # Bog'liqliklar va skriptlar
├── vite.config.js             # Vite konfiguratsiyasi (React + Tailwind)
├── eslint.config.js           # ESLint qoidalari
├── .gitignore
│   
└── src/
    ├── main.jsx               # React kirish nuqtasi (StrictMode)
    ├── index.css              # Global stillar (Tailwind, smooth scroll)
    ├── App.jsx                # Routing: / va /admin
    │
    ├── admin/
    │   └── Admin.jsx          # Admin Dashboard — loyiha, fikr, taklif qo'shish
    │
    └── landing/
        ├── home.jsx           # Asosiy sahifa — barcha bo'limlarni birlashtiradi
        └── components/
            ├── header/        # Sarlavha, navigatsiya, mobil menyu
            ├── main/          # Hero bo'limi (gradient, badge'lar)
            ├── servise/       # Xizmatlar + "Why Choose Us"
            ├── project/       # Portfolio — loyihalar ro'yxati
            ├── rate/          # Mijoz fikrlari (testimonials)
            ├── offers/        # Maxsus takliflar (admin orqali)
            ├── contact/       # Xizmat hududi, xarita,     aloqa formasi
            └── footer/          # FAQ, Quick Links, ijtimoiy tarmoqlar
```

---

## Fayllar va ularning vazifasi

### Asosiy fayllar

| Fayl | Vazifa |
|------|--------|
| `main.jsx` | React DOM render, StrictMode, `index.css` import |
| `index.css` | `@import "tailwindcss"`, smooth scroll, scroll-margin-top |
| `App.jsx` | React Router: `/` → Home, `/admin` → Admin |
| `vite.config.js` | `@vitejs/plugin-react`, `@tailwindcss/vite` |

### Landing komponentlari

| Komponent | Fayl | Tavsif |
|-----------|------|--------|
| **Header** | `header/header.jsx` | Sticky header, nav (Home, Service, About, Project, Contact, Admin), "Get Quote", mobil hamburger menyu |
| **HeroSection** | `main/main.jsx` | Gradient banner, sarlavha, telefon raqam, badge'lar (24/7, Licensed, Satisfaction) |
| **ServiceAndChoice** | `servise/servise.jsx` | 4 ta xizmat kartasi (Residential, Commercial, Emergency, Smart Home), "Why Choose Us" 3 ta feature |
| **ProjectGrid** | `project/project.jsx` | 3 ta static loyiha + `admin_projects` dan qo'shimcha loyihalar |
| **Testimonials** | `rate/rate.jsx` | 2 ta static fikr + `admin_feedbacks` dan qo'shimcha fikrlar |
| **Offers** | `offers/offers.jsx` | Faqat `admin_offers` — bo'sh bo'lsa bo'lim ko'rinmaydi |
| **ContactServiceSection** | `contact/contact.jsx` | Xizmat hududlari, Google Maps, aloqa formasi (Name, Email, Phone, Service, Message) |
| **Footer** | `footer/footer.jsx` | FAQ accordion (6 ta savol), Quick Links, Services, ijtimoiy tarmoqlar, VoltPro branding |

### Admin panel

| Forma | Backend API | Maydonlar |
|-------|-------------|-----------|
| **Add New Project** | `POST /api/projects` | title, description, image (base64), link |
| **Add Client Feedback** | `POST /api/feedbacks` | name, role, content, image (base64), stars (1–5) |
| **Add Offer** | `POST /api/offers` | title, desc, icon (base64) |

Rasmlar base64 yuboriladi, backend faylga saqlaydi va URL qaytaradi.

---

## Ma'lumot oqimi (Backend bilan)

```
Admin Panel (formalar)  →  Backend API  →  Landing komponentlari
     │                         │                    │
     ├─ Save Project      →  POST /api/projects   →  project.jsx (GET)
     ├─ Save Feedback    →  POST /api/feedbacks  →  rate.jsx (GET)
     └─ Save Offer       →  POST /api/offers     →  offers.jsx (GET)
```

- **project.jsx** va **rate.jsx**: static ma'lumotlar + API dan qo'shimcha
- **offers.jsx**: faqat API; bo'sh bo'lsa bo'lim ko'rinmaydi
- API ishlamasa: localStorage fallback (eski ma'lumotlar)

---

## Texnologiyalar

| Texnologiya | Versiya | Vazifa |
|-------------|---------|--------|
| React | 19.2 | UI |
| React Router DOM | 7.13 | `/` va `/admin` |
| Vite | 7.3 | Build va dev server |
| Tailwind CSS | 4.2 | Styling |
| Lucide React | 0.577 | Ikonkalar (contact, footer, offers) |

---

## O'rnatish va ishga tushirish

### Frontend + Backend birga

```bash
# 1. Backend (birinchi terminal)
cd sputnik/backend
python -m venv venv
.\venv\Scripts\activate   # Windows
pip install -r requirements.txt
python run.py

# 2. Frontend (ikkinchi terminal)
cd sputnik
npm install
npm run dev
```

**URL'lar:**
- Landing: `http://localhost:5173/`
- Admin: `http://localhost:5173/admin`
- Backend API: `http://localhost:8000` | Docs: `http://localhost:8000/docs`

**Faqat frontend** (API ishlamasa localStorage fallback):
```bash
cd sputnik
npm install
npm run dev
```

**Boshqa skriptlar:**
- `npm run build` — production build
- `npm run preview` — build'ni preview
- `npm run lint` — ESLint tekshiruvi

---

## Admin paneldan foydalanish

1. `/admin` sahifasiga o'ting — avval **login** sahifasi ochiladi
2. **Login:** `admin` | **Parol:** `admin123` (backend `.env` da o'zgartirish mumkin)
3. Kirishdan keyin Admin Dashboard ochiladi
4. **Add New Project** — loyiha sarlavhasi, tavsifi, rasm, ixtiyoriy link
5. **Add Client Feedback** — mijoz ismi, lavozimi, fikr matni, avatar, yulduzlar (1–5)
6. **Add Offer** — taklif sarlavhasi, tavsifi, ikonka/rasm
7. Har bir formada **Save** tugmasini bosing — ma'lumotlar backend ga yoziladi
8. **Chiqish** tugmasi bilan tizimdan chiqing

> **Eslatma:** Ma'lumotlar brauzer `localStorage` da saqlanadi. Brauzer ma'lumotlarini tozalash yoki boshqa brauzer/qurilmada ma'lumotlar yo'qoladi.

---

## Landing bo'limlari (sections)

| ID | Bo'lim |
|----|--------|
| `#home` | Hero |
| `#service` | Xizmatlar |
| `#about` | Why Choose Us |
| `#project` | Loyihalar |
| `#contact` | Aloqa va xarita |

---

© 2024 Sputnik Project. Barcha huquqlar himoyalangan.
