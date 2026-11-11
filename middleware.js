// ============================================================================
// PANDIT JI ONLINE — VERCEL EDGE ROUTING MIDDLEWARE (middleware.js — v40)
// Zero-dependency Edge/Routing Middleware for www.panditjionline.online
// Handles:
// 1. Per-page WhatsApp / Facebook / Social Crawler OpenGraph HTML (200 OK)
// 2. High-Resolution Dedicated Vedic OG Card Images (/og-card/:slug.jpg)
// 3. Google Search Console (googlea0e64484b80e13d1.html) & AdSense (ads.txt)
// 4. Zero-latency pass-through for Googlebot, PageSpeed Insights & AdSense bots
// ============================================================================

const SITE_ORIGIN = 'https://www.panditjionline.online';
const HOMEPAGE_IMAGE = 'https://iili.io/neb1ghg.jpg';
const PANDIT_PORTRAIT_DATA_URI = 'data:image/jpeg;base64,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';
const VERSION_TAG = 'v42';

const ROUTE_ALIASES = {
  '/home': '/',
  '/index.html': '/',
  '/index': '/',
  '/kundli': '/janam-kundali',
  '/kundali': '/janam-kundali',
  '/milan': '/kundali-milan',
  '/gun-milan': '/kundali-milan',
  '/puja/kundali-milan': '/kundali-milan',
  '/puja-kundali-milan': '/kundali-milan',
  '/mandir': '/digital-mandir',
  '/muhurat': '/shubh-muhurat',
  '/singh-rashifal': '/simha-rashifal',
  '/dainik-rashifal': '/rashifal',
  '/ram-shalaka': '/ram-shalaka-prashnavali',
  '/shani-sadesati': '/shani-sadesati-calculator',
  '/puja-samagri': '/puja-samagri-list',
  '/aarti-chalisa': '/aarti-chalisa-sangrah',
  '/vrat-katha': '/vrat-katha-paran-vidhi',
  '/vastu-shastra': '/vastu-shastra-tips',
  '/vastu': '/vastu-shastra-tips',
  '/ratna-rudraksha': '/ratna-rudraksha-guide',
  '/swapna-phal': '/swapna-phal-shakun-shastra',
  '/swapna-shakun': '/swapna-phal-shakun-shastra',
  '/swarodaya': '/swarodaya-vigyan',
  '/gita-niti': '/geeta-chanakya-niti',
  '/baby-names': '/vedic-baby-names',
  '/tirth-darshan': '/char-dham-tirth-darshan',
  '/teerth': '/char-dham-tirth-darshan',
  '/jyotish-ai': '/jyotish-chat',
  '/chat': '/jyotish-chat',
  '/puja-booking': '/puja-services',
  '/services': '/puja-services',
  '/dharma-gyan': '/dharm-gyan-kosh',
  '/gyan-kosh': '/dharm-gyan-kosh',
  '/jap-mala': '/mantra-jaap',
  '/jaap': '/mantra-jaap',
  '/videos': '/vedic-videos',
  '/youtube': '/vedic-videos',
  '/history': '/',
  '/mera-khata': '/',
  '/puja-griha-pravesh': '/puja/griha-pravesh',
  '/puja-satyanarayan-katha': '/puja/satyanarayan-katha',
  '/puja-rudrabhishek': '/puja/rudrabhishek',
  '/puja-mahamrityunjaya-jap': '/puja/mahamrityunjaya-jap',
  '/puja-navgrah-shanti': '/puja/navgrah-shanti',
  '/puja-kundali-paramarsh': '/puja/kundali-paramarsh',
  '/about': '/about-us',
  '/contact': '/contact-us',
  '/terms': '/terms-and-conditions',
  '/privacy': '/privacy-policy',
  '/8': '/',
  '/media': '/vedic-videos',
  '/media/': '/vedic-videos',
  '/fit]': '/',
  '/&': '/',
  '/404.html': '/',
  '/404': '/'
};

let _SEO_DATA_CACHE = null;

function getBuiltInFallbackSeoEntry(canonicalPath, info) {
  const rawTitle = (info && info.title) || 'पण्डित जी ऑनलाइन — वैदिक ज्योतिष एवं पंचांग';
  const rawDesc = (info && info.desc) || 'निःशुल्क वैदिक जन्म कुंडली, 36 गुण विवाह मिलान, आज का शुद्ध दृक पंचांग व शुभ मुहूर्त 2026-27 — अभी देखें ➔';
  const shortTopic = String(rawTitle).split('—')[0].split('|')[0].trim() || rawTitle;
  return {
    title: rawTitle,
    description: rawDesc,
    keywords: `${shortTopic}, ${rawTitle}, Pandit Ji Online, Acharya Pandit Shashank Sharma, Rudrapur Jyotish`,
    h1: rawTitle,
    faq: [
      {
        q: `${shortTopic} की सटीक वैदिक गणना और शास्त्रीय नियम क्या हैं?`,
        a: `${rawDesc.replace(/\s*➔\s*$/, '')} यह गणना बृहत् पाराशर होरा शास्त्र और लाहिड़ी चित्रापक्ष अयनांश पर आधारित है।`
      },
      {
        q: `पण्डित जी ऑनलाइन पर ${shortTopic} निःशुल्क कैसे देखें?`,
        a: `आप www.panditjionline.online के इस पृष्ठ पर अपना नाम या जन्म विवरण दर्ज करके 100% निःशुल्क और शुद्ध वैदिक गणना व सात्विक उपाय तुरंत देख सकते हैं।`
      }
    ]
  };
}

async function loadSeoDataForRoute(origin, canonicalPath, info) {
  if (!_SEO_DATA_CACHE) {
    try {
      const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
      const timer = controller ? setTimeout(() => controller.abort(), 2500) : null;
      const res = await fetch(`${origin}/seo-data.json`, {
        headers: { 'x-pj-internal-shell': '1', 'accept': 'application/json' },
        signal: controller ? controller.signal : undefined
      });
      if (timer) clearTimeout(timer);
      if (res && res.ok) {
        _SEO_DATA_CACHE = await res.json();
      }
    } catch {}
  }
  if (_SEO_DATA_CACHE && _SEO_DATA_CACHE[canonicalPath]) {
    return _SEO_DATA_CACHE[canonicalPath];
  }
  return getBuiltInFallbackSeoEntry(canonicalPath, info);
}

