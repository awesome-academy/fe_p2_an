import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import enCommon from '@/public/locales/en/common.json'
import viCommon from '@/public/locales/vi/common.json'
import enAbout from '@/public/locales/en/about.json'
import viAbout from '@/public/locales/vi/about.json'
import enAuth from '@/public/locales/en/auth.json'
import viAuth from '@/public/locales/vi/auth.json'

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources: {
      en: { common: enCommon, about: enAbout, auth: enAuth },
      vi: { common: viCommon, about: viAbout, auth: viAuth }
    },
    fallbackLng: 'en',
    lng: 'en',
    ns: ['common', 'about', 'auth'],
    defaultNS: 'common',
    interpolation: { escapeValue: false }
  })
}

export default i18n
