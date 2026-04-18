import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Use standard string for language code flexibility
export type Language = string;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const enTranslations: Record<string, string> = {
  // Header
  'nav.home': 'Home',
  'nav.stories': 'Stories',
  'nav.marketplace': 'Marketplace',
  'nav.login': 'Login',
  'nav.getStarted': 'Get Started',
  'nav.dashboard': 'Dashboard',
  'nav.logout': 'Logout',
  
  // Hero Section
  'hero.title': 'Empowering Women to Build Sustainable Businesses',
  'hero.subtitle': 'Connect with funding partners, showcase your handmade products, and grow your entrepreneurial journey with EmpowerHer.',
  'hero.joinEntrepreneur': 'Join as Entrepreneur',
  'hero.partnerNGO': 'Partner as NGO',
  
  // How it Works
  'howItWorks.title': 'How It Works',
  'howItWorks.subtitle': 'Three simple steps to start your entrepreneurial journey',
  'howItWorks.step1.title': 'Register & List Products',
  'howItWorks.step1.desc': 'Create your profile and showcase your handmade products to a wider audience.',
  'howItWorks.step2.title': 'Get Support & Funding',
  'howItWorks.step2.desc': 'Connect with NGOs and funding partners who believe in your potential.',
  'howItWorks.step3.title': 'Grow Skills & Income',
  'howItWorks.step3.desc': 'Access AI-powered skill recommendations and watch your business flourish.',
  
  // Impact Section
  'impact.title': 'Our Impact',
  'impact.subtitle': 'Together, we are building a community of empowered women entrepreneurs',
  'impact.women': 'Women Onboarded',
  'impact.products': 'Products Listed',
  'impact.trade': 'Trade Enabled',
  'impact.ngos': 'NGO Partners',
  
  // Stories Section
  'stories.title': 'Community Stories',
  'stories.subtitle': 'Real stories of transformation and success',
  'stories.viewAll': 'View All Stories',
  'stories.readMore': 'Read Full Story',
  
  // CTA Section
  'cta.title': 'Ready to Start Your Journey?',
  'cta.subtitle': 'Join thousands of women entrepreneurs who are building sustainable businesses with EmpowerHer.',
  'cta.entrepreneur': 'Start as Entrepreneur',
  'cta.ngo': 'Join as NGO Partner',
  
  // Footer
  'footer.tagline': 'Empowering rural and semi-urban women entrepreneurs to build sustainable businesses.',
  'footer.quickLinks': 'Quick Links',
  'footer.about': 'About Us',
  'footer.contact': 'Contact',
  'footer.privacy': 'Privacy Policy',
  'footer.terms': 'Terms of Service',
  'footer.sdg': 'Supporting UN SDGs',
  'footer.rights': 'All rights reserved.',
  
  // Auth
  'auth.loginTitle': 'Welcome Back',
  'auth.loginSubtitle': 'Sign in to continue your journey',
  'auth.registerTitle': 'Join EmpowerHer',
  'auth.registerSubtitle': 'Start your entrepreneurial journey today',
  'auth.email': 'Email',
  'auth.password': 'Password',
  'auth.name': 'Full Name',
  'auth.role': 'I am a',
  'auth.entrepreneur': 'Woman Entrepreneur',
  'auth.ngo': 'NGO / Funding Partner',
  'auth.login': 'Sign In',
  'auth.register': 'Create Account',
  'auth.noAccount': "Don't have an account?",
  'auth.hasAccount': 'Already have an account?',
  
  // Dashboard
  'dashboard.profile': 'My Profile',
  'dashboard.products': 'My Products',
  'dashboard.addProduct': 'Add Product',
  'dashboard.growth': 'My Growth',
  'dashboard.entrepreneurs': 'Entrepreneurs',
  'dashboard.funding': 'Funding Overview',
  
  // Common
  'common.save': 'Save',
  'common.cancel': 'Cancel',
  'common.edit': 'Edit',
  'common.delete': 'Delete',
  'common.view': 'View',
  'common.search': 'Search',
  'common.filter': 'Filter',
  'common.loading': 'Loading...',
};

export const languageNames: Record<string, string> = {
  en: 'English',
  hi: 'हिंदी',
  bn: 'বাংলা',
  te: 'తెలుగు',
  mr: 'मराठी',
  ta: 'தமிழ்',
  ur: 'اردو',
  gu: 'ગુજરાતી',
  kn: 'ಕನ್ನಡ',
  or: 'ଓଡ଼ିଆ',
  ml: 'മലയാളം',
  pa: 'ਪੰਜਾਬੀ',
  as: 'অসমীয়া',
  mai: 'मैथिली',
  sat: 'ᱥᱟᱱᱛᱟᱲᱤ',
  ks: 'कॉशुर',
  ne: 'नेपाली',
  kok: 'कोंकणी',
  sd: 'سنڌي',
  doi: 'डोगरी',
  mni: 'ꯃꯤꯇꯩꯂꯣꯟ',
  brx: 'बड़ो',
  sa: 'संस्कृतम्',
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('empowerher-language');
    // Default to 'en'
    return saved || 'en';
  });

  useEffect(() => {
    // Attempt translation on mount and on language change if Google is loaded
    const timer = setTimeout(() => {
      triggerGoogleTranslate(language);
    }, 1000); // Give google a second to initialize upon first load
    
    return () => clearTimeout(timer);
  }, [language]);

  const triggerGoogleTranslate = (langCode: string) => {
    try {
      const selectEl = document.querySelector('.goog-te-combo') as HTMLSelectElement;
      if (selectEl) {
        selectEl.value = langCode;
        selectEl.dispatchEvent(new Event('change'));
      }
    } catch (e) {
      console.error('Google Translate dispatch failed', e);
    }
  };

  const handleSetLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('empowerher-language', lang);
    triggerGoogleTranslate(lang);
  };

  const t = (key: string): string => {
    return enTranslations[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