const ROUTE_DATA = {
  '/': {
    title: 'पण्डित जी ऑनलाइन — निःशुल्क जन्म कुंडली, पंचांग व राशिफल',
    desc: 'निःशुल्क वैदिक जन्म कुंडली, 36 गुण विवाह मिलान, आज का शुद्ध दृक पंचांग, शुभ मुहूर्त 2026-27 व नाम राशिफल — अभी निःशुल्क देखें ➔',
    cardTitle: 'PANDIT JI ONLINE',
    cardSub: 'Free Janam Kundali • 36 Gun Milan • Drik Panchang • Digital Mandir',
    shortCard: 'PANDIT JI ONLINE\nVedic Jyotish Rudrapur',
    badge: 'VEDIC JYOTISH SANSTHAN • RUDRAPUR',
    art: 'gyan',
    accent: '#f59e0b'
  },
  '/digital-mandir': {
    title: '3D डिजिटल सनातन मंदिर — लाइव आरती, शंखनाद, घंटी व 108 जप',
    desc: 'घर बैठे करें श्री राम, महादेव, हनुमान जी, श्री गणेश व माँ लक्ष्मी के 3D लाइव दर्शन, अखण्ड ज्योति प्रज्वलन, शंखनाद, पुष्प वर्षा व आरती — अभी दर्शन करें ➔',
    cardTitle: 'SHRI DIGITAL SANATAN MANDIR',
    cardSub: 'Live 3D Darshan • Akhand Jyoti • Bell & Shankhnaad • Live Aarti',
    shortCard: 'DIGITAL SANATAN MANDIR\nLive 3D Darshan & Aarti',
    badge: '3D VIRTUAL HINDU TEMPLE • LIVE DARSHAN',
    art: 'mandir',
    accent: '#fbbf24'
  },
  '/janam-kundali': {
    title: 'निःशुल्क जन्म कुंडली बनाएं — लग्न चार्ट, महादशा व भविष्यफल',
    desc: 'अपनी जन्म तिथि, समय व स्थान से मात्र 2 सेकंड में बनाएं 100% सटीक वैदिक जन्म कुंडली (Lagna & Navamsha D-9), महादशा, राजयोग व शुभ रत्न — अभी बनाएं ➔',
    cardTitle: 'FREE VEDIC JANAM KUNDALI',
    cardSub: 'Lagna & Navamsha (D-9) • Vimshottari Dasha • Rajyoga & Remedies',
    shortCard: 'FREE JANAM KUNDALI\nLagna, D-9 & Mahadasha',
    badge: '100% ACCURATE LAHIRI CHITRAPAKSHA AYANAMSHA',
    art: 'kundli',
    accent: '#f97316'
  },
  '/kundali-milan': {
    title: '36 गुण कुंडली मिलान (निःशुल्क) — वर-कन्या नाम व जन्म से मिलान',
    desc: 'वर और कन्या के नाम या जन्म विवरण से तुरंत करें अष्टकूट 36 गुण कुंडली मिलान, मांगलिक दोष जाँच व नाड़ी/भकूट दोष का शास्त्रीय परिहार — अभी मिलाएं ➔',
    cardTitle: '36 GUN ASHTAKOOT KUNDALI MILAN',
    cardSub: 'Var-Kanya Marriage Compatibility • Manglik Check • Nadi Parihar',
    shortCard: '36 GUN KUNDALI MILAN\nAshtakoot Vivah Matching',
    badge: 'SHASTROKTA VIVAH MATCHING • 36 GUN REPORT',
    art: 'milan',
    accent: '#ec4899'
  },
  '/panchang': {
    title: 'आज का पंचांग — तिथि, नक्षत्र, शुभ मुहूर्त, राहुकाल व चौघड़िया',
    desc: 'आज का शुद्ध दृक गणित हिन्दू पंचांग (लाइव अपडेटेड) — जानें आज की तिथि, नक्षत्र, योग, करण, सूर्योदय, अभिजित मुहूर्त व दिन-रात का चौघड़िया ➔',
    cardTitle: 'AAJ KA DRIK GANIT PANCHANG',
    cardSub: 'Tithi • Nakshatra • Yoga • Karana • Abhijit Muhurat • Rahukaal',
    shortCard: 'AAJ KA DRIK PANCHANG\nTithi, Nakshatra & Muhurat',
    badge: 'DAILY VEDIC HINDU CALENDAR • RUDRAPUR',
    art: 'panchang',
    accent: '#f59e0b'
  },
  '/shubh-muhurat': {
    title: 'शुभ मुहूर्त 2026-27 कैलेंडर — विवाह, मुंडन, गृह प्रवेश व वाहन',
    desc: 'दृक पंचांग आधारित 2026-2027 के सर्वोत्तम विवाह, मुंडन, गृह प्रवेश, वाहन खरीद व नामकरण मुहूर्त तथा नाम राशि कैलकुलेटर — अभी निःशुल्क देखें ➔',
    cardTitle: 'SHUBH MUHURAT 2026 - 2027',
    cardSub: 'Vivah • Griha Pravesh • Mundan Sanskar • Vahan Kharid Muhurat',
    shortCard: 'SHUBH MUHURAT 2026-27\nVivah, Mundan & Vahan',
    badge: 'AUSPICIOUS VEDIC DATES & TIMINGS 2026-27',
    art: 'panchang',
    accent: '#eab308'
  },
  '/vivah-muhurat-2027': {
    title: 'विवाह मुहूर्त 2026-27 — शादी की सभी शुभ तिथियां व लग्न सारणी',
    desc: 'साल 2026 और 2027 (नवंबर, दिसंबर व जनवरी से जून) के 100% शुद्ध विवाह मुहूर्त, शुभ लग्न समय व वर-कन्या नाम से तारा बल कैलकुलेटर — अभी जांचें ➔',
    cardTitle: 'SHUBH VIVAH MUHURAT 2026-27',
    cardSub: 'Auspicious Hindu Wedding Dates • Tara Bal & Chandra Bal Check',
    shortCard: 'VIVAH MUHURAT 2026-27\nShubh Shadi Dates by Name',
    badge: 'MARRIAGE MUHURAT CALCULATOR BY NAME',
    art: 'milan',
    accent: '#f43f5e'
  },
  '/mundan-muhurat': {
    title: 'मुंडन मुहूर्त 2026-27 — बच्चों के मुंडन की सबसे शुभ तिथियां',
    desc: 'शिशु मुंडन (चूड़ाकरण) संस्कार 2026-2027 की भद्रा-रहित शुभ तिथियां, शुभ नक्षत्र व बच्चे के नाम से मुंडन मुहूर्त कैलकुलेटर — अभी निःशुल्क देखें ➔',
    cardTitle: 'MUNDAN SANSKAR MUHURAT 2026-27',
    cardSub: 'Chudakaran Auspicious Dates • Baby Name Nakshatra & Tithi Check',
    shortCard: 'MUNDAN MUHURAT 2026-27\nShishu Chudakaran Dates',
    badge: 'VEDIC SHISHU SANSKAR MUHURAT',
    art: 'panchang',
    accent: '#10b981'
  },
  '/vahan-kharidne-ka-muhurat': {
    title: 'वाहन खरीदने का शुभ मुहूर्त 2026-27 (Vahan Muhurat) — कार/बाइक तिथि',
    desc: '2026-2027 में नई कार, बाइक या स्कूटी खरीदने के लिए रविवार व सभी 7 दिनों के सर्वोत्तम शुभ मुहूर्त, चौघड़िया व राशि अनुसार लकी वाहन रंग — अभी देखें ➔',
    cardTitle: 'VAHAN KHARIDNE KA MUHURAT 2026-27',
    cardSub: 'Best Car & Bike Buying Dates • Lucky Vehicle Color by Rashi',
    shortCard: 'VAHAN MUHURAT 2026-27\nCar & Bike Shubh Dates',
    badge: 'VEHICLE PURCHASE MUHURAT & LUCKY COLOR',
    art: 'panchang',
    accent: '#3b82f6'
  },
  '/s-naam-rashi-swabhav': {
    title: 'S नाम की राशि क्या है? (S Naam Ki Rashi) कुम्भ स्वभाव व राजयोग',
    desc: 'S (स, सा, सी, श) नाम वालों की राशि कुम्भ (S Naam Ki Rashi Kumbh) और स्वामी शनि देव हैं। जानें S नाम वालों का स्वभाव, सच्चा प्यार, 2026-27 राजयोग व लकी रत्न ➔',
    cardTitle: 'S NAAM KI RASHI: KUMBH RASHI',
    cardSub: 'S Letter Zodiac (Aquarius) • Shani Dev • Swabhav, Career & Neelam',
    shortCard: 'S NAAM KI RASHI (KUMBH)\nRashi, Swabhav & Career',
    badge: 'S LETTER ZODIAC & PERSONALITY GUIDE',
    art: 'rashi',
    accent: '#a855f7'
  },
  '/shani-sadesati-upay': {
    title: 'शनि साढ़े साती व ढैय्या कैलकुलेटर 2026-28 — राशि फल व उपाय',
    desc: 'मीन राशि में शनि गोचर (2025-2028) के अनुसार अपने नाम या राशि से जानें शनि साढ़े साती व ढैय्या का चरण, पाया फल और अचूक वैदिक उपाय — अभी जांचें ➔',
    cardTitle: 'SHANI SADESATI & DHAIYYA 2025-28',
    cardSub: 'Meen Rashi Shani Gochar • Gold/Silver/Iron Paya • Vedic Remedies',
    shortCard: 'SHANI SADESATI 2025-28\nGochar Check & Vedic Upay',
    badge: 'SHANI GOCHAR CALCULATOR & UPAY',
    art: 'shani',
    accent: '#6366f1'
  },
  '/shani-sadesati-calculator': {
    title: 'शनि साढ़े साती कैलकुलेटर — नाम व राशि से जानें शनि का पाया',
    desc: 'अपनी राशि या नाम से 1 सेकंड में जानें शनि साढ़े साती व ढैय्या का चरण, सोने/चांदी/तांबे/लोहे का पाया और शनि शांति के प्रामाणिक उपाय — अभी देखें ➔',
    cardTitle: 'SHANI SADESATI CALCULATOR',
    cardSub: 'Check Sade Sati Phase by Name or Rashi • Shani Shanti Upay',
    shortCard: 'SHANI SADESATI CHECK\nPaya & Shani Shanti Upay',
    badge: 'INSTANT VEDIC SHANI DOSH CHECK',
    art: 'shani',
    accent: '#6366f1'
  },
  '/manglik-dosh-nivaran': {
    title: 'मांगलिक दोष कैलकुलेटर — कुंडली में मंगल दोष जांच व परिहार नियम',
    desc: 'क्या कुंडली में मांगलिक दोष सच में भयानक है? जानिए आंशिक व पूर्ण मंगल दोष के 12 शास्त्रोक्त परिहार (रद्द होने के) नियम व वैदिक उपाय — अभी जांचें ➔',
    cardTitle: 'MANGLIK DOSH CHECK & PARIHAR',
    cardSub: '1st, 4th, 7th, 8th & 12th House Mangal Analysis • Shastrokta Upay',
    shortCard: 'MANGLIK DOSH CALCULATOR\nParihar Rules & Remedies',
    badge: 'KUJA DOSHA CALCULATOR & CANCELLATION RULES',
    art: 'kundli',
    accent: '#ef4444'
  },
  '/nadi-dosh-nuskhe': {
    title: 'नाड़ी दोष परिहार व उपाय — 18 से कम गुण मिलने पर वैदिक समाधान',
    desc: 'कुंडली मिलान में नाड़ी दोष (0/8 अंक) या 18 से कम गुण मिलने पर बृहत् पाराशर होरा शास्त्र के प्रामाणिक परिहार नियम व विवाह उपाय — अभी पढ़ें ➔',
    cardTitle: 'NADI DOSH PARIHAR & VIVAH UPAY',
    cardSub: 'Adi, Madhya & Antya Nadi Cancellation Rules • Low Gun Milan Upay',
    shortCard: 'NADI DOSH PARIHAR\nShastrokta Vivah Remedies',
    badge: 'BRIHAT PARASHARA HORA SHASTRA RULES',
    art: 'milan',
    accent: '#f97316'
  },
  '/dharm-gyan-kosh': {
    title: 'वैदिक धर्म ज्ञान कोष — राम शलाका, आरती, पूजा सामग्री व वास्तु',
    desc: 'श्री राम शलाका प्रश्नावली, शनि साढ़े साती कैलकुलेटर, पूजा सामग्री चेकलिस्ट, सम्पूर्ण आरती-चालीसा, वास्तु टिप्स व रत्न-रुद्राक्ष गाइड — अभी खोलें ➔',
    cardTitle: 'SANATAN DHARM GYAN KOSH',
    cardSub: 'Ram Shalaka • Aarti-Chalisa • Puja Samagri • Vastu • Ratna-Rudraksha',
    shortCard: 'SANATAN DHARM GYAN KOSH\nVedic Shastra & Tools',
    badge: 'SACRED VEDIC ENCYCLOPEDIA & TOOLS',
    art: 'gyan',
    accent: '#f59e0b'
  },
  '/ram-shalaka-prashnavali': {
    title: 'श्री राम शलाका प्रश्नावली — मन में प्रश्न सोचें और चौपाई फल जानें',
    desc: 'गोस्वामी तुलसीदास कृत श्रीरामचरितमानस की दिव्य श्री राम शलाका प्रश्नावली से अपने मन के प्रश्न और कार्य सिद्धि का तुरंत उत्तर जानें — अभी स्पर्श करें ➔',
    cardTitle: 'SHRI RAM SHALAKA PRASHNAVALI',
    cardSub: 'Goswami Tulsidas Krit Ramcharitmanas Chaupai Guidance & Phal',
    shortCard: 'SHRI RAM SHALAKA\nRamcharitmanas Prashnavali',
    badge: 'DIVINE RAMCHARITMANAS ORACLE',
    art: 'gyan',
    accent: '#fb923c'
  },
  '/puja-samagri-list': {
    title: 'पूजा सामग्री लिस्ट — सत्यनारायण कथा, गृह प्रवेश व रुद्राभिषेक',
    desc: 'श्री सत्यनारायण व्रत कथा, नूतन गृह प्रवेश, रुद्राभिषेक व नवग्रह शांति हवन की संपूर्ण पूजा सामग्री चेकलिस्ट (टिक व शेयर सुविधा सहित) — अभी देखें ➔',
    cardTitle: 'COMPLETE VEDIC PUJA SAMAGRI LIST',
    cardSub: 'Satyanarayan Katha • Griha Pravesh • Rudrabhishek • Navgrah Shanti',
    shortCard: 'VEDIC PUJA SAMAGRI LIST\nComplete Checklist & PDF',
    badge: 'INTERACTIVE PUJA CHECKLIST & PDF',
    art: 'puja',
    accent: '#f59e0b'
  },
  '/aarti-chalisa-sangrah': {
    title: 'आरती एवं चालीसा संग्रह — हनुमान चालीसा, गणेश व लक्ष्मी आरती',
    desc: 'श्री हनुमान चालीसा, बजरंग बाण, श्री गणेश आरती, लक्ष्मी आरती, शिव तांडव स्तोत्र एवं नित्य पूजन के प्रामाणिक पाठ व अर्थ — अभी पढ़ें ➔',
    cardTitle: 'SAMPURNA AARTI & CHALISA SANGRAH',
    cardSub: 'Hanuman Chalisa • Ganesh Aarti • Lakshmi Aarti • Shiv Tandav Stotra',
    shortCard: 'AARTI & CHALISA SANGRAH\nHanuman Chalisa & Aarti',
    badge: 'DAILY DEVOTIONAL LYRICS & PATH',
    art: 'mandir',
    accent: '#facc15'
  },
  '/vrat-katha-paran-vidhi': {
    title: 'एकादशी व प्रदोष व्रत कथा एवं शास्त्रोक्त पारण विधि नियम',
    desc: 'एकादशी, प्रदोष, पूर्णिमा, करवा चौथ व महाशिवरात्रि व्रत के शास्त्रोक्त नियम, हरि वासर विचार एवं शुद्ध पारण विधि — अभी पूरी विधि पढ़ें ➔',
    cardTitle: 'EKADASHI & PRADOSH VRAT VIDHI',
    cardSub: 'Shastrokta Vrat Katha • Hari Vasar Rules • Exact Paran Timings',
    shortCard: 'EKADASHI & VRAT VIDHI\nKatha & Paran Niyam',
    badge: 'SANATAN VRAT & PARVA GUIDE',
    art: 'gyan',
    accent: '#fbbf24'
  },
  '/vastu-shastra-tips': {
    title: 'वास्तु शास्त्र टिप्स — बिना तोड़-फोड़ घर व दुकान के वास्तु उपाय',
    desc: 'ईशान कोण, आग्नेय, नैऋत्य व वायव्य दिशाओं के वास्तु नियम तथा बिना तोड़-फोड़ घर, रसोई, तिजोरी व दुकान के वास्तु दोष दूर करने के अचूक उपाय ➔',
    cardTitle: 'VASTU SHASTRA & DISHA DOSH UPAY',
    cardSub: 'Ishan, Agneya, Nairitya & Vayavya Rules • Home & Shop Remedies',
    shortCard: 'VASTU SHASTRA GUIDE\nHome & Shop Vastu Upay',
    badge: 'VEDIC ARCHITECTURE & VASTU REMEDIES',
    art: 'gyan',
    accent: '#10b981'
  },
  '/ratna-rudraksha-guide': {
    title: 'रत्न एवं रुद्राक्ष गाइड — अपनी राशि अनुसार जानें भाग्यशाली रत्न',
    desc: 'राशि और लग्न अनुसार भाग्यशाली नवरत्न (पुखराज, नीलम, माणिक्य, पन्ना, मूंगा, मोती) तथा 1 से 14 मुखी रुद्राक्ष धारण करने की प्रामाणिक विधि ➔',
    cardTitle: 'NAVRATNA & 1-14 MUKHI RUDRAKSHA',
    cardSub: 'Lucky Gemstone by Lagna & Rashi • Authentic Rudraksha Wearing Vidhi',
    shortCard: 'RATNA & RUDRAKSHA GUIDE\nNavratna & 1-14 Mukhi',
    badge: 'VEDIC GEMOLOGY & RUDRAKSHA SCIENCE',
    art: 'rashi',
    accent: '#f59e0b'
  },
  '/swapna-phal-shakun-shastra': {
    title: 'स्वप्न फल एवं शकुन शास्त्र — सपनों का अर्थ व अंग फड़कने का फल',
    desc: 'स्वप्न शास्त्र के अनुसार सपनों का शुभ-अशुभ फल तथा शरीर के अंगों (दाईं-बाईं आंख, हाथ) के फड़कने का प्रामाणिक ज्योतिषीय अर्थ — अभी जानें ➔',
    cardTitle: 'SWAPNA PHAL & SHAKUN SHASTRA',
    cardSub: 'Vedic Dream Interpretation • Auspicious Signs & Anga Sphuran Meaning',
    shortCard: 'SWAPNA & SHAKUN SHASTRA\nVedic Dream Meaning',
    badge: 'SAMUDRIK & SWAPNA SHASTRA GUIDE',
    art: 'gyan',
    accent: '#a855f7'
  },
  '/swarodaya-vigyan': {
    title: 'शिव स्वरोदय विज्ञान — इड़ा, पिंगला व सुषुम्ना नाड़ी से कार्य सिद्धि',
    desc: 'चन्द्र स्वर (इड़ा), सूर्य स्वर (पिंगला) और सुषुम्ना नाड़ी की पहचान कर शुभ कार्य, यात्रा व व्यापार में निश्चित कार्य सिद्धि के गुप्त सूत्र — अभी पढ़ें ➔',
    cardTitle: 'SHIV SWARODAYA NADI VIGYAN',
    cardSub: 'Ida (Chandra), Pingala (Surya) & Sushumna Nadi Secrets for Success',
    shortCard: 'SHIV SWARODAYA VIGYAN\nIda, Pingala & Sushumna',
    badge: 'ANCIENT SHIV SWARODAYA SHASTRA',
    art: 'gyan',
    accent: '#38bdf8'
  },
  '/geeta-chanakya-niti': {
    title: 'श्रीमद्भगवद्गीता के प्रमुख श्लोक एवं चाणक्य नीति सूत्र (अर्थ सहित)',
    desc: 'जीवन प्रबंधन, धर्म, कर्मयोग और संकट में सही निर्णय लेने के लिए श्रीमद्भगवद्गीता के अमर श्लोक और आचार्य चाणक्य के नीति सूत्र — अभी पढ़ें ➔',
    cardTitle: 'SHRIMAD BHAGAVAD GEETA & CHANAKYA NITI',
    cardSub: 'Immortal Sanskrit Shlokas with Hindi Meaning • Life Management Sutras',
    shortCard: 'BHAGAVAD GEETA SHLOKAS\n& Chanakya Niti Sutras',
    badge: 'VEDIC WISDOM & KARMAYOGA SUTRAS',
    art: 'gyan',
    accent: '#f59e0b'
  },
  '/vedic-baby-names': {
    title: 'वैदिक शिशु नामकरण — राशि व नक्षत्र अक्षर से बच्चों के शुभ नाम',
    desc: 'नवजात शिशु (लड़के एवं लड़कियों) के लिए 27 नक्षत्र चरण और 12 राशि अक्षर के अनुसार अर्थपूर्ण एवं आधुनिक हिन्दू वैदिक नामों की सूची — अभी खोजें ➔',
    cardTitle: 'VEDIC BABY NAMES BY NAKSHATRA',
    cardSub: 'Meaningful Hindu Boy & Girl Names by Rashi Akshar & Nakshatra Charan',
    shortCard: 'VEDIC SHISHU NAAMKARAN\nBaby Names by Nakshatra',
    badge: 'NAAMKARAN SANSKAR NAME FINDER',
    art: 'rashi',
    accent: '#ec4899'
  },
  '/char-dham-tirth-darshan': {
    title: 'चार धाम यात्रा एवं 12 ज्योतिर्लिंग तीर्थ दर्शन मार्गदर्शिका',
    desc: 'श्री बद्रीनाथ, केदारनाथ, गंगोत्री, यमुनोत्री एवं द्वादश ज्योतिर्लिंगों का पौराणिक महत्व, कपाट खुलने का समय व दर्शन विधि — अभी पूरी जानकारी देखें ➔',
    cardTitle: 'CHAR DHAM & 12 JYOTIRLINGA DARSHAN',
    cardSub: 'Badrinath • Kedarnath • Gangotri • Yamunotri • Dwadash Jyotirlinga',
    shortCard: 'CHAR DHAM & JYOTIRLINGA\nSacred Tirth Yatra Guide',
    badge: 'UTTARAKHAND & BHARAT TIRTH DARSHAN',
    art: 'mandir',
    accent: '#f97316'
  },
  '/rashifal': {
    title: 'आज का राशिफल (मेष से मीन 12 राशियां) — Daily Horoscope Hindi',
    desc: 'दैनिक ग्रह गोचर एवं चंद्र नक्षत्र गणना पर आधारित मेष से मीन तक सभी 12 राशियों का आज का सटीक वैदिक राशिफल, लकी नंबर व उपाय — अभी पढ़ें ➔',
    cardTitle: 'AAJ KA VEDIC RASHIFAL (12 RASHI)',
    cardSub: 'Mesh to Meen Daily Planetary Transit Prediction, Lucky Number & Upay',
    shortCard: 'AAJ KA VEDIC RASHIFAL\nMesh to Meen 12 Rashiyan',
    badge: 'DAILY HOROSCOPE IN HINDI',
    art: 'rashi',
    accent: '#f59e0b'
  },
  '/jyotish-chat': {
    title: 'निःशुल्क ज्योतिष चैट एवं वैदिक परामर्श — आचार्य शशांक शर्मा',
    desc: 'आचार्य पण्डित शशांक शर्मा जी के मार्गदर्शन में अपनी जन्म कुंडली, विवाह, करियर, संतान योग व ग्रह शांति पर 24×7 वैदिक परामर्श पाएं — अभी प्रश्न पूछें ➔',
    cardTitle: '24x7 FREE VEDIC JYOTISH PARAMARSH',
    cardSub: 'Instant Kundali, Vivah, Career & Graha Shanti Guidance Chat',
    shortCard: 'FREE JYOTISH CHAT\n24x7 Vedic Consultation',
    badge: 'ACHARYA SHASHANK SHARMA GUIDANCE',
    art: 'gyan',
    accent: '#fbbf24'
  },
  '/puja-services': {
    title: 'वैदिक पूजा एवं अनुष्ठान बुकिंग (रुद्रपुर) — पण्डित शशांक शर्मा',
    desc: 'रुद्रपुर (उत्तराखण्ड) में गृह प्रवेश, वास्तु शांति, सत्यनारायण कथा, महा रुद्राभिषेक व विवाह संस्कार हेतु प्रामाणिक वैदिक पूजा बुकिंग — अभी बुक करें ➔',
    cardTitle: 'VEDIC PUJA & ANUSHTHAN BOOKING',
    cardSub: 'Griha Pravesh • Rudrabhishek • Satyanarayan Katha • Navgrah Shanti',
    shortCard: 'VEDIC PUJA BOOKING\nAcharya Shashank Rudrapur',
    badge: 'RUDRAPUR & UTTARAKHAND VEDIC PANDIT JI',
    art: 'puja',
    accent: '#f97316'
  },
  '/mantra-jaap': {
    title: '108 रुद्राक्ष डिजिटल मंत्र जप माला — दैनिक मंत्र काउंटर व साधना',
    desc: 'गायत्री मंत्र, महामृत्युंजय मंत्र, ॐ नमः शिवाय व नवग्रह बीज मंत्रों के दैनिक 108 मनके जाप हेतु इंटरैक्टिव डिजिटल रुद्राक्ष माला — अभी जाप शुरू करें ➔',
    cardTitle: '108 RUDRAKSHA DIGITAL JAAP MALA',
    cardSub: 'Gayatri Mantra • Mahamrityunjaya • Om Namah Shivaya • Daily Counter',
    shortCard: '108 RUDRAKSHA JAAP MALA\nDigital Mantra Counter',
    badge: 'INTERACTIVE VEDIC MANTRA MEDITATION',
    art: 'gyan',
    accent: '#f59e0b'
  },
  '/vedic-videos': {
    title: 'वैदिक ज्योतिष, मंत्र एवं धर्म ज्ञान वीडियो — आचार्य शशांक शर्मा',
    desc: 'आचार्य पण्डित शशांक शर्मा (रुद्रपुर) द्वारा वैदिक कर्मकाण्ड, पर्व-त्योहार मुहूर्त, राशिफल एवं सनातन धर्म ज्ञान के प्रामाणिक वीडियो — अभी देखें ➔',
    cardTitle: 'VEDIC JYOTISH & DHARM GYAN VIDEOS',
    cardSub: 'Authentic Mantra Path, Parva Muhurat & Remedies by Acharya Shashank',
    shortCard: 'VEDIC JYOTISH VIDEOS\nAcharya Shashank Sharma',
    badge: 'OFFICIAL VIDEO GALLERY • RUDRAPUR',
    art: 'gyan',
    accent: '#ef4444'
  },
  '/puja/griha-pravesh': {
    title: 'गृह प्रवेश एवं वास्तु शांति पूजा बुकिंग — विधि, सामग्री व मुहूर्त',
    desc: 'नूतन गृह प्रवेश का शास्त्रोक्त विधान, 64-पद वास्तु पुरुष पूजन, कलश स्थापना, नवग्रह हवन एवं रुद्रपुर में वैदिक पण्डित बुकिंग — अभी विवरण देखें ➔',
    cardTitle: 'GRIHA PRAVESH & VASTU SHANTI PUJA',
    cardSub: 'Vastu Purush Pujan • Kalash Sthapana • Auspicious Muhurat & Booking',
    shortCard: 'GRIHA PRAVESH PUJA\nVastu Shanti & Muhurat',
    badge: 'SHASTROKTA GRIHA PRAVESH VIDHAN',
    art: 'puja',
    accent: '#f97316'
  },
  '/puja/satyanarayan-katha': {
    title: 'श्री सत्यनारायण व्रत कथा पूजन विधि, 5 अध्याय महत्व व बुकिंग',
    desc: 'स्कन्द पुराण के रेवाखण्ड अनुसार श्री सत्यनारायण भगवान की कथा के 5 अध्याय, पञ्चलोकपाल पूजन, सवाया प्रसाद नियम व पण्डित बुकिंग — अभी पढ़ें ➔',
    cardTitle: 'SHRI SATYANARAYAN VRAT KATHA PUJA',
    cardSub: 'Skanda Purana 5 Chapters Katha • Navgrah Pujan & Samagri Vidhi',
    shortCard: 'SATYANARAYAN VRAT KATHA\nPujan Vidhi & Samagri',
    badge: 'PURANOKTA SATYANARAYAN PUJAN',
    art: 'puja',
    accent: '#fbbf24'
  },
  '/puja/rudrabhishek': {
    title: 'महा रुद्राभिषेक पूजन विधि — रुद्राष्टाध्यायी पाठ व अभिषेक फल',
    desc: 'भगवान आशुतोष शिव का शुक्ल यजुर्वेदीय रुद्राष्टाध्यायी से महा रुद्राभिषेक — गन्ने के रस, गोदुग्ध, मधु व घृत से अभिषेक के अचूक लाभ व बुकिंग ➔',
    cardTitle: 'SHUKLA YAJURVEDIYA RUDRABHISHEK',
    cardSub: 'Rudrashtadhyayi Path • Shiv Abhishek Dravya Benefits & Booking',
    shortCard: 'MAHA RUDRABHISHEK PUJA\nShukla Yajurvediya Path',
    badge: 'MAHA RUDRABHISHEK ANUSHTHAN',
    art: 'mandir',
    accent: '#f59e0b'
  },
  '/puja/mahamrityunjaya-jap': {
    title: 'महामृत्युंजय मंत्र जाप अनुष्ठान एवं दशांश हवन — आरोग्य व रक्षा',
    desc: 'त्र्यम्बक महामृत्युंजय मंत्र (11,000 या सवा लाख जप) का वैदिक पुरश्चरण विधान, गिलोय-अमृता दशांश हवन एवं अकाल मृत्यु/रोग निवारण — अभी जानें ➔',
    cardTitle: 'MAHAMRITYUNJAYA MANTRA JAAP & HAVAN',
    cardSub: 'Tryambakam Vedic Purashcharan • Health, Longevity & Graha Shanti',
    shortCard: 'MAHAMRITYUNJAYA JAAP\nVedic Purashcharan Havan',
    badge: 'VEDIC ANUSHTHAN • RUDRAPUR',
    art: 'puja',
    accent: '#ef4444'
  },
  '/puja/navgrah-shanti': {
    title: 'नवग्रह शांति एवं नक्षत्र हवन विधान — शनि, राहु-केतु व मंगल शांति',
    desc: 'सूर्य से केतु तक नवग्रह मंडल पूजन, 9 वैदिक समिधाओं से ग्रह शांति हवन, गण्डमूल नक्षत्र शांति एवं साढ़ेसाती निवारण अनुष्ठान — अभी बुक करें ➔',
    cardTitle: 'NAVGRAH SHANTI & NAKSHATRA HAVAN',
    cardSub: '9 Planetary Mandala Pujan • 9 Vedic Samidha Havan • Dosh Nivaran',
    shortCard: 'NAVGRAH SHANTI HAVAN\n9 Graha Mandala Pujan',
    badge: 'COMPLETE GRAHA SHANTI VIDHAN',
    art: 'shani',
    accent: '#a855f7'
  },
  '/puja/kundali-paramarsh': {
    title: 'व्यक्तिगत जन्म कुंडली परामर्श एवं 36 गुण मिलान — आचार्य शशांक शर्मा',
    desc: 'पराशरी, जैमिनी और नाड़ी ज्योतिष के 3-स्तरीय सूत्र से जन्म पत्रिका विश्लेषण, करियर, विवाह समय, संतान योग एवं रत्न-रुद्राक्ष परामर्श — अभी बुक करें ➔',
    cardTitle: 'PERSONAL KUNDALI CONSULTATION',
    cardSub: 'Parashari, Jaimini & Nadi Jyotish Analysis by Acharya Shashank Sharma',
    shortCard: 'KUNDALI PARAMARSH\nAcharya Shashank Sharma',
    badge: 'EXPERT JYOTISH PARAMARSH • RUDRAPUR',
    art: 'kundli',
    accent: '#f59e0b'
  },
  '/rudrapur-jyotish': {
    title: 'रुद्रपुर एवं उत्तराखण्ड ज्योतिष व वैदिक पूजा केंद्र — पण्डित शशांक शर्मा',
    desc: 'रुद्रपुर (ऊधम सिंह नगर), हल्द्वानी, पंतनगर व काशीपुर में 15+ वर्ष अनुभवी आचार्य पण्डित शशांक शर्मा से जन्मपत्री परामर्श व वैदिक पूजा बुकिंग ➔',
    cardTitle: 'RUDRAPUR VEDIC JYOTISH & PUJA KENDRA',
    cardSub: 'Acharya Pandit Shashank Sharma • 15+ Yrs Experience in Kumaon & UK',
    shortCard: 'RUDRAPUR JYOTISH KENDRA\nAcharya Shashank Sharma',
    badge: 'UDHAM SINGH NAGAR • UTTARAKHAND',
    art: 'puja',
    accent: '#f97316'
  },
  '/kundali-dosh-upay': {
    title: 'कुंडली दोष निवारण कोष — कालसर्प, पितृ दोष, गुरु चांडाल व केमद्रुम',
    desc: 'बृहत् पाराशर होरा शास्त्र के अनुसार कालसर्प योग, पितृ दोष, गुरु चांडाल योग, ग्रहण दोष व केमद्रुम दोष के लक्षण, भंग नियम व सात्विक उपाय — अभी पढ़ें ➔',
    cardTitle: 'KUNDALI DOSH NIVARAN KOSH',
    cardSub: 'Kaalsarp • Pitra Dosh • Guru Chandal • Grahan & Kemadruma Remedies',
    shortCard: 'KUNDALI DOSH NIVARAN\nKaalsarp & Pitra Dosh Upay',
    badge: 'SHASTROKTA DOSH PARIHAR GUIDE',
    art: 'kundli',
    accent: '#ef4444'
  },
  '/mera-khata': {
    title: 'मेरा खाता (Mera Khata) — सुरक्षित जन्म कुंडली एवं जप रिकॉर्ड',
    desc: 'अपनी सुरक्षित जन्म कुंडली, 36 गुण मिलान रिपोर्ट, 108 मंत्र जाप माला रिकॉर्ड एवं पूजा बुकिंग विवरण एक ही स्थान पर देखें — अभी खोलें ➔',
    cardTitle: 'MERA KHATA & SAVED KUNDALI VAULT',
    cardSub: 'Saved Janam Kundali • 36 Gun Milan Reports • Mantra Jaap Streaks',
    shortCard: 'MERA KHATA VAULT\nSaved Kundali & Reports',
    badge: 'YAJMAN PERSONAL VEDIC VAULT',
    art: 'kundli',
    accent: '#f59e0b'
  },
  '/about-us': {
    title: 'हमारे बारे में — आचार्य पण्डित शशांक शर्मा, रुद्रपुर | पण्डित जी ऑनलाइन',
    desc: 'आचार्य पण्डित शशांक शर्मा (15+ वर्ष वैदिक कर्मकाण्ड एवं ज्योतिष अनुभव, श्री ज्योतिष वैदिक संस्थान, रुद्रपुर, उत्तराखण्ड) का प्रामाणिक परिचय ➔',
    cardTitle: 'ACHARYA PANDIT SHASHANK SHARMA',
    cardSub: '15+ Years Vedic Jyotish & Karmakand Experience • Rudrapur, Uttarakhand',
    shortCard: 'ACHARYA SHASHANK SHARMA\nPandit Ji Online Rudrapur',
    badge: 'FOUNDER • PANDIT JI ONLINE',
    art: 'gyan',
    accent: '#f59e0b'
  },
  '/contact-us': {
    title: 'संपर्क करें — आचार्य पण्डित शशांक शर्मा, रुद्रपुर (+91 7017279043)',
    desc: 'वैदिक पूजा बुकिंग, जन्मपत्री परामर्श एवं ज्योतिषीय समाधान हेतु सीधे संपर्क करें: आचार्य पण्डित शशांक शर्मा, रुद्रपुर, उत्तराखण्ड (+91 7017279043) ➔',
    cardTitle: 'CONTACT PANDIT JI ONLINE RUDRAPUR',
    cardSub: 'Direct Puja Booking & Horoscope Consultation • +91 7017279043',
    shortCard: 'CONTACT PANDIT JI ONLINE\nRudrapur +91 7017279043',
    badge: 'RUDRAPUR, UDHAM SINGH NAGAR (UK)',
    art: 'puja',
    accent: '#10b981'
  },
  '/privacy-policy': {
    title: 'गोपनीयता नीति (Privacy Policy) | पण्डित जी ऑनलाइन',
    desc: 'पण्डित जी ऑनलाइन (www.panditjionline.online) की आधिकारिक गोपनीयता नीति — जन्म विवरण सुरक्षा, कुकीज़ एवं डेटा गोपनीयता मानक ➔',
    cardTitle: 'PRIVACY POLICY & DATA SECURITY',
    cardSub: '100% Confidential Birth Details & Secure Vedic Astrology Portal',
    shortCard: 'PRIVACY POLICY\nPandit Ji Online',
    badge: 'OFFICIAL PRIVACY & SECURITY STANDARDS',
    art: 'gyan',
    accent: '#10b981'
  },
  '/terms-and-conditions': {
    title: 'नियम एवं शर्तें (Terms & Conditions) | पण्डित जी ऑनलाइन',
    desc: 'पण्डित जी ऑनलाइन पोर्टल के उपयोग, वैदिक ज्योतिष गणना, पंचांग एवं पूजा बुकिंग सेवाओं से जुड़े आधिकारिक नियम एवं शर्तें ➔',
    cardTitle: 'TERMS & CONDITIONS • PANDIT JI ONLINE',
    cardSub: 'Official Portal Guidelines, Puja Booking Rules & Vedic Standards',
    shortCard: 'TERMS & CONDITIONS\nPandit Ji Online',
    badge: 'OFFICIAL TERMS OF SERVICE',
    art: 'gyan',
    accent: '#f59e0b'
  },
  '/disclaimer': {
    title: 'अस्वीकरण (Disclaimer) — वैदिक ज्योतिष परामर्श सूचना | पण्डित जी ऑनलाइन',
    desc: 'पण्डित जी ऑनलाइन पर प्रस्तुत वैदिक ज्योतिषीय गणनाओं, राशिफल एवं आध्यात्मिक उपायों से संबंधित आधिकारिक अस्वीकरण (Disclaimer) ➔',
    cardTitle: 'OFFICIAL ASTROLOGICAL DISCLAIMER',
    cardSub: 'Vedic Shastra Advisory & Spiritual Guidance Standards',
    shortCard: 'OFFICIAL DISCLAIMER\nPandit Ji Online',
    badge: 'SPIRITUAL & ASTROLOGICAL NOTICE',
    art: 'gyan',
    accent: '#f59e0b'
  },
  '/a-naam-rashi-swabhav': {
    title: 'A नाम की राशि क्या है? (A Naam Ki Rashi) मेष स्वभाव व राजयोग',
    desc: 'A (अ, आ, ल) नाम वालों की राशि मेष (A Naam Ki Rashi Mesh) और स्वामी मंगल हैं। जानें A नाम वालों का निडर स्वभाव, लव लाइफ, सरकारी राजयोग व मूंगा रत्न ➔',
    cardTitle: 'A NAAM KI RASHI: MESH (ARIES)',
    cardSub: 'Swami Mangal • Swabhav • Career • Love Life & Lucky Moonga Ratna',
    shortCard: 'A NAAM KI RASHI (MESH)\nSwabhav, Career & Ratna',
    badge: 'STAGE 1 • TOP SEARCH NAAM RASHI GUIDE',
    art: 'rashi',
    accent: '#ef4444'
  },
  '/r-naam-rashi-swabhav': {
    title: 'R नाम की राशि क्या है? (R Name Rashi) तुला स्वभाव, प्रेम व धन योग',
    desc: 'R (र, रा, री, त) नाम वालों की राशि तुला (R Naam Ki Rashi Tula) और स्वामी शुक्र हैं। जानें R नाम वालों का स्वभाव, विवाह, 2026-27 धन राजयोग व लकी रत्न ➔',
    cardTitle: 'R NAAM KI RASHI: TULA (LIBRA)',
    cardSub: 'Swami Shukra • Swabhav • Career • Marriage & Lucky Opal Ratna',
    shortCard: 'R NAAM KI RASHI (TULA)\nSwabhav, Vivah & Ratna',
    badge: 'STAGE 1 • TOP SEARCH NAAM RASHI GUIDE',
    art: 'rashi',
    accent: '#ec4899'
  },
  '/m-naam-rashi-swabhav': {
    title: 'M नाम की राशि क्या है? (M Naam Ki Rashi) सिंह स्वभाव व राजयोग',
    desc: 'M (म, मा, मी, ट) नाम वालों की राशि सिंह (M Naam Ki Rashi Singh) और स्वामी सूर्य हैं। जानें M नाम वालों का शाही स्वभाव, सरकारी राजयोग, प्रेम व माणिक्य रत्न ➔',
    cardTitle: 'M NAAM KI RASHI: SINGH (LEO)',
    cardSub: 'Swami Surya • Royal Nature • Rajyoga • Career & Lucky Ruby Ratna',
    shortCard: 'M NAAM KI RASHI (SINGH)\nRajyoga, Career & Manikya',
    badge: 'STAGE 1 • TOP SEARCH NAAM RASHI GUIDE',
    art: 'rashi',
    accent: '#f59e0b'
  },
  '/p-naam-rashi-swabhav': {
    title: 'P नाम की राशि क्या है? (P / Pi Naam Ki Rashi) कन्या स्वभाव व धन योग',
    desc: 'P (प, पा, पी, पू) नाम वालों की राशि कन्या (P Naam Ki Rashi Kanya) और स्वामी बुध हैं। जानें P नाम वालों की बुद्धि, व्यापार धन योग, प्रेम व पन्ना रत्न ➔',
    cardTitle: 'P NAAM KI RASHI: KANYA (VIRGO)',
    cardSub: 'Swami Budh • Sharp Intellect • Business • Career & Emerald Ratna',
    shortCard: 'P NAAM KI RASHI (KANYA)\nSwabhav, Vyapar & Panna',
    badge: 'STAGE 1 • TOP SEARCH NAAM RASHI GUIDE',
    art: 'rashi',
    accent: '#10b981'
  },
  '/griha-pravesh-muhurat-2027': {
    title: 'गृह प्रवेश मुहूर्त 2026-27 — नए घर में प्रवेश की शुभ तिथियां',
    desc: 'साल 2026 और 2027 में नूतन गृह प्रवेश की सर्वोत्तम शुभ तिथियां, स्थिर लग्न सारणी, वास्तु कलश स्थापना विधि व वर्जित मास — अभी पूरी सूची देखें ➔',
    cardTitle: 'GRIHA PRAVESH MUHURAT 2026-2027',
    cardSub: 'Auspicious Dates • Sthir Lagna Table • Vastu Kalash Sthapana Vidhi',
    shortCard: 'GRIHA PRAVESH 2026-27\nShubh Tithi & Vastu Vidhi',
    badge: 'STAGE 2 • SHUBH MUHURAT PANCHANG 2026-27',
    art: 'panchang',
    accent: '#f97316'
  },
  '/ekadashi-vrat-list-2027': {
    title: 'एकादशी व्रत कैलेंडर 2026-27 — सभी 24 एकादशी तिथि व पारण समय',
    desc: 'वर्ष 2026-2027 की सभी 24 एकादशी (निर्जला, देवउठनी, देवशयनी, पुत्रदा) की सटीक व्रत तिथि, स्मार्त-वैष्णव नियम व द्वादशी पारण समय — अभी देखें ➔',
    cardTitle: 'EKADASHI VRAT & PARANA LIST 2026-27',
    cardSub: 'All 24 Ekadashi Dates • Smarta & Vaishnava • Hari Vasar Parana Time',
    shortCard: '24 EKADASHI CALENDAR\nVrat Tithi & Parana Time',
    badge: 'STAGE 2 • SANATAN VRAT PANCHANG 2026-27',
    art: 'panchang',
    accent: '#fbbf24'
  },
  '/kaalsarp-dosh-nivaran': {
    title: 'कालसर्प दोष कैलकुलेटर — 12 प्रकार (अनंत से शेषनाग) व उपाय',
    desc: 'जानिए कुंडली में राहु-केतु से बनने वाले 12 प्रकार के कालसर्प दोष के लक्षण, स्वतः भंग नियम और रुद्राभिषेक शांति के अचूक उपाय — अभी जांचें ➔',
    cardTitle: 'KAALSARP DOSH CHECKER & 12 TYPES',
    cardSub: 'Anant to Sheshnag 12 Kaalsarp • Cancellation Rules & Rudrabhishek Upay',
    shortCard: 'KAALSARP DOSH NIVARAN\n12 Types & Kundali Check',
    badge: 'STAGE 3 • KUNDALI DOSH CALCULATOR',
    art: 'kundli',
    accent: '#a855f7'
  },
  '/sapne-me-saap-dekhna': {
    title: 'सपने में सांप देखना शुभ या अशुभ? — स्वप्न शास्त्र के 21 संकेत',
    desc: 'स्वप्न शास्त्र के अनुसार सपने में काला, सफेद या पीला सांप देखना, सांप का काटना या शिवलिंग पर नाग दिखने के 21 शुभ-अशुभ संकेत व उपाय — अभी पढ़ें ➔',
    cardTitle: 'SAPNE ME SAAP DEKHNA (SWAPNA SHASTRA)',
    cardSub: '21 Auspicious & Warning Snake Dream Signs • Shivling Nag & Remedies',
    shortCard: 'SAPNE ME SAAP DEKHNA\n21 Swapna Shastra Signs',
    badge: 'STAGE 3 • VIRAL SWAPNA SHASTRA GUIDE',
    art: 'gyan',
    accent: '#14b8a6'
  },
  '/aaj-ka-panchang': {
    title: 'आज का पंचांग (Aaj Ka Panchang) — आज की तिथि, नक्षत्र व मुहूर्त',
    desc: 'लाहिड़ी चित्रापक्ष अयनांश आधारित आज का संपूर्ण हिन्दू पंचांग — आज की सटीक तिथि, पक्ष, नक्षत्र, चंद्र राशि, अभिजित मुहूर्त व राहुकाल तुरंत देखें ➔',
    cardTitle: 'AAJ KA SHUDDH DRIK PANCHANG',
    cardSub: 'Daily Tithi • Nakshatra • Yoga • Karana • Sunrise & Abhijit Muhurat',
    shortCard: 'AAJ KA PANCHANG\nTithi, Nakshatra & Muhurat',
    badge: 'DAILY VEDIC PANCHANG • RUDRAPUR',
    art: 'panchang',
    accent: '#f59e0b'
  },
  '/aaj-ka-choghadiya': {
    title: 'आज का चौघड़िया — दिन और रात के शुभ चौघड़िया मुहूर्त (अमृत, शुभ)',
    desc: 'स्थानीय सूर्योदय पर आधारित आज का दिन और रात का लाइव चौघड़िया मुहूर्त — जानिए अमृत, शुभ, लाभ व चर चौघड़िया का सटीक समय — अभी देखें ➔',
    cardTitle: 'AAJ KA DIN & RAAT CHOGHADIYA',
    cardSub: 'Amrit • Shubh • Labh • Char Muhurat • Daily Live Choghadiya Table',
    shortCard: 'AAJ KA CHOGHADIYA\nAmrit, Shubh & Labh Time',
    badge: 'LIVE VEDIC CHOGHADIYA MUHURAT',
    art: 'panchang',
    accent: '#10b981'
  },
  '/aaj-ka-rahukaal': {
    title: 'आज का राहुकाल समय — राहुकाल, यमगण्ड व अभिजित मुहूर्त सारणी',
    desc: 'जानिए आज का सटीक राहुकाल समय, यमगण्ड काल, गुलिक काल और अभिजित मुहूर्त तथा राहुकाल में आवश्यक कार्य करने के शास्त्रीय उपाय — अभी देखें ➔',
    cardTitle: 'AAJ KA RAHUKAAL & YAMAGANDAM',
    cardSub: 'Daily Rahu Kaal Time • Gulika Kaal • Abhijit Muhurat & Vedic Remedies',
    shortCard: 'AAJ KA RAHUKAAL\nTime & Shastrokta Rules',
    badge: 'DAILY RAHUKAAL & ABHIJIT MUHURAT',
    art: 'panchang',
    accent: '#f43f5e'
  },
  '/naam-rashi': {
    title: 'नाम से राशि जानें (A to Z Calculator) — अक्षर से अपनी राशि देखें',
    desc: 'अपने हिंदी या अंग्रेजी नाम के पहले अक्षर (A से Z) से जानें अपनी सटीक वैदिक चंद्र राशि, नक्षत्र, स्वामी ग्रह, स्वभाव व शुभ रत्न — अभी निःशुल्क जांचें ➔',
    cardTitle: 'NAAM RASHI CALCULATOR (A TO Z)',
    cardSub: 'Find Vedic Rashi by Name • 27 Nakshatra Pada • Lucky Ratna & Number',
    shortCard: 'NAAM RASHI CALCULATOR\nRashi, Nakshatra & Ratna',
    badge: '108 NAKSHATRA PADA NAME CALCULATOR',
    art: 'rashi',
    accent: '#a855f7'
  },
  '/mesh-rashifal': {
    title: 'मेष राशिफल आज का (Mesh Rashifal) — स्वभाव, करियर व मूंगा रत्न',
    desc: 'मेष राशि (चू, चे, चो, ला, ली, लू, ले, लो, अ) का आज का वैदिक राशिफल, स्वामी मंगल का गोचर फल, करियर, विवाह व शुभ मूंगा रत्न — अभी देखें ➔',
    cardTitle: 'MESH RASHIFAL (ARIES HOROSCOPE)',
    cardSub: 'Swami Mangal • Daily Gochar • Career, Love & Red Coral (Moonga) Upay',
    shortCard: 'MESH RASHIFAL (ARIES)\nDaily Horoscope & Upay',
    badge: 'VEDIC RASHIFAL • MESH (ARIES)',
    art: 'rashi',
    accent: '#ef4444'
  },
  '/vrishabh-rashifal': {
    title: 'वृषभ राशिफल आज का (Vrishabh Rashifal) — धन, करियर व शुभ रत्न',
    desc: 'वृषभ राशि (ई, ऊ, ए, ओ, वा, वी, वू, वे, वो) का आज का वैदिक राशिफल, स्वामी शुक्र का गोचर प्रभाव, धन योग, परिवार व ओपल रत्न — अभी पढ़ें ➔',
    cardTitle: 'VRISHABH RASHIFAL (TAURUS)',
    cardSub: 'Swami Shukra • Daily Gochar • Wealth, Family & Diamond/Opal Ratna',
    shortCard: 'VRISHABH RASHIFAL\nDaily Horoscope & Upay',
    badge: 'VEDIC RASHIFAL • VRISHABH (TAURUS)',
    art: 'rashi',
    accent: '#ec4899'
  },
  '/mithun-rashifal': {
    title: 'मिथुन राशिफल आज का (Mithun Rashifal) — व्यापार, करियर व पन्ना',
    desc: 'मिथुन राशि (का, की, कू, घ, ङ, छ, के, को, ह) का आज का वैदिक राशिफल, स्वामी बुध का गोचर फल, व्यापार सफलता व शुभ पन्ना रत्न — अभी देखें ➔',
    cardTitle: 'MITHUN RASHIFAL (GEMINI)',
    cardSub: 'Swami Budh • Daily Gochar • Business, Intellect & Emerald (Panna)',
    shortCard: 'MITHUN RASHIFAL\nDaily Horoscope & Upay',
    badge: 'VEDIC RASHIFAL • MITHUN (GEMINI)',
    art: 'rashi',
    accent: '#10b981'
  },
  '/kark-rashifal': {
    title: 'कर्क राशिफल आज का (Kark Rashifal) — परिवार, धन व मोती रत्न',
    desc: 'कर्क राशि (ही, हू, हे, हो, डा, डी, डू, डे, डो) का आज का वैदिक राशिफल, स्वामी चंद्रमा का गोचर फल, पारिवारिक सुख व शुभ मोती रत्न — अभी पढ़ें ➔',
    cardTitle: 'KARK RASHIFAL (CANCER HOROSCOPE)',
    cardSub: 'Swami Chandra • Daily Gochar • Family, Peace & Natural Pearl (Moti)',
    shortCard: 'KARK RASHIFAL (CANCER)\nDaily Horoscope & Upay',
    badge: 'VEDIC RASHIFAL • KARK (CANCER)',
    art: 'rashi',
    accent: '#38bdf8'
  },
  '/simha-rashifal': {
    title: 'सिंह राशिफल आज का (Simha Rashifal) — राजयोग, करियर व माणिक्य',
    desc: 'सिंह राशि (मा, मी, मू, मे, मो, टा, टी, टू, टे) का आज का वैदिक राशिफल, स्वामी सूर्य देव का गोचर फल, सरकारी नौकरी योग व माणिक्य रत्न — अभी देखें ➔',
    cardTitle: 'SIMHA RASHIFAL (LEO HOROSCOPE)',
    cardSub: 'Swami Surya • Daily Gochar • Leadership, Rajyoga & Ruby (Manikya)',
    shortCard: 'SIMHA RASHIFAL (LEO)\nDaily Horoscope & Upay',
    badge: 'VEDIC RASHIFAL • SIMHA (LEO)',
    art: 'rashi',
    accent: '#f59e0b'
  },
  '/kanya-rashifal': {
    title: 'कन्या राशिफल आज का (Kanya Rashifal) — करियर, व्यापार व पन्ना',
    desc: 'कन्या राशि (टो, पा, पी, पू, ष, ण, ठ, पे, पो) का आज का वैदिक राशिफल, उच्च के बुध का गोचर फल, व्यापार वृद्धि, स्वास्थ्य व पन्ना रत्न — अभी पढ़ें ➔',
    cardTitle: 'KANYA RASHIFAL (VIRGO HOROSCOPE)',
    cardSub: 'Swami Budh • Daily Gochar • Finance, Career & Emerald (Panna) Upay',
    shortCard: 'KANYA RASHIFAL (VIRGO)\nDaily Horoscope & Upay',
    badge: 'VEDIC RASHIFAL • KANYA (VIRGO)',
    art: 'rashi',
    accent: '#10b981'
  },
  '/tula-rashifal': {
    title: 'तुला राशिफल आज का (Tula Rashifal) — धन, दांपत्य व ओपल रत्न',
    desc: 'तुला राशि (रा, री, रू, रे, रो, ता, ती, तू, ते) का आज का वैदिक राशिफल, स्वामी शुक्र का गोचर फल, व्यापार, दांपत्य सुख व ओपल/हीरा रत्न — अभी देखें ➔',
    cardTitle: 'TULA RASHIFAL (LIBRA HOROSCOPE)',
    cardSub: 'Swami Shukra • Daily Gochar • Harmony, Business & Opal/Diamond Upay',
    shortCard: 'TULA RASHIFAL (LIBRA)\nDaily Horoscope & Upay',
    badge: 'VEDIC RASHIFAL • TULA (LIBRA)',
    art: 'rashi',
    accent: '#ec4899'
  },
  '/vrishchik-rashifal': {
    title: 'वृश्चिक राशिफल आज का (Vrishchik Rashifal) — करियर व मूंगा रत्न',
    desc: 'वृश्चिक राशि (तो, ना, नी, नू, ने, नो, या, यी, यू) का आज का वैदिक राशिफल, स्वामी मंगल का गोचर फल, करियर सफलता, मूंगा रत्न व उपाय — अभी पढ़ें ➔',
    cardTitle: 'VRISHCHIK RASHIFAL (SCORPIO)',
    cardSub: 'Swami Mangal • Daily Gochar • Determination, Career & Moonga Ratna',
    shortCard: 'VRISHCHIK RASHIFAL\nDaily Horoscope & Upay',
    badge: 'VEDIC RASHIFAL • VRISHCHIK (SCORPIO)',
    art: 'rashi',
    accent: '#dc2626'
  },
  '/dhanu-rashifal': {
    title: 'धनु राशिफल आज का (Dhanu Rashifal) — भाग्य, करियर व पुखराज रत्न',
    desc: 'धनु राशि (ये, यो, भा, भी, भू, धा, फा, ढा, भे) का आज का वैदिक राशिफल, देवगुरु बृहस्पति का गोचर फल, उच्च पद योग व पुखराज रत्न — अभी देखें ➔',
    cardTitle: 'DHANU RASHIFAL (SAGITTARIUS)',
    cardSub: 'Swami Guru Brihaspati • Daily Gochar • Wisdom, Fortune & Pukhraj',
    shortCard: 'DHANU RASHIFAL\nDaily Horoscope & Upay',
    badge: 'VEDIC RASHIFAL • DHANU (SAGITTARIUS)',
    art: 'rashi',
    accent: '#eab308'
  },
  '/makar-rashifal': {
    title: 'मकर राशिफल आज का (Makar Rashifal) — कर्मयोग, धन व नीलम रत्न',
    desc: 'मकर राशि (भो, जा, जी, खी, खू, खे, खो, गा, गी) का आज का वैदिक राशिफल, स्वामी शनि देव का गोचर फल, करियर उन्नति व शुभ नीलम रत्न — अभी पढ़ें ➔',
    cardTitle: 'MAKAR RASHIFAL (CAPRICORN)',
    cardSub: 'Swami Shani Dev • Daily Gochar • Hard Work, Success & Blue Sapphire',
    shortCard: 'MAKAR RASHIFAL\nDaily Horoscope & Upay',
    badge: 'VEDIC RASHIFAL • MAKAR (CAPRICORN)',
    art: 'shani',
    accent: '#6366f1'
  },
  '/kumbh-rashifal': {
    title: 'कुम्भ राशिफल आज का (Kumbh Rashifal) — साढ़ेसाती फल, धन व नीलम',
    desc: 'कुम्भ राशि (गू, गे, गो, सा, सी, सू, से, सो, दा) का आज का वैदिक राशिफल, स्वामी शनि का गोचर फल, करियर राजयोग, साढ़ेसाती उपाय व नीलम रत्न — अभी देखें ➔',
    cardTitle: 'KUMBH RASHIFAL (AQUARIUS)',
    cardSub: 'Swami Shani Dev • Daily Gochar • Innovation, Sadesati & Neelam Upay',
    shortCard: 'KUMBH RASHIFAL\nDaily Horoscope & Upay',
    badge: 'VEDIC RASHIFAL • KUMBH (AQUARIUS)',
    art: 'shani',
    accent: '#818cf8'
  },
  '/meen-rashifal': {
    title: 'मीन राशिफल आज का (Meen Rashifal) — भाग्य, करियर व पुखराज रत्न',
    desc: 'मीन राशि (दी, दू, थ, झ, ञ, दे, दो, चा, ची) का आज का वैदिक राशिफल, देवगुरु बृहस्पति का गोचर फल, करियर, विदेश योग व पुखराज रत्न — अभी पढ़ें ➔',
    cardTitle: 'MEEN RASHIFAL (PISCES HOROSCOPE)',
    cardSub: 'Swami Guru Brihaspati • Daily Gochar • Spirituality & Yellow Sapphire',
    shortCard: 'MEEN RASHIFAL (PISCES)\nDaily Horoscope & Upay',
    badge: 'VEDIC RASHIFAL • MEEN (PISCES)',
    art: 'rashi',
    accent: '#fbbf24'
  },
  '/ank-jyotish-mulank-calculator': {
    title: 'अंक ज्योतिष कैलकुलेटर | पण्डित जी ऑनलाइन',
    desc: 'जन्म तिथि से जानें अपना मूलांक (1-9), भाग्यांक, स्वामी ग्रह, लकी मोबाइल नंबर और गाड़ी का भाग्यशाली नंबर — अभी निःशुल्क जांचें ➔',
    cardTitle: 'ANK JYOTISH MULANK CALCULATOR',
    cardSub: 'Mulank 1-9 • Bhagyank • Lucky Mobile & Vehicle Number Check',
    shortCard: 'MULANK & BHAGYANK\nLucky Number Calculator',
    badge: 'VEDIC NUMEROLOGY • MULANK 1-9',
    art: 'kundli',
    accent: '#f59e0b'
  },
  '/naam-se-kundali-milan': {
    title: 'सिर्फ नाम से 36 गुण कुंडली मिलान | पण्डित जी ऑनलाइन',
    desc: 'जन्म समय याद न होने पर केवल वर और कन्या के प्रचलित नाम से करें अष्टकूट 36 गुण विवाह मिलान एवं नाड़ी-भकूट दोष परिहार — अभी मिलाएं ➔',
    cardTitle: 'NAAM SE 36 GUN KUNDALI MILAN',
    cardSub: 'No Birth Time Needed • Var-Kanya Name Ashtakoot Matching',
    shortCard: 'NAAM SE 36 GUN MILAN\nVivah Matching by Name',
    badge: 'NAME BASED 36 GUN MARRIAGE MATCHING',
    art: 'milan',
    accent: '#f43f5e'
  },
  '/vivah-yog-calculator': {
    title: 'मेरी शादी कब और किस दिशा में होगी? — विवाह योग कैलकुलेटर',
    desc: 'जन्म तिथि या नाम राशि से जानें आपके विवाह का सटीक शुभ वर्ष, जीवनसाथी का स्वभाव, ससुराल की शुभ दिशा व शीघ्र विवाह के उपाय — अभी देखें ➔',
    cardTitle: 'VIVAH YOG & DIRECTION CALCULATOR',
    cardSub: 'Marriage Year • Spouse Nature • Sasural Direction & Vivah Upay',
    shortCard: 'VIVAH YOG CALCULATOR\nShadi Kab & Kis Disha Me',
    badge: '7TH HOUSE MARRIAGE PREDICTION TOOL',
    art: 'milan',
    accent: '#ec4899'
  },
  '/sarkari-naukri-rajyog': {
    title: 'सरकारी नौकरी एवं धन राजयोग कैलकुलेटर | पण्डित जी ऑनलाइन',
    desc: 'कुंडली व नाम राशि में सूर्य, गुरु, शनि और मंगल की स्थिति से जानें सरकारी नौकरी (IAS/PCS/Police/Bank/Teacher) व उच्च राजयोग — अभी जांचें ➔',
    cardTitle: 'SARKARI NAUKRI & RAJYOG CHECK',
    cardSub: 'Surya, Guru & Shani Analysis • Govt Job Yoga & Career Remedies',
    shortCard: 'SARKARI NAUKRI RAJYOG\nGovt Job & Wealth Check',
    badge: '10TH HOUSE CAREER & RAJYOG CALCULATOR',
    art: 'kundli',
    accent: '#10b981'
  },
  '/bhumi-pujan-muhurat': {
    title: 'भूमि पूजन मुहूर्त 2026-27 | पण्डित जी ऑनलाइन',
    desc: 'साल 2026-2027 में नए मकान या प्लॉट के भूमि पूजन व शिलान्यास की सर्वोत्तम शुभ तिथियां, नाग फण दिशा विचार व कलश स्थापना विधि — अभी देखें ➔',
    cardTitle: 'BHUMI PUJAN MUHURAT 2026-2027',
    cardSub: 'Foundation Laying Dates • Vastu Nag Phan Direction & Puja Vidhi',
    shortCard: 'BHUMI PUJAN 2026-27\nNeev Rakhne Ki Shubh Tithi',
    badge: 'VASTU SHILANYAS & BHUMI PUJAN MUHURAT',
    art: 'panchang',
    accent: '#f59e0b'
  },
  '/dukan-vyapar-muhurat': {
    title: 'नया व्यापार व दुकान खोलने का शुभ मुहूर्त 2026-27 | पण्डित जी ऑनलाइन',
    desc: '2026-2027 में नई दुकान, ऑफिस, शोरूम या फैक्ट्री उद्घाटन के लिए सर्वोत्तम शुभ मुहूर्त, अमृत-लाभ चौघड़िया व गल्ला पूजन विधि — अभी पढ़ें ➔',
    cardTitle: 'DUKAN & VYAPAR MUHURAT 2026-27',
    cardSub: 'New Business & Shop Opening Dates • Shubh Choghadiya & Lagna',
    shortCard: 'VYAPAR MUHURAT 2026-27\nDukan & Office Opening',
    badge: 'AUSPICIOUS BUSINESS OPENING MUHURAT',
    art: 'panchang',
    accent: '#10b981'
  },
  '/naamkaran-muhurat': {
    title: 'नामकरण संस्कार मुहूर्त 2026-27 | पण्डित जी ऑनलाइन',
    desc: 'नवजात शिशु के नामकरण संस्कार हेतु 2026-2027 की शुभ तिथियां, 11वें/12वें दिन का शास्त्रीय नियम व 27 नक्षत्र नामाक्षर चक्र — अभी देखें ➔',
    cardTitle: 'SHISHU NAAMKARAN MUHURAT 2026-27',
    cardSub: 'Baby Naming Ceremony Dates • 27 Nakshatra Syllable Guide',
    shortCard: 'NAAMKARAN MUHURAT\nBaby Naming Shubh Tithi',
    badge: 'VEDIC SHISHU NAAMKARAN SANSKAR',
    art: 'panchang',
    accent: '#38bdf8'
  },
  '/annaprashan-muhurat': {
    title: 'अन्नप्राशन मुहूर्त 2026-27 | पण्डित जी ऑनलाइन',
    desc: 'साल 2026-2027 में शिशु के अन्नप्राशन संस्कार (मुंहजुठी) की सबसे शुभ तिथियां, छठे/सातवें मास का नियम व खीर पूजन विधि — अभी जांचें ➔',
    cardTitle: 'ANNAPRASHAN MUHURAT 2026-2027',
    cardSub: 'Baby First Solid Food Ceremony • Even/Odd Month Vedic Rules',
    shortCard: 'ANNAPRASHAN 2026-27\nShishu First Food Dates',
    badge: 'SHISHU ANNAPRASHAN SANSKAR MUHURAT',
    art: 'panchang',
    accent: '#f97316'
  },
  '/surya-chandra-grahan-2027': {
    title: 'सूर्य ग्रहण और चंद्र ग्रहण 2026-27 | पण्डित जी ऑनलाइन',
    desc: 'वर्ष 2026 और 2027 में लगने वाले सभी सूर्य ग्रहण व चंद्र ग्रहण की तिथियां, भारत में दृश्यता, सूतक काल समय व गर्भवती महिलाओं के नियम ➔',
    cardTitle: 'SURYA & CHANDRA GRAHAN 2026-27',
    cardSub: 'Solar & Lunar Eclipse Timings in India • Sutak Kaal & Rashi Phal',
    shortCard: 'GRAHAN LIST 2026-27\nSutak Time & Rashi Effect',
    badge: 'DRIK GANIT ECLIPSE CALENDAR 2026-27',
    art: 'shani',
    accent: '#818cf8'
  },
  '/purnima-vrat-2027': {
    title: 'पूर्णिमा व्रत कैलेंडर 2026-27 | पण्डित जी ऑनलाइन',
    desc: 'साल 2026-2027 की सभी 12 पूर्णिमा व्रत तिथियां, सत्यनारायण कथा मुहूर्त, चंद्रोदय अर्घ्य समय व स्नान-दान का शास्त्रीय महत्व — अभी देखें ➔',
    cardTitle: 'PURNIMA VRAT CALENDAR 2026-2027',
    cardSub: 'All 12 Purnima Tithi • Satyanarayan Katha & Chandrodaya Time',
    shortCard: 'PURNIMA VRAT 2026-27\nSnan-Daan & Puja Dates',
    badge: 'SANATAN PURNIMA VRAT PANCHANG',
    art: 'panchang',
    accent: '#fbbf24'
  },
  '/amavasya-2027': {
    title: 'अमावस्या तिथि कैलेंडर 2026-27 | पण्डित जी ऑनलाइन',
    desc: 'वर्ष 2026-2027 की सभी अमावस्या तिथियां (सोमवती, मौनी, शनिश्चरी, महालया अमावस्या), पितृ तर्पण समय व पीपल पूजन के अचूक उपाय — अभी पढ़ें ➔',
    cardTitle: 'AMAVASYA TITHI LIST 2026-2027',
    cardSub: 'Somvati, Mauni & Shani Amavasya • Pitra Tarpan & Peepal Puja',
    shortCard: 'AMAVASYA LIST 2026-27\nPitra Tarpan & Snan Dates',
    badge: 'VEDIC AMAVASYA & PITRA SHANTI GUIDE',
    art: 'panchang',
    accent: '#6366f1'
  },
  '/pradosh-vrat-2027': {
    title: 'प्रदोष व्रत कैलेंडर 2026-27 | पण्डित जी ऑनलाइन',
    desc: 'साल 2026-2027 के सभी 24 प्रदोष व्रत (सोम प्रदोष, भौम प्रदोष, शनि प्रदोष) की तिथियां, सायंकाल शिव अभिषेक मुहूर्त व प्रदोष व्रत कथा ➔',
    cardTitle: 'PRADOSH VRAT CALENDAR 2026-2027',
    cardSub: 'Som, Bhaum & Shani Pradosh Dates • Evening Shiva Puja Time',
    shortCard: 'PRADOSH VRAT 2026-27\nShiva Abhishek Muhurat',
    badge: 'SHIVA PRADOSH KAAL PUJA PANCHANG',
    art: 'puja',
    accent: '#f97316'
  },
  '/sankashti-chaturthi-2027': {
    title: 'संकष्टी चतुर्थी 2026-27 | पण्डित जी ऑनलाइन',
    desc: 'वर्ष 2026-2027 की सभी संकष्टी गणेश चतुर्थी, माघी सकट चौथ व अंगारकी चौथ व्रत तिथियां, चंद्रोदय अर्घ्य समय व श्री गणेश पूजा विधि ➔',
    cardTitle: 'SANKASHTI CHATURTHI 2026-2027',
    cardSub: 'Sakat Chauth & Angarki Chaturthi • Moonrise Time & Ganesh Puja',
    shortCard: 'SANKASHTI VRAT 2026-27\nChandrodaya & Ganesh Puja',
    badge: 'GANESH SANKASHTI VRAT CALENDAR',
    art: 'puja',
    accent: '#ef4444'
  },
  '/k-naam-rashi-swabhav': {
    title: 'K नाम की राशि क्या है? (K Naam Ki Rashi) मिथुन राशि, स्वभाव व प्रेम | पण्डित जी ऑनलाइन',
    desc: 'K (क, का, की, कू, के, को) नाम वालों की राशि मिथुन (स्वामी बुध) होती है। जानें K नाम वालों का स्वभाव, लव लाइफ, करियर व पन्ना रत्न — अभी देखें ➔',
    cardTitle: 'K NAAM KI RASHI: MITHUN (GEMINI)',
    cardSub: 'Swami Budh • Intelligent Nature • Career, Love & Panna Ratna',
    shortCard: 'K NAAM KI RASHI\nMithun Rashi & Swabhav',
    badge: 'K LETTER ZODIAC & PERSONALITY GUIDE',
    art: 'rashi',
    accent: '#10b981'
  },
  '/n-naam-rashi-swabhav': {
    title: 'N नाम की राशि क्या है? (N Naam Ki Rashi) वृश्चिक राशि, स्वभाव व प्यार | पण्डित जी ऑनलाइन',
    desc: 'N (न, ना, नी, नू, ने, नो) नाम वालों की राशि वृश्चिक (स्वामी मंगल) होती है। जानें N नाम वालों का निडर स्वभाव, सच्चा प्यार, करियर व मूंगा रत्न ➔',
    cardTitle: 'N NAAM KI RASHI: VRISHCHIK (SCORPIO)',
    cardSub: 'Swami Mangal • Fearless Nature • Love, Career & Moonga Ratna',
    shortCard: 'N NAAM KI RASHI\nVrishchik Rashi & Swabhav',
    badge: 'N LETTER ZODIAC & PERSONALITY GUIDE',
    art: 'rashi',
    accent: '#ef4444'
  },
  '/v-naam-rashi-swabhav': {
    title: 'V नाम की राशि क्या है? (V Naam Ki Rashi) वृषभ राशि, स्वभाव व धन योग | पण्डित जी ऑनलाइन',
    desc: 'V (व, वा, वी, वू, वे, वो) नाम वालों की राशि वृषभ (स्वामी शुक्र) होती है। जानें V नाम वालों का आकर्षक स्वभाव, धन राजयोग, प्रेम व ओपल रत्न ➔',
    cardTitle: 'V NAAM KI RASHI: VRISHABH (TAURUS)',
    cardSub: 'Swami Shukra • Wealth & Luxury • Career, Marriage & Opal Ratna',
    shortCard: 'V NAAM KI RASHI\nVrishabh Rashi & Swabhav',
    badge: 'V LETTER ZODIAC & PERSONALITY GUIDE',
    art: 'rashi',
    accent: '#ec4899'
  },
  '/b-naam-rashi-swabhav': {
    title: 'B नाम की राशि क्या है? (B Naam Ki Rashi) धनु व वृषभ, स्वभाव व भाग्य | पण्डित जी ऑनलाइन',
    desc: 'B (ब, बा, बी, बू, भ, भा, भी, भू) नाम वालों की राशि वृषभ व धनु होती है। जानें B नाम वालों का सच्चा स्वभाव, विवाह, करियर व लकी रत्न — अभी देखें ➔',
    cardTitle: 'B NAAM KI RASHI: VRISHABH & DHANU',
    cardSub: 'Swami Shukra & Guru • Honest Nature • Career, Love & Lucky Ratna',
    shortCard: 'B NAAM KI RASHI\nSwabhav, Vivah & Career',
    badge: 'B LETTER ZODIAC & PERSONALITY GUIDE',
    art: 'rashi',
    accent: '#f59e0b'
  },
  '/d-naam-rashi-swabhav': {
    title: 'D नाम की राशि क्या है? (D Naam Ki Rashi) मीन व कर्क, स्वभाव व करियर | पण्डित जी ऑनलाइन',
    desc: 'D (द, दी, दू, दे, दो, ड, डी, डू) नाम वालों की राशि मीन, कुम्भ व कर्क होती है। जानें D नाम वालों का स्वभाव, प्रेम, भाग्योदय व पुखराज रत्न ➔',
    cardTitle: 'D NAAM KI RASHI: MEEN & KARK',
    cardSub: 'Swami Guru & Chandra • Kind Nature • Career, Marriage & Pukhraj',
    shortCard: 'D NAAM KI RASHI\nSwabhav, Career & Ratna',
    badge: 'D LETTER ZODIAC & PERSONALITY GUIDE',
    art: 'rashi',
    accent: '#fbbf24'
  },
  '/g-naam-rashi-swabhav': {
    title: 'G नाम की राशि क्या है? (G Naam Ki Rashi) कुम्भ व मकर, स्वभाव व कर्म | पण्डित जी ऑनलाइन',
    desc: 'G (ग, गा, गी, गू, गे, गो) नाम वालों की राशि कुम्भ व मकर (स्वामी शनि) होती है। जानें G नाम वालों का मेहनती स्वभाव, धन योग, प्रेम व नीलम रत्न ➔',
    cardTitle: 'G NAAM KI RASHI: KUMBH & MAKAR',
    cardSub: 'Swami Shani Dev • Disciplined Nature • Career, Wealth & Neelam',
    shortCard: 'G NAAM KI RASHI\nKumbh/Makar & Swabhav',
    badge: 'G LETTER ZODIAC & PERSONALITY GUIDE',
    art: 'shani',
    accent: '#6366f1'
  },
  '/h-naam-rashi-swabhav': {
    title: 'H नाम की राशि क्या है? (H Naam Ki Rashi) कर्क व मिथुन, स्वभाव व प्रेम | पण्डित जी ऑनलाइन',
    desc: 'H (ह, ही, हू, हे, हो) नाम वालों की राशि कर्क (स्वामी चंद्रमा) व मिथुन होती है। जानें H नाम वालों का भावुक स्वभाव, परिवार प्रेम, धन व मोती रत्न ➔',
    cardTitle: 'H NAAM KI RASHI: KARK (CANCER)',
    cardSub: 'Swami Chandra • Caring Nature • Family, Wealth & Pearl (Moti)',
    shortCard: 'H NAAM KI RASHI\nKark Rashi & Swabhav',
    badge: 'H LETTER ZODIAC & PERSONALITY GUIDE',
    art: 'rashi',
    accent: '#38bdf8'
  },
  '/j-naam-rashi-swabhav': {
    title: 'J नाम की राशि क्या है? (J Naam Ki Rashi) मकर राशि, स्वभाव व राजयोग | पण्डित जी ऑनलाइन',
    desc: 'J (ज, जा, जी, खी, खू, खे, खो) नाम वालों की राशि मकर (स्वामी शनि देव) होती है। जानें J नाम वालों का दृढ़ स्वभाव, प्रशासनिक योग, प्रेम व नीलम रत्न ➔',
    cardTitle: 'J NAAM KI RASHI: MAKAR (CAPRICORN)',
    cardSub: 'Swami Shani Dev • Ambitious Nature • Career, Love & Neelam Ratna',
    shortCard: 'J NAAM KI RASHI\nMakar Rashi & Swabhav',
    badge: 'J LETTER ZODIAC & PERSONALITY GUIDE',
    art: 'shani',
    accent: '#818cf8'
  },
  '/t-naam-rashi-swabhav': {
    title: 'T नाम की राशि क्या है? (T Naam Ki Rashi) तुला व सिंह, स्वभाव व करियर | पण्डित जी ऑनलाइन',
    desc: 'T (त, ता, ती, तू, ते, ट, टा, टी, टू) नाम वालों की राशि तुला व सिंह होती है। जानें T नाम वालों का नेतृत्व स्वभाव, प्रेम, धन योग व लकी रत्न ➔',
    cardTitle: 'T NAAM KI RASHI: TULA & SINGH',
    cardSub: 'Swami Shukra & Surya • Dynamic Nature • Career, Love & Ratna',
    shortCard: 'T NAAM KI RASHI\nTula/Singh & Swabhav',
    badge: 'T LETTER ZODIAC & PERSONALITY GUIDE',
    art: 'rashi',
    accent: '#f43f5e'
  },
  '/y-naam-rashi-swabhav': {
    title: 'Y नाम की राशि क्या है? (Y Naam Ki Rashi) वृश्चिक व धनु, स्वभाव व भाग्य | पण्डित जी ऑनलाइन',
    desc: 'Y (य, या, यी, यू, ये, यो) नाम वालों की राशि वृश्चिक व धनु होती है। जानें Y नाम वालों का स्पष्टवादी स्वभाव, करियर सफलता, विवाह व लकी रत्न ➔',
    cardTitle: 'Y NAAM KI RASHI: VRISHCHIK & DHANU',
    cardSub: 'Swami Mangal & Guru •Focused Nature • Career, Marriage & Ratna',
    shortCard: 'Y NAAM KI RASHI\nSwabhav, Vivah & Career',
    badge: 'Y LETTER ZODIAC & PERSONALITY GUIDE',
    art: 'rashi',
    accent: '#eab308'
  },
  '/l-naam-rashi-swabhav': {
    title: 'L नाम की राशि क्या है? (L Naam Ki Rashi) मेष राशि, स्वभाव व प्रेम | पण्डित जी ऑनलाइन',
    desc: 'L (ल, ला, ली, लू, ले, लो) नाम वालों की राशि मेष (स्वामी मंगल) होती है। जानें L नाम वालों का ऊर्जावान स्वभाव, सच्चा प्यार, करियर व मूंगा रत्न ➔',
    cardTitle: 'L NAAM KI RASHI: MESH (ARIES)',
    cardSub: 'Swami Mangal • Energetic Nature • Love Life, Career & Moonga',
    shortCard: 'L NAAM KI RASHI\nMesh Rashi & Swabhav',
    badge: 'L LETTER ZODIAC & PERSONALITY GUIDE',
    art: 'rashi',
    accent: '#ef4444'
  },
  '/c-naam-rashi-swabhav': {
    title: 'C नाम की राशि क्या है? (C Naam Ki Rashi) मेष व मीन, स्वभाव व धन योग | पण्डित जी ऑनलाइन',
    desc: 'C (च, चू, चे, चो, चा, ची, छ) नाम वालों की राशि मेष, मीन व मिथुन होती है। जानें C नाम वालों का आकर्षक स्वभाव, करियर, प्रेम व भाग्यशाली रत्न ➔',
    cardTitle: 'C NAAM KI RASHI: MESH & MEEN',
    cardSub: 'Swami Mangal & Guru • Creative Nature • Career, Love & Ratna',
    shortCard: 'C NAAM KI RASHI\nMesh/Meen & Swabhav',
    badge: 'C LETTER ZODIAC & PERSONALITY GUIDE',
    art: 'rashi',
    accent: '#f97316'
  }
};

