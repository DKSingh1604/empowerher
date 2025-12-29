import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'hi' | 'ta' | 'te' | 'kn' | 'mr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
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
  },
  hi: {
    // Header
    'nav.home': 'होम',
    'nav.stories': 'कहानियाँ',
    'nav.marketplace': 'बाज़ार',
    'nav.login': 'लॉगिन',
    'nav.getStarted': 'शुरू करें',
    'nav.dashboard': 'डैशबोर्ड',
    'nav.logout': 'लॉग आउट',
    
    // Hero Section
    'hero.title': 'महिलाओं को टिकाऊ व्यवसाय बनाने के लिए सशक्त बनाना',
    'hero.subtitle': 'फंडिंग पार्टनर्स से जुड़ें, अपने हस्तनिर्मित उत्पादों को प्रदर्शित करें, और EmpowerHer के साथ अपनी उद्यमशीलता यात्रा को आगे बढ़ाएं।',
    'hero.joinEntrepreneur': 'उद्यमी के रूप में जुड़ें',
    'hero.partnerNGO': 'NGO के रूप में साझेदार बनें',
    
    // How it Works
    'howItWorks.title': 'यह कैसे काम करता है',
    'howItWorks.subtitle': 'अपनी उद्यमशीलता यात्रा शुरू करने के तीन आसान कदम',
    'howItWorks.step1.title': 'पंजीकरण करें और उत्पाद सूचीबद्ध करें',
    'howItWorks.step1.desc': 'अपनी प्रोफ़ाइल बनाएं और अपने हस्तनिर्मित उत्पादों को व्यापक दर्शकों को दिखाएं।',
    'howItWorks.step2.title': 'सहायता और फंडिंग प्राप्त करें',
    'howItWorks.step2.desc': 'उन NGO और फंडिंग पार्टनर्स से जुड़ें जो आपकी क्षमता में विश्वास करते हैं।',
    'howItWorks.step3.title': 'कौशल और आय बढ़ाएं',
    'howItWorks.step3.desc': 'AI-संचालित कौशल सिफारिशों तक पहुंचें और अपने व्यवसाय को फलते-फूलते देखें।',
    
    // Impact Section
    'impact.title': 'हमारा प्रभाव',
    'impact.subtitle': 'साथ मिलकर, हम सशक्त महिला उद्यमियों का एक समुदाय बना रहे हैं',
    'impact.women': 'महिलाएं जुड़ीं',
    'impact.products': 'उत्पाद सूचीबद्ध',
    'impact.trade': 'व्यापार सक्षम',
    'impact.ngos': 'NGO साझेदार',
    
    // Stories Section
    'stories.title': 'समुदाय की कहानियाँ',
    'stories.subtitle': 'परिवर्तन और सफलता की वास्तविक कहानियाँ',
    'stories.viewAll': 'सभी कहानियाँ देखें',
    'stories.readMore': 'पूरी कहानी पढ़ें',
    
    // CTA Section
    'cta.title': 'अपनी यात्रा शुरू करने के लिए तैयार हैं?',
    'cta.subtitle': 'हजारों महिला उद्यमियों से जुड़ें जो EmpowerHer के साथ टिकाऊ व्यवसाय बना रही हैं।',
    'cta.entrepreneur': 'उद्यमी के रूप में शुरू करें',
    'cta.ngo': 'NGO साझेदार के रूप में जुड़ें',
    
    // Footer
    'footer.tagline': 'ग्रामीण और अर्ध-शहरी महिला उद्यमियों को टिकाऊ व्यवसाय बनाने के लिए सशक्त बनाना।',
    'footer.quickLinks': 'त्वरित लिंक',
    'footer.about': 'हमारे बारे में',
    'footer.contact': 'संपर्क करें',
    'footer.privacy': 'गोपनीयता नीति',
    'footer.terms': 'सेवा की शर्तें',
    'footer.sdg': 'UN SDGs का समर्थन',
    'footer.rights': 'सर्वाधिकार सुरक्षित।',
    
    // Auth
    'auth.loginTitle': 'वापसी पर स्वागत है',
    'auth.loginSubtitle': 'अपनी यात्रा जारी रखने के लिए साइन इन करें',
    'auth.registerTitle': 'EmpowerHer से जुड़ें',
    'auth.registerSubtitle': 'आज ही अपनी उद्यमशीलता यात्रा शुरू करें',
    'auth.email': 'ईमेल',
    'auth.password': 'पासवर्ड',
    'auth.name': 'पूरा नाम',
    'auth.role': 'मैं हूं',
    'auth.entrepreneur': 'महिला उद्यमी',
    'auth.ngo': 'NGO / फंडिंग पार्टनर',
    'auth.login': 'साइन इन करें',
    'auth.register': 'खाता बनाएं',
    'auth.noAccount': 'खाता नहीं है?',
    'auth.hasAccount': 'पहले से खाता है?',
    
    // Dashboard
    'dashboard.profile': 'मेरी प्रोफ़ाइल',
    'dashboard.products': 'मेरे उत्पाद',
    'dashboard.addProduct': 'उत्पाद जोड़ें',
    'dashboard.growth': 'मेरी वृद्धि',
    'dashboard.entrepreneurs': 'उद्यमी',
    'dashboard.funding': 'फंडिंग अवलोकन',
    
    // Common
    'common.save': 'सहेजें',
    'common.cancel': 'रद्द करें',
    'common.edit': 'संपादित करें',
    'common.delete': 'हटाएं',
    'common.view': 'देखें',
    'common.search': 'खोजें',
    'common.filter': 'फ़िल्टर',
    'common.loading': 'लोड हो रहा है...',
  },
  ta: {
    // Header
    'nav.home': 'முகப்பு',
    'nav.stories': 'கதைகள்',
    'nav.marketplace': 'சந்தை',
    'nav.login': 'உள்நுழை',
    'nav.getStarted': 'தொடங்கு',
    'nav.dashboard': 'டாஷ்போர்டு',
    'nav.logout': 'வெளியேறு',
    
    // Hero Section
    'hero.title': 'நிலையான வணிகங்களை உருவாக்க பெண்களை மேம்படுத்துதல்',
    'hero.subtitle': 'நிதி கூட்டாளர்களுடன் இணைந்து, உங்கள் கைவினைப் பொருட்களை காட்சிப்படுத்தி, EmpowerHer உடன் உங்கள் தொழில்முனைவு பயணத்தை வளர்த்துக் கொள்ளுங்கள்.',
    'hero.joinEntrepreneur': 'தொழில்முனைவராக சேரவும்',
    'hero.partnerNGO': 'NGO கூட்டாளராக சேரவும்',
    
    // How it Works
    'howItWorks.title': 'இது எப்படி வேலை செய்கிறது',
    'howItWorks.subtitle': 'உங்கள் தொழில்முனைவு பயணத்தை தொடங்க மூன்று எளிய படிகள்',
    'howItWorks.step1.title': 'பதிவு செய்து பொருட்களை பட்டியலிடுங்கள்',
    'howItWorks.step1.desc': 'உங்கள் சுயவிவரத்தை உருவாக்கி, உங்கள் கைவினைப் பொருட்களை பரந்த பார்வையாளர்களுக்கு காட்சிப்படுத்துங்கள்.',
    'howItWorks.step2.title': 'ஆதரவு மற்றும் நிதி பெறுங்கள்',
    'howItWorks.step2.desc': 'உங்கள் திறனை நம்பும் NGO மற்றும் நிதி கூட்டாளர்களுடன் இணையுங்கள்.',
    'howItWorks.step3.title': 'திறன்களையும் வருமானத்தையும் வளர்த்துக் கொள்ளுங்கள்',
    'howItWorks.step3.desc': 'AI-இயக்கப்படும் திறன் பரிந்துரைகளை அணுகி, உங்கள் வணிகம் செழிப்பதைக் காணுங்கள்.',
    
    // Impact Section
    'impact.title': 'எங்கள் தாக்கம்',
    'impact.subtitle': 'ஒன்றாக, நாங்கள் மேம்படுத்தப்பட்ட பெண் தொழில்முனைவோரின் சமூகத்தை உருவாக்குகிறோம்',
    'impact.women': 'பெண்கள் இணைந்தனர்',
    'impact.products': 'பொருட்கள் பட்டியலிடப்பட்டன',
    'impact.trade': 'வர்த்தகம் செயல்படுத்தப்பட்டது',
    'impact.ngos': 'NGO கூட்டாளர்கள்',
    
    // Stories Section
    'stories.title': 'சமூக கதைகள்',
    'stories.subtitle': 'மாற்றம் மற்றும் வெற்றியின் உண்மையான கதைகள்',
    'stories.viewAll': 'அனைத்து கதைகளையும் காண்க',
    'stories.readMore': 'முழு கதையைப் படிக்கவும்',
    
    // CTA Section
    'cta.title': 'உங்கள் பயணத்தை தொடங்க தயாரா?',
    'cta.subtitle': 'EmpowerHer உடன் நிலையான வணிகங்களை உருவாக்கும் ஆயிரக்கணக்கான பெண் தொழில்முனைவோருடன் சேருங்கள்.',
    'cta.entrepreneur': 'தொழில்முனைவராக தொடங்கு',
    'cta.ngo': 'NGO கூட்டாளராக சேரவும்',
    
    // Footer
    'footer.tagline': 'கிராமப்புற மற்றும் அரை-நகர்ப்புற பெண் தொழில்முனைவோரை நிலையான வணிகங்களை உருவாக்க மேம்படுத்துதல்.',
    'footer.quickLinks': 'விரைவு இணைப்புகள்',
    'footer.about': 'எங்களை பற்றி',
    'footer.contact': 'தொடர்பு',
    'footer.privacy': 'தனியுரிமை கொள்கை',
    'footer.terms': 'சேவை விதிமுறைகள்',
    'footer.sdg': 'UN SDG களை ஆதரித்தல்',
    'footer.rights': 'அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.',
    
    // Auth
    'auth.loginTitle': 'மீண்டும் வருக',
    'auth.loginSubtitle': 'உங்கள் பயணத்தை தொடர உள்நுழையவும்',
    'auth.registerTitle': 'EmpowerHer உடன் சேரவும்',
    'auth.registerSubtitle': 'இன்றே உங்கள் தொழில்முனைவு பயணத்தை தொடங்குங்கள்',
    'auth.email': 'மின்னஞ்சல்',
    'auth.password': 'கடவுச்சொல்',
    'auth.name': 'முழு பெயர்',
    'auth.role': 'நான்',
    'auth.entrepreneur': 'பெண் தொழில்முனைவோர்',
    'auth.ngo': 'NGO / நிதி கூட்டாளர்',
    'auth.login': 'உள்நுழைக',
    'auth.register': 'கணக்கை உருவாக்கு',
    'auth.noAccount': 'கணக்கு இல்லையா?',
    'auth.hasAccount': 'ஏற்கனவே கணக்கு உள்ளதா?',
    
    // Dashboard
    'dashboard.profile': 'என் சுயவிவரம்',
    'dashboard.products': 'என் பொருட்கள்',
    'dashboard.addProduct': 'பொருள் சேர்',
    'dashboard.growth': 'என் வளர்ச்சி',
    'dashboard.entrepreneurs': 'தொழில்முனைவோர்',
    'dashboard.funding': 'நிதி கண்ணோட்டம்',
    
    // Common
    'common.save': 'சேமி',
    'common.cancel': 'ரத்து செய்',
    'common.edit': 'திருத்து',
    'common.delete': 'நீக்கு',
    'common.view': 'காண்க',
    'common.search': 'தேடு',
    'common.filter': 'வடிகட்டு',
    'common.loading': 'ஏற்றுகிறது...',
  },
  te: {
    // Header
    'nav.home': 'హోమ్',
    'nav.stories': 'కథలు',
    'nav.marketplace': 'మార్కెట్‌ప్లేస్',
    'nav.login': 'లాగిన్',
    'nav.getStarted': 'ప్రారంభించండి',
    'nav.dashboard': 'డాష్‌బోర్డ్',
    'nav.logout': 'లాగ్ అవుట్',
    
    // Hero Section
    'hero.title': 'స్థిరమైన వ్యాపారాలను నిర్మించడానికి మహిళలను సాధికారత చేయడం',
    'hero.subtitle': 'ఫండింగ్ భాగస్వాములతో కనెక్ట్ అవ్వండి, మీ హ్యాండ్‌మేడ్ ఉత్పత్తులను ప్రదర్శించండి మరియు EmpowerHer తో మీ వ్యవస్థాపక ప్రయాణాన్ని పెంచుకోండి.',
    'hero.joinEntrepreneur': 'వ్యవస్థాపకురాలిగా చేరండి',
    'hero.partnerNGO': 'NGO భాగస్వామిగా చేరండి',
    
    // How it Works
    'howItWorks.title': 'ఇది ఎలా పనిచేస్తుంది',
    'howItWorks.subtitle': 'మీ వ్యవస్థాపక ప్రయాణాన్ని ప్రారంభించడానికి మూడు సులభమైన దశలు',
    'howItWorks.step1.title': 'నమోదు చేయండి & ఉత్పత్తులను జాబితా చేయండి',
    'howItWorks.step1.desc': 'మీ ప్రొఫైల్‌ను సృష్టించండి మరియు మీ హ్యాండ్‌మేడ్ ఉత్పత్తులను విస్తృత ప్రేక్షకులకు ప్రదర్శించండి.',
    'howItWorks.step2.title': 'మద్దతు & ఫండింగ్ పొందండి',
    'howItWorks.step2.desc': 'మీ సామర్థ్యంలో నమ్మకం ఉన్న NGO లు మరియు ఫండింగ్ భాగస్వాములతో కనెక్ట్ అవ్వండి.',
    'howItWorks.step3.title': 'నైపుణ్యాలు & ఆదాయం పెంచుకోండి',
    'howItWorks.step3.desc': 'AI-ఆధారిత నైపుణ్య సిఫార్సులను యాక్సెస్ చేయండి మరియు మీ వ్యాపారం వృద్ధి చెందడం చూడండి.',
    
    // Impact Section
    'impact.title': 'మా ప్రభావం',
    'impact.subtitle': 'కలిసి, మేము సాధికారత పొందిన మహిళా వ్యవస్థాపకుల సమూహాన్ని నిర్మిస్తున్నాము',
    'impact.women': 'మహిళలు చేరారు',
    'impact.products': 'ఉత్పత్తులు జాబితా చేయబడ్డాయి',
    'impact.trade': 'వ్యాపారం ప్రారంభించబడింది',
    'impact.ngos': 'NGO భాగస్వాములు',
    
    // Stories Section
    'stories.title': 'కమ్యూనిటీ కథలు',
    'stories.subtitle': 'పరివర్తన మరియు విజయం యొక్క నిజమైన కథలు',
    'stories.viewAll': 'అన్ని కథలు చూడండి',
    'stories.readMore': 'పూర్తి కథ చదవండి',
    
    // CTA Section
    'cta.title': 'మీ ప్రయాణం ప్రారంభించడానికి సిద్ధంగా ఉన్నారా?',
    'cta.subtitle': 'EmpowerHer తో స్థిరమైన వ్యాపారాలను నిర్మిస్తున్న వేలాది మహిళా వ్యవస్థాపకులతో చేరండి.',
    'cta.entrepreneur': 'వ్యవస్థాపకురాలిగా ప్రారంభించండి',
    'cta.ngo': 'NGO భాగస్వామిగా చేరండి',
    
    // Footer
    'footer.tagline': 'గ్రామీణ మరియు సెమీ-అర్బన్ మహిళా వ్యవస్థాపకులను స్థిరమైన వ్యాపారాలను నిర్మించడానికి సాధికారత చేయడం.',
    'footer.quickLinks': 'త్వరిత లింకులు',
    'footer.about': 'మా గురించి',
    'footer.contact': 'సంప్రదించండి',
    'footer.privacy': 'గోప్యతా విధానం',
    'footer.terms': 'సేవా నిబంధనలు',
    'footer.sdg': 'UN SDG లకు మద్దతు',
    'footer.rights': 'అన్ని హక్కులు రిజర్వ్ చేయబడ్డాయి.',
    
    // Auth
    'auth.loginTitle': 'తిరిగి స్వాగతం',
    'auth.loginSubtitle': 'మీ ప్రయాణాన్ని కొనసాగించడానికి సైన్ ఇన్ చేయండి',
    'auth.registerTitle': 'EmpowerHer లో చేరండి',
    'auth.registerSubtitle': 'ఈరోజే మీ వ్యవస్థాపక ప్రయాణాన్ని ప్రారంభించండి',
    'auth.email': 'ఇమెయిల్',
    'auth.password': 'పాస్‌వర్డ్',
    'auth.name': 'పూర్తి పేరు',
    'auth.role': 'నేను',
    'auth.entrepreneur': 'మహిళా వ్యవస్థాపకురాలు',
    'auth.ngo': 'NGO / ఫండింగ్ భాగస్వామి',
    'auth.login': 'సైన్ ఇన్',
    'auth.register': 'ఖాతా సృష్టించండి',
    'auth.noAccount': 'ఖాతా లేదా?',
    'auth.hasAccount': 'ఇప్పటికే ఖాతా ఉందా?',
    
    // Dashboard
    'dashboard.profile': 'నా ప్రొఫైల్',
    'dashboard.products': 'నా ఉత్పత్తులు',
    'dashboard.addProduct': 'ఉత్పత్తి జోడించండి',
    'dashboard.growth': 'నా వృద్ధి',
    'dashboard.entrepreneurs': 'వ్యవస్థాపకులు',
    'dashboard.funding': 'ఫండింగ్ అవలోకనం',
    
    // Common
    'common.save': 'సేవ్ చేయండి',
    'common.cancel': 'రద్దు చేయండి',
    'common.edit': 'సవరించండి',
    'common.delete': 'తొలగించండి',
    'common.view': 'చూడండి',
    'common.search': 'శోధించండి',
    'common.filter': 'ఫిల్టర్',
    'common.loading': 'లోడ్ అవుతోంది...',
  },
  kn: {
    // Header
    'nav.home': 'ಮುಖಪುಟ',
    'nav.stories': 'ಕಥೆಗಳು',
    'nav.marketplace': 'ಮಾರುಕಟ್ಟೆ',
    'nav.login': 'ಲಾಗಿನ್',
    'nav.getStarted': 'ಪ್ರಾರಂಭಿಸಿ',
    'nav.dashboard': 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    'nav.logout': 'ಲಾಗ್ ಔಟ್',
    
    // Hero Section
    'hero.title': 'ಸುಸ್ಥಿರ ವ್ಯಾಪಾರಗಳನ್ನು ನಿರ್ಮಿಸಲು ಮಹಿಳೆಯರನ್ನು ಸಬಲೀಕರಿಸುವುದು',
    'hero.subtitle': 'ಫಂಡಿಂಗ್ ಪಾಲುದಾರರೊಂದಿಗೆ ಸಂಪರ್ಕ ಸಾಧಿಸಿ, ನಿಮ್ಮ ಕೈಯಿಂದ ಮಾಡಿದ ಉತ್ಪನ್ನಗಳನ್ನು ಪ್ರದರ್ಶಿಸಿ ಮತ್ತು EmpowerHer ಜೊತೆ ನಿಮ್ಮ ಉದ್ಯಮಶೀಲತೆಯ ಪ್ರಯಾಣವನ್ನು ಬೆಳೆಸಿ.',
    'hero.joinEntrepreneur': 'ಉದ್ಯಮಿಯಾಗಿ ಸೇರಿ',
    'hero.partnerNGO': 'NGO ಪಾಲುದಾರರಾಗಿ ಸೇರಿ',
    
    // How it Works
    'howItWorks.title': 'ಇದು ಹೇಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ',
    'howItWorks.subtitle': 'ನಿಮ್ಮ ಉದ್ಯಮಶೀಲತೆಯ ಪ್ರಯಾಣವನ್ನು ಪ್ರಾರಂಭಿಸಲು ಮೂರು ಸರಳ ಹಂತಗಳು',
    'howItWorks.step1.title': 'ನೋಂದಣಿ ಮಾಡಿ & ಉತ್ಪನ್ನಗಳನ್ನು ಪಟ್ಟಿ ಮಾಡಿ',
    'howItWorks.step1.desc': 'ನಿಮ್ಮ ಪ್ರೊಫೈಲ್ ರಚಿಸಿ ಮತ್ತು ನಿಮ್ಮ ಕೈಯಿಂದ ಮಾಡಿದ ಉತ್ಪನ್ನಗಳನ್ನು ವಿಶಾಲ ಪ್ರೇಕ್ಷಕರಿಗೆ ಪ್ರದರ್ಶಿಸಿ.',
    'howItWorks.step2.title': 'ಬೆಂಬಲ & ಫಂಡಿಂಗ್ ಪಡೆಯಿರಿ',
    'howItWorks.step2.desc': 'ನಿಮ್ಮ ಸಾಮರ್ಥ್ಯದಲ್ಲಿ ನಂಬಿಕೆ ಇರುವ NGO ಗಳು ಮತ್ತು ಫಂಡಿಂಗ್ ಪಾಲುದಾರರೊಂದಿಗೆ ಸಂಪರ್ಕ ಸಾಧಿಸಿ.',
    'howItWorks.step3.title': 'ಕೌಶಲ್ಯ ಮತ್ತು ಆದಾಯ ಬೆಳೆಸಿ',
    'howItWorks.step3.desc': 'AI-ಚಾಲಿತ ಕೌಶಲ್ಯ ಶಿಫಾರಸುಗಳನ್ನು ಪ್ರವೇಶಿಸಿ ಮತ್ತು ನಿಮ್ಮ ವ್ಯಾಪಾರ ಅಭಿವೃದ್ಧಿ ಹೊಂದುವುದನ್ನು ನೋಡಿ.',
    
    // Impact Section
    'impact.title': 'ನಮ್ಮ ಪ್ರಭಾವ',
    'impact.subtitle': 'ಒಟ್ಟಾಗಿ, ನಾವು ಸಬಲೀಕೃತ ಮಹಿಳಾ ಉದ್ಯಮಿಗಳ ಸಮುದಾಯವನ್ನು ನಿರ್ಮಿಸುತ್ತಿದ್ದೇವೆ',
    'impact.women': 'ಮಹಿಳೆಯರು ಸೇರಿದ್ದಾರೆ',
    'impact.products': 'ಉತ್ಪನ್ನಗಳು ಪಟ್ಟಿ ಮಾಡಲಾಗಿದೆ',
    'impact.trade': 'ವ್ಯಾಪಾರ ಸಕ್ರಿಯಗೊಳಿಸಲಾಗಿದೆ',
    'impact.ngos': 'NGO ಪಾಲುದಾರರು',
    
    // Stories Section
    'stories.title': 'ಸಮುದಾಯ ಕಥೆಗಳು',
    'stories.subtitle': 'ಪರಿವರ್ತನೆ ಮತ್ತು ಯಶಸ್ಸಿನ ನಿಜ ಕಥೆಗಳು',
    'stories.viewAll': 'ಎಲ್ಲಾ ಕಥೆಗಳನ್ನು ನೋಡಿ',
    'stories.readMore': 'ಪೂರ್ಣ ಕಥೆ ಓದಿ',
    
    // CTA Section
    'cta.title': 'ನಿಮ್ಮ ಪ್ರಯಾಣ ಪ್ರಾರಂಭಿಸಲು ಸಿದ್ಧರಾಗಿದ್ದೀರಾ?',
    'cta.subtitle': 'EmpowerHer ಜೊತೆ ಸುಸ್ಥಿರ ವ್ಯಾಪಾರಗಳನ್ನು ನಿರ್ಮಿಸುತ್ತಿರುವ ಸಾವಿರಾರು ಮಹಿಳಾ ಉದ್ಯಮಿಗಳೊಂದಿಗೆ ಸೇರಿ.',
    'cta.entrepreneur': 'ಉದ್ಯಮಿಯಾಗಿ ಪ್ರಾರಂಭಿಸಿ',
    'cta.ngo': 'NGO ಪಾಲುದಾರರಾಗಿ ಸೇರಿ',
    
    // Footer
    'footer.tagline': 'ಗ್ರಾಮೀಣ ಮತ್ತು ಅರೆ-ನಗರ ಮಹಿಳಾ ಉದ್ಯಮಿಗಳನ್ನು ಸುಸ್ಥಿರ ವ್ಯಾಪಾರಗಳನ್ನು ನಿರ್ಮಿಸಲು ಸಬಲೀಕರಿಸುವುದು.',
    'footer.quickLinks': 'ತ್ವರಿತ ಲಿಂಕ್‌ಗಳು',
    'footer.about': 'ನಮ್ಮ ಬಗ್ಗೆ',
    'footer.contact': 'ಸಂಪರ್ಕಿಸಿ',
    'footer.privacy': 'ಗೌಪ್ಯತೆ ನೀತಿ',
    'footer.terms': 'ಸೇವಾ ನಿಯಮಗಳು',
    'footer.sdg': 'UN SDG ಗಳನ್ನು ಬೆಂಬಲಿಸುವುದು',
    'footer.rights': 'ಎಲ್ಲಾ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.',
    
    // Auth
    'auth.loginTitle': 'ಮರಳಿ ಸ್ವಾಗತ',
    'auth.loginSubtitle': 'ನಿಮ್ಮ ಪ್ರಯಾಣವನ್ನು ಮುಂದುವರಿಸಲು ಸೈನ್ ಇನ್ ಮಾಡಿ',
    'auth.registerTitle': 'EmpowerHer ಸೇರಿ',
    'auth.registerSubtitle': 'ಇಂದೇ ನಿಮ್ಮ ಉದ್ಯಮಶೀಲತೆಯ ಪ್ರಯಾಣವನ್ನು ಪ್ರಾರಂಭಿಸಿ',
    'auth.email': 'ಇಮೇಲ್',
    'auth.password': 'ಪಾಸ್‌ವರ್ಡ್',
    'auth.name': 'ಪೂರ್ಣ ಹೆಸರು',
    'auth.role': 'ನಾನು',
    'auth.entrepreneur': 'ಮಹಿಳಾ ಉದ್ಯಮಿ',
    'auth.ngo': 'NGO / ಫಂಡಿಂಗ್ ಪಾಲುದಾರ',
    'auth.login': 'ಸೈನ್ ಇನ್',
    'auth.register': 'ಖಾತೆ ರಚಿಸಿ',
    'auth.noAccount': 'ಖಾತೆ ಇಲ್ಲವೇ?',
    'auth.hasAccount': 'ಈಗಾಗಲೇ ಖಾತೆ ಇದೆಯೇ?',
    
    // Dashboard
    'dashboard.profile': 'ನನ್ನ ಪ್ರೊಫೈಲ್',
    'dashboard.products': 'ನನ್ನ ಉತ್ಪನ್ನಗಳು',
    'dashboard.addProduct': 'ಉತ್ಪನ್ನ ಸೇರಿಸಿ',
    'dashboard.growth': 'ನನ್ನ ಬೆಳವಣಿಗೆ',
    'dashboard.entrepreneurs': 'ಉದ್ಯಮಿಗಳು',
    'dashboard.funding': 'ಫಂಡಿಂಗ್ ಅವಲೋಕನ',
    
    // Common
    'common.save': 'ಉಳಿಸಿ',
    'common.cancel': 'ರದ್ದುಮಾಡಿ',
    'common.edit': 'ಸಂಪಾದಿಸಿ',
    'common.delete': 'ಅಳಿಸಿ',
    'common.view': 'ನೋಡಿ',
    'common.search': 'ಹುಡುಕಿ',
    'common.filter': 'ಫಿಲ್ಟರ್',
    'common.loading': 'ಲೋಡ್ ಆಗುತ್ತಿದೆ...',
  },
  mr: {
    // Header
    'nav.home': 'मुख्यपृष्ठ',
    'nav.stories': 'कथा',
    'nav.marketplace': 'बाजार',
    'nav.login': 'लॉगिन',
    'nav.getStarted': 'सुरू करा',
    'nav.dashboard': 'डॅशबोर्ड',
    'nav.logout': 'लॉग आउट',
    
    // Hero Section
    'hero.title': 'शाश्वत व्यवसाय तयार करण्यासाठी महिलांना सक्षम बनवणे',
    'hero.subtitle': 'फंडिंग पार्टनर्सशी जोडले जा, तुमची हस्तनिर्मित उत्पादने प्रदर्शित करा आणि EmpowerHer सोबत तुमचा उद्योजकीय प्रवास वाढवा.',
    'hero.joinEntrepreneur': 'उद्योजक म्हणून सामील व्हा',
    'hero.partnerNGO': 'NGO भागीदार म्हणून सामील व्हा',
    
    // How it Works
    'howItWorks.title': 'हे कसे कार्य करते',
    'howItWorks.subtitle': 'तुमचा उद्योजकीय प्रवास सुरू करण्यासाठी तीन सोप्या पायऱ्या',
    'howItWorks.step1.title': 'नोंदणी करा आणि उत्पादने सूचीबद्ध करा',
    'howItWorks.step1.desc': 'तुमची प्रोफाइल तयार करा आणि तुमची हस्तनिर्मित उत्पादने व्यापक प्रेक्षकांना दाखवा.',
    'howItWorks.step2.title': 'समर्थन आणि फंडिंग मिळवा',
    'howItWorks.step2.desc': 'तुमच्या क्षमतेवर विश्वास ठेवणाऱ्या NGO आणि फंडिंग पार्टनर्सशी जोडले जा.',
    'howItWorks.step3.title': 'कौशल्ये आणि उत्पन्न वाढवा',
    'howItWorks.step3.desc': 'AI-संचालित कौशल्य शिफारशींमध्ये प्रवेश मिळवा आणि तुमचा व्यवसाय भरभराट होताना पहा.',
    
    // Impact Section
    'impact.title': 'आमचा प्रभाव',
    'impact.subtitle': 'एकत्र, आम्ही सक्षम महिला उद्योजकांचा समुदाय तयार करत आहोत',
    'impact.women': 'महिला सामील झाल्या',
    'impact.products': 'उत्पादने सूचीबद्ध',
    'impact.trade': 'व्यापार सक्षम',
    'impact.ngos': 'NGO भागीदार',
    
    // Stories Section
    'stories.title': 'समुदाय कथा',
    'stories.subtitle': 'परिवर्तन आणि यशाच्या खऱ्या कथा',
    'stories.viewAll': 'सर्व कथा पहा',
    'stories.readMore': 'संपूर्ण कथा वाचा',
    
    // CTA Section
    'cta.title': 'तुमचा प्रवास सुरू करण्यास तयार आहात?',
    'cta.subtitle': 'EmpowerHer सोबत शाश्वत व्यवसाय तयार करणाऱ्या हजारो महिला उद्योजकांमध्ये सामील व्हा.',
    'cta.entrepreneur': 'उद्योजक म्हणून सुरू करा',
    'cta.ngo': 'NGO भागीदार म्हणून सामील व्हा',
    
    // Footer
    'footer.tagline': 'ग्रामीण आणि निम-शहरी महिला उद्योजकांना शाश्वत व्यवसाय तयार करण्यासाठी सक्षम बनवणे.',
    'footer.quickLinks': 'द्रुत दुवे',
    'footer.about': 'आमच्याबद्दल',
    'footer.contact': 'संपर्क',
    'footer.privacy': 'गोपनीयता धोरण',
    'footer.terms': 'सेवा अटी',
    'footer.sdg': 'UN SDG ला समर्थन',
    'footer.rights': 'सर्व हक्क राखीव.',
    
    // Auth
    'auth.loginTitle': 'पुन्हा स्वागत आहे',
    'auth.loginSubtitle': 'तुमचा प्रवास सुरू ठेवण्यासाठी साइन इन करा',
    'auth.registerTitle': 'EmpowerHer मध्ये सामील व्हा',
    'auth.registerSubtitle': 'आजच तुमचा उद्योजकीय प्रवास सुरू करा',
    'auth.email': 'ईमेल',
    'auth.password': 'पासवर्ड',
    'auth.name': 'पूर्ण नाव',
    'auth.role': 'मी आहे',
    'auth.entrepreneur': 'महिला उद्योजक',
    'auth.ngo': 'NGO / फंडिंग भागीदार',
    'auth.login': 'साइन इन करा',
    'auth.register': 'खाते तयार करा',
    'auth.noAccount': 'खाते नाही?',
    'auth.hasAccount': 'आधीच खाते आहे?',
    
    // Dashboard
    'dashboard.profile': 'माझी प्रोफाइल',
    'dashboard.products': 'माझी उत्पादने',
    'dashboard.addProduct': 'उत्पादन जोडा',
    'dashboard.growth': 'माझी वाढ',
    'dashboard.entrepreneurs': 'उद्योजक',
    'dashboard.funding': 'फंडिंग विहंगावलोकन',
    
    // Common
    'common.save': 'जतन करा',
    'common.cancel': 'रद्द करा',
    'common.edit': 'संपादित करा',
    'common.delete': 'हटवा',
    'common.view': 'पहा',
    'common.search': 'शोधा',
    'common.filter': 'फिल्टर',
    'common.loading': 'लोड होत आहे...',
  },
};

export const languageNames: Record<Language, string> = {
  en: 'English',
  hi: 'हिंदी',
  ta: 'தமிழ்',
  te: 'తెలుగు',
  kn: 'ಕನ್ನಡ',
  mr: 'मराठी',
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('empowerher-language');
    return (saved as Language) || 'en';
  });

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('empowerher-language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || translations['en'][key] || key;
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
