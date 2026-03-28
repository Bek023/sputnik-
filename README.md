# Sputnik — Profesionallar uchun Landing Page va Admin Panel

Sputnik — elektr xizmatlari kompaniyasi uchun mo'ljallangan, zamonaviy dizayn va to'liq boshqariladigan (CMS) landing page. Loyiha React 19, Vite va Tailwind CSS texnologiyalari yordamida yaratilgan bo'lib, barcha ma'lumotlar backend va brauzerning `localStorage` xotirasi orqali dinamik boshqariladi.

---

## 🌟 Loyihaning asosiy xususiyatlari

- **To'liq CMS (Content Management System):** Landing sahifasidagi barcha matnlarni, rasmlarni va hatto Google Maps xaritasini admin paneldan o'zgartirish mumkin.
- **Premium Dizayn:** Zamonaviy ranglar palitrasi, gradientlar va mikro-animatsiyalar.
- **Responsivlik:** Barcha qurilmalar (mobil, planshet, desktop) uchun moslashtirilgan.
- **Dinamik Portfolio va Fikrlar:** Admin panel orqali loyihalar va mijozlar fikrlarini real vaqtda qo'shish/o'chirish.
- **Maxsus Takliflar:** FAQ va offers bo'limlarini osongina boshqarish.

---

## 📁 Loyiha tuzilishi (Source Structure)

```
src/
├── main.jsx                 # React kirish nuqtasi
├── App.jsx                  # Routing va Context Provider
├── context/
│   └── SiteContentContext.jsx # Sayt matnlari va sozlamalari (LocalStorage CMS)
├── admin/
│   ├── Admin.jsx            # Asosiy Admin Dashboard (Styled UI)
│   ├── AdminGuard.jsx      # Himoyalangan routerlar
│   └── login/               # Admin kirish sahifasi
└── landing/
    ├── home.jsx             # Asosiy landing container
    └── components/          # Bo'limlar: Header, Hero, Service, Project, Contact, Footer
```

---

## 🌐 Admin Panel Imkoniyatlari

Admin paneli `/sputnik/admin` manzili orqali ochiladi. Unda quyidagi bo'limlar mavjud:

### ⚙️ Site Settings (Landing Page CMS)

Ushbu bo'lim orqali landing sahifasining har bir qismini tahrirlash mumkin:

- **Header:** Logotipni rasm sifatida yuklash va kompaniya nomini o'zgartirish.
- **Hero Section:** Asosiy sarlavha (Powering...), tavsiflar, telefon raqami va badge matnlari.
- **Services:** 4 ta asosiy xizmat turi, ularning nomi, tavsifi va **maxsus ikonkalari (rasm yuklash)**.
- **Why Choose Us:** Statistikalar va afzalliklar.
- **Contact:** Google Maps embed URL, manzillar va aloqa vositalari.
- **Footer:** FAQ savol-javoblari va copyright matni.

### 🖼️ Loyihalar (Projects)

Yangi loyihalar qo'shish: nomi, tavsifi va rasmi (Styled File Input orqali).

### 💬 Mijozlar Fikri (Testimonials)

Mijoz ismi, lavozimi, fikri, avatar (avatar yuklash) va yulduzli baho (1-5).

---

## 🎨 Dizayn Elementlari

- **Styled File Input:** Standart "Choose File" tugmalari o'rniga, upload ikonkasiga ega, dashed border'li va premium ko'rinishdagi custom komponent ishlatilgan.
- **Lucide Icons:** Barcha bo'limlarda `lucide-react` kutubxonasidan sifatli ikonkalari foydalanilgan.
- **Tailwind CSS:** Moslashuvchan va tezkor stilizatsiya.

---

## 🚀 O'rnatish va ishga tushirish

1. **Repozitoriyani klonlang:**

   ```bash
   git clone <repo-url>
   cd sputnik-
   ```

2. **Bog'liqliklarni o'rnating:**

   ```bash
   npm install
   ```

3. **Loyiha ishga tushiring:**
   ```bash
   npm run dev
   ```

Loyiha quyidagi manzillarda ochiladi:

- Landing Page: `http://localhost:5173/`
- Admin Panel: `http://localhost:5173/sputnik/admin`

---

## 🔑 Login ma'lumotlari

Standard admin login:

- **Login:** `admin`
- **Parol:** `admin123`

---

© 2024 Sputnik Project. Barcha huquqlar himoyalangan.

© 2024 Sputnik Project. Barcha huquqlar himoyalangan.