function xmlEscape(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function resolveRouteInfo(rawPath, searchParams) {
  let clean = String(rawPath || '/')
    .split('?')[0]
    .split('#')[0]
    .split('&')[0]
    .replace(/\/+$/, '')
    .replace(/\/(v=?\d+|s=?\w+|\d+|new|share|test|preview)$/i, '')
    .replace(/[-_.]v=?\d+$/i, '')
    .toLowerCase() || '/';
  if (clean === '/index.html' || clean === '/index') clean = '/';

  // Support ?tab= or ?category= deep links when path is /
  if (clean === '/' && searchParams) {
    const cat = (searchParams.get('category') || '').trim().toLowerCase();
    if (cat) {
      const catPath = '/' + cat.replace(/^\/+/, '');
      if (ROUTE_ALIASES[catPath]) clean = ROUTE_ALIASES[catPath];
      else if (ROUTE_DATA[catPath]) clean = catPath;
    }
    const tab = (searchParams.get('tab') || '').trim().toLowerCase();
    if (tab && tab !== 'home' && clean === '/') {
      const tabPath = '/' + tab.replace(/^\/+/, '');
      if (ROUTE_ALIASES[tabPath]) clean = ROUTE_ALIASES[tabPath];
      else if (ROUTE_DATA[tabPath]) clean = tabPath;
    }
  }

  let canonicalPath = ROUTE_ALIASES[clean] || clean;
  let info = ROUTE_DATA[canonicalPath] || ROUTE_DATA[clean];
  if (info) {
    return { path: canonicalPath, ...info };
  }

  // If user appended a custom suffix segment (e.g., /panchang/2 or /s-naam-rashi-swabhav/xyz), match the base route
  const segments = clean.split('/').filter(Boolean);
  if (segments.length >= 2 && segments[0] !== 'puja') {
    const firstSegPath = '/' + segments[0];
    const resolvedFirst = ROUTE_ALIASES[firstSegPath] || firstSegPath;
    if (ROUTE_DATA[resolvedFirst]) {
      return { path: resolvedFirst, ...ROUTE_DATA[resolvedFirst] };
    }
  }

  const slugWords = canonicalPath.replace(/^\/+/, '').replace(/[/-]+/g, ' ').trim().toUpperCase() || 'VEDIC JYOTISH';
  return {
    path: canonicalPath,
    title: `${slugWords} — वैदिक ज्योतिष एवं सनातन धर्म ज्ञान | पण्डित जी ऑनलाइन`,
    desc: 'पण्डित जी ऑनलाइन (आचार्य पण्डित शशांक शर्मा, रुद्रपुर) पर निःशुल्क वैदिक जन्म कुंडली, 36 गुण मिलान, दृक पंचांग, शुभ मुहूर्त एवं डिजिटल मंदिर दर्शन प्राप्त करें।',
    cardTitle: slugWords.slice(0, 38),
    cardSub: 'Vedic Janam Kundali • 36 Gun Milan • Drik Panchang • Digital Mandir',
    shortCard: `${slugWords.slice(0, 22)}\nPandit Ji Online`,
    badge: 'PANDIT JI ONLINE • RUDRAPUR',
    art: 'gyan',
    accent: '#f59e0b'
  };
}

function renderArtworkSvg(art, accent) {
  if (art === 'mandir') {
    return `
      <g transform="translate(970, 286)">
        <circle cx="0" cy="0" r="168" fill="url(#emblemGlow)"/>
        <circle cx="0" cy="0" r="146" fill="#220903" stroke="#fde047" stroke-width="4"/>
        <circle cx="0" cy="0" r="132" fill="none" stroke="${accent}" stroke-width="1.8" stroke-dasharray="7 5"/>
        <polygon points="0,-108 -78,24 78,24" fill="#3b1105" stroke="#facc15" stroke-width="4"/>
        <polygon points="0,-82 -56,24 56,24" fill="${accent}" fill-opacity="0.34" stroke="#fde047" stroke-width="2.5"/>
        <circle cx="0" cy="-118" r="9" fill="#facc15"/>
        <path d="M 0,-127 L 0,-145 L 44,-134 L 0,-124 Z" fill="#ef4444" stroke="#fde047" stroke-width="1.2"/>
        <rect x="-68" y="24" width="136" height="66" rx="4" fill="#320e04" stroke="#facc15" stroke-width="3"/>
        <rect x="-28" y="38" width="56" height="52" rx="28" fill="#541c06" stroke="#fde047" stroke-width="2.5"/>
        <path d="M -18,78 Q 0,94 18,78 Z" fill="#f59e0b"/>
        <path d="M 0,50 Q -10,68 0,76 Q 10,68 0,50 Z" fill="#fef08a"/>
        <rect x="-88" y="90" width="176" height="12" rx="5" fill="#facc15"/>
        <rect x="-88" y="108" width="176" height="32" rx="16" fill="#451a03" stroke="#fde047" stroke-width="2.2"/>
        <text x="0" y="129" font-family="sans-serif" font-size="14" font-weight="900" fill="#fef08a" text-anchor="middle" letter-spacing="1.8">3D LIVE MANDIR</text>
      </g>`;
  }
  if (art === 'kundli') {
    return `
      <g transform="translate(970, 286)">
        <circle cx="0" cy="0" r="168" fill="url(#emblemGlow)"/>
        <circle cx="0" cy="0" r="146" fill="#220903" stroke="#fde047" stroke-width="4"/>
        <circle cx="0" cy="0" r="132" fill="none" stroke="${accent}" stroke-width="1.6" stroke-dasharray="6 6"/>
        <rect x="-92" y="-98" width="184" height="184" fill="#320e04" stroke="#facc15" stroke-width="3.8"/>
        <line x1="-92" y1="-98" x2="92" y2="86" stroke="#fbbf24" stroke-width="2.4"/>
        <line x1="92" y1="-98" x2="-92" y2="86" stroke="#fbbf24" stroke-width="2.4"/>
        <polygon points="0,-98 92,-6 0,86 -92,-6" fill="#541c06" fill-opacity="0.55" stroke="#fde047" stroke-width="2.8"/>
        <text x="0" y="-42" font-family="sans-serif" font-size="16" font-weight="900" fill="#fef08a" text-anchor="middle">LAGNA</text>
        <text x="0" y="-21" font-family="sans-serif" font-size="14" font-weight="900" fill="#fb923c" text-anchor="middle">D-1 &amp; D-9</text>
        <text x="-48" y="-1" font-family="sans-serif" font-size="15" font-weight="900" fill="#fde68a" text-anchor="middle">4</text>
        <text x="0" y="46" font-family="sans-serif" font-size="15" font-weight="900" fill="#fde68a" text-anchor="middle">7</text>
        <text x="48" y="-1" font-family="sans-serif" font-size="15" font-weight="900" fill="#fde68a" text-anchor="middle">10</text>
        <rect x="-88" y="102" width="176" height="32" rx="16" fill="#451a03" stroke="#fde047" stroke-width="2.2"/>
        <text x="0" y="123" font-family="sans-serif" font-size="14" font-weight="900" fill="#fef08a" text-anchor="middle" letter-spacing="1.5">VEDIC KUNDALI</text>
      </g>`;
  }
  if (art === 'milan') {
    return `
      <g transform="translate(970, 286)">
        <circle cx="0" cy="0" r="168" fill="url(#emblemGlow)"/>
        <circle cx="0" cy="0" r="146" fill="#220903" stroke="#fde047" stroke-width="4"/>
        <circle cx="0" cy="0" r="132" fill="none" stroke="#f472b6" stroke-width="2" stroke-dasharray="7 5"/>
        <circle cx="-30" cy="-22" r="50" fill="#451a03" fill-opacity="0.5" stroke="#facc15" stroke-width="5.5"/>
        <circle cx="30" cy="-22" r="50" fill="#500724" fill-opacity="0.5" stroke="#fb7185" stroke-width="5.5"/>
        <rect x="-78" y="44" width="156" height="40" rx="20" fill="#831843" stroke="#fde047" stroke-width="2.5"/>
        <text x="0" y="70" font-family="sans-serif" font-size="19" font-weight="900" fill="#fef08a" text-anchor="middle" letter-spacing="1.5">36 / 36 GUN</text>
        <text x="0" y="114" font-family="sans-serif" font-size="14" font-weight="900" fill="#fbcfe8" text-anchor="middle" letter-spacing="1.5">ASHTAKOOT MILAN</text>
      </g>`;
  }
  if (art === 'panchang') {
    return `
      <g transform="translate(970, 286)">
        <circle cx="0" cy="0" r="168" fill="url(#emblemGlow)"/>
        <circle cx="0" cy="0" r="146" fill="#220903" stroke="#fde047" stroke-width="4"/>
        <circle cx="0" cy="0" r="128" fill="none" stroke="#fde047" stroke-width="2" stroke-dasharray="8 6"/>
        <polygon points="0,-96 24,-34 86,-34 36,6 54,68 0,32 -54,68 -36,6 -86,-34 -24,-34" fill="#f59e0b" fill-opacity="0.28" stroke="#fde047" stroke-width="2"/>
        <circle cx="0" cy="-14" r="56" fill="#3b1105" stroke="#facc15" stroke-width="4"/>
        <circle cx="0" cy="-14" r="35" fill="#fde047"/>
        <path d="M 12,-36 A 24,24 0 1,0 12,8 A 18,18 0 1,1 12,-36 Z" fill="#220903"/>
        <rect x="-88" y="64" width="176" height="36" rx="18" fill="#451a03" stroke="#fde047" stroke-width="2.4"/>
        <text x="0" y="88" font-family="sans-serif" font-size="15" font-weight="900" fill="#fef08a" text-anchor="middle" letter-spacing="1.5">DRIK PANCHANG</text>
      </g>`;
  }
  if (art === 'rashi') {
    return `
      <g transform="translate(970, 286)">
        <circle cx="0" cy="0" r="168" fill="url(#emblemGlow)"/>
        <circle cx="0" cy="0" r="146" fill="#220903" stroke="#fde047" stroke-width="4"/>
        <circle cx="0" cy="0" r="126" fill="none" stroke="#facc15" stroke-width="2.2"/>
        <circle cx="0" cy="-6" r="82" fill="#3b0764" fill-opacity="0.75" stroke="#fde047" stroke-width="2.8"/>
        <line x1="0" y1="-126" x2="0" y2="114" stroke="#facc15" stroke-width="1.4" stroke-opacity="0.55"/>
        <line x1="-126" y1="-6" x2="126" y2="-6" stroke="#facc15" stroke-width="1.4" stroke-opacity="0.55"/>
        <line x1="-88" y1="-94" x2="88" y2="82" stroke="#facc15" stroke-width="1.4" stroke-opacity="0.55"/>
        <line x1="88" y1="-94" x2="-88" y2="82" stroke="#facc15" stroke-width="1.4" stroke-opacity="0.55"/>
        <text x="0" y="-12" font-family="sans-serif" font-size="33" font-weight="900" fill="#fef08a" text-anchor="middle">A - Z</text>
        <text x="0" y="18" font-family="sans-serif" font-size="16" font-weight="900" fill="#f3e8ff" text-anchor="middle" letter-spacing="1.5">12 RASHI</text>
        <rect x="-88" y="88" width="176" height="32" rx="16" fill="#4c1d95" stroke="#fde047" stroke-width="2.2"/>
        <text x="0" y="109" font-family="sans-serif" font-size="14" font-weight="900" fill="#fef08a" text-anchor="middle" letter-spacing="1.5">27 NAKSHATRA</text>
      </g>`;
  }
  if (art === 'shani') {
    return `
      <g transform="translate(970, 286)">
        <circle cx="0" cy="0" r="168" fill="url(#emblemGlow)"/>
        <circle cx="0" cy="0" r="146" fill="#111827" stroke="#fde047" stroke-width="4"/>
        <circle cx="0" cy="0" r="130" fill="none" stroke="#818cf8" stroke-width="2" stroke-dasharray="7 5"/>
        <ellipse cx="0" cy="-14" rx="98" ry="28" fill="none" stroke="#facc15" stroke-width="6.5" transform="rotate(-18 0 -14)"/>
        <circle cx="0" cy="-14" r="44" fill="#312e81" stroke="#fde047" stroke-width="3.5"/>
        <rect x="-86" y="64" width="172" height="36" rx="18" fill="#1e1b4b" stroke="#fde047" stroke-width="2.2"/>
        <text x="0" y="87" font-family="sans-serif" font-size="15" font-weight="900" fill="#fef08a" text-anchor="middle" letter-spacing="1.5">SHANI GOCHAR</text>
      </g>`;
  }
  if (art === 'puja') {
    return `
      <g transform="translate(970, 286)">
        <circle cx="0" cy="0" r="168" fill="url(#emblemGlow)"/>
        <circle cx="0" cy="0" r="146" fill="#220903" stroke="#fde047" stroke-width="4"/>
        <circle cx="0" cy="0" r="132" fill="none" stroke="#fde047" stroke-width="1.8" stroke-dasharray="7 5"/>
        <polygon points="-76,38 76,38 56,78 -56,78" fill="#7c2d12" stroke="#facc15" stroke-width="3.2"/>
        <rect x="-88" y="78" width="176" height="16" rx="5" fill="#facc15"/>
        <path d="M 0,-90 Q -48,-18 -24,36 L 24,36 Q 48,-18 0,-90 Z" fill="#f97316" stroke="#fde047" stroke-width="2.5"/>
        <path d="M 0,-48 Q -24,-2 -10,36 L 10,36 Q 24,-2 0,-48 Z" fill="#fef08a"/>
        <rect x="-88" y="102" width="176" height="32" rx="16" fill="#451a03" stroke="#fde047" stroke-width="2.2"/>
        <text x="0" y="123" font-family="sans-serif" font-size="14" font-weight="900" fill="#fef08a" text-anchor="middle" letter-spacing="1.5">VEDIC ANUSHTHAN</text>
      </g>`;
  }
  return `
    <g transform="translate(970, 286)">
      <circle cx="0" cy="0" r="168" fill="url(#emblemGlow)"/>
      <circle cx="0" cy="0" r="146" fill="#220903" stroke="#fde047" stroke-width="4"/>
      <circle cx="0" cy="0" r="128" fill="none" stroke="#fde047" stroke-width="2" stroke-dasharray="7 5"/>
      <polygon points="0,-96 28,-28 96,0 28,28 0,96 -28,28 -96,0 -28,-28" fill="${accent}" fill-opacity="0.34" stroke="#facc15" stroke-width="3.2"/>
      <circle cx="0" cy="0" r="46" fill="#451a03" stroke="#fde047" stroke-width="3.5"/>
      <text x="0" y="10" font-family="sans-serif" font-size="28" font-weight="900" fill="#fef08a" text-anchor="middle">OM</text>
      <rect x="-88" y="102" width="176" height="32" rx="16" fill="#451a03" stroke="#fde047" stroke-width="2.2"/>
      <text x="0" y="123" font-family="sans-serif" font-size="14" font-weight="900" fill="#fef08a" text-anchor="middle" letter-spacing="1.5">VEDIC SHASTRA</text>
    </g>`;
}

function splitTitleToLines(title) {
  const words = String(title || '').trim().split(/\s+/).filter(Boolean);
  if (!words.length) return ['PANDIT JI ONLINE'];
  const totalLen = words.reduce((acc, w) => acc + w.length, 0) + words.length - 1;
  if (totalLen <= 20) {
    return [words.join(' ')];
  }
  if (totalLen <= 42) {
    const targetHalf = totalLen / 2;
    let bestIdx = 1;
    let minDiff = Infinity;
    let running = 0;
    for (let i = 0; i < words.length - 1; i++) {
      running += words[i].length + (i > 0 ? 1 : 0);
      const diff = Math.abs(running - targetHalf);
      if (diff < minDiff) {
        minDiff = diff;
        bestIdx = i + 1;
      }
    }
    return [words.slice(0, bestIdx).join(' '), words.slice(bestIdx).join(' ')];
  }
  const targetThird = totalLen / 3;
  let idx1 = 1;
  let idx2 = 2;
  let running = 0;
  for (let i = 0; i < words.length - 2; i++) {
    running += words[i].length + (i > 0 ? 1 : 0);
    if (running >= targetThird) {
      idx1 = i + 1;
      break;
    }
  }
  running = 0;
  for (let i = idx1; i < words.length - 1; i++) {
    running += words[i].length + (i > idx1 ? 1 : 0);
    if (running >= targetThird) {
      idx2 = i + 1;
      break;
    }
  }
  return [
    words.slice(0, idx1).join(' '),
    words.slice(idx1, idx2).join(' '),
    words.slice(idx2).join(' ')
  ].filter(Boolean);
}

function truncateClean(str, maxLen) {
  const s = String(str || '').trim();
  if (s.length <= maxLen) return s;
  return s.slice(0, maxLen - 1).trim() + '…';
}

function buildOgCardSvg(routeInfo, isSquare) {
  const lines = splitTitleToLines(routeInfo.cardTitle || 'PANDIT JI ONLINE');
  const lineCount = lines.length;

  let titleBlock = '';
  let sepY = 368;
  if (lineCount === 1) {
    const fontSize = lines[0].length > 17 ? 34 : 38;
    titleBlock = `<text x="600" y="336" font-family="Arial, Helvetica, system-ui, sans-serif" font-size="${fontSize}" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="0.6">${xmlEscape(lines[0])}</text>`;
    sepY = 360;
  } else if (lineCount === 2) {
    const maxLineLen = Math.max(lines[0].length, lines[1].length);
    const f1 = maxLineLen > 20 ? 31 : 35;
    const f2 = maxLineLen > 20 ? 30 : 34;
    titleBlock = `
      <text x="600" y="314" font-family="Arial, Helvetica, system-ui, sans-serif" font-size="${f1}" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="0.5">${xmlEscape(lines[0])}</text>
      <text x="600" y="356" font-family="Arial, Helvetica, system-ui, sans-serif" font-size="${f2}" font-weight="900" fill="#fde047" text-anchor="middle" letter-spacing="0.5">${xmlEscape(lines[1])}</text>`;
    sepY = 376;
  } else {
    titleBlock = `
      <text x="600" y="302" font-family="Arial, Helvetica, system-ui, sans-serif" font-size="27" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="0.4">${xmlEscape(lines[0])}</text>
      <text x="600" y="335" font-family="Arial, Helvetica, system-ui, sans-serif" font-size="27" font-weight="900" fill="#fde047" text-anchor="middle" letter-spacing="0.4">${xmlEscape(lines[1])}</text>
      <text x="600" y="368" font-family="Arial, Helvetica, system-ui, sans-serif" font-size="25" font-weight="900" fill="#fed7aa" text-anchor="middle" letter-spacing="0.4">${xmlEscape(lines[2])}</text>`;
    sepY = 384;
  }

  const subText = String(routeInfo.cardSub || '');
  const subParts = subText.split('•').map((s) => s.trim()).filter(Boolean);
  const subLine1 = truncateClean(subParts.slice(0, 2).map((s) => '★ ' + s).join('   '), 48);
  const subLine2 = truncateClean(subParts.slice(2, 4).map((s) => '★ ' + s).join('   '), 48);

  const badge = xmlEscape(truncateClean(routeInfo.badge || 'VEDIC JYOTISH SANSTHAN • RUDRAPUR', 38));
  const photoUrl = PANDIT_PORTRAIT_DATA_URI;
  const svgW = isSquare ? 800 : 1200;
  const svgH = isSquare ? 800 : 630;
  const viewBox = isSquare ? '285 0 630 630' : '0 0 1200 630';

  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${svgW}" height="${svgH}" viewBox="${viewBox}">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3b0d03"/>
      <stop offset="50%" stop-color="#1c0502"/>
      <stop offset="100%" stop-color="#350b03"/>
    </linearGradient>
    <radialGradient id="centerSpotlight" cx="50%" cy="38%" r="52%">
      <stop offset="0%" stop-color="#9a3412" stop-opacity="0.55"/>
      <stop offset="70%" stop-color="#431407" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#180502" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="portraitAura" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#fef08a" stop-opacity="0.95"/>
      <stop offset="48%" stop-color="#f59e0b" stop-opacity="0.55"/>
      <stop offset="82%" stop-color="#d97706" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="#d97706" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="wingGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.32"/>
      <stop offset="100%" stop-color="#f59e0b" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#fde047"/>
      <stop offset="50%" stop-color="#f59e0b"/>
      <stop offset="100%" stop-color="#fef08a"/>
    </linearGradient>
    <linearGradient id="ctaGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ea580c"/>
      <stop offset="50%" stop-color="#d97706"/>
      <stop offset="100%" stop-color="#f59e0b"/>
    </linearGradient>
    <clipPath id="panditPhotoClip">
      <circle cx="600" cy="118" r="74"/>
    </clipPath>
  </defs>

  <!-- 1. Widescreen 1200x630 Royal Background -->
  <rect width="1200" height="630" fill="url(#bgGrad)"/>
  <rect width="1200" height="630" fill="url(#centerSpotlight)"/>

  <!-- Outer Widescreen Golden Border -->
  <rect x="14" y="14" width="1172" height="602" rx="22" fill="none" stroke="url(#goldGrad)" stroke-width="3.5" stroke-opacity="0.9"/>
  <rect x="24" y="24" width="1152" height="582" rx="16" fill="none" stroke="#fde047" stroke-width="1.2" stroke-dasharray="8 6" stroke-opacity="0.45"/>

  <!-- 2. LEFT WING DECORATIVE VEDIC KUNDLI MANDALA (Visible on 1200x630 Facebook/Twitter) -->
  <g transform="translate(152, 265)">
    <circle cx="0" cy="0" r="126" fill="url(#wingGlow)"/>
    <circle cx="0" cy="0" r="106" fill="#240803" stroke="#fde047" stroke-width="2.8" stroke-opacity="0.85"/>
    <circle cx="0" cy="0" r="94" fill="none" stroke="#f59e0b" stroke-width="1.4" stroke-dasharray="5 5"/>
    <rect x="-64" y="-64" width="128" height="128" fill="#320c04" stroke="#facc15" stroke-width="2.6"/>
    <line x1="-64" y1="-64" x2="64" y2="64" stroke="#fbbf24" stroke-width="1.8"/>
    <line x1="64" y1="-64" x2="-64" y2="64" stroke="#fbbf24" stroke-width="1.8"/>
    <polygon points="0,-64 64,0 0,64 -64,0" fill="#541c06" fill-opacity="0.5" stroke="#fde047" stroke-width="2.2"/>
    <text x="0" y="-22" font-family="Arial, Helvetica, sans-serif" font-size="13" font-weight="900" fill="#fef08a" text-anchor="middle">LAGNA</text>
    <text x="0" y="4" font-family="Arial, Helvetica, sans-serif" font-size="12" font-weight="900" fill="#fb923c" text-anchor="middle">D-1 • D-9</text>
    <text x="0" y="34" font-family="Arial, Helvetica, sans-serif" font-size="12" font-weight="900" fill="#fde68a" text-anchor="middle">36 GUN</text>
    <rect x="-82" y="122" width="164" height="28" rx="14" fill="#451a03" stroke="#fde047" stroke-width="1.8"/>
    <text x="0" y="140" font-family="Arial, Helvetica, sans-serif" font-size="11.5" font-weight="900" fill="#fef08a" text-anchor="middle" letter-spacing="1">JANAM KUNDALI</text>
  </g>

  <!-- 3. RIGHT WING DECORATIVE DRIK PANCHANG SURYA-CHANDRA MANDALA (Visible on 1200x630 Facebook/Twitter) -->
  <g transform="translate(1048, 265)">
    <circle cx="0" cy="0" r="126" fill="url(#wingGlow)"/>
    <circle cx="0" cy="0" r="106" fill="#240803" stroke="#fde047" stroke-width="2.8" stroke-opacity="0.85"/>
    <circle cx="0" cy="0" r="94" fill="none" stroke="#f59e0b" stroke-width="1.4" stroke-dasharray="5 5"/>
    <polygon points="0,-76 19,-26 70,-26 29,5 44,55 0,25 -44,55 -29,5 -70,-26 -19,-26" fill="#f59e0b" fill-opacity="0.28" stroke="#fde047" stroke-width="1.8"/>
    <circle cx="0" cy="-6" r="42" fill="#3b1105" stroke="#facc15" stroke-width="3"/>
    <circle cx="0" cy="-6" r="25" fill="#fde047"/>
    <circle cx="10" cy="-12" r="20" fill="#3b1105"/>
    <text x="0" y="54" font-family="Arial, Helvetica, sans-serif" font-size="12.5" font-weight="900" fill="#fef08a" text-anchor="middle" letter-spacing="1">12 RASHI</text>
    <rect x="-82" y="122" width="164" height="28" rx="14" fill="#451a03" stroke="#fde047" stroke-width="1.8"/>
    <text x="0" y="140" font-family="Arial, Helvetica, sans-serif" font-size="11.5" font-weight="900" fill="#fef08a" text-anchor="middle" letter-spacing="1">DRIK PANCHANG</text>
  </g>

  <!-- ========================================================================= -->
  <!-- 4. UNIVERSAL SAFE-CENTER CARD (x = 290..910, width = 620px)               -->
  <!-- 100% visible inside WhatsApp Status 1:1 Center Crop AND 1200x630 Feed!    -->
  <!-- ========================================================================= -->
  <rect x="292" y="12" width="616" height="606" rx="22" fill="#210602" fill-opacity="0.92" stroke="url(#goldGrad)" stroke-width="3.2"/>
  <rect x="300" y="20" width="600" height="590" rx="18" fill="none" stroke="#fde047" stroke-width="1.1" stroke-dasharray="6 5" stroke-opacity="0.55"/>

  <!-- Top Left & Top Right Trust Pills Inside Safe Zone -->
  <rect x="312" y="34" width="176" height="30" rx="15" fill="#065f46" stroke="#6ee7b7" stroke-width="1.6"/>
  <text x="400" y="53" font-family="Arial, Helvetica, sans-serif" font-size="11.5" font-weight="900" fill="#ecfdf5" text-anchor="middle" letter-spacing="0.6">★ 100% SATIK DRIK</text>

  <rect x="712" y="34" width="176" height="30" rx="15" fill="#451a03" stroke="#fde047" stroke-width="1.6"/>
  <text x="800" y="53" font-family="Arial, Helvetica, sans-serif" font-size="11.5" font-weight="900" fill="#fef08a" text-anchor="middle" letter-spacing="0.6">✓ SIDDH JYOTISH PEETH</text>

  <!-- ACHARYA PANDIT SHASHANK SHARMA PORTRAIT MEDALLION (Centered at cx=600, cy=118) -->
  <circle cx="600" cy="118" r="102" fill="url(#portraitAura)"/>
  <circle cx="600" cy="118" r="88" fill="none" stroke="#fde047" stroke-width="1.6" stroke-dasharray="5 4" stroke-opacity="0.85"/>
  <circle cx="600" cy="118" r="80" fill="none" stroke="url(#goldGrad)" stroke-width="6"/>
  <circle cx="600" cy="118" r="75" fill="#3b1105"/>

  <!-- High-Res Circular Portrait Photo of Acharya Ji -->
  <image href="${photoUrl}" xlink:href="${photoUrl}" x="526" y="44" width="148" height="148" clip-path="url(#panditPhotoClip)" preserveAspectRatio="xMidYMid slice"/>
  <circle cx="600" cy="118" r="74" fill="none" stroke="#fde047" stroke-width="2.2"/>

  <!-- Green Verified Badge on Portrait -->
  <g transform="translate(654, 170)">
    <circle cx="0" cy="0" r="16" fill="#047857" stroke="#fde047" stroke-width="2.8"/>
    <path d="M-5.5 0 L-1.5 4 L6.5 -4.5" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  </g>

  <!-- Official Nameplate Pill Below Portrait -->
  <rect x="355" y="206" width="490" height="32" rx="16" fill="#451a03" stroke="#fde047" stroke-width="2"/>
  <text x="600" y="227" font-family="Arial, Helvetica, sans-serif" font-size="14.5" font-weight="900" fill="#fef08a" text-anchor="middle" letter-spacing="0.9">ACHARYA PANDIT SHASHANK SHARMA • RUDRAPUR</text>

  <!-- Route Category Badge -->
  <rect x="380" y="246" width="440" height="26" rx="13" fill="#120401" stroke="#f59e0b" stroke-width="1.3"/>
  <text x="600" y="263" font-family="Arial, Helvetica, sans-serif" font-size="11.5" font-weight="900" fill="#fcd34d" text-anchor="middle" letter-spacing="1.2">${badge}</text>

  <!-- Dynamic Center-Aligned Title Block (Never Cut Off on WhatsApp Status or Facebook!) -->
  ${titleBlock}

  <!-- Golden Divider Line -->
  <rect x="345" y="${sepY}" width="510" height="3.8" rx="1.9" fill="url(#goldGrad)"/>

  <!-- Subtitle Features -->
  <text x="600" y="${sepY + 30}" font-family="Arial, Helvetica, sans-serif" font-size="17.5" font-weight="800" fill="#fef3c7" text-anchor="middle">${xmlEscape(subLine1)}</text>
  ${subLine2 ? `<text x="600" y="${sepY + 56}" font-family="Arial, Helvetica, sans-serif" font-size="16.5" font-weight="800" fill="#fed7aa" text-anchor="middle">${xmlEscape(subLine2)}</text>` : ''}

  <!-- High-CTR Irresistible Call To Action Button (For WhatsApp & Facebook Social Cards Only) -->
  <rect x="370" y="446" width="460" height="48" rx="24" fill="url(#ctaGrad)" stroke="#fef08a" stroke-width="2.6"/>
  <text x="600" y="476" font-family="Arial, Helvetica, sans-serif" font-size="18.5" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="0.8">अभी तुरंत अपना सटीक फल देखें • FREE ➔</text>

  <!-- Bottom Brand Safe Footer Inside Center Safe Zone -->
  <rect x="296" y="508" width="608" height="106" rx="18" fill="#120401" fill-opacity="0.97"/>
  <line x1="296" y1="508" x2="904" y2="508" stroke="url(#goldGrad)" stroke-width="2.4"/>
  <text x="600" y="546" font-family="Arial, Helvetica, sans-serif" font-size="21" font-weight="900" fill="#fde047" text-anchor="middle" letter-spacing="0.8">PANDIT JI ONLINE — RUDRAPUR</text>
  <text x="600" y="578" font-family="Arial, Helvetica, sans-serif" font-size="15.5" font-weight="800" fill="#fed7aa" text-anchor="middle" letter-spacing="0.4">Vedic Jyotish Sansthan (Uttarakhand) • www.panditjionline.online</text>
</svg>`;
}

/**
 * 100% Clean, Text-Free, Logo-Free, Badge-Free, Frame-Free, Button-Free 1200x630 Hero Artwork
 * Strictly engineered for Google Discover, RSS feed.xml (<media:content>), Article JSON-LD,
 * and <article><figure><img> so Google Vision OCR detects ZERO promotional text or ad overlays
 * while maximizing visual vibrancy, sacred lighting, and instant human click-through rate.
 */
function buildDiscoverCleanHeroSvg(routeInfo, slug) {
  const art = (routeInfo && routeInfo.art) || 'gyan';
  const accent = (routeInfo && routeInfo.accent) || '#f59e0b';
  const s = String(slug || 'home');
  let seed = 0;
  for (let i = 0; i < s.length; i++) {
    seed = (seed * 31 + s.charCodeAt(i)) % 10007;
  }

  let bgTop = '#14052b';
  let bgMid = '#2c081a';
  let bgBot = '#0f030d';
  let glowPrimary = '#f59e0b';
  let glowSecondary = '#ec4899';

  if (art === 'mandir') {
    bgTop = '#180624';
    bgMid = '#451206';
    bgBot = '#120409';
    glowPrimary = '#fbbf24';
    glowSecondary = '#f97316';
  } else if (art === 'milan') {
    bgTop = '#28041c';
    bgMid = '#540b24';
    bgBot = '#16030d';
    glowPrimary = '#fb7185';
    glowSecondary = '#facc15';
  } else if (art === 'shani') {
    bgTop = '#05081c';
    bgMid = '#15194a';
    bgBot = '#060714';
    glowPrimary = '#818cf8';
    glowSecondary = '#fbbf24';
  } else if (art === 'kundli') {
    bgTop = '#1a0726';
    bgMid = '#3d1206';
    bgBot = '#0e0414';
    glowPrimary = '#f97316';
    glowSecondary = '#fde047';
  } else if (art === 'panchang') {
    bgTop = '#1f071e';
    bgMid = '#4a1504';
    bgBot = '#14050a';
    glowPrimary = '#f59e0b';
    glowSecondary = '#ef4444';
  } else if (art === 'rashi') {
    bgTop = '#13052e';
    bgMid = '#2e1065';
    bgBot = '#0b031a';
    glowPrimary = '#c084fc';
    glowSecondary = '#fde047';
  } else if (art === 'puja') {
    bgTop = '#1c0617';
    bgMid = '#431407';
    bgBot = '#110406';
    glowPrimary = '#fb923c';
    glowSecondary = '#fde047';
  } else {
    bgTop = '#061a26';
    bgMid = '#0f2942';
    bgBot = '#050d1a';
    glowPrimary = '#38bdf8';
    glowSecondary = '#facc15';
  }

  let starsSvg = '';
  for (let i = 0; i < 42; i++) {
    const sx = ((seed + i * 173) % 1140) + 30;
    const sy = ((seed * 3 + i * 97) % 440) + 20;
    const sr = (i % 4 === 0) ? 2.6 : (i % 2 === 0) ? 1.8 : 1.2;
    const sop = (0.35 + ((i % 6) * 0.1)).toFixed(2);
    const col = i % 3 === 0 ? '#fef08a' : i % 3 === 1 ? '#ffffff' : accent;
    starsSvg += `<circle cx="${sx}" cy="${sy}" r="${sr}" fill="${col}" fill-opacity="${sop}"/>`;
    if (i % 7 === 0) {
      starsSvg += `<path d="M ${sx - 7},${sy} L ${sx + 7},${sy} M ${sx},${sy - 7} L ${sx},${sy + 7}" stroke="#fef08a" stroke-width="1" stroke-opacity="0.65"/>`;
    }
  }

  let raysSvg = '';
  for (let a = 0; a < 360; a += 15) {
    const rad1 = ((a - 3.5) * Math.PI) / 180;
    const rad2 = ((a + 3.5) * Math.PI) / 180;
    const x1 = (600 + Math.cos(rad1) * 720).toFixed(1);
    const y1 = (275 + Math.sin(rad1) * 720).toFixed(1);
    const x2 = (600 + Math.cos(rad2) * 720).toFixed(1);
    const y2 = (275 + Math.sin(rad2) * 720).toFixed(1);
    raysSvg += `<polygon points="600,275 ${x1},${y1} ${x2},${y2}" fill="url(#rayGrad)" fill-opacity="0.18"/>`;
  }

  function renderDiya(dx, dy, scale) {
    return `<g transform="translate(${dx}, ${dy}) scale(${scale})">
      <circle cx="0" cy="-22" r="46" fill="url(#flameAura)"/>
      <path d="M 0,-56 C -18,-30 -16,-6 0,2 C 16,-6 18,-30 0,-56 Z" fill="#f97316"/>
      <path d="M 0,-46 C -11,-24 -10,-6 0,0 C 10,-6 11,-24 0,-46 Z" fill="#facc15"/>
      <path d="M 0,-32 C -6,-16 -5,-5 0,-1 C 5,-5 6,-16 0,-32 Z" fill="#ffffff"/>
      <path d="M -42,0 Q 0,14 42,0 L 30,24 Q 0,34 -30,24 Z" fill="url(#brassGrad)" stroke="#fef08a" stroke-width="1.8"/>
      <ellipse cx="0" cy="0" rx="42" ry="7" fill="#78350f" stroke="#fde047" stroke-width="1.5"/>
    </g>`;
  }

  function renderLotus(lx, ly, scale) {
    return `<g transform="translate(${lx}, ${ly}) scale(${scale})">
      <ellipse cx="0" cy="18" rx="68" ry="14" fill="#047857" fill-opacity="0.65" stroke="#34d399" stroke-width="1.2"/>
      <path d="M -54,10 Q -62,-28 -26,-16 Q -10,0 0,12 Z" fill="#db2777" stroke="#fbcfe8" stroke-width="1.2"/>
      <path d="M 54,10 Q 62,-28 26,-16 Q 10,0 0,12 Z" fill="#db2777" stroke="#fbcfe8" stroke-width="1.2"/>
      <path d="M -38,12 Q -42,-42 -12,-28 Q -4,-6 0,12 Z" fill="#ec4899" stroke="#fce7f3" stroke-width="1.3"/>
      <path d="M 38,12 Q 42,-42 12,-28 Q 4,-6 0,12 Z" fill="#ec4899" stroke="#fce7f3" stroke-width="1.3"/>
      <path d="M 0,14 C -24,-10 -22,-48 0,-64 C 22,-48 24,-10 0,14 Z" fill="#f472b6" stroke="#fef08a" stroke-width="1.6"/>
      <circle cx="0" cy="-14" r="10" fill="#fde047" fill-opacity="0.85"/>
    </g>`;
  }

  let centerPiece = '';
  if (art === 'mandir') {
    centerPiece = `
      <g transform="translate(600, 275)">
        <circle cx="0" cy="0" r="245" fill="url(#centerGlow)"/>
        <!-- Hanging Brass Temple Bells -->
        <g transform="translate(-310, -275)">
          <line x1="0" y1="0" x2="0" y2="140" stroke="#fde047" stroke-width="4" stroke-dasharray="8 4"/>
          <path d="M -28,140 Q 0,115 28,140 L 42,195 L -42,195 Z" fill="url(#brassGrad)" stroke="#fef08a" stroke-width="2.2"/>
          <circle cx="0" cy="202" r="9" fill="#fef08a"/>
        </g>
        <g transform="translate(310, -275)">
          <line x1="0" y1="0" x2="0" y2="140" stroke="#fde047" stroke-width="4" stroke-dasharray="8 4"/>
          <path d="M -28,140 Q 0,115 28,140 L 42,195 L -42,195 Z" fill="url(#brassGrad)" stroke="#fef08a" stroke-width="2.2"/>
          <circle cx="0" cy="202" r="9" fill="#fef08a"/>
        </g>
        <!-- Grand Golden Temple Shikharas -->
        <polygon points="-175,85 -110,-85 -45,85" fill="#78350f" stroke="#fde047" stroke-width="3"/>
        <polygon points="45,85 110,-85 175,85" fill="#78350f" stroke="#fde047" stroke-width="3"/>
        <polygon points="0,-195 -135,85 135,85" fill="url(#brassGrad)" stroke="#fef08a" stroke-width="4"/>
        <polygon points="0,-150 -95,85 95,85" fill="#9a3412" fill-opacity="0.7" stroke="#fde047" stroke-width="2.5"/>
        <!-- Kalash & Saffron Dharma Dhwaja -->
        <circle cx="0" cy="-208" r="14" fill="#fef08a"/>
        <path d="M 0,-222 L 0,-260 L 78,-240 L 0,-220 Z" fill="#ef4444" stroke="#fef08a" stroke-width="2"/>
        <!-- Illuminated Garbhagriha Sanctum Arch -->
        <rect x="-155" y="85" width="310" height="110" rx="8" fill="#451a03" stroke="#fde047" stroke-width="3.5"/>
        <path d="M -68,195 L -68,120 A 68,68 0 0,1 68,120 L 68,195 Z" fill="url(#flameAura)" stroke="#fef08a" stroke-width="3"/>
        <!-- Sacred Jyotirlinga & Aura Inside Sanctum -->
        <path d="M -22,185 L -22,142 A 22,22 0 0,1 22,142 L 22,185 Z" fill="#1c1917" stroke="#fde047" stroke-width="2"/>
        <line x1="-14" y1="152" x2="14" y2="152" stroke="#fef08a" stroke-width="2.2"/>
        <line x1="-16" y1="158" x2="16" y2="158" stroke="#fef08a" stroke-width="2.2"/>
        <line x1="-14" y1="164" x2="14" y2="164" stroke="#fef08a" stroke-width="2.2"/>
      </g>`;
  } else if (art === 'milan') {
    centerPiece = `
      <g transform="translate(600, 285)">
        <circle cx="0" cy="-20" r="250" fill="url(#centerGlow)"/>
        <!-- Intertwined Golden & Rose Varmala Rings -->
        <circle cx="-68" cy="-55" r="95" fill="none" stroke="url(#brassGrad)" stroke-width="12" stroke-opacity="0.9"/>
        <circle cx="-68" cy="-55" r="95" fill="none" stroke="#fef08a" stroke-width="3" stroke-dasharray="10 8"/>
        <circle cx="68" cy="-55" r="95" fill="none" stroke="#fb7185" stroke-width="12" stroke-opacity="0.9"/>
        <circle cx="68" cy="-55" r="95" fill="none" stroke="#ffe4e6" stroke-width="3" stroke-dasharray="10 8"/>
        <!-- Sacred Vedic Vivah Agni Flames -->
        <path d="M 0,-185 C -65,-105 -58,-15 0,40 C 58,-15 65,-105 0,-185 Z" fill="#ea580c" fill-opacity="0.9"/>
        <path d="M -32,-130 C -75,-70 -50,5 0,40 C 50,5 75,-70 32,-130 C 12,-85 -12,-85 -32,-130 Z" fill="#f97316"/>
        <path d="M 0,-145 C -38,-85 -34,-15 0,32 C 34,-15 38,-85 0,-145 Z" fill="#facc15"/>
        <path d="M 0,-95 C -18,-55 -16,-10 0,24 C 16,-10 18,-55 0,-95 Z" fill="#ffffff"/>
        <!-- Stepped Copper-Gold Havan Kund -->
        <polygon points="-115,35 115,35 92,75 -92,75" fill="url(#brassGrad)" stroke="#fef08a" stroke-width="3"/>
        <polygon points="-138,75 138,75 118,112 -118,112" fill="#7c2d12" stroke="#fde047" stroke-width="3"/>
        <rect x="-155" y="112" width="310" height="22" rx="6" fill="url(#brassGrad)" stroke="#fef08a" stroke-width="2.5"/>
      </g>`;
  } else if (art === 'shani') {
    centerPiece = `
      <g transform="translate(600, 260)">
        <circle cx="0" cy="0" r="255" fill="url(#centerGlow)"/>
        <!-- Outer Sacred Planetary Orbit Halo -->
        <circle cx="0" cy="0" r="195" fill="none" stroke="#818cf8" stroke-width="2" stroke-dasharray="10 8" stroke-opacity="0.65"/>
        <circle cx="0" cy="0" r="160" fill="none" stroke="#fde047" stroke-width="1.5" stroke-opacity="0.45"/>
        <!-- Majestic 3D Ringed Saturn (Shani Graha) -->
        <g transform="rotate(-18)">
          <ellipse cx="0" cy="0" rx="225" ry="64" fill="none" stroke="#fde047" stroke-width="14" stroke-opacity="0.85"/>
          <ellipse cx="0" cy="0" rx="195" ry="52" fill="none" stroke="#818cf8" stroke-width="10" stroke-opacity="0.9"/>
          <ellipse cx="0" cy="0" rx="168" ry="42" fill="none" stroke="#f59e0b" stroke-width="6" stroke-opacity="0.8"/>
        </g>
        <circle cx="0" cy="0" r="96" fill="#0f172a" stroke="#fde047" stroke-width="5"/>
        <circle cx="-18" cy="-18" r="82" fill="#1e1b4b" fill-opacity="0.85"/>
        <path d="M -88,-28 Q 0,-52 88,-28" fill="none" stroke="#818cf8" stroke-width="5" stroke-opacity="0.55"/>
        <path d="M -94,8 Q 0,-14 94,8" fill="none" stroke="#fbbf24" stroke-width="4" stroke-opacity="0.5"/>
        <path d="M -84,42 Q 0,24 84,42" fill="none" stroke="#6366f1" stroke-width="5" stroke-opacity="0.55"/>
        <!-- Foreground Half of Rings Overlapping Sphere -->
        <g transform="rotate(-18)">
          <path d="M -225,0 A 225,64 0 0,0 225,0" fill="none" stroke="#fef08a" stroke-width="14"/>
          <path d="M -195,0 A 195,52 0 0,0 195,0" fill="none" stroke="#a5b4fc" stroke-width="10"/>
        </g>
      </g>`;
  } else if (art === 'kundli') {
    centerPiece = `
      <g transform="translate(600, 265)">
        <circle cx="0" cy="0" r="250" fill="url(#centerGlow)"/>
        <!-- Sacred 3D Golden Kundali Mandala & Navagraha Orbits -->
        <circle cx="0" cy="0" r="205" fill="none" stroke="#fde047" stroke-width="2.5" stroke-opacity="0.75"/>
        <circle cx="0" cy="0" r="182" fill="none" stroke="#f97316" stroke-width="2" stroke-dasharray="8 6"/>
        <rect x="-128" y="-128" width="256" height="256" fill="#2b0904" fill-opacity="0.78" stroke="url(#brassGrad)" stroke-width="5"/>
        <rect x="-128" y="-128" width="256" height="256" fill="none" stroke="#fde047" stroke-width="3" transform="rotate(45)"/>
        <line x1="-128" y1="-128" x2="128" y2="128" stroke="#fbbf24" stroke-width="3"/>
        <line x1="128" y1="-128" x2="-128" y2="128" stroke="#fbbf24" stroke-width="3"/>
        <polygon points="0,-128 128,0 0,128 -128,0" fill="#451a03" fill-opacity="0.55" stroke="#fef08a" stroke-width="3.5"/>
        <!-- 8 Glowing Planetary Spheres on Outer Ring -->
        <circle cx="0" cy="-205" r="14" fill="#fde047" stroke="#ffffff" stroke-width="2"/>
        <circle cx="145" cy="-145" r="12" fill="#f43f5e" stroke="#fef08a" stroke-width="2"/>
        <circle cx="205" cy="0" r="13" fill="#10b981" stroke="#fef08a" stroke-width="2"/>
        <circle cx="145" cy="145" r="14" fill="#fbbf24" stroke="#ffffff" stroke-width="2"/>
        <circle cx="0" cy="205" r="13" fill="#6366f1" stroke="#fef08a" stroke-width="2"/>
        <circle cx="-145" cy="145" r="12" fill="#ec4899" stroke="#fef08a" stroke-width="2"/>
        <circle cx="-205" cy="0" r="13" fill="#38bdf8" stroke="#fef08a" stroke-width="2"/>
        <circle cx="-145" cy="-145" r="12" fill="#a855f7" stroke="#fef08a" stroke-width="2"/>
        <!-- Center Golden Lotus Core -->
        <circle cx="0" cy="0" r="54" fill="url(#flameAura)" stroke="#fef08a" stroke-width="3.5"/>
        <polygon points="0,-42 12,-12 42,0 12,12 0,42 -12,12 -42,0 -12,-12" fill="#fef08a"/>
      </g>`;
  } else if (art === 'panchang') {
    centerPiece = `
      <g transform="translate(600, 260)">
        <circle cx="0" cy="0" r="250" fill="url(#centerGlow)"/>
        <!-- Blazing 24-Point Surya Mandala & Silver-Gold Chandra -->
        <circle cx="0" cy="-20" r="185" fill="none" stroke="#fde047" stroke-width="2.2" stroke-dasharray="10 6" stroke-opacity="0.7"/>
        <polygon points="0,-175 34,-62 142,-102 62,-8 155,68 42,52 68,162 -15,78 -98,158 -58,45 -168,48 -68,-22 -135,-118 -28,-62" fill="#f59e0b" fill-opacity="0.38" stroke="#fde047" stroke-width="2.8"/>
        <circle cx="0" cy="-20" r="96" fill="url(#brassGrad)" stroke="#fef08a" stroke-width="4.5"/>
        <circle cx="0" cy="-20" r="72" fill="#fef08a"/>
        <!-- Luminous Crescent Moon Embrace -->
        <path d="M 22,-72 A 56,56 0 1,0 22,32 A 42,42 0 1,1 22,-72 Z" fill="#3b0d03"/>
        <!-- Sacred Mangal Kalash in Foreground -->
        <g transform="translate(0, 125)">
          <path d="M -38,-42 Q -62,-68 -82,-35 Q -48,-22 -24,-28 Z" fill="#15803d" stroke="#fde047" stroke-width="1.5"/>
          <path d="M 38,-42 Q 62,-68 82,-35 Q 48,-22 24,-28 Z" fill="#15803d" stroke="#fde047" stroke-width="1.5"/>
          <ellipse cx="0" cy="-48" rx="28" ry="34" fill="#92400e" stroke="#fde047" stroke-width="2.2"/>
          <path d="M -45,-24 L 45,-24 L 68,32 Q 0,68 -68,32 Z" fill="url(#brassGrad)" stroke="#fef08a" stroke-width="3"/>
          <rect x="-52" y="45" width="104" height="14" rx="6" fill="#fde047"/>
        </g>
      </g>`;
  } else if (art === 'rashi') {
    centerPiece = `
      <g transform="translate(600, 260)">
        <circle cx="0" cy="0" r="255" fill="url(#centerGlow)"/>
        <!-- 12-Spoked Luminous Celestial Wheel -->
        <circle cx="0" cy="0" r="198" fill="#1e0938" fill-opacity="0.65" stroke="url(#brassGrad)" stroke-width="5"/>
        <circle cx="0" cy="0" r="162" fill="none" stroke="#fde047" stroke-width="2.5" stroke-dasharray="8 6"/>
        <circle cx="0" cy="0" r="112" fill="#2e1065" fill-opacity="0.8" stroke="#facc15" stroke-width="3.5"/>
        <line x1="0" y1="-198" x2="0" y2="198" stroke="#fde047" stroke-width="2" stroke-opacity="0.65"/>
        <line x1="-198" y1="0" x2="198" y2="0" stroke="#fde047" stroke-width="2" stroke-opacity="0.65"/>
        <line x1="-140" y1="-140" x2="140" y2="140" stroke="#fde047" stroke-width="2" stroke-opacity="0.65"/>
        <line x1="140" y1="-140" x2="-140" y2="140" stroke="#fde047" stroke-width="2" stroke-opacity="0.65"/>
        <!-- Constellation Star Nodes -->
        <polyline points="-130,-75 -65,-135 25,-145 115,-85 145,15 85,115 -35,135 -125,65 -130,-75" fill="none" stroke="#fef08a" stroke-width="2.2" stroke-dasharray="5 4"/>
        <circle cx="-130" cy="-75" r="7" fill="#ffffff"/>
        <circle cx="-65" cy="-135" r="8" fill="#fde047"/>
        <circle cx="25" cy="-145" r="7" fill="#ffffff"/>
        <circle cx="115" cy="-85" r="8" fill="#f472b6"/>
        <circle cx="145" cy="15" r="7" fill="#fde047"/>
        <circle cx="85" cy="115" r="8" fill="#38bdf8"/>
        <circle cx="-35" cy="135" r="7" fill="#fde047"/>
        <circle cx="-125" cy="65" r="8" fill="#ffffff"/>
        <!-- Radiant Starburst Core -->
        <polygon points="0,-78 20,-20 78,0 20,20 0,78 -20,20 -78,0 -20,-20" fill="url(#brassGrad)" stroke="#ffffff" stroke-width="2"/>
        <circle cx="0" cy="0" r="22" fill="#ffffff"/>
      </g>`;
  } else if (art === 'puja') {
    centerPiece = `
      <g transform="translate(600, 275)">
        <circle cx="0" cy="-15" r="250" fill="url(#centerGlow)"/>
        <!-- Sacred Golden Trishul Behind Jyotirlinga -->
        <g transform="translate(-115, -35)">
          <line x1="0" y1="-150" x2="0" y2="145" stroke="url(#brassGrad)" stroke-width="7"/>
          <path d="M 0,-165 L -14,-120 L 0,-132 L 14,-120 Z" fill="#fef08a"/>
          <path d="M -44,-135 C -48,-75 -12,-68 0,-72 C 12,-68 48,-75 44,-135" fill="none" stroke="url(#brassGrad)" stroke-width="6" stroke-linecap="round"/>
        </g>
        <!-- Upper Abhishek Kalash Pouring Golden Milk Stream -->
        <path d="M -32,-205 L 32,-205 L 46,-162 Q 0,-140 -46,-162 Z" fill="url(#brassGrad)" stroke="#fef08a" stroke-width="2.5"/>
        <path d="M -4,-148 L 4,-148 L 8,-52 L -8,-52 Z" fill="#fef9c3" fill-opacity="0.88"/>
        <!-- Sacred Black-Stone Shiva Lingam & Golden Tripundra -->
        <path d="M -56,65 L -56,-25 A 56,56 0 0,1 56,-25 L 56,65 Z" fill="#1c1917" stroke="#fde047" stroke-width="3.5"/>
        <line x1="-34" y1="-18" x2="34" y2="-18" stroke="#fef08a" stroke-width="4" stroke-linecap="round"/>
        <line x1="-38" y1="-4" x2="38" y2="-4" stroke="#fef08a" stroke-width="4" stroke-linecap="round"/>
        <line x1="-34" y1="10" x2="34" y2="10" stroke="#fef08a" stroke-width="4" stroke-linecap="round"/>
        <circle cx="0" cy="-4" r="9" fill="#ef4444" stroke="#fef08a" stroke-width="2"/>
        <!-- Pedestal (Yoni Base) -->
        <path d="M -135,65 L 155,65 L 135,96 L -115,96 Z" fill="#292524" stroke="#fde047" stroke-width="3"/>
        <rect x="-105" y="96" width="210" height="32" rx="8" fill="url(#brassGrad)" stroke="#fef08a" stroke-width="2.5"/>
      </g>`;
  } else {
    centerPiece = `
      <g transform="translate(600, 265)">
        <circle cx="0" cy="0" r="250" fill="url(#centerGlow)"/>
        <!-- Sacred Thousand-Petal Golden Mandal & Divine Flute / Mor Pankh -->
        <circle cx="0" cy="0" r="190" fill="none" stroke="#fde047" stroke-width="2.5" stroke-dasharray="10 6" stroke-opacity="0.75"/>
        <circle cx="0" cy="0" r="148" fill="#0c4a6e" fill-opacity="0.55" stroke="url(#brassGrad)" stroke-width="4"/>
        <!-- Golden Bansuri (Flute) -->
        <g transform="rotate(-22)">
          <rect x="-195" y="-12" width="390" height="24" rx="12" fill="url(#brassGrad)" stroke="#fef08a" stroke-width="2.5"/>
          <circle cx="-90" cy="0" r="4.5" fill="#451a03"/>
          <circle cx="-50" cy="0" r="4.5" fill="#451a03"/>
          <circle cx="-10" cy="0" r="4.5" fill="#451a03"/>
          <circle cx="30" cy="0" r="4.5" fill="#451a03"/>
          <circle cx="70" cy="0" r="4.5" fill="#451a03"/>
          <circle cx="110" cy="0" r="4.5" fill="#451a03"/>
        </g>
        <!-- Iridescent Peacock Feather (Mor Pankh) -->
        <g transform="translate(35, -35) rotate(18)">
          <path d="M 0,130 C -85,40 -78,-95 0,-145 C 78,-95 85,40 0,130 Z" fill="#047857" stroke="#34d399" stroke-width="3"/>
          <path d="M 0,95 C -58,25 -52,-70 0,-112 C 52,-70 58,25 0,95 Z" fill="#0d9488" stroke="#fde047" stroke-width="2.2"/>
          <ellipse cx="0" cy="-35" rx="34" ry="44" fill="#f59e0b" stroke="#fef08a" stroke-width="2"/>
          <ellipse cx="0" cy="-35" rx="22" ry="30" fill="#1d4ed8"/>
          <ellipse cx="0" cy="-30" rx="12" ry="16" fill="#1e1b4b"/>
          <circle cx="-4" cy="-36" r="4" fill="#ffffff"/>
        </g>
      </g>`;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="skyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${bgTop}"/>
      <stop offset="52%" stop-color="${bgMid}"/>
      <stop offset="100%" stop-color="${bgBot}"/>
    </linearGradient>
    <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${glowPrimary}" stop-opacity="0.62"/>
      <stop offset="50%" stop-color="${glowSecondary}" stop-opacity="0.28"/>
      <stop offset="100%" stop-color="${bgBot}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="flameAura" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#fef08a" stop-opacity="0.95"/>
      <stop offset="45%" stop-color="#f97316" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#f97316" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="rayGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fef08a" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#f59e0b" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="brassGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#fcd34d"/>
      <stop offset="50%" stop-color="#d97706"/>
      <stop offset="100%" stop-color="#fef08a"/>
    </linearGradient>
    <linearGradient id="waterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="${bgMid}" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#050208" stop-opacity="0.95"/>
    </linearGradient>
  </defs>

  <!-- Full-Bleed Atmospheric Sky & Cosmic Nebula (Zero Border Frame) -->
  <rect width="1200" height="630" fill="url(#skyGrad)"/>
  ${raysSvg}
  ${starsSvg}

  <!-- Main Theme Sacred Centerpiece -->
  ${centerPiece}

  <!-- Shimmering Sacred Ghat / Reflective Sanctum Foreground -->
  <rect x="0" y="485" width="1200" height="145" fill="url(#waterGrad)"/>
  <ellipse cx="600" cy="525" rx="420" ry="12" fill="#fde047" fill-opacity="0.22"/>
  <ellipse cx="600" cy="560" rx="310" ry="8" fill="#f97316" fill-opacity="0.18"/>
  <ellipse cx="600" cy="592" rx="220" ry="6" fill="#fef08a" fill-opacity="0.15"/>

  <!-- Blooming Sacred Lotuses & Glowing Brass Diyas in Foreground -->
  ${renderLotus(330, 520, 0.92)}
  ${renderLotus(600, 505, 1.15)}
  ${renderLotus(870, 520, 0.92)}
  ${renderDiya(165, 548, 0.95)}
  ${renderDiya(455, 562, 0.85)}
  ${renderDiya(745, 562, 0.85)}
  ${renderDiya(1035, 548, 0.95)}
</svg>`;
}

function buildSocialHtml(routeInfo, requestedUrlObj, ua) {
  const isHome = routeInfo.path === '/';
  const canonicalUrl = isHome ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${routeInfo.path}`;
  const slug = routeInfo.path.replace(/^\/+/, '').replace(/\//g, '-') || 'home';
  const isWhatsApp = /whatsapp/i.test(String(ua || ''));

  // Preserve query/path variations in og:url so WhatsApp/Facebook cache-buster links (?v=1, ?s=v42)
  // are never collapsed back into a stale cached entry on the user's phone
  let ogUrl = canonicalUrl;
  if (requestedUrlObj) {
    const reqPath = requestedUrlObj.pathname || '/';
    const reqSearch = requestedUrlObj.search || '';
    if (reqSearch || reqPath.replace(/\/+$/, '') !== routeInfo.path) {
      ogUrl = `${SITE_ORIGIN}${reqPath}${reqSearch}`;
    }
  }

  // WhatsApp Status & Chat receive the dedicated 800x800 (1:1 HD Square) branded card (-wa-v42.jpg).
  // Facebook, Twitter/X, LinkedIn, and Telegram receive the 1200x630 widescreen branded card (-social-v42.jpg).
  // Meanwhile, Google Discover & RSS feed.xml receive the 100% clean text-free hero image (-discover-v42.jpg).
  const primaryOgImage = isWhatsApp
    ? `${SITE_ORIGIN}/og-card/${slug}-wa-${VERSION_TAG}.jpg`
    : `${SITE_ORIGIN}/og-card/${slug}-social-${VERSION_TAG}.jpg`;

  const imgWidth = isWhatsApp ? '800' : '1200';
  const imgHeight = isWhatsApp ? '800' : '630';
  const safeTitle = xmlEscape(routeInfo.title);
  const safeDesc = xmlEscape(routeInfo.desc);
  const safeCanonicalUrl = xmlEscape(canonicalUrl);
  const safeOgUrl = xmlEscape(ogUrl);
  const safeImg = xmlEscape(primaryOgImage);

  return `<!doctype html>
<html lang="hi" prefix="og: http://ogp.me/ns#">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="icon" href="${SITE_ORIGIN}/favicon.ico" sizes="48x48" />
  <link rel="icon" type="image/png" sizes="48x48" href="${SITE_ORIGIN}/favicon-48x48.png" />
  <link rel="icon" type="image/png" sizes="96x96" href="${SITE_ORIGIN}/favicon-96x96.png" />
  <link rel="icon" type="image/png" sizes="192x192" href="${SITE_ORIGIN}/pwa-192x192.png" />
  <link rel="shortcut icon" href="${SITE_ORIGIN}/favicon.ico" />
  <link rel="apple-touch-icon" sizes="180x180" href="${SITE_ORIGIN}/apple-touch-icon.png" />
  <title>${safeTitle}</title>
  <meta name="title" content="${safeTitle}" />
  <meta name="description" content="${safeDesc}" />
  <link rel="canonical" href="${safeCanonicalUrl}" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="पण्डित जी ऑनलाइन" />
  <meta property="og:locale" content="hi_IN" />
  <meta property="og:title" content="${safeTitle}" />
  <meta property="og:description" content="${safeDesc}" />
  <meta property="og:url" content="${safeOgUrl}" />
  <meta property="og:image" content="${safeImg}" />
  <meta property="og:image:url" content="${safeImg}" />
  <meta property="og:image:secure_url" content="${safeImg}" />
  <meta property="og:image:type" content="image/jpeg" />
  <meta property="og:image:width" content="${imgWidth}" />
  <meta property="og:image:height" content="${imgHeight}" />
  <meta property="og:image:alt" content="${safeTitle}" />
  <meta itemprop="name" content="${safeTitle}" />
  <meta itemprop="description" content="${safeDesc}" />
  <meta itemprop="image" content="${safeImg}" />
  <link rel="image_src" href="${safeImg}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${safeTitle}" />
  <meta name="twitter:description" content="${safeDesc}" />
  <meta name="twitter:url" content="${safeOgUrl}" />
  <meta name="twitter:image" content="${safeImg}" />
  <meta name="twitter:image:src" content="${safeImg}" />
  <meta name="twitter:image:alt" content="${safeTitle}" />
</head>
<body style="background:#140703;color:#fef08a;font-family:sans-serif;padding:32px;text-align:center;">
  <h1>${safeTitle}</h1>
  <p>${safeDesc}</p>
  <p><a href="${safeCanonicalUrl}" style="color:#facc15;">${safeCanonicalUrl}</a></p>
</body>
</html>`;
}

function cleanSlugFromAssetPath(pathname) {
  return pathname
    .replace(/^\/(api\/)?og-(card|svg)\//i, '')
    .replace(/\.(jpg|jpeg|png|svg|webp)$/i, '')
    .replace(/[-_.]v=?\d+$/i, '')
    .replace(/-(discover|social|wa|sq)$/i, '');
}

function isSquareAssetRequest(pathname, url, ua) {
  if (/-(wa|sq)(-v=?\d+)?\.(jpg|jpeg|png|svg|webp)$/i.test(pathname)) return true;
  if (url && url.searchParams && url.searchParams.get('sq') === '1') return true;
  if (ua && /whatsapp/i.test(ua)) return true;
  return false;
}

function isBrandedSocialAssetRequest(pathname, url, ua) {
  if (/-(social|wa|sq)(-v=?\d+)?\.(jpg|jpeg|png|svg|webp)$/i.test(pathname)) return true;
  if (url && url.searchParams && (url.searchParams.get('social') === '1' || url.searchParams.get('sq') === '1')) return true;
  if (ua && /whatsapp|facebookexternalhit|facebot|meta-externalagent|instagram|threads|telegram|twitterbot|linkedinbot|slackbot|discordbot|pinterest/i.test(ua)) return true;
  return false;
}

const DAILY_DYNAMIC_EDGE_PATHS = new Set([
  '/',
  '/panchang',
  '/aaj-ka-panchang',
  '/aaj-ka-choghadiya',
  '/aaj-ka-rahukaal',
  '/rashifal',
  '/mesh-rashifal',
  '/vrishabh-rashifal',
  '/mithun-rashifal',
  '/kark-rashifal',
  '/simha-rashifal',
  '/kanya-rashifal',
  '/tula-rashifal',
  '/vrishchik-rashifal',
  '/dhanu-rashifal',
  '/makar-rashifal',
  '/kumbh-rashifal',
  '/meen-rashifal'
]);

const TOOL_CALCULATOR_EDGE_PATHS = new Set([
  '/janam-kundali',
  '/kundali-milan',
  '/shani-sadesati-calculator',
  '/digital-mandir',
  '/ram-shalaka-prashnavali',
  '/shubh-muhurat',
  '/jyotish-chat',
  '/mantra-jaap',
  '/puja-services',
  '/naam-rashi',
  '/kundali-dosh-upay',
  '/dharm-gyan-kosh',
  '/ank-jyotish-mulank-calculator',
  '/naam-se-kundali-milan',
  '/vivah-yog-calculator',
  '/sarkari-naukri-rajyog'
]);

const LEGAL_POLICY_EDGE_PATHS = new Set([
  '/about-us',
  '/contact-us',
  '/privacy-policy',
  '/terms-and-conditions',
  '/disclaimer'
]);

function getEdgeIstDateInfo(canonicalPath) {
  const nowUtc = new Date();
  const istTime = new Date(nowUtc.getTime() + 5.5 * 60 * 60 * 1000);
  const y = istTime.getUTCFullYear();
  const m = String(istTime.getUTCMonth() + 1).padStart(2, '0');
  const d = String(istTime.getUTCDate()).padStart(2, '0');
  const todayStr = `${y}-${m}-${d}`;
  const dailyBrahmaIso = `${todayStr}T04:30:00+05:30`;
  const toolsMonthIso = `${y}-${m}-01T04:30:00+05:30`;
  const staticKnowledgeIso = '2026-10-15T00:00:00+05:30';
  const legalPolicyIso = '2026-08-01T00:00:00+05:30';

  const p = canonicalPath || '/';
  const isDaily = DAILY_DYNAMIC_EDGE_PATHS.has(p);
  const isTool = TOOL_CALCULATOR_EDGE_PATHS.has(p);
  const isLegal = LEGAL_POLICY_EDGE_PATHS.has(p);

  const datePublishedIso = isDaily
    ? dailyBrahmaIso
    : isTool
      ? toolsMonthIso
      : isLegal
        ? legalPolicyIso
        : staticKnowledgeIso;
  const dateModifiedIso = isDaily
    ? dailyBrahmaIso
    : isTool
      ? toolsMonthIso
      : isLegal
        ? legalPolicyIso
        : staticKnowledgeIso;

  return {
    todayStr,
    dailyBrahmaIso,
    toolsMonthIso,
    staticKnowledgeIso,
    legalPolicyIso,
    isDaily,
    isTool,
    isLegal,
    datePublishedIso,
    dateModifiedIso
  };
}

function buildEdgeAuthorBox() {
  return `<div style="margin-top:20px;padding:15px;background:rgba(30,41,59,0.75);border:1px solid rgba(245,158,11,0.42);border-radius:14px;display:flex;flex-wrap:wrap;gap:14px;align-items:center;">
    <div style="width:46px;height:46px;border-radius:50%;background:linear-gradient(135deg,#f59e0b,#d97706);display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0;">🕉️</div>
    <div style="flex:1;min-width:220px;">
      <div style="font-size:11px;font-weight:700;color:#fbbf24;text-transform:uppercase;letter-spacing:0.8px;">प्रकाशक एवं मुख्य ज्योतिषाचार्य • श्री ज्योतिष वैदिक संस्थान</div>
      <div style="font-size:15px;font-weight:800;color:#fef3c7;margin-top:2px;">आचार्य पण्डित शशांक शर्मा (Acharya Pandit Shashank Sharma)</div>
      <div style="font-size:12px;color:#cbd5e1;margin-top:2px;">श्री ज्योतिष वैदिक संस्थान • १५+ वर्ष प्रामाणिक वैदिक कर्मकाण्ड एवं ज्योतिष अनुभव</div>
      <div style="font-size:11px;color:#94a3b8;margin-top:4px;">📍 रुद्रपुर, जिला ऊधम सिंह नगर, उत्तराखण्ड - 263153, भारत | 📞 +91 7017279043 | ✉️ shashanksharma0456@gmail.com</div>
    </div>
  </div>`;
}

function buildEdgeRouteArticleHtml(canonicalPath, info, seoEntry) {
  const rawTitle = (seoEntry && seoEntry.title) || info.title || '';
  const rawH1 = (seoEntry && seoEntry.h1) || String(rawTitle).split('|')[0].trim() || rawTitle;
  const rawDesc = (seoEntry && seoEntry.description) || info.desc || '';
  const cleanTitle = xmlEscape(rawH1);
  const cleanDesc = xmlEscape(rawDesc);
  const badge = xmlEscape(info.badge || 'VEDIC JYOTISH SANSTHAN • RUDRAPUR');
  const slug = canonicalPath.replace(/^\/+/, '').replace(/\//g, '-').toLowerCase() || 'home';
  const discoverHeroImg = `${SITE_ORIGIN}/og-card/${slug}-discover-${VERSION_TAG}.jpg`;
  const { todayStr, datePublishedIso } = getEdgeIstDateInfo();
  const faqList = seoEntry && Array.isArray(seoEntry.faq) ? seoEntry.faq : [];

  const faqHtmlSection =
    faqList.length > 0
      ? `<section style="margin-bottom:16px;background:rgba(30,41,59,0.65);border:1px solid rgba(245,158,11,0.38);border-radius:14px;padding:16px;">
      <h2 style="font-size:16px;font-weight:800;color:#fde047;margin:0 0 12px 0;">४. अक्सर पूछे जाने वाले प्रश्न (FAQs — ${cleanTitle})</h2>
      <div style="display:flex;flex-direction:column;gap:12px;">
        ${faqList
          .map(
            (item) => `<div style="border-bottom:1px solid rgba(245,158,11,0.2);padding-bottom:10px;">
          <h3 style="font-size:14px;font-weight:800;color:#fef3c7;margin:0 0 4px 0;">प्रश्न: ${xmlEscape(item.q)}</h3>
          <p style="font-size:13px;color:#e2e8f0;margin:0;"><strong>उत्तर:</strong> ${xmlEscape(item.a)}</p>
        </div>`
          )
          .join('')}
      </div>
    </section>`
      : '';

  if (canonicalPath === '/privacy-policy') {
    return `<article id="pj-route-static-article" style="background:rgba(15,23,42,0.95);border:1px solid rgba(245,158,11,0.45);border-radius:18px;padding:22px;margin-bottom:16px;color:#f1f5f9;line-height:1.75;font-family:system-ui,-apple-system,sans-serif;">
      <nav style="font-size:12px;color:#fbbf24;margin-bottom:12px;"><a href="/" style="color:#fbbf24;text-decoration:none;font-weight:600;">← मुख्य पृष्ठ (Home)</a> / <span>गोपनीयता नीति (Privacy Policy)</span></nav>
      <header style="border-bottom:1px solid rgba(245,158,11,0.3);padding-bottom:14px;margin-bottom:18px;">
        <span style="font-size:11px;font-weight:800;color:#34d399;text-transform:uppercase;letter-spacing:1px;background:rgba(16,185,129,0.15);padding:3px 10px;border-radius:20px;border:1px solid rgba(16,185,129,0.3);">कानूनी एवं सुरक्षा मानक • 100% Google AdSense Compliant</span>
        <h1 style="font-size:22px;font-weight:900;color:#fef3c7;margin:10px 0 6px 0;">गोपनीयता नीति (Privacy Policy) — पण्डित जी ऑनलाइन</h1>
        <p style="font-size:13px;color:#cbd5e1;margin:0;">प्रकाशक: आचार्य पण्डित शशांक शर्मा, श्री ज्योतिष वैदिक संस्थान, रुद्रपुर (उत्तराखण्ड) • Publisher ID: ca-pub-9661029896137686</p>
      </header>
      <section style="margin-bottom:18px;">
        <h2 style="font-size:16px;font-weight:800;color:#fde047;margin:0 0 8px 0;">१. प्रस्तावना एवं डेटा गोपनीयता (Introduction &amp; Data Privacy)</h2>
        <p style="font-size:13px;color:#e2e8f0;margin:0 0 8px 0;">यह गोपनीयता नीति <strong>www.panditjionline.online</strong> ("पण्डित जी ऑनलाइन") पर लागू होती है। यजमानों द्वारा दर्ज जन्म तिथि, जन्म समय, जन्म स्थान एवं नाम केवल वैदिक लग्न कुंडली, नवमांश (D-9), ३६ गुण मिलान और विंशोत्तरी महादशा की गणितीय गणना हेतु उपयोग किए जाते हैं।</p>
        <p style="font-size:13px;color:#cbd5e1;margin:0;">हम किसी भी परिस्थिति में यजमानों का व्यक्तिगत डेटा किसी तृतीय-पक्ष मार्केटिंग एजेंसी या डेटा ब्रोकर को नहीं बेचते हैं।</p>
      </section>
      <section style="margin-bottom:18px;background:rgba(40,24,10,0.55);border:1px solid rgba(245,158,11,0.5);border-radius:14px;padding:16px;">
        <h2 style="font-size:16px;font-weight:800;color:#fde047;margin:0 0 8px 0;">२. Google AdSense एवं DoubleClick DART Cookie नीति</h2>
        <p style="font-size:13px;color:#fef3c7;margin:0 0 8px 0;">हमारी वेबसाइट पर निःशुल्क वैदिक सेवाएं संचालित रखने हेतु <strong>Google AdSense (ca-pub-9661029896137686)</strong> का उपयोग किया जाता है:</p>
        <ul style="font-size:13px;color:#e2e8f0;padding-left:18px;margin:0;display:flex;flex-direction:column;gap:6px;">
          <li><strong>तृतीय-पक्ष वेंडर के रूप में Google:</strong> Google हमारी वेबसाइट पर विज्ञापन प्रदर्शित करने के लिए कुकीज़ (DART Cookies) का उपयोग करता है।</li>
          <li><strong>DoubleClick DART Cookie:</strong> DART कुकी के माध्यम से Google उपयोगकर्ताओं को हमारी वेबसाइट और इंटरनेट पर अन्य साइटों के पूर्व विज़िट के आधार पर प्रासंगिक विज्ञापन दिखाता है।</li>
          <li><strong>Opt-Out विकल्प:</strong> उपयोगकर्ता किसी भी समय <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" style="color:#fbbf24;text-decoration:underline;">Google Ad Settings</a> अथवा <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" style="color:#fbbf24;text-decoration:underline;">www.aboutads.info</a> पर जाकर पर्सनलाइज्ड विज्ञापनों से Opt-Out कर सकते हैं।</li>
        </ul>
      </section>
      <section style="margin-bottom:14px;">
        <h2 style="font-size:16px;font-weight:800;color:#fde047;margin:0 0 8px 0;">३. शिकायत निवारण एवं संपर्क अधिकारी (Grievance Redressal)</h2>
        <p style="font-size:13px;color:#e2e8f0;margin:0;">आचार्य पण्डित शशांक शर्मा, श्री ज्योतिष वैदिक संस्थान, रुद्रपुर, जिला ऊधम सिंह नगर, उत्तराखण्ड - 263153, भारत | दूरभाष: +91 7017279043 | ईमेल: shashanksharma0456@gmail.com</p>
      </section>
      ${faqHtmlSection}
      ${buildEdgeAuthorBox()}
    </article>`;
  }

  if (canonicalPath === '/terms-and-conditions') {
    return `<article id="pj-route-static-article" style="background:rgba(15,23,42,0.95);border:1px solid rgba(245,158,11,0.45);border-radius:18px;padding:22px;margin-bottom:16px;color:#f1f5f9;line-height:1.75;font-family:system-ui,-apple-system,sans-serif;">
      <nav style="font-size:12px;color:#fbbf24;margin-bottom:12px;"><a href="/" style="color:#fbbf24;text-decoration:none;font-weight:600;">← मुख्य पृष्ठ (Home)</a> / <span>नियम एवं शर्तें (Terms &amp; Conditions)</span></nav>
      <header style="border-bottom:1px solid rgba(245,158,11,0.3);padding-bottom:14px;margin-bottom:18px;">
        <span style="font-size:11px;font-weight:800;color:#38bdf8;text-transform:uppercase;letter-spacing:1px;background:rgba(56,189,248,0.15);padding:3px 10px;border-radius:20px;border:1px solid rgba(56,189,248,0.3);">उपयोग की विधिक शर्तें • Terms of Service</span>
        <h1 style="font-size:22px;font-weight:900;color:#fef3c7;margin:10px 0 6px 0;">नियम एवं शर्तें (Terms &amp; Conditions) — पण्डित जी ऑनलाइन</h1>
        <p style="font-size:13px;color:#cbd5e1;margin:0;">श्री ज्योतिष वैदिक संस्थान, रुद्रपुर (उत्तराखण्ड) द्वारा संचालित वैदिक ज्योतिष मंच के उपयोग की शर्तें</p>
      </header>
      <section style="margin-bottom:16px;">
        <h2 style="font-size:16px;font-weight:800;color:#fde047;margin:0 0 6px 0;">१. सेवा की प्रकृति एवं शास्त्रीय आधार</h2>
        <p style="font-size:13px;color:#e2e8f0;margin:0;">पण्डित जी ऑनलाइन पर उपलब्ध समस्त ज्योतिषीय गणनाएं (जन्म कुंडली, ३६ गुण मिलान, दृक पंचांग, राशिफल एवं मुहूर्त) बृहत् पाराशर होरा शास्त्र, सूर्य सिद्धांत और लाहिड़ी चित्रापक्ष अयनांश के गणितीय सिद्धांतों पर आधारित आध्यात्मिक मार्गदर्शन हेतु हैं।</p>
      </section>
      <section style="margin-bottom:16px;">
        <h2 style="font-size:16px;font-weight:800;color:#fde047;margin:0 0 6px 0;">२. बौद्धिक संपदा एवं विधिक क्षेत्राधिकार</h2>
        <p style="font-size:13px;color:#e2e8f0;margin:0;">इस मंच पर प्रकाशित सभी लेख, पंचांग एल्गोरिदम और वैदिक शोध सामग्री श्री ज्योतिष वैदिक संस्थान एवं आचार्य पण्डित शशांक शर्मा की बौद्धिक संपदा हैं। किसी भी विवाद का अनन्य विधिक क्षेत्राधिकार रुद्रपुर (जिला ऊधम सिंह नगर, उत्तराखण्ड) के अधीन होगा।</p>
      </section>
      ${faqHtmlSection}
      ${buildEdgeAuthorBox()}
    </article>`;
  }

  if (canonicalPath === '/disclaimer') {
    return `<article id="pj-route-static-article" style="background:rgba(15,23,42,0.95);border:1px solid rgba(245,158,11,0.45);border-radius:18px;padding:22px;margin-bottom:16px;color:#f1f5f9;line-height:1.75;font-family:system-ui,-apple-system,sans-serif;">
      <nav style="font-size:12px;color:#fbbf24;margin-bottom:12px;"><a href="/" style="color:#fbbf24;text-decoration:none;font-weight:600;">← मुख्य पृष्ठ (Home)</a> / <span>अस्वीकरण (Disclaimer)</span></nav>
      <header style="border-bottom:1px solid rgba(245,158,11,0.3);padding-bottom:14px;margin-bottom:18px;">
        <span style="font-size:11px;font-weight:800;color:#fb7185;text-transform:uppercase;letter-spacing:1px;background:rgba(244,63,94,0.15);padding:3px 10px;border-radius:20px;border:1px solid rgba(244,63,94,0.3);">ज्योतिषीय एवं विधिक अस्वीकरण • Official Disclaimer</span>
        <h1 style="font-size:22px;font-weight:900;color:#fef3c7;margin:10px 0 6px 0;">ज्योतिषीय अस्वीकरण (Disclaimer) — पण्डित जी ऑनलाइन</h1>
      </header>
      <section style="margin-bottom:16px;">
        <h2 style="font-size:16px;font-weight:800;color:#fde047;margin:0 0 6px 0;">१. आध्यात्मिक एवं सांस्कृतिक मार्गदर्शन</h2>
        <p style="font-size:13px;color:#e2e8f0;margin:0;">पण्डित जी ऑनलाइन पर प्रस्तुत जन्म कुंडली विश्लेषण, राशिफल, गुण मिलान एवं सात्विक वैदिक उपाय भारतीय सनातन ज्योतिष शास्त्र की मान्यताओं पर आधारित हैं। इन्हें किसी चिकित्सक (Doctor), वकील (Advocate) या वित्तीय सलाहकार की पेशेवर सलाह का विकल्प न माना जाए।</p>
      </section>
      ${faqHtmlSection}
      ${buildEdgeAuthorBox()}
    </article>`;
  }

  if (canonicalPath === '/about-us' || canonicalPath === '/contact-us') {
    return `<article id="pj-route-static-article" style="background:rgba(15,23,42,0.95);border:1px solid rgba(245,158,11,0.45);border-radius:18px;padding:22px;margin-bottom:16px;color:#f1f5f9;line-height:1.75;font-family:system-ui,-apple-system,sans-serif;">
      <nav style="font-size:12px;color:#fbbf24;margin-bottom:12px;"><a href="/" style="color:#fbbf24;text-decoration:none;font-weight:600;">← मुख्य पृष्ठ (Home)</a> / <span>${cleanTitle}</span></nav>
      <header style="border-bottom:1px solid rgba(245,158,11,0.3);padding-bottom:14px;margin-bottom:18px;">
        <span style="font-size:11px;font-weight:800;color:#f59e0b;text-transform:uppercase;letter-spacing:1px;background:rgba(245,158,11,0.15);padding:3px 10px;border-radius:20px;border:1px solid rgba(245,158,11,0.3);">${badge}</span>
        <h1 style="font-size:22px;font-weight:900;color:#fef3c7;margin:10px 0 6px 0;">${cleanTitle}</h1>
        <p style="font-size:13px;color:#cbd5e1;margin:0;">${cleanDesc}</p>
      </header>
      <section style="margin-bottom:16px;">
        <h2 style="font-size:16px;font-weight:800;color:#fde047;margin:0 0 8px 0;">१. आचार्य पण्डित शशांक शर्मा एवं श्री ज्योतिष वैदिक संस्थान</h2>
        <p style="font-size:13px;color:#e2e8f0;margin:0 0 8px 0;">आचार्य पण्डित शशांक शर्मा सनातन वैदिक परम्परा, शुक्ल यजुर्वेदीय कर्मकाण्ड, षोडश संस्कार, वास्तु शांति एवं फलित ज्योतिष के अनुभवी विद्वान हैं। विगत १५+ वर्षों से आप रुद्रपुर (जिला ऊधम सिंह नगर, उत्तराखण्ड) एवं संपूर्ण भारत के यजमानों को प्रामाणिक ज्योतिषीय मार्गदर्शन व वैदिक अनुष्ठान सेवाएं प्रदान कर रहे हैं।</p>
        <p style="font-size:13px;color:#cbd5e1;margin:0;"><strong>सीधा संपर्क सूत्र:</strong> रुद्रपुर, जिला ऊधम सिंह नगर, उत्तराखण्ड - 263153 | फ़ोन व WhatsApp: <a href="tel:+917017279043" style="color:#fde047;">+91 7017279043</a>, <a href="tel:+918958499979" style="color:#fde047;">+91 8958499979</a> | ईमेल: <a href="mailto:shashanksharma0456@gmail.com" style="color:#fde047;">shashanksharma0456@gmail.com</a></p>
      </section>
      ${faqHtmlSection}
      ${buildEdgeAuthorBox()}
    </article>`;
  }

  return `<article id="pj-route-static-article" itemscope itemtype="https://schema.org/Article" style="background:rgba(15,23,42,0.95);border:1px solid rgba(245,158,11,0.45);border-radius:18px;padding:22px;margin-bottom:16px;color:#f1f5f9;line-height:1.75;font-family:system-ui,-apple-system,sans-serif;">
    <nav style="font-size:12px;color:#fbbf24;margin-bottom:12px;"><a href="/" style="color:#fbbf24;text-decoration:none;font-weight:600;">← मुख्य पृष्ठ (Home)</a> / <span>${cleanTitle}</span></nav>
    <header style="border-bottom:1px solid rgba(245,158,11,0.3);padding-bottom:14px;margin-bottom:18px;">
      <span style="font-size:11px;font-weight:800;color:#f59e0b;text-transform:uppercase;letter-spacing:1px;background:rgba(245,158,11,0.15);padding:3px 10px;border-radius:20px;border:1px solid rgba(245,158,11,0.3);">${badge}</span>
      <h1 itemprop="headline" style="font-size:22px;font-weight:900;color:#fef3c7;margin:10px 0 6px 0;">${cleanTitle}</h1>
      <p itemprop="description" style="font-size:13px;color:#cbd5e1;margin:0 0 8px 0;">${cleanDesc}</p>
      <div style="font-size:11.5px;color:#94a3b8;display:flex;flex-wrap:wrap;gap:12px;align-items:center;">
        <span>✍️ लेखक एवं ज्योतिषाचार्य: <strong itemprop="author" itemscope itemtype="https://schema.org/Person"><span itemprop="name" style="color:#fde047;">आचार्य पण्डित शशांक शर्मा</span></strong> (रुद्रपुर, उत्तराखण्ड)</span>
        <span>•</span>
        <span>📅 अद्यतन (Updated): <time itemprop="dateModified" datetime="${datePublishedIso}" style="color:#cbd5e1;">${todayStr} (IST)</time></span>
      </div>
    </header>
    <figure style="margin:0 0 18px 0;padding:0;">
      <img itemprop="image" src="${xmlEscape(discoverHeroImg)}" alt="${cleanTitle}" width="1200" height="630" loading="lazy" decoding="async" style="width:100%;height:auto;aspect-ratio:1200/630;border-radius:14px;border:1px solid rgba(245,158,11,0.4);display:block;" />
      <figcaption style="font-size:11px;color:#94a3b8;margin-top:6px;text-align:center;">${cleanTitle} — आचार्य पण्डित शशांक शर्मा, श्री ज्योतिष वैदिक संस्थान (रुद्रपुर)</figcaption>
    </figure>
    <section style="margin-bottom:16px;">
      <h2 style="font-size:16px;font-weight:800;color:#fde047;margin:0 0 8px 0;">१. शास्त्रीय महत्व एवं प्रामाणिक वैदिक सिद्धांत (Vedic Shastra Foundation)</h2>
      <p style="font-size:13px;color:#e2e8f0;margin:0 0 8px 0;"><strong>${cleanTitle}</strong> भारतीय सनातन ज्योतिष शास्त्र के मूल ग्रंथों — महर्षि पाराशर कृत <em>'बृहत् पाराशर होरा शास्त्र'</em>, <em>'जैमिनी सूत्र'</em>, <em>'सूर्य सिद्धांत'</em> एवं <em>'मुहूर्त चिंतामणि'</em> — के प्रामाणिक गणितीय नियमों पर आधारित है। ${cleanDesc}</p>
      <p style="font-size:13px;color:#cbd5e1;margin:0;">आचार्य पण्डित शशांक शर्मा (श्री ज्योतिष वैदिक संस्थान, रुद्रपुर, उत्तराखण्ड) के १५+ वर्षों के वैदिक कर्मकाण्ड एवं जन्मपत्री विश्लेषण अनुभव से यह विस्तृत मार्गदर्शिका यजमानों के आध्यात्मिक व व्यावहारिक कल्याण हेतु तैयार की गई है।</p>
    </section>
    <section style="margin-bottom:16px;">
      <h2 style="font-size:16px;font-weight:800;color:#fde047;margin:0 0 8px 0;">२. लाहिड़ी चित्रापक्ष अयनांश एवं सूक्ष्म दृक गणितीय गणना</h2>
      <p style="font-size:13px;color:#e2e8f0;margin:0;">पण्डित जी ऑनलाइन पर प्रदर्शित समस्त गणनाएं भारत सरकार के राष्ट्रीय पंचांग द्वारा मान्यता प्राप्त <strong>लाहिड़ी चित्रापक्ष अयनांश (Lahiri Chitrapaksha Ayanamsha)</strong> पर आधारित हैं। इसमें २७ नक्षत्रों के १०८ चरण, चन्द्र बल, तारा बल, विंशोत्तरी महादशा-अंतर्दशा और दैनिक ग्रह गोचर (Transit) का सूक्ष्म समन्वय किया जाता है जिससे प्रत्येक जातक को १००% शुद्ध परिणाम प्राप्त हों।</p>
    </section>
    <section style="margin-bottom:16px;">
      <h2 style="font-size:16px;font-weight:800;color:#fde047;margin:0 0 8px 0;">३. सात्विक वैदिक उपाय, मंत्र उपासना एवं व्यावहारिक मार्गदर्शन</h2>
      <p style="font-size:13px;color:#e2e8f0;margin:0;">वैदिक ज्योतिष का उद्देश्य किसी प्रकार का भय उत्पन्न करना या महंगे व्यावसायिक रत्न थोपना नहीं है। कुंडली या गोचर में किसी भी ग्रह की प्रतिकूलता होने पर वैदिक बीज मंत्र जाप, इष्टदेव व कुलदेवता उपासना, श्री हनुमान चालीसा पाठ, रुद्राभिषेक, घर पर सरल हवन एवं प्रकृति-सम्मत दान-पुण्य (गौ सेवा, अन्न दान) सबसे अचूक और सात्विक उपाय हैं।</p>
    </section>
    ${faqHtmlSection}
    ${buildEdgeAuthorBox()}
  </article>`;
}

function injectEdgeRouteSeo(rawHtml, canonicalPath, info, seoEntry) {
  if (!rawHtml) return rawHtml;
  const isHome = canonicalPath === '/';
  const canonicalUrl = isHome ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${canonicalPath}`;
  const slug = canonicalPath.replace(/^\/+/, '').replace(/\//g, '-').toLowerCase() || 'home';
  const socialImg = `${SITE_ORIGIN}/og-card/${slug}-discover-${VERSION_TAG}.jpg`;
  const finalTitle = (seoEntry && seoEntry.title) || info.title;
  const finalDesc = (seoEntry && seoEntry.description) || info.desc;
  const finalKeywords = (seoEntry && seoEntry.keywords) || '';
  const faqList = seoEntry && Array.isArray(seoEntry.faq) ? seoEntry.faq : [];
  const safeTitle = xmlEscape(finalTitle);
  const safeDesc = xmlEscape(finalDesc);
  const safeKeywords = xmlEscape(finalKeywords);
  const safeCanonical = xmlEscape(canonicalUrl);
  const safeImg = xmlEscape(socialImg);
  const { datePublishedIso, dateModifiedIso, isDaily, isTool } = getEdgeIstDateInfo(canonicalPath);

  const discoverArticleSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': isDaily || isTool ? ['NewsArticle', 'Article'] : 'Article',
    '@id': `${canonicalUrl}#discover-article`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl
    },
    headline: finalTitle,
    description: finalDesc,
    inLanguage: 'hi-IN',
    datePublished: datePublishedIso,
    dateModified: dateModifiedIso,
    image: [
      {
        '@type': 'ImageObject',
        url: socialImg,
        width: 1200,
        height: 630
      },
      {
        '@type': 'ImageObject',
        url: `${SITE_ORIGIN}/pwa-512x512.png`,
        width: 512,
        height: 512
      }
    ],
    author: {
      '@type': 'Person',
      name: 'Acharya Pandit Shashank Sharma',
      alternateName: 'आचार्य पण्डित शशांक शर्मा',
      jobTitle: 'Chief Vedic Astrologer & Dharmacharya',
      url: `${SITE_ORIGIN}/about-us`
    },
    publisher: {
      '@type': 'Organization',
      name: 'Pandit Ji Online',
      alternateName: 'पण्डित जी ऑनलाइन — श्री ज्योतिष वैदिक संस्थान, रुद्रपुर',
      url: `${SITE_ORIGIN}/`,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_ORIGIN}/pwa-512x512.png`,
        width: 512,
        height: 512
      }
    }
  });

  if (isHome) {
    return rawHtml.replace(
      /<\/head>/i,
      () => `  <script type="application/ld+json" id="pj-edge-discover-jsonld">${discoverArticleSchema}</script>\n  </head>`
    );
  }

  const articleHtml = buildEdgeRouteArticleHtml(canonicalPath, info, seoEntry);

  const faqSchemaScript =
    faqList.length > 0
      ? `\n  <script type="application/ld+json" id="pj-edge-faq-jsonld">${JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          '@id': `${canonicalUrl}#faq`,
          mainEntity: faqList.map((item) => ({
            '@type': 'Question',
            name: item.q,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.a
            }
          }))
        })}</script>`
      : '';

  let html = rawHtml;
  html = html.replace(/<title>[\s\S]*?<\/title>/i, () => `<title>${safeTitle}</title>`);
  html = html.replace(/<meta\s+name="title"\s+content="[^"]*"\s*\/?>/i, () => `<meta name="title" content="${safeTitle}" />`);
  html = html.replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i, () => `<meta name="description" content="${safeDesc}" />`);
  if (safeKeywords) {
    html = html.replace(/<meta\s+name="keywords"\s+content="[^"]*"\s*\/?>/i, () => `<meta name="keywords" content="${safeKeywords}" />`);
  }
  html = html.replace(/<link\s+rel="canonical"[^>]*href="[^"]*"[^>]*\/?>/i, () => `<link rel="canonical" id="pj-canonical-link" href="${safeCanonical}" />`);
  html = html.replace(/<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i, () => `<meta property="og:title" content="${safeTitle}" />`);
  html = html.replace(/<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i, () => `<meta property="og:description" content="${safeDesc}" />`);
  html = html.replace(/<meta\s+property="og:url"[^>]*\/?>/i, () => `<meta property="og:url" id="pj-og-url" content="${safeCanonical}" />`);
  html = html.replace(/<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/i, () => `<meta property="og:image" content="${safeImg}" />`);
  html = html.replace(/<meta\s+property="og:image:url"\s+content="[^"]*"\s*\/?>/i, () => `<meta property="og:image:url" content="${safeImg}" />`);
  html = html.replace(/<meta\s+property="og:image:secure_url"\s+content="[^"]*"\s*\/?>/i, () => `<meta property="og:image:secure_url" content="${safeImg}" />`);
  html = html.replace(/<meta\s+property="og:image:alt"\s+content="[^"]*"\s*\/?>/i, () => `<meta property="og:image:alt" content="${safeTitle}" />`);
  html = html.replace(/<link\s+rel="image_src"\s+href="[^"]*"\s*\/?>/i, () => `<link rel="image_src" href="${safeImg}" />`);
  html = html.replace(/<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i, () => `<meta name="twitter:title" content="${safeTitle}" />`);
  html = html.replace(/<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i, () => `<meta name="twitter:description" content="${safeDesc}" />`);
  html = html.replace(/<meta\s+name="twitter:url"\s+content="[^"]*"\s*\/?>/i, () => `<meta name="twitter:url" content="${safeCanonical}" />`);
  html = html.replace(/<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/?>/i, () => `<meta name="twitter:image" content="${safeImg}" />`);
  html = html.replace(/<meta\s+name="twitter:image:src"\s+content="[^"]*"\s*\/?>/i, () => `<meta name="twitter:image:src" content="${safeImg}" />`);
  html = html.replace(/<meta\s+name="twitter:image:alt"\s+content="[^"]*"\s*\/?>/i, () => `<meta name="twitter:image:alt" content="${safeTitle}" />`);
  html = html.replace(/<\/head>/i, () => `  <script type="application/ld+json" id="pj-edge-discover-jsonld">${discoverArticleSchema}</script>${faqSchemaScript}\n  </head>`);

  // Demote top navbar brand H1 to DIV on subpages so the article H1 is the sole H1 on the page
  html = html.replace(
    /<h1\s+id="pj-shell-brand-h1"([^>]*)>([\s\S]*?)<\/h1>/i,
    (_m, attrs, inner) => `<div id="pj-shell-brand-h1"${attrs}>${inner}</div>`
  );

  // Hide homepage-only cards on subroutes and prepend the dedicated server-rendered route article
  html = html.replace(
    /<div\s+id="pj-shell-home-only-content"\s+style="[^"]*">/i,
    () => `<div id="pj-shell-home-only-content" style="display:none;">`
  );
  html = html.replace(
    /<main\s+class="pj-shell-main"\s+id="pj-shell-main-area">/i,
    () => `<main class="pj-shell-main" id="pj-shell-main-area">\n${articleHtml}`
  );

  return html;
}

async function middleware(request, event) {
  if (request.headers && typeof request.headers.get === 'function' && request.headers.get('x-pj-internal-shell') === '1') {
    return new Response(null, {
      headers: {
        'x-middleware-next': '1'
      }
    });
  }

  const url = new URL(request.url);
  const pathname = url.pathname || '/';
  const ua = (request.headers && typeof request.headers.get === 'function' && request.headers.get('user-agent')) || '';

  // 1. Google Search Console HTML Verification File
  if (pathname === '/googlea0e64484b80e13d1.html') {
    return new Response('google-site-verification: googlea0e64484b80e13d1.html', {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=3600'
      }
    });
  }

  // 2. Google AdSense ads.txt
  if (pathname === '/ads.txt') {
    return new Response('google.com, pub-9661029896137686, DIRECT, f08c47fec0942fa0\n', {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, max-age=3600'
      }
    });
  }

  // 2a. Hindi & Sanskrit Vocal Audio TTS Proxy (/api/tts) for Aarti, Mantra, Chalisa & Rashifal
  if (pathname === '/api/tts') {
    const rawText = (url.searchParams.get('text') || '').trim();
    const lang = (url.searchParams.get('lang') || 'hi').trim();
    if (!rawText) {
      return new Response('Missing text parameter', {
        status: 400,
        headers: { 'Content-Type': 'text/plain; charset=utf-8' }
      });
    }
    const cleanText = rawText
      .replace(/[*#_~`>|•]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 200);
    const encoded = encodeURIComponent(cleanText);
    const ttsEndpoints = [
      `https://translate.googleapis.com/translate_tts?ie=UTF-8&q=${encoded}&tl=${encodeURIComponent(lang)}&client=gtx`,
      `https://translate.google.com/translate_tts?ie=UTF-8&q=${encoded}&tl=${encodeURIComponent(lang)}&client=tw-ob`
    ];
    for (const ttsUrl of ttsEndpoints) {
      try {
        const ttsRes = await fetch(ttsUrl, {
          headers: {
            'User-Agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
            'Referer': 'https://translate.google.com/'
          }
        });
        if (ttsRes.ok) {
          const audioBuf = await ttsRes.arrayBuffer();
          if (audioBuf && audioBuf.byteLength > 100) {
            return new Response(audioBuf, {
              status: 200,
              headers: {
                'Content-Type': 'audio/mpeg',
                'Content-Length': String(audioBuf.byteLength),
                'Access-Control-Allow-Origin': '*',
                'Cache-Control': 'public, max-age=86400, s-maxage=86400'
              }
            });
          }
        }
      } catch {}
    }
    return new Response('TTS service unavailable', {
      status: 502,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' }
    });
  }

  // 2b. Dynamic 4-Tier SEO Freshness Sitemap (/sitemap.xml) — 93 Canonical URLs
  // Category 1 (18 Daily URLs): Current IST Date at 04:30:00+05:30, daily, 0.95-1.0
  // Category 2 (16 Tool/Calculator URLs): Month-start IST Date, weekly, 0.80-0.85
  // Category 3 (54 Static Knowledge/Swabhav/Muhurat URLs): 2026-10-15T00:00:00+05:30, monthly, 0.70-0.75
  // Category 4 (5 Legal & Policy URLs): 2026-08-01T00:00:00+05:30, yearly, 0.30-0.40
  if (pathname === '/sitemap.xml') {
    const reqOrigin = SITE_ORIGIN;
    const {
      dailyBrahmaIso,
      toolsMonthIso,
      staticKnowledgeIso,
      legalPolicyIso
    } = getEdgeIstDateInfo('/');

    const allPaths = Object.keys(ROUTE_DATA).filter((p) => p !== '/mera-khata');
    const cat1 = [];
    const cat2 = [];
    const cat3 = [];
    const cat4 = [];

    for (const p of allPaths) {
      const locUrl = p === '/' ? `${reqOrigin}/` : `${reqOrigin}${p}`;
      if (DAILY_DYNAMIC_EDGE_PATHS.has(p)) {
        cat1.push({
          loc: locUrl,
          lastmod: dailyBrahmaIso,
          changefreq: 'daily',
          priority: p === '/' ? '1.0' : '0.95'
        });
      } else if (TOOL_CALCULATOR_EDGE_PATHS.has(p)) {
        const isTopTool =
          p === '/janam-kundali' ||
          p === '/kundali-milan' ||
          p === '/shani-sadesati-calculator' ||
          p === '/digital-mandir' ||
          p === '/ram-shalaka-prashnavali' ||
          p === '/shubh-muhurat' ||
          p === '/ank-jyotish-mulank-calculator' ||
          p === '/naam-se-kundali-milan' ||
          p === '/vivah-yog-calculator' ||
          p === '/sarkari-naukri-rajyog';
        cat2.push({
          loc: locUrl,
          lastmod: toolsMonthIso,
          changefreq: 'weekly',
          priority: isTopTool ? '0.85' : '0.80'
        });
      } else if (LEGAL_POLICY_EDGE_PATHS.has(p)) {
        const isHighLegal = p === '/about-us' || p === '/contact-us';
        cat4.push({
          loc: locUrl,
          lastmod: legalPolicyIso,
          changefreq: 'yearly',
          priority: isHighLegal ? '0.40' : '0.30'
        });
      } else {
        const isHighKnowledge =
          p.includes('-swabhav') ||
          p.includes('-dosh-') ||
          p.includes('-muhurat') ||
          p.includes('ekadashi') ||
          p.includes('grahan') ||
          p.includes('purnima') ||
          p.includes('amavasya') ||
          p.includes('pradosh') ||
          p.includes('chaturthi') ||
          p === '/rudrapur-jyotish' ||
          p === '/sapne-me-saap-dekhna';
        cat3.push({
          loc: locUrl,
          lastmod: staticKnowledgeIso,
          changefreq: 'monthly',
          priority: isHighKnowledge ? '0.75' : '0.70'
        });
      }
    }

    const orderedEntries = [...cat1, ...cat2, ...cat3, ...cat4];
    const urlXmlBlocks = orderedEntries
      .map(
        (e) => `  <url>
    <loc>${xmlEscape(e.loc)}</loc>
    <lastmod>${xmlEscape(e.lastmod)}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>
  </url>`
      )
      .join('\n');

    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urlXmlBlocks}
