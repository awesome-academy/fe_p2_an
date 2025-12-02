import '@testing-library/jest-dom'
import { TextEncoder, TextDecoder } from 'util' // Import từ module util của Node.js

// --- POLYFILL CHO NEXT.JS 13+ / 15 ---
Object.assign(global, { TextEncoder, TextDecoder })

// 1. Mock Next.js Navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn()
  }),
  usePathname: () => '/en',
  useParams: () => ({ lng: 'en' })
}))

// 2. Mock React-i18next
jest.mock('react-i18next', () => ({
  initReactI18next: { type: '3rdParty', init: () => {} },

  // QUAN TRỌNG: Phải dùng jest.fn() để bọc implementation mặc định
  // thì bên file test mới gọi được .mockReturnValue()
  useTranslation: jest.fn().mockImplementation(() => ({
    t: (key: string) => key,
    i18n: {
      changeLanguage: jest.fn(),
      language: 'en'
    }
  }))
}))
