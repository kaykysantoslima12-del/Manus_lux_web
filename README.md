# Manus Desagni LUX - Web Platform

**Versão:** 2.0 - Neon Glow Edition  
**Framework:** Next.js 14 + React 18 + TypeScript  
**Styling:** Tailwind CSS + Framer Motion  
**Backend:** Firebase (Auth, Firestore, Storage)  
**Status:** Production Ready

---

## 🎨 Features

### Design System
- ✅ Neon Glow Colors (Cyan, Magenta, Orange, Green)
- ✅ Glassmorphism Components
- ✅ Smooth Animations (Framer Motion)
- ✅ Responsive Layout (Mobile-first)
- ✅ Dark Theme Optimized

### Functionality
- ✅ Firebase Authentication (Email/Password)
- ✅ Real-time Data Sync (Firestore)
- ✅ Offline Support (IndexedDB Persistence)
- ✅ Automatic Backup & Restore
- ✅ Web-App Synchronization

### Components
- ✅ NeonGlassCard
- ✅ NeonButton
- ✅ NeonText
- ✅ NeonBadge
- ✅ NeonInput
- ✅ NeonCard
- ✅ NeonProgressBar

### Pages
- ✅ Auth (Login/Sign Up)
- ✅ Home (Dashboard)
- ✅ Canvas (Editor) - Coming Soon
- ✅ Marketplace - Coming Soon
- ✅ Wallet - Coming Soon
- ✅ Profile - Coming Soon

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Firebase Project

### Installation

1. **Clone the repository**
```bash
git clone <repo-url>
cd manus_lux_web
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Configure Firebase**
```bash
cp .env.example .env.local
# Edit .env.local with your Firebase credentials
```

4. **Run development server**
```bash
npm run dev
# or
yarn dev
```

5. **Open browser**
Navigate to `http://localhost:3000`

---

## 📁 Project Structure

```
manus_lux_web/
├── src/
│   ├── components/
│   │   └── NeonComponents.tsx      # Reusable neon components
│   ├── lib/
│   │   ├── firebase.ts             # Firebase config
│   │   ├── store.ts                # Zustand state management
│   │   ├── sync.ts                 # Firestore sync logic
│   │   └── useAuth.ts              # Auth hook
│   ├── pages/
│   │   ├── _app.tsx                # App wrapper
│   │   ├── _document.tsx           # HTML document
│   │   ├── index.tsx               # Home page
│   │   └── auth.tsx                # Auth page
│   ├── styles/
│   │   └── globals.css             # Global styles
│   └── types/
│       └── index.ts                # TypeScript types
├── public/                         # Static assets
├── .env.example                    # Environment variables template
├── next.config.js                  # Next.js config
├── tailwind.config.js              # Tailwind config
├── tsconfig.json                   # TypeScript config
└── package.json                    # Dependencies

```

---

## 🔐 Firebase Setup

### 1. Create Firebase Project
- Go to [Firebase Console](https://console.firebase.google.com)
- Create a new project
- Enable Authentication (Email/Password)
- Create Firestore Database (Production mode)
- Enable Cloud Storage

### 2. Get Firebase Credentials
- Go to Project Settings
- Copy Web App credentials
- Add to `.env.local`

### 3. Firestore Structure
```
users/
├── {userId}
│   ├── id: string
│   ├── email: string
│   ├── name: string
│   ├── manusCoins: number
│   ├── createdAt: timestamp
│   └── updatedAt: timestamp

posts/
├── {postId}
│   ├── id: string
│   ├── userId: string
│   ├── title: string
│   ├── description: string
│   ├── imageUrl: string
│   ├── likes: number
│   ├── createdAt: timestamp
│   └── updatedAt: timestamp

transactions/
├── {transactionId}
│   ├── id: string
│   ├── userId: string
│   ├── amount: number
│   ├── type: string
│   ├── description: string
│   └── timestamp: timestamp

marketplace/
├── {assetId}
│   ├── id: string
│   ├── sellerId: string
│   ├── title: string
│   ├── price: number
│   ├── imageUrl: string
│   ├── category: string
│   ├── createdAt: timestamp
│   └── updatedAt: timestamp

backups/
├── {userId}
│   ├── user: object
│   ├── posts: array
│   ├── transactions: array
│   ├── marketplaceAssets: array
│   └── timestamp: timestamp
```

---

## 🔄 Data Synchronization

### Web-App Sync
- **Firebase Firestore** as central database
- **Real-time listeners** for instant updates
- **IndexedDB persistence** for offline support
- **Automatic backup** on every transaction

### Offline-First Architecture
1. Changes saved to local store (Zustand)
2. Synced to Firestore when online
3. Automatic restore from backup on login
4. Conflict resolution (last-write-wins)

### Backup & Restore
- **Automatic backup** after every significant change
- **Cloud backup** in Firestore
- **Local backup** in localStorage
- **One-click restore** on app load

---

## 🎨 Customization

### Colors
Edit `tailwind.config.js`:
```js
colors: {
  neon: {
    cyan: "#00E0FF",
    magenta: "#E91E63",
    orange: "#FF8C00",
    green: "#00D9A3",
  }
}
```

### Animations
Edit `src/styles/globals.css`:
```css
@keyframes custom-animation {
  /* Your animation */
}
```

### Components
Edit `src/components/NeonComponents.tsx` to add new components.

---

## 📦 Build & Deploy

### Build for Production
```bash
npm run build
npm run start
```

### Deploy to Vercel
```bash
vercel deploy
```

### Deploy to Netlify
```bash
npm run build
# Upload dist folder to Netlify
```

---

## 🧪 Testing

### Type Check
```bash
npm run type-check
```

### Lint
```bash
npm run lint
```

---

## 📱 Mobile Responsive

- ✅ Mobile-first design
- ✅ Tablet optimized
- ✅ Desktop enhanced
- ✅ Touch-friendly buttons
- ✅ Responsive navigation

---

## 🔒 Security

- ✅ Firebase Authentication
- ✅ Firestore Security Rules
- ✅ Environment variables for secrets
- ✅ HTTPS enforced
- ✅ XSS protection

---

## 🚨 Troubleshooting

### Firebase Connection Issues
- Check `.env.local` configuration
- Verify Firebase project is active
- Check Firestore rules allow read/write

### Offline Sync Issues
- Clear browser cache
- Check localStorage quota
- Verify IndexedDB is enabled

### Build Errors
- Delete `node_modules` and `.next`
- Run `npm install` again
- Check Node.js version (18+)

---

## 📚 Dependencies

### Core
- `next` - React framework
- `react` - UI library
- `typescript` - Type safety

### Firebase
- `firebase` - Firebase SDK

### UI/Animation
- `framer-motion` - Animations
- `tailwindcss` - Styling
- `react-icons` - Icons

### State Management
- `zustand` - State store

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing`)
5. Open Pull Request

---

## 📄 License

MIT License - See LICENSE file

---

## 📞 Support

- Email: carlossoareslima10@gmail.com
- Issues: GitHub Issues
- Docs: See documentation files

---

**Made with ❤️ by Manus AI**  
**Last Updated:** October 2025  
**Version:** 2.0 - Neon Glow Edition