</urlset>`;

    return new Response(sitemapXml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'X-Robots-Tag': 'index, follow',
        'Cache-Control': 'public, max-age=900, s-maxage=900, stale-while-revalidate=3600'
      }
    });
  }

  // 2c. Google Discover, Google Search Console & Follow Live RSS 2.0 + Media RSS Feed (/feed.xml & /rss.xml)
  if (pathname === '/feed.xml' || pathname === '/rss.xml') {
    const reqOrigin = SITE_ORIGIN;
    const nowUtc = new Date();
    const istMs = nowUtc.getTime() + 5.5 * 60 * 60 * 1000;
    const istDate = new Date(istMs);
    const yyyy = istDate.getUTCFullYear();
    const mm = String(istDate.getUTCMonth() + 1).padStart(2, '0');
    const dd = String(istDate.getUTCDate()).padStart(2, '0');
    const todayIstStr = `${yyyy}-${mm}-${dd}`;

    // Exact 04:30:00 IST Brahma Muhurat RFC timestamp for daily items
    const brahmaMuhuratIstDate = new Date(
      Date.UTC(yyyy, istDate.getUTCMonth(), istDate.getUTCDate(), 4, 30, 0) - 5.5 * 60 * 60 * 1000
    );
    const dailyBrahmaRfc = brahmaMuhuratIstDate.toUTCString();
    const toolsMonthRfc = new Date(
      Date.UTC(yyyy, istDate.getUTCMonth(), 1, 4, 30, 0) - 5.5 * 60 * 60 * 1000
    ).toUTCString();
    const staticArticleRfc = new Date('2026-10-15T00:00:00+05:30').toUTCString();

    const allRouteKeys = Object.keys(ROUTE_DATA).filter((p) => p !== '/mera-khata');
    const orderedFeedPaths = [
      ...allRouteKeys.filter((p) => DAILY_DYNAMIC_EDGE_PATHS.has(p)),
      ...allRouteKeys.filter((p) => TOOL_CALCULATOR_EDGE_PATHS.has(p)),
      ...allRouteKeys.filter(
        (p) =>
          !DAILY_DYNAMIC_EDGE_PATHS.has(p) &&
          !TOOL_CALCULATOR_EDGE_PATHS.has(p) &&
          !LEGAL_POLICY_EDGE_PATHS.has(p)
      ),
      ...allRouteKeys.filter((p) => LEGAL_POLICY_EDGE_PATHS.has(p))
    ];

    const itemsXml = orderedFeedPaths
      .map((p) => {
        const itemInfo = ROUTE_DATA[p];
        if (!itemInfo) return '';
        const itemUrl = p === '/' ? `${reqOrigin}/` : `${reqOrigin}${p}`;
        const itemSlug = p === '/' ? 'home' : p.replace(/^\/+/, '').replace(/\//g, '-');
        const itemImg = `${reqOrigin}/og-card/${itemSlug}-discover-${VERSION_TAG}.jpg`;
        const isDaily = DAILY_DYNAMIC_EDGE_PATHS.has(p);
        const isTool = TOOL_CALCULATOR_EDGE_PATHS.has(p);
        const itemGuid = isDaily ? `${itemUrl}#${todayIstStr}` : itemUrl;
        const itemPubDate = isDaily ? dailyBrahmaRfc : isTool ? toolsMonthRfc : staticArticleRfc;
        return `    <item>
      <title>${xmlEscape(itemInfo.title)}</title>
      <link>${xmlEscape(itemUrl)}</link>
      <guid isPermaLink="false">${xmlEscape(itemGuid)}</guid>
      <pubDate>${itemPubDate}</pubDate>
      <dc:creator>आचार्य पण्डित शशांक शर्मा (Acharya Pandit Shashank Sharma)</dc:creator>
      <description>${xmlEscape(itemInfo.desc)}</description>
      <enclosure url="${xmlEscape(itemImg)}" length="95000" type="image/jpeg" />
      <media:content url="${xmlEscape(itemImg)}" type="image/jpeg" medium="image" width="1200" height="630">
        <media:title type="plain">${xmlEscape(itemInfo.title)}</media:title>
      </media:content>
    </item>`;
      })
      .filter(Boolean)
      .join('\n');

    const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>पण्डित जी ऑनलाइन — आज का पंचांग, राशिफल, शुभ मुहूर्त व जन्म कुंडली</title>
    <link>${reqOrigin}/</link>
    <description>आचार्य पण्डित शशांक शर्मा (रुद्रपुर, उत्तराखण्ड) द्वारा प्रतिदिन अपडेटेड शुद्ध दृक पंचांग, दैनिक राशिफल, शुभ मुहूर्त एवं वैदिक ज्योतिष लेख।</description>
    <language>hi-IN</language>
    <lastBuildDate>${dailyBrahmaRfc}</lastBuildDate>
    <atom:link href="${reqOrigin}${pathname}" rel="self" type="application/rss+xml" />
    <atom:link href="https://pubsubhubbub.appspot.com/" rel="hub" />
    <image>
      <url>${reqOrigin}/pwa-512x512.png</url>
      <title>पण्डित जी ऑनलाइन</title>
      <link>${reqOrigin}/</link>
    </image>
