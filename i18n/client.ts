import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import enCommon from '@/public/locales/en/common.json'
import viCommon from '@/public/locales/vi/common.json'

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources: {
      en: { common: enCommon },
      vi: { common: viCommon }
    },
    fallbackLng: 'en',
    lng: 'en',
    ns: ['common'],
    defaultNS: 'common',
    interpolation: { escapeValue: false }
  })
}

export default i18n
