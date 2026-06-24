// Global application settings adhering to the ULTIMATE SOVEREIGN SYSTEM CONTRACT
export const globalSettings = {
  theme: {
    primaryColor: '#025be9',
    secondaryColor: '#6f7c91',
    mode: 'light',
  },
  api: {
    baseUrl: process.env.APP_URL || 'http://localhost:3000',
    timeout: 10000,
  },
  features: {
    enableFeaturedAds: true,
    enableNotifications: true,
    enableWhatsAppLogin: true,
  },
};
