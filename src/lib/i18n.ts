import { useCallback } from 'react';
import { usePreferences, type Language } from './preferences';

/**
 * Lightweight UI dictionary.
 *
 * Scope is deliberate: navigation, section headings/subtitles, settings labels
 * and calls-to-action are fully bilingual. Long-form portfolio copy (project
 * descriptions, blog articles) stays English — it is authored content, and
 * machine-translating it would misrepresent the voice.
 */
export const STRINGS = {
  en: {
    'nav.dashboard': 'Dashboard',
    'nav.projects': 'Projects',
    'nav.hero': 'Intro',
    'nav.about': 'About',
    'nav.journey': 'Journey',
    'nav.capabilities': 'Capabilities',
    'nav.vision': 'Vision',
    'nav.blogs': 'Blogs',
    'nav.contact': 'Contact',
    'nav.settings': 'Settings',
    'nav.menu': 'Menu',
    'nav.talk': "Let's Talk",

    'dash.eyebrow': 'Dashboard',
    'dash.title': "Welcome to Sania's Portfolio",
    'dash.subtitle':
      'Digital marketing, content creation aur creative tech building — ek hi jagah. Overview, stats aur quick links se seedha kaam shuru karein.',
    'dash.statProjects': 'Projects Built',
    'dash.statSubs': 'YouTube Subscribers',
    'dash.statSkills': 'Core Skills',
    'dash.statTools': 'AI Tools',
    'dash.quickLinks': 'Quick Links',
    'dash.quickSub': 'Seedha apni favourite section par jaayein.',
    'dash.activity': 'Currently Active',
    'dash.placeholder': 'Placeholder — apni asli value yahan update karein',

    'projects.eyebrow': 'Real Work',
    'projects.title': 'Projects & Campaigns',
    'projects.subtitle':
      'Web games, responsive websites, digital marketing campaigns aur "Sania Machal" YouTube channel.',
    'projects.channel': 'YouTube Channel',
    'projects.campaigns': 'Marketing Campaigns',
    'projects.all': 'All',
    'projects.viewInfo': 'View Info',

    'image.eyebrow': 'Image Section',
    'hero.eyebrow': 'Introduction',
    'hero.name': "Hi, I'm Sania",
    'hero.role': 'Digital Marketer | Content Creator | Shayari Poet',
    'hero.bio':
      'College student from Pundri, Kaithal (Haryana). Running my YouTube channel "Sania Machal" with Hindi/Urdu shayari, and passionate about digital marketing and creative content.',
    'hero.viewProjects': 'View My Projects',
    'hero.contact': 'Contact Sania',
    'hero.scroll': 'Scroll',

    'about.eyebrow': 'About Sania',
    'about.title': 'About Me',
    'about.p1':
      'Main Sania Machal hoon — Pundri, Kaithal (Haryana) se ek digital marketer aur content creator. College ke saath-sath main performance marketing campaigns run karti hoon, web projects build karti hoon, aur apna YouTube channel grow karti hoon.',
    'about.p2':
      'Mera YouTube channel "Sania Machal" Hindi/Urdu shayari aur original creative content ke liye hai. Content planning, video editing, thumbnails aur SEO ke through main organic reach build karti hoon — ye sabhi meri daily routine ka hissa hain.',
    'about.p3':
      'Digital marketing mere liye sirf kaam nahi, storytelling ka medium hai. Data-driven ads, AI tools aur clean web engineering ko ek saath use karna mujhe pasand hai — aur yehi meri capabilities ka core hai.',

    'journey.eyebrow': 'My Journey',
    'journey.title': 'How I Started & Where I Grew',
    'journey.subtitle':
      'School se YouTube tak, aur wahan se clients aur code tak — journey ke kuch asli mod.',
    'journey.started': 'How I Started',
    'journey.growth': 'Growth Story',
    'journey.milestones': 'Key Milestones',
    'journey.taught': 'What This Journey Taught Me',

    'caps.eyebrow': 'My Capabilities',
    'caps.title': 'Skills & Expertise',
    'caps.subtitle':
      'Marketing se coding tak — yeh skills daily client work aur personal projects dono me use hoti hain.',
    'caps.proficiency': 'Proficiency',
    'caps.allSkills': 'All Skills',

    'vision.eyebrow': 'My Vision',
    'vision.title': 'Where I See Myself in Future',
    'vision.subtitle':
      'Abhi se tay karke rakha hai — kaun banna hai, kya banana hai, aur kisko inspire karna hai.',
    'vision.mission': 'My Mission',
    'vision.goals': 'Goals',
    'vision.dreams': 'Dreams',

    'blogs.eyebrow': 'Articles & Notes',
    'blogs.title': 'Blogs & Insights',
    'blogs.backToBlogs': 'Back to Blogs',

    'contact.eyebrow': 'Contact Sania',
    'contact.title': "Let's Connect & Work Together",
    'contact.send': 'Send Message',
    'contact.name': 'Your Name',
    'contact.email': 'Email Address',
    'contact.subject': 'Subject',
    'contact.message': 'Message',
    'contact.sending': 'Sending...',
    'contact.success': 'Message Sent!',
    'contact.successMessage': 'Shukriya {name}, Sania aapse jald hi {email} par sampark karengi.',
    'contact.error': 'Failed to submit. Please try again.',
    'contact.required': '*',
    'contact.selectSubject': 'Select a topic',
    'contact.privacyNote': 'By submitting, you agree to our privacy policy. No spam, ever.',

    'settings.eyebrow': 'Settings',
    'settings.title': 'Preferences',
    'settings.subtitle':
      'Yeh choices sirf aapke browser me save hoti hain — koi account nahi, koi tracking nahi.',
    'settings.appearance': 'Appearance',
    'settings.language': 'Language',
    'settings.languageHint': 'Navigation aur section headings ka language choose karein.',
    'settings.english': 'English',
    'settings.hindi': 'हिन्दी',
    'settings.notifications': 'Notification Preferences',
    'settings.notifyReplies': 'Email replies on my contact form',
    'settings.notifyProjects': 'Project status updates',
    'settings.notifyTips': 'Marketing tips & AI tool news',
    'settings.notifyHint':
      ' Yeh preferences sirf save hoti hain. Notifications bhejne ke liye backend setup ki jaayegi.',
    'settings.privacy': 'Privacy',
    'settings.analytics': 'Allow anonymous analytics',
    'settings.analyticsHint':
      'Koi personal data ya cookie nahi — sirf anonymous page views. Band karne se tracking ruk jaati hai.',
    'settings.motion': 'Reduce motion',
    'settings.motionHint': 'Animations aur smooth transitions kam kar deta hai.',
    'settings.about': 'About This App',
    'settings.reset': 'Reset all preferences',
    'settings.saved': 'Saved',

    'footer.rights': '© 2026 Sania Machal. All rights reserved.',
    'common.placeholder': 'Placeholder',
  },

  hi: {
    'nav.dashboard': 'डैशबोर्ड',
    'nav.projects': 'प्रोजेक्ट्स',
    'nav.hero': 'परिचय',
    'nav.about': 'मेरे बारे में',
    'nav.journey': 'सफ़र',
    'nav.capabilities': 'कौशल',
    'nav.vision': 'दृष्टिकोण',
    'nav.blogs': 'ब्लॉग',
    'nav.contact': 'संपर्क',
    'nav.settings': 'सेटिंग्स',
    'nav.menu': 'मेन्यू',
    'nav.talk': 'बात करें',

    'dash.eyebrow': 'डैशबोर्ड',
    'dash.title': "सानिया के पोर्टफोलियो में आपका स्वागत है",
    'dash.subtitle':
      'डिजिटल मार्केटिंग, कंटेंट क्रिएशन और क्रिएटिव टेक बिल्डिंग — सब एक जगह। ओवरव्यू, आँकड़े और क्विक लिंक्स से सीधे काम शुरू करें।',
    'dash.statProjects': 'बनाए गए प्रोजेक्ट्स',
    'dash.statSubs': 'यूट्यूब सब्सक्राइबर्स',
    'dash.statSkills': 'कोर स्किल्स',
    'dash.statTools': 'एआई टूल्स',
    'dash.quickLinks': 'क्विक लिंक्स',
    'dash.quickSub': 'सीधे अपने पसंदीदा सेक्शन पर जाएँ।',
    'dash.activity': 'फिलहाल सक्रिय',
    'dash.placeholder': 'प्लेसहोल्डर — अपनी असली वैल्यू यहाँ अपडेट करें',

    'projects.eyebrow': 'असली काम',
    'projects.title': 'प्रोजेक्ट्स और कैंपेन',
    'projects.subtitle':
      'वेब गेम्स, रिस्पॉन्सिव वेबसाइट्स, डिजिटल मार्केटिंग कैंपेन और "सानिया माचल" यूट्यूब चैनल।',
    'projects.channel': 'यूट्यूब चैनल',
    'projects.campaigns': 'मार्केटिंग कैंपेन',
    'projects.all': 'सभी',
    'projects.viewInfo': 'विवरण देखें',

    'image.eyebrow': 'इमेज सेक्शन',
    'hero.eyebrow': 'परिचय',
    'hero.name': 'नमस्ते, मैं सानिया हूँ',
    'hero.role': 'डिजिटल मार्केटर | कंटेंट क्रिएटर | शायरी कवि',
    'hero.bio':
      'पुंडरी, कैथल (हरियाणा) की कॉलेज छात्रा। अपना यूट्यूब चैनल "सानिया माचल" हिंदी/उर्दू शायरी के साथ चलाती हूँ, और डिजिटल मार्केटिंग तथा क्रिएटिव कंटेंट के बारे में बहुत उत्सुक हूँ।',
    'hero.viewProjects': 'मेरे प्रोजेक्ट्स देखें',
    'hero.contact': 'सानिया से संपर्क करें',
    'hero.scroll': 'स्क्रॉल करें',

    'about.eyebrow': 'सानिया के बारे में',
    'about.title': 'मेरे बारे में',
    'about.p1':
      'मैं सानिया माचल हूँ — पुंडरी, कैथल (हरियाणा) से एक डिजिटल मार्केटर और कंटेंट क्रिएटर। कॉलेज के साथ-साथ मैं परफ़ॉर्मेंस मार्केटिंग कैंपेन चलाती हूँ, वेब प्रोजेक्ट्स बनाती हूँ, और अपना यूट्यूब चैनल बढ़ाती हूँ।',
    'about.p2':
      'मेरा यूट्यूब चैनल "सानिया माचल" हिंदी/उर्दू शायरी और मौलिक क्रिएटिव कंटेंट के लिए है। कंटेंट प्लानिंग, वीडियो एडिटिंग, थंबनेल और SEO के ज़रिए मैं ऑर्गेनिक रीच बनाती हूँ — यह सब मेरी रोज़मर्रा का हिस्सा हैं।',
    'about.p3':
      'डिजिटल मार्केटिंग मेरे लिए सिर्फ़ काम नहीं, स्टोरीटेलिंग का माध्यम है। डेटा-आधारित एड्स, एआई टूल्स और क्लीन वेब इंजीनियरिंग को एक साथ इस्तेमाल करना मुझे पसंद है — और यही मेरी कौशल का केंद्र है।',

    'journey.eyebrow': 'मेरा सफ़र',
    'journey.title': 'मैंने कैसे शुरुआत की और कैसे बढ़ी',
    'journey.subtitle':
      'स्कूल से यूट्यूब तक, और वहाँ से क्लाइंट्स और कोड तक — सफ़र के कुछ असली पड़ाव।',
    'journey.started': 'कैसे शुरू हुआ',
    'journey.growth': 'ग्रोथ स्टोरी',
    'journey.milestones': 'मुख्य पड़ाव',
    'journey.taught': 'इस सफ़र ने मुझे क्या सिखाया',

    'caps.eyebrow': 'मेरी कौशलें',
    'caps.title': 'स्किल्स और एक्सपर्टीज़',
    'caps.subtitle':
      'मार्केटिंग से कोडिंग तक — ये स्किल्स रोज़ क्लाइंट काम और पर्सनल प्रोजेक्ट्स दोनों में इस्तेमाल होती हैं।',
    'caps.proficiency': 'दक्षता',
    'caps.allSkills': 'सभी स्किल्स',

    'vision.eyebrow': 'मेरा दृष्टिकोण',
    'vision.title': 'भविष्य में मैं खुद को कहाँ देखती हूँ',
    'vision.subtitle':
      'अभी से तय करके रखा है — कौन बनना है, क्या बनाना है, और किसे प्रेरित करना है।',
    'vision.mission': 'मेरा मिशन',
    'vision.goals': 'लक्ष्य',
    'vision.dreams': 'सपने',

    'blogs.eyebrow': 'लेख और नोट्स',
    'blogs.title': 'ब्लॉग और इनसाइट्स',
    'blogs.backToBlogs': 'ब्लॉग पर वापस जाएँ',

    'contact.eyebrow': 'सानिया से संपर्क',
    'contact.title': 'जुड़ें और साथ काम करें',
    'contact.send': 'संदेश भेजें',
    'contact.name': 'आपका नाम',
    'contact.email': 'ईमेल पता',
    'contact.subject': 'विषय',
    'contact.message': 'संदेश',
    'contact.sending': 'भेजा जा रहा...',
    'contact.success': 'संदेश भेजा गया!',
    'contact.successMessage': 'शुक्रिया {name}, सानिया आपसे जल्द ही {email} पर संपर्क करेंगी।',
    'contact.error': 'सबमिट करने में विफल। कृपया पुनः प्रयास करें।',
    'contact.required': '*',
    'contact.selectSubject': 'विषय चुनें',
    'contact.privacyNote': 'सबमिट करके, आप हमारी गोपनीयता नीति से सहमत हैं। कोई स्पैम नहीं, कभी भी।',

    'settings.eyebrow': 'सेटिंग्स',
    'settings.title': 'प्राथमिकताएँ',
    'settings.subtitle':
      'ये चुनाव सिर्फ़ आपके ब्राउज़र में सेव होते हैं — कोई अकाउंट नहीं, कोई ट्रैकिंग नहीं।',
    'settings.appearance': 'दिखावट',
    'settings.language': 'भाषा',
    'settings.languageHint': 'नेविगेशन और सेक्शन हेडिंग की भाषा चुनें।',
    'settings.english': 'English',
    'settings.hindi': 'हिन्दी',
    'settings.notifications': 'नोटिफ़िकेशन प्राथमिकताएँ',
    'settings.notifyReplies': 'कॉन्टैक्ट फ़ॉर्म के ईमेल जवाब',
    'settings.notifyProjects': 'प्रोजेक्ट स्थिति अपडेट',
    'settings.notifyTips': 'मार्केटिंग टिप्स और एआई टूल्स की ख़बरें',
    'settings.notifyHint':
      'ये प्राथमिकताएँ सिर्फ़ सेव होती हैं। नोटिफ़िकेशन भेजने के लिए बैकएंड सेटअप कीजिए।',
    'settings.privacy': 'प्राइवेसी',
    'settings.analytics': 'अनाम एनालिटिक्स की अनुमति दें',
    'settings.analyticsHint':
      'कोई व्यक्तिगत डेटा या कुकी नहीं — सिर्फ़ अनाम पेज़ व्यू। बंद करने पर ट्रैकिंग रुक जाती है।',
    'settings.motion': 'मोशन कम करें',
    'settings.motionHint': 'एनिमेशन और स्मूथ ट्रांज़िशन कम कर देता है।',
    'settings.about': 'इस ऐप के बारे में',
    'settings.reset': 'सभी प्राथमिकताएँ रीसेट करें',
    'settings.saved': 'सेव हो गया',

    'footer.rights': '© 2026 सानिया माचल। सर्वाधिकार सुरक्षित।',
    'common.placeholder': 'प्लेसहोल्डर',
  },
} as const;

export type StringKey = keyof typeof STRINGS.en;

export const useT = () => {
  const { language } = usePreferences();

  return useCallback(
    (key: StringKey) => STRINGS[language][key] ?? STRINGS.en[key],
    [language],
  ) as (key: StringKey) => string;
};

/** Non-hook accessor for the rare case where a key is needed outside render. */
export const translate = (language: Language, key: StringKey): string =>
  STRINGS[language][key] ?? STRINGS.en[key];