${itemsXml}
  </channel>
</rss>`;

    return new Response(rssXml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'X-Robots-Tag': 'index, follow',
        'Cache-Control': 'public, max-age=900, s-maxage=900, stale-while-revalidate=3600'
      }
    });
  }

  // 3. Dynamic Per-Page SVG Card (/og-svg/:slug.svg)
  // Serves 100% Clean Text-Free Hero SVG for Google Discover (-discover or default)
  // and Branded Social Card SVG for WhatsApp (-wa) & Facebook/Telegram (-social)
  if (pathname.startsWith('/og-svg/')) {
    const isSquare = isSquareAssetRequest(pathname, url, '');
    const isBrandedSocial = isBrandedSocialAssetRequest(pathname, url, '');
    const rawSlug = cleanSlugFromAssetPath(pathname);
    const routePath =
      rawSlug === 'home'
        ? '/'
        : rawSlug.startsWith('puja-') && rawSlug !== 'puja-services' && rawSlug !== 'puja-samagri-list'
          ? '/puja/' + rawSlug.slice(5)
          : '/' + rawSlug;
    const info = resolveRouteInfo(routePath, url.searchParams);
    const canonicalSlug = info.path.replace(/^\/+/, '').replace(/\//g, '-') || 'home';
    const svg = isBrandedSocial
      ? buildOgCardSvg(info, isSquare)
      : buildDiscoverCleanHeroSvg(info, canonicalSlug);
    return new Response(svg, {
      status: 200,
      headers: {
        'Content-Type': 'image/svg+xml; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=31536000, s-maxage=31536000, immutable'
      }
    });
  }

  // 4. Dedicated Per-Page High-Res JPEG Card (/og-card/:slug.jpg or /api/og-card/:slug)
  // Routes Google Discover / Googlebot / RSS requests to 100% Clean Text-Free Hero Artwork (-discover)
  // and routes WhatsApp (-wa) / Facebook (-social) requests to Branded Social Cards
  if (pathname.startsWith('/og-card/') || pathname.startsWith('/api/og-card/')) {
    const isSquare = isSquareAssetRequest(pathname, url, ua);
    const isBrandedSocial = isBrandedSocialAssetRequest(pathname, url, ua);
    const rawSlug = cleanSlugFromAssetPath(pathname);
    const cleanSlug = rawSlug || 'home';

    const routePath =
      cleanSlug === 'home'
        ? '/'
        : cleanSlug.startsWith('puja-') && cleanSlug !== 'puja-services' && cleanSlug !== 'puja-samagri-list'
          ? '/puja/' + cleanSlug.slice(5)
          : '/' + cleanSlug;
    const info = resolveRouteInfo(routePath, url.searchParams);
    const canonicalSlug = info.path.replace(/^\/+/, '').replace(/\//g, '-') || 'home';
    const svgSuffix = isSquare
      ? `-wa-${VERSION_TAG}`
      : isBrandedSocial
        ? `-social-${VERSION_TAG}`
        : `-discover-${VERSION_TAG}`;
    const svgUrl = `${SITE_ORIGIN}/og-svg/${canonicalSlug}${svgSuffix}.svg`;
    const targetW = isSquare ? 800 : 1200;
    const targetH = isSquare ? 800 : 630;

    const rasterMirrors = [
      `https://wsrv.nl/?url=${encodeURIComponent(svgUrl)}&w=${targetW}&h=${targetH}&output=jpg&q=95&maxage=1y`,
      `https://images.weserv.nl/?url=${encodeURIComponent(svgUrl)}&w=${targetW}&h=${targetH}&output=jpg&q=95&maxage=1y`
    ];

    for (const mirrorUrl of rasterMirrors) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 7000);
        const imgRes = await fetch(mirrorUrl, {
          signal: controller.signal,
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; PanditJiOnline/1.0; +https://www.panditjionline.online)',
            'Accept': 'image/jpeg,image/*;q=0.9'
          }
        });
        clearTimeout(timeoutId);
        if (imgRes.ok) {
          const buf = await imgRes.arrayBuffer();
          if (buf.byteLength > 1000) {
            return new Response(buf, {
              status: 200,
              headers: {
                'Content-Type': 'image/jpeg',
                'Content-Length': String(buf.byteLength),
                'Access-Control-Allow-Origin': '*',
                'Cache-Control': 'public, max-age=31536000, s-maxage=31536000, immutable',
                'X-Robots-Tag': 'index, follow, max-image-preview:large'
              }
            });
          }
        }
      } catch {}
    }

    // Fallback redirect if both mirrors time out
    return Response.redirect(rasterMirrors[0], 302);
  }

  // 5. Explicit /api/social-preview endpoint
  if (pathname === '/api/social-preview') {
    const targetPath = url.searchParams.get('path') || '/';
    const info = resolveRouteInfo(targetPath, url.searchParams);
    return new Response(buildSocialHtml(info, url, ua), {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=0, s-maxage=3600'
      }
    });
  }

  // 6. Intercept Social Media Crawlers (WhatsApp, Facebook, Telegram, Twitter/X, LinkedIn, Discord, Slack, Instagram, etc.)
  // Never intercept Googlebot, FeedFetcher-Google, Google-Favicon, Google-InspectionTool, PageSpeed/Lighthouse, or AdSense (Mediapartners-Google / AdsBot-Google)
  const isGoogleOrAuditBot = /googlebot|feedfetcher-google|google-favicon|google favicon|google-inspectiontool|storebot-google|adsbot-google|mediapartners-google|apis-google|chrome-lighthouse|pagespeed|ptst|gtmetrix|bingbot|yandexbot|baiduspider|duckduckbot/i.test(ua);
  const isSocialBot =
    !isGoogleOrAuditBot &&
    /whatsapp|facebookexternalhit|facebot|meta-externalagent|instagram|threads|telegram|twitterbot|linkedinbot|slackbot|discordbot|pinterest|vkshare|skypeuripreview|embedly|quora|outbrain|redditbot|tumblr|bitlybot|viber|line|snapchat|applebot|okhttp|dalvik/i.test(ua);
  const isPreviewQuery = url.searchParams.get('__social_preview') === '1';

  if (isSocialBot || isPreviewQuery) {
    if (!/\.(ico|png|jpg|jpeg|svg|webp|woff2|js|css|json|txt|xml|map)$/i.test(pathname)) {
      const info = resolveRouteInfo(pathname, url.searchParams);
      const canonicalSlug = info.path.replace(/^\/+/, '').replace(/\//g, '-') || 'home';
      const isWa = /whatsapp/i.test(ua);
      const warmSvgUrl = `${SITE_ORIGIN}/og-svg/${canonicalSlug}${isWa ? '-wa' : '-social'}-${VERSION_TAG}.svg`;
      const warmW = isWa ? 800 : 1200;
      const warmH = isWa ? 800 : 630;
      const warmMirrorUrl = `https://wsrv.nl/?url=${encodeURIComponent(warmSvgUrl)}&w=${warmW}&h=${warmH}&output=jpg&q=95&maxage=1y`;

      if (event && typeof event.waitUntil === 'function') {
        event.waitUntil(fetch(warmMirrorUrl).catch(() => {}));
      } else {
        fetch(warmMirrorUrl).catch(() => {});
      }

      return new Response(buildSocialHtml(info, url, ua), {
        status: 200,
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'public, max-age=0, s-maxage=3600'
        }
      });
    }
  }

  // 7. 301 Permanent Redirect for Duplicate Short Alias URLs & Query-String Tab Links
  const normalizedPath = pathname.replace(/\/+$/, '').toLowerCase() || '/';
  if (ROUTE_ALIASES[normalizedPath]) {
    return Response.redirect(`${SITE_ORIGIN}${ROUTE_ALIASES[normalizedPath]}`, 301);
  }
  if (normalizedPath === '/' && (url.searchParams.has('tab') || url.searchParams.has('category'))) {
    const qInfo = resolveRouteInfo('/', url.searchParams);
    if (qInfo && qInfo.path && qInfo.path !== '/') {
      return Response.redirect(`${SITE_ORIGIN}${qInfo.path}`, 301);
    }
  }

  // 8. Edge SSR for All 68 Canonical Subroutes (Self-Referencing Canonical + Dedicated Article HTML + FAQ Schema)
  const isKnownCanonicalRoute = Boolean(ROUTE_DATA[normalizedPath]);
  if (isKnownCanonicalRoute && normalizedPath !== '/') {
    const info = resolveRouteInfo(normalizedPath, url.searchParams);
    try {
      const shellUrl = new URL('/', url.origin);
      const [shellRes, seoEntry] = await Promise.all([
        fetch(shellUrl.toString(), {
          headers: {
            'x-pj-internal-shell': '1',
            'accept': 'text/html'
          }
        }),
        loadSeoDataForRoute(url.origin, normalizedPath, info)
      ]);
      if (shellRes.ok) {
        const rawShellHtml = await shellRes.text();
        if (rawShellHtml && rawShellHtml.includes('<main')) {
          const transformedHtml = injectEdgeRouteSeo(rawShellHtml, normalizedPath, info, seoEntry);
          return new Response(transformedHtml, {
            status: 200,
            headers: {
              'Content-Type': 'text/html; charset=utf-8',
              'X-Robots-Tag': 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
              'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400'
            }
          });
        }
      }
    } catch {}
  }

  // 9. Legacy or Unknown Non-Asset URLs:
  // Redirect legacy astrology/puja slugs via 301 to their canonical match (or /) so Google Search Console
  // validations for "Not found (404)" and "Excluded by 'noindex' tag" pass cleanly.
  const isAssetOrSystemPath =
    pathname.startsWith('/assets/') ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/.well-known/') ||
    /\.(ico|png|jpg|jpeg|svg|webp|woff2|js|css|json|txt|xml|html|map)$/i.test(pathname);

  if (!isKnownCanonicalRoute && !isAssetOrSystemPath) {
    const resolved = resolveRouteInfo(normalizedPath, url.searchParams);
    const targetCanonical = resolved && ROUTE_DATA[resolved.path] ? resolved.path : '/';
    return Response.redirect(`${SITE_ORIGIN}${targetCanonical}`, 301);
  }

  return new Response(null, {
    headers: {
      'x-middleware-next': '1'
    }
  });
}

module.exports = middleware;
module.exports.default = middleware;
