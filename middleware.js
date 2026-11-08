// ============================================================================
// PANDIT JI ONLINE — VERCEL EDGE ROUTING MIDDLEWARE (middleware.js — v37)
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
const VERSION_TAG = 'v38';

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
  '/privacy': '/privacy-policy'
};

const ROUTE_DATA = {
  '/': {
    title: 'पण्डित जी ऑनलाइन — निःशुल्क जन्म कुंडली, पंचांग व राशिफल',
    desc: 'पण्डित जी ऑनलाइन (आचार्य पण्डित शशांक शर्मा, रुद्रपुर): निःशुल्क वैदिक जन्म कुंडली, 36 गुण विवाह मिलान, आज का पंचांग, शुभ मुहूर्त 2026-27 एवं सटीक दैनिक राशिफल।',
    cardTitle: 'PANDIT JI ONLINE',
    cardSub: 'Free Janam Kundali • 36 Gun Milan • Drik Panchang • Digital Mandir',
    shortCard: 'PANDIT JI ONLINE\nVedic Jyotish Rudrapur',
    badge: 'VEDIC JYOTISH SANSTHAN • RUDRAPUR',
    art: 'gyan',
    accent: '#f59e0b'
  },
  '/digital-mandir': {
    title: 'श्री डिजिटल सनातन मंदिर (Live Digital Mandir) — अखंड ज्योति दर्शन, आरती, शंखनाद व वैदिक संकल्प | पण्डित जी ऑनलाइन',
    desc: 'श्री डिजिटल सनातन मंदिर में घर बैठे पावन देव दर्शन करें — अखंड ज्योति प्रज्वलित करें, मंदिर की घंटी व शंखनाद बजाएं, पुष्प अर्पित करें और अपना दैनिक वैदिक संकल्प लें।',
    cardTitle: 'SHRI DIGITAL SANATAN MANDIR',
    cardSub: 'Live 3D Darshan • Akhand Jyoti • Bell & Shankhnaad • Live Aarti',
    shortCard: 'DIGITAL SANATAN MANDIR\nLive 3D Darshan & Aarti',
    badge: '3D VIRTUAL HINDU TEMPLE • LIVE DARSHAN',
    art: 'mandir',
    accent: '#fbbf24'
  },
  '/janam-kundali': {
    title: 'निःशुल्क जन्म कुंडली बनाएं (Free Online Janam Kundali in Hindi) — लग्न कुंडली, महादशा व भविष्यफल | पण्डित जी ऑनलाइन',
    desc: 'अपनी जन्म तिथि, समय और स्थान से मात्र 1 सेकंड में निःशुल्क वैदिक जन्म कुंडली (Lagna, Chandra & Navamsha Chart), विंशोत्तरी महादशा, मांगलिक/साढ़े साती विचार, शुभ रत्न और सम्पूर्ण भविष्यफल प्राप्त करें।',
    cardTitle: 'FREE VEDIC JANAM KUNDALI',
    cardSub: 'Lagna & Navamsha (D-9) • Vimshottari Dasha • Rajyoga & Remedies',
    shortCard: 'FREE JANAM KUNDALI\nLagna, D-9 & Mahadasha',
    badge: '100% ACCURATE LAHIRI CHITRAPAKSHA AYANAMSHA',
    art: 'kundli',
    accent: '#f97316'
  },
  '/kundali-milan': {
    title: 'कुंडली मिलान (Free 36 Gun Milan in Hindi) — वर-कन्या अष्टकूट विवाह मिलान एवं मांगलिक दोष जाँच | पण्डित जी ऑनलाइन',
    desc: 'वर और कन्या की जन्म तिथि या नाम से निःशुल्क 36 गुण अष्टकूट कुंडली मिलान (Kundali Matching for Marriage) करें। वर्ण, वश्य, तारा, योनि, ग्रह मैत्री, गण, भकूट, नाड़ी दोष और मांगलिक दोष का सटीक विश्लेषण।',
    cardTitle: '36 GUN ASHTAKOOT KUNDALI MILAN',
    cardSub: 'Var-Kanya Marriage Compatibility • Manglik Check • Nadi Parihar',
    shortCard: '36 GUN KUNDALI MILAN\nAshtakoot Vivah Matching',
    badge: 'SHASTROKTA VIVAH MATCHING • 36 GUN REPORT',
    art: 'milan',
    accent: '#ec4899'
  },
  '/panchang': {
    title: 'आज का पंचांग (Aaj Ka Panchang) — आज की तिथि, नक्षत्र, शुभ मुहूर्त, राहुकाल व चौघड़िया | पण्डित जी ऑनलाइन',
    desc: 'आज का शुद्ध दृक गणित हिन्दू पंचांग (प्रतिदिन लाइव अपडेटेड) — जानिए आज की तिथि, नक्षत्र, योग, करण, सूर्योदय-सूर्यास्त, अभिजित मुहूर्त, राहुकाल, दिन-रात का चौघड़िया और प्रमुख व्रत-त्योहार।',
    cardTitle: 'AAJ KA DRIK GANIT PANCHANG',
    cardSub: 'Tithi • Nakshatra • Yoga • Karana • Abhijit Muhurat • Rahukaal',
    shortCard: 'AAJ KA DRIK PANCHANG\nTithi, Nakshatra & Muhurat',
    badge: 'DAILY VEDIC HINDU CALENDAR • RUDRAPUR',
    art: 'panchang',
    accent: '#f59e0b'
  },
  '/shubh-muhurat': {
    title: 'शुभ मुहूर्त कैलेंडर एवं नाम से राशि कैलकुलेटर (Shubh Muhurat & Naam Rashi) | पण्डित जी ऑनलाइन',
    desc: 'विवाह, गृह प्रवेश, वाहन खरीद, मुंडन व नामकरण संस्कार के सटीक शुभ मुहूर्त और अक्षर से अपनी वैदिक नाम राशि, नक्षत्र व भाग्यशाली रत्न तुरंत जानें।',
    cardTitle: 'SHUBH MUHURAT 2026 - 2027',
    cardSub: 'Vivah • Griha Pravesh • Mundan Sanskar • Vahan Kharid Muhurat',
    shortCard: 'SHUBH MUHURAT 2026-27\nVivah, Mundan & Vahan',
    badge: 'AUSPICIOUS VEDIC DATES & TIMINGS 2026-27',
    art: 'panchang',
    accent: '#eab308'
  },
  '/vivah-muhurat-2027': {
    title: 'विवाह मुहूर्त 2026-2027 (Vivah Muhurat Dates) — शादी की सभी शुभ तिथियां, लग्न व नक्षत्र सारणी | पण्डित जी ऑनलाइन',
    desc: 'वर्ष 2026 और 2027 (मई, जून, नवंबर, दिसंबर सहित) में शादी-विवाह के लिए 100% सटीक दृक गणित शुभ मुहूर्त तिथियां, शुभ नक्षत्र, तिथि और विवाह लग्न सारणी।',
    cardTitle: 'SHUBH VIVAH MUHURAT 2026-27',
    cardSub: 'Auspicious Hindu Wedding Dates • Tara Bal & Chandra Bal Check',
    shortCard: 'VIVAH MUHURAT 2026-27\nShubh Shadi Dates by Name',
    badge: 'MARRIAGE MUHURAT CALCULATOR BY NAME',
    art: 'milan',
    accent: '#f43f5e'
  },
  '/mundan-muhurat': {
    title: 'मुंडन मुहूर्त 2026-2027 (Mundan Muhurat) — बच्चों के मुंडन संस्कार की सबसे शुभ तिथियां व नक्षत्र | पण्डित जी ऑनलाइन',
    desc: 'शिशु मुंडन (चूड़ाकरण) संस्कार 2026-2027 की सबसे शुभ तिथियां: भद्रा-रहित शुभ चर करण (बव, बालव, कौलव, तैतिल), 12 शुभ नक्षत्र (अश्विनी, मृगशिरा, पुष्य, हस्त, श्रवण) और वर्जित काल की संपूर्ण सारणी।',
    cardTitle: 'MUNDAN SANSKAR MUHURAT 2026-27',
    cardSub: 'Chudakaran Auspicious Dates • Baby Name Nakshatra & Tithi Check',
    shortCard: 'MUNDAN MUHURAT 2026-27\nShishu Chudakaran Dates',
    badge: 'VEDIC SHISHU SANSKAR MUHURAT',
    art: 'panchang',
    accent: '#10b981'
  },
  '/vahan-kharidne-ka-muhurat': {
    title: 'वाहन खरीदने का शुभ मुहूर्त 2026-2027 (Car & Bike Buying Muhurat) — रविवार व सभी 7 दिनों की शुभ तिथियां | पण्डित जी ऑनलाइन',
    desc: 'कार, बाइक या स्कूटी खरीदने और डिलीवरी लेने के लिए सभी 7 दिनों व रविवार (Sunday) की सबसे शुभ तिथियां, रवि-पुष्य योग, सर्वार्थ सिद्धि योग, शुभ चौघड़िया समय और राहुकाल विचार।',
    cardTitle: 'VAHAN KHARIDNE KA MUHURAT 2026-27',
    cardSub: 'Best Car & Bike Buying Dates • Lucky Vehicle Color by Rashi',
    shortCard: 'VAHAN MUHURAT 2026-27\nCar & Bike Shubh Dates',
    badge: 'VEHICLE PURCHASE MUHURAT & LUCKY COLOR',
    art: 'panchang',
    accent: '#3b82f6'
  },
  '/s-naam-rashi-swabhav': {
    title: 'S नाम की राशि क्या है? (कुम्भ राशि) — S (स, श) नाम वालों का स्वभाव, करियर, प्रेम व शुभ रत्न | पण्डित जी ऑनलाइन',
    desc: 'S नाम की राशि कुम्भ (Aquarius - स्वामी शनि देव) होती है। जानिए S (स, सा, सी, सू, से, सो, श) अक्षर से नाम शुरू होने वालों की सटीक वैदिक राशि, नक्षत्र, स्वभाव, करियर, वैवाहिक जीवन, शुभ रंग, शुभ अंक (8) और नीलम रत्न की संपूर्ण जानकारी।',
    cardTitle: 'S NAAM KI RASHI: KUMBH RASHI',
    cardSub: 'S Letter Zodiac (Aquarius) • Shani Dev • Swabhav, Career & Neelam',
    shortCard: 'S NAAM KI RASHI (KUMBH)\nRashi, Swabhav & Career',
    badge: 'S LETTER ZODIAC & PERSONALITY GUIDE',
    art: 'rashi',
    accent: '#a855f7'
  },
  '/shani-sadesati-upay': {
    title: 'शनि साढ़े साती और ढैय्या कैलकुलेटर (2025-2028) व अचूक उपाय | पण्डित जी ऑनलाइन',
    desc: 'मीन राशि में शनि गोचर (2025-2028) के अनुसार अपने नाम से जानें शनि साढ़े साती व ढैय्या की स्थिति, पाया फल और सात्विक उपाय।',
    cardTitle: 'SHANI SADESATI & DHAIYYA 2025-28',
    cardSub: 'Meen Rashi Shani Gochar • Gold/Silver/Iron Paya • Vedic Remedies',
    shortCard: 'SHANI SADESATI 2025-28\nGochar Check & Vedic Upay',
    badge: 'SHANI GOCHAR CALCULATOR & UPAY',
    art: 'shani',
    accent: '#6366f1'
  },
  '/shani-sadesati-calculator': {
    title: 'शनि साढ़े साती कैलकुलेटर (Shani Sadesati Calculator) — मीन गोचर फल व उपाय | पण्डित जी ऑनलाइन',
    desc: 'अपनी राशि या नाम से जानें शनि साढ़े साती व ढैय्या का चरण, लोहे/चांदी/तांबे/सोने का पाया और शनि शांति के अचूक वैदिक उपाय।',
    cardTitle: 'SHANI SADESATI CALCULATOR',
    cardSub: 'Check Sade Sati Phase by Name or Rashi • Shani Shanti Upay',
    shortCard: 'SHANI SADESATI CHECK\nPaya & Shani Shanti Upay',
    badge: 'INSTANT VEDIC SHANI DOSH CHECK',
    art: 'shani',
    accent: '#6366f1'
  },
  '/manglik-dosh-nivaran': {
    title: 'मांगलिक दोष (Manglik Dosh) जाँच कैलकुलेटर, परिहार नियम व वैदिक निवारण | पण्डित जी ऑनलाइन',
    desc: 'क्या कुंडली में मंगल दोष सच में भयानक है? जानें आंशिक व पूर्ण मांगलिक दोष के शास्त्रोक्त परिहार नियम और निवारण।',
    cardTitle: 'MANGLIK DOSH CHECK & PARIHAR',
    cardSub: '1st, 4th, 7th, 8th & 12th House Mangal Analysis • Shastrokta Upay',
    shortCard: 'MANGLIK DOSH CALCULATOR\nParihar Rules & Remedies',
    badge: 'KUJA DOSHA CALCULATOR & CANCELLATION RULES',
    art: 'kundli',
    accent: '#ef4444'
  },
  '/nadi-dosh-nuskhe': {
    title: 'नाड़ी दोष परिहार व गुण मिलान 18 से कम होने के अचूक वैदिक उपाय | पण्डित जी ऑनलाइन',
    desc: 'कुंडली मिलान में नाड़ी दोष (0/8 अंक) या 18 से कम गुण मिलने पर बृहत् पाराशर होरा शास्त्र के प्रामाणिक परिहार नियम।',
    cardTitle: 'NADI DOSH PARIHAR & VIVAH UPAY',
    cardSub: 'Adi, Madhya & Antya Nadi Cancellation Rules • Low Gun Milan Upay',
    shortCard: 'NADI DOSH PARIHAR\nShastrokta Vivah Remedies',
    badge: 'BRIHAT PARASHARA HORA SHASTRA RULES',
    art: 'milan',
    accent: '#f97316'
  },
  '/dharm-gyan-kosh': {
    title: 'वैदिक धर्म ज्ञान कोष — राम शलाका, आरती-चालीसा, पूजा सामग्री व वास्तु | पण्डित जी ऑनलाइन',
    desc: 'श्री राम शलाका प्रश्नावली, शनि साढ़े साती कैलकुलेटर, पूजा सामग्री चेकलिस्ट, सम्पूर्ण आरती-चालीसा व वास्तु शास्त्र।',
    cardTitle: 'SANATAN DHARM GYAN KOSH',
    cardSub: 'Ram Shalaka • Aarti-Chalisa • Puja Samagri • Vastu • Ratna-Rudraksha',
    shortCard: 'SANATAN DHARM GYAN KOSH\nVedic Shastra & Tools',
    badge: 'SACRED VEDIC ENCYCLOPEDIA & TOOLS',
    art: 'gyan',
    accent: '#f59e0b'
  },
  '/ram-shalaka-prashnavali': {
    title: 'श्री राम शलाका प्रश्नावली (Ram Shalaka Prashnavali) — तुलसीदास कृत चौपाई फल | पण्डित जी ऑनलाइन',
    desc: 'गोस्वामी तुलसीदास कृत श्रीरामचरितमानस की दिव्य श्री राम शलाका प्रश्नावली से अपने मन के प्रश्न और कार्य सिद्धि का तुरंत उत्तर जानें।',
    cardTitle: 'SHRI RAM SHALAKA PRASHNAVALI',
    cardSub: 'Goswami Tulsidas Krit Ramcharitmanas Chaupai Guidance & Phal',
    shortCard: 'SHRI RAM SHALAKA\nRamcharitmanas Prashnavali',
    badge: 'DIVINE RAMCHARITMANAS ORACLE',
    art: 'gyan',
    accent: '#fb923c'
  },
  '/puja-samagri-list': {
    title: 'पूजा सामग्री चेकलिस्ट (Puja Samagri List) — सत्यनारायण कथा, गृह प्रवेश व रुद्राभिषेक | पण्डित जी ऑनलाइन',
    desc: 'श्री सत्यनारायण व्रत कथा, गृह प्रवेश, रुद्राभिषेक, नवग्रह शांति व दीपावली पूजन की संपूर्ण प्रामाणिक पूजा सामग्री सूची।',
    cardTitle: 'COMPLETE VEDIC PUJA SAMAGRI LIST',
    cardSub: 'Satyanarayan Katha • Griha Pravesh • Rudrabhishek • Navgrah Shanti',
    shortCard: 'VEDIC PUJA SAMAGRI LIST\nComplete Checklist & PDF',
    badge: 'INTERACTIVE PUJA CHECKLIST & PDF',
    art: 'puja',
    accent: '#f59e0b'
  },
  '/aarti-chalisa-sangrah': {
    title: 'सम्पूर्ण आरती एवं चालीसा संग्रह (Aarti & Chalisa Lyrics) — हनुमान चालीसा, गणेश व लक्ष्मी आरती | पण्डित जी ऑनलाइन',
    desc: 'श्री हनुमान चालीसा, बजरंग बाण, गणेश आरती, लक्ष्मी आरती, शिव तांडव स्तोत्र एवं नित्य पूजन के प्रामाणिक पाठ व ऑडियो।',
    cardTitle: 'SAMPURNA AARTI & CHALISA SANGRAH',
    cardSub: 'Hanuman Chalisa • Ganesh Aarti • Lakshmi Aarti • Shiv Tandav Stotra',
    shortCard: 'AARTI & CHALISA SANGRAH\nHanuman Chalisa & Aarti',
    badge: 'DAILY DEVOTIONAL LYRICS & PATH',
    art: 'mandir',
    accent: '#facc15'
  },
  '/vrat-katha-paran-vidhi': {
    title: 'एकादशी व्रत, प्रदोष व्रत कथा एवं शास्त्रोक्त पारण विधि नियम | पण्डित जी ऑनलाइन',
    desc: 'एकादशी, प्रदोष, पूर्णिमा, करवा चौथ व महाशिवरात्रि व्रत के शास्त्रोक्त नियम, हरि वासर विचार एवं शुद्ध पारण विधि।',
    cardTitle: 'EKADASHI & PRADOSH VRAT VIDHI',
    cardSub: 'Shastrokta Vrat Katha • Hari Vasar Rules • Exact Paran Timings',
    shortCard: 'EKADASHI & VRAT VIDHI\nKatha & Paran Niyam',
    badge: 'SANATAN VRAT & PARVA GUIDE',
    art: 'gyan',
    accent: '#fbbf24'
  },
  '/vastu-shastra-tips': {
    title: 'वास्तु शास्त्र टिप्स एवं दिशा दोष निवारण (Vastu Shastra for Home) | पण्डित जी ऑनलाइन',
    desc: 'ईशान कोण, आग्नेय, नैऋत्य व वायव्य दिशाओं के वास्तु नियम तथा बिना तोड़-फोड़ घर व दुकान के वास्तु दोष दूर करने के उपाय।',
    cardTitle: 'VASTU SHASTRA & DISHA DOSH UPAY',
    cardSub: 'Ishan, Agneya, Nairitya & Vayavya Rules • Home & Shop Remedies',
    shortCard: 'VASTU SHASTRA GUIDE\nHome & Shop Vastu Upay',
    badge: 'VEDIC ARCHITECTURE & VASTU REMEDIES',
    art: 'gyan',
    accent: '#10b981'
  },
  '/ratna-rudraksha-guide': {
    title: 'रत्न एवं रुद्राक्ष मार्गदर्शिका (Gemstone & 1-14 Mukhi Rudraksha Guide) | पण्डित जी ऑनलाइन',
    desc: 'राशि और लग्न अनुसार भाग्यशाली नवरत्न (पुखराज, नीलम, माणिक्य, पन्ना, मूंगा, मोती) तथा 1 से 14 मुखी रुद्राक्ष धारण विधि।',
    cardTitle: 'NAVRATNA & 1-14 MUKHI RUDRAKSHA',
    cardSub: 'Lucky Gemstone by Lagna & Rashi • Authentic Rudraksha Wearing Vidhi',
    shortCard: 'RATNA & RUDRAKSHA GUIDE\nNavratna & 1-14 Mukhi',
    badge: 'VEDIC GEMOLOGY & RUDRAKSHA SCIENCE',
    art: 'rashi',
    accent: '#f59e0b'
  },
  '/swapna-phal-shakun-shastra': {
    title: 'स्वप्न फल एवं शकुन शास्त्र (Dream Meaning & Anga Sphuran) | पण्डित जी ऑनलाइन',
    desc: 'स्वप्न शास्त्र के अनुसार सपनों का शुभ-अशुभ फल तथा शरीर के अंगों के फड़कने (अंग स्फुरण) का प्रामाणिक ज्योतिषीय अर्थ।',
    cardTitle: 'SWAPNA PHAL & SHAKUN SHASTRA',
    cardSub: 'Vedic Dream Interpretation • Auspicious Signs & Anga Sphuran Meaning',
    shortCard: 'SWAPNA & SHAKUN SHASTRA\nVedic Dream Meaning',
    badge: 'SAMUDRIK & SWAPNA SHASTRA GUIDE',
    art: 'gyan',
    accent: '#a855f7'
  },
  '/swarodaya-vigyan': {
    title: 'शिव स्वरोदय विज्ञान (Swarodaya Vigyan) — इड़ा, पिंगला व सुषुम्ना नाड़ी रहस्य | पण्डित जी ऑनलाइन',
    desc: 'चन्द्र स्वर (इड़ा), सूर्य स्वर (पिंगला) और सुषुम्ना नाड़ी की पहचान कर शुभ कार्य, यात्रा व व्यापार में निश्चित कार्य सिद्धि पाएं।',
    cardTitle: 'SHIV SWARODAYA NADI VIGYAN',
    cardSub: 'Ida (Chandra), Pingala (Surya) & Sushumna Nadi Secrets for Success',
    shortCard: 'SHIV SWARODAYA VIGYAN\nIda, Pingala & Sushumna',
    badge: 'ANCIENT SHIV SWARODAYA SHASTRA',
    art: 'gyan',
    accent: '#38bdf8'
  },
  '/geeta-chanakya-niti': {
    title: 'श्रीमद्भगवद्गीता के प्रमुख श्लोक एवं चाणक्य नीति सूत्र (हिंदी अर्थ सहित) | पण्डित जी ऑनलाइन',
    desc: 'जीवन प्रबंधन, धर्म, कर्मयोग और सफलता के लिए श्रीमद्भगवद्गीता के अमर संस्कृत श्लोक और आचार्य चाणक्य की नीतियां।',
    cardTitle: 'SHRIMAD BHAGAVAD GEETA & CHANAKYA NITI',
    cardSub: 'Immortal Sanskrit Shlokas with Hindi Meaning • Life Management Sutras',
    shortCard: 'BHAGAVAD GEETA SHLOKAS\n& Chanakya Niti Sutras',
    badge: 'VEDIC WISDOM & KARMAYOGA SUTRAS',
    art: 'gyan',
    accent: '#f59e0b'
  },
  '/vedic-baby-names': {
    title: 'वैदिक शिशु नामकरण (Vedic Baby Names by Rashi & Nakshatra) | पण्डित जी ऑनलाइन',
    desc: 'नवजात शिशु (लड़के एवं लड़कियों) के लिए नक्षत्र चरण और राशि अक्षर के अनुसार अर्थपूर्ण एवं आधुनिक वैदिक नामों की सूची।',
    cardTitle: 'VEDIC BABY NAMES BY NAKSHATRA',
    cardSub: 'Meaningful Hindu Boy & Girl Names by Rashi Akshar & Nakshatra Charan',
    shortCard: 'VEDIC SHISHU NAAMKARAN\nBaby Names by Nakshatra',
    badge: 'NAAMKARAN SANSKAR NAME FINDER',
    art: 'rashi',
    accent: '#ec4899'
  },
  '/char-dham-tirth-darshan': {
    title: 'चार धाम यात्रा एवं 12 ज्योतिर्लिंग तीर्थ दर्शन मार्गदर्शिका | पण्डित जी ऑनलाइन',
    desc: 'श्री बद्रीनाथ, केदारनाथ, गंगोत्री, यमुनोत्री, काशी विश्वनाथ एवं द्वादश ज्योतिर्लिंगों का पौराणिक महत्व व दर्शन विधि।',
    cardTitle: 'CHAR DHAM & 12 JYOTIRLINGA DARSHAN',
    cardSub: 'Badrinath • Kedarnath • Gangotri • Yamunotri • Dwadash Jyotirlinga',
    shortCard: 'CHAR DHAM & JYOTIRLINGA\nSacred Tirth Yatra Guide',
    badge: 'UTTARAKHAND & BHARAT TIRTH DARSHAN',
    art: 'mandir',
    accent: '#f97316'
  },
  '/rashifal': {
    title: 'आज का राशिफल (मेष से मीन 12 राशियां) | Daily Horoscope in Hindi | पण्डित जी ऑनलाइन',
    desc: 'दैनिक ग्रह गोचर एवं नक्षत्र गणना पर आधारित मेष से मीन तक सभी 12 राशियों का आज का सटीक वैदिक राशिफल व उपाय।',
    cardTitle: 'AAJ KA VEDIC RASHIFAL (12 RASHI)',
    cardSub: 'Mesh to Meen Daily Planetary Transit Prediction, Lucky Number & Upay',
    shortCard: 'AAJ KA VEDIC RASHIFAL\nMesh to Meen 12 Rashiyan',
    badge: 'DAILY HOROSCOPE IN HINDI',
    art: 'rashi',
    accent: '#f59e0b'
  },
  '/jyotish-chat': {
    title: 'निःशुल्क ज्योतिष चैट एवं वैदिक परामर्श | Free Jyotish Chat | पण्डित जी ऑनलाइन',
    desc: 'आचार्य पण्डित शशांक शर्मा जी के मार्गदर्शन में जन्म कुंडली, विवाह, करियर व ग्रह शांति पर 24×7 निःशुल्क ज्योतिषीय परामर्श।',
    cardTitle: '24x7 FREE VEDIC JYOTISH PARAMARSH',
    cardSub: 'Instant Kundali, Vivah, Career & Graha Shanti Guidance Chat',
    shortCard: 'FREE JYOTISH CHAT\n24x7 Vedic Consultation',
    badge: 'ACHARYA SHASHANK SHARMA GUIDANCE',
    art: 'gyan',
    accent: '#fbbf24'
  },
  '/puja-services': {
    title: 'वैदिक पूजा एवं अनुष्ठान बुकिंग (रुद्रपुर) | Online Puja Booking | पण्डित जी ऑनलाइन',
    desc: 'रुद्रपुर (उत्तराखण्ड) में गृह प्रवेश, वास्तु शांति, सत्यनारायण कथा, रुद्राभिषेक एवं विवाह संस्कार हेतु प्रामाणिक वैदिक पूजा बुकिंग।',
    cardTitle: 'VEDIC PUJA & ANUSHTHAN BOOKING',
    cardSub: 'Griha Pravesh • Rudrabhishek • Satyanarayan Katha • Navgrah Shanti',
    shortCard: 'VEDIC PUJA BOOKING\nAcharya Shashank Rudrapur',
    badge: 'RUDRAPUR & UTTARAKHAND VEDIC PANDIT JI',
    art: 'puja',
    accent: '#f97316'
  },
  '/mantra-jaap': {
    title: '108 रुद्राक्ष डिजिटल मंत्र जप माला (Mantra Jaap Counter) | पण्डित जी ऑनलाइन',
    desc: 'गायत्री मंत्र, महामृत्युंजय मंत्र, ॐ नमः शिवाय एवं नवग्रह मंत्रों के दैनिक 108 मनके जाप हेतु डिजिटल रुद्राक्ष माला।',
    cardTitle: '108 RUDRAKSHA DIGITAL JAAP MALA',
    cardSub: 'Gayatri Mantra • Mahamrityunjaya • Om Namah Shivaya • Daily Counter',
    shortCard: '108 RUDRAKSHA JAAP MALA\nDigital Mantra Counter',
    badge: 'INTERACTIVE VEDIC MANTRA MEDITATION',
    art: 'gyan',
    accent: '#f59e0b'
  },
  '/vedic-videos': {
    title: 'वैदिक ज्योतिष, मंत्र एवं धर्म ज्ञान वीडियो | Acharya Shashank Sharma | पण्डित जी ऑनलाइन',
    desc: 'आचार्य पण्डित शशांक शर्मा द्वारा वैदिक कर्मकाण्ड, पर्व-त्योहार मुहूर्त एवं सनातन धर्म ज्ञान के प्रामाणिक वीडियो।',
    cardTitle: 'VEDIC JYOTISH & DHARM GYAN VIDEOS',
    cardSub: 'Authentic Mantra Path, Parva Muhurat & Remedies by Acharya Shashank',
    shortCard: 'VEDIC JYOTISH VIDEOS\nAcharya Shashank Sharma',
    badge: 'OFFICIAL VIDEO GALLERY • RUDRAPUR',
    art: 'gyan',
    accent: '#ef4444'
  },
  '/puja/griha-pravesh': {
    title: 'गृह प्रवेश पूजा एवं वास्तु शांति विधान (शुभ मुहूर्त 2026-27 व सामग्री) | पण्डित जी ऑनलाइन',
    desc: 'नूतन गृह प्रवेश का शास्त्रोक्त विधान, वास्तु पुरुष पूजन, कलश स्थापना विधि एवं रुद्रपुर में वैदिक पण्डित बुकिंग।',
    cardTitle: 'GRIHA PRAVESH & VASTU SHANTI PUJA',
    cardSub: 'Vastu Purush Pujan • Kalash Sthapana • Auspicious Muhurat & Booking',
    shortCard: 'GRIHA PRAVESH PUJA\nVastu Shanti & Muhurat',
    badge: 'SHASTROKTA GRIHA PRAVESH VIDHAN',
    art: 'puja',
    accent: '#f97316'
  },
  '/puja/satyanarayan-katha': {
    title: 'श्री सत्यनारायण व्रत कथा पूजन विधि, सामग्री एवं महत्व | पण्डित जी ऑनलाइन',
    desc: 'स्कन्द पुराण के रेवाखण्ड अनुसार श्री सत्यनारायण भगवान की कथा के ५ अध्याय, पञ्चलोकपाल व नवग्रह पूजन विधि।',
    cardTitle: 'SHRI SATYANARAYAN VRAT KATHA PUJA',
    cardSub: 'Skanda Purana 5 Chapters Katha • Navgrah Pujan & Samagri Vidhi',
    shortCard: 'SATYANARAYAN VRAT KATHA\nPujan Vidhi & Samagri',
    badge: 'PURANOKTA SATYANARAYAN PUJAN',
    art: 'puja',
    accent: '#fbbf24'
  },
  '/puja/rudrabhishek': {
    title: 'महा रुद्राभिषेक पूजन विधि, शुक्ल यजुर्वेदीय रुद्राष्टाध्यायी एवं द्रव्य फल | पण्डित जी ऑनलाइन',
    desc: 'भगवान आशुतोष शिव का शुक्ल यजुर्वेदीय रुद्राष्टाध्यायी से महा रुद्राभिषेक — गोदुग्ध, मधु, घृत व गन्ने के रस से अभिषेक के अचूक लाभ।',
    cardTitle: 'SHUKLA YAJURVEDIYA RUDRABHISHEK',
    cardSub: 'Rudrashtadhyayi Path • Shiv Abhishek Dravya Benefits & Booking',
    shortCard: 'MAHA RUDRABHISHEK PUJA\nShukla Yajurvediya Path',
    badge: 'MAHA RUDRABHISHEK ANUSHTHAN',
    art: 'mandir',
    accent: '#f59e0b'
  },
  '/puja/mahamrityunjaya-jap': {
    title: 'महामृत्युंजय मंत्र जाप अनुष्ठान, हवन विधि एवं अकाल मृत्यु निवारण | पण्डित जी ऑनलाइन',
    desc: 'त्र्यम्बक महामृत्युंजय मंत्र का वैदिक पुरश्चरण विधान, गिलोय-अमृता दशांश हवन एवं असाध्य रोग निवारण।',
    cardTitle: 'MAHAMRITYUNJAYA MANTRA JAAP & HAVAN',
    cardSub: 'Tryambakam Vedic Purashcharan • Health, Longevity & Graha Shanti',
    shortCard: 'MAHAMRITYUNJAYA JAAP\nVedic Purashcharan Havan',
    badge: 'VEDIC ANUSHTHAN • RUDRAPUR',
    art: 'puja',
    accent: '#ef4444'
  },
  '/puja/navgrah-shanti': {
    title: 'नवग्रह शांति एवं नक्षत्र हवन विधान (शनि, राहु-केतु व मंगल दोष निवारण) | पण्डित जी ऑनलाइन',
    desc: 'सूर्य से केतु तक नवग्रह मंडल पूजन, ९ वैदिक समिधाओं से ग्रह शांति हवन, मूल नक्षत्र शांति एवं साढ़ेसाती निवारण अनुष्ठान।',
    cardTitle: 'NAVGRAH SHANTI & NAKSHATRA HAVAN',
    cardSub: '9 Planetary Mandala Pujan • 9 Vedic Samidha Havan • Dosh Nivaran',
    shortCard: 'NAVGRAH SHANTI HAVAN\n9 Graha Mandala Pujan',
    badge: 'COMPLETE GRAHA SHANTI VIDHAN',
    art: 'shani',
    accent: '#a855f7'
  },
  '/puja/kundali-paramarsh': {
    title: 'व्यक्तिगत जन्म कुंडली परामर्श एवं ३६ गुण विवाह मिलान — आचार्य शशांक शर्मा | पण्डित जी ऑनलाइन',
    desc: 'पराशरी, जैमिनी और नाड़ी ज्योतिष के ३-स्तरीय सूत्र से जन्म पत्रिका विश्लेषण, करियर, विवाह समय, संतान योग एवं रत्न-रुद्राक्ष परामर्श।',
    cardTitle: 'PERSONAL KUNDALI CONSULTATION',
    cardSub: 'Parashari, Jaimini & Nadi Jyotish Analysis by Acharya Shashank Sharma',
    shortCard: 'KUNDALI PARAMARSH\nAcharya Shashank Sharma',
    badge: 'EXPERT JYOTISH PARAMARSH • RUDRAPUR',
    art: 'kundli',
    accent: '#f59e0b'
  },
  '/rudrapur-jyotish': {
    title: 'रुद्रपुर एवं उत्तराखण्ड ज्योतिष व वैदिक कर्मकाण्ड केंद्र — पण्डित शशांक शर्मा | पण्डित जी ऑनलाइन',
    desc: 'रुद्रपुर (जिला ऊधम सिंह नगर), हल्द्वानी, पंतनगर, काशीपुर एवं कुमाऊँ क्षेत्र में प्रामाणिक वैदिक पूजा, कथा, अनुष्ठान एवं जन्मपत्री परामर्श।',
    cardTitle: 'RUDRAPUR VEDIC JYOTISH & PUJA KENDRA',
    cardSub: 'Acharya Pandit Shashank Sharma • 15+ Yrs Experience in Kumaon & UK',
    shortCard: 'RUDRAPUR JYOTISH KENDRA\nAcharya Shashank Sharma',
    badge: 'UDHAM SINGH NAGAR • UTTARAKHAND',
    art: 'puja',
    accent: '#f97316'
  },
  '/kundali-dosh-upay': {
    title: 'कुंडली दोष निवारण कोष — कालसर्प, पितृ दोष, गुरु चांडाल एवं ग्रहण दोष उपाय | पण्डित जी ऑनलाइन',
    desc: 'बृहत् पराशर होरा शास्त्र के अनुसार कालसर्प योग, पितृ दोष, केमद्रुम दोष, अंगारक योग एवं विष योग के लक्षण, स्वतः भंग नियम और सात्विक उपाय।',
    cardTitle: 'KUNDALI DOSH NIVARAN KOSH',
    cardSub: 'Kaalsarp • Pitra Dosh • Guru Chandal • Grahan & Kemadruma Remedies',
    shortCard: 'KUNDALI DOSH NIVARAN\nKaalsarp & Pitra Dosh Upay',
    badge: 'SHASTROKTA DOSH PARIHAR GUIDE',
    art: 'kundli',
    accent: '#ef4444'
  },
  '/mera-khata': {
    title: 'मेरा खाता एवं सुरक्षित कुंडली रिकॉर्ड | Mera Khata | पण्डित जी ऑनलाइन',
    desc: 'अपनी सुरक्षित जन्म कुंडली, 36 गुण मिलान रिपोर्ट, 108 मंत्र जाप माला रिकॉर्ड एवं पूजा बुकिंग विवरण देखें।',
    cardTitle: 'MERA KHATA & SAVED KUNDALI VAULT',
    cardSub: 'Saved Janam Kundali • 36 Gun Milan Reports • Mantra Jaap Streaks',
    shortCard: 'MERA KHATA VAULT\nSaved Kundali & Reports',
    badge: 'YAJMAN PERSONAL VEDIC VAULT',
    art: 'kundli',
    accent: '#f59e0b'
  },
  '/about-us': {
    title: 'आचार्य पण्डित शशांक शर्मा — परिचय एवं वैदिक ज्योतिष संस्थान, रुद्रपुर | पण्डित जी ऑनलाइन',
    desc: 'आचार्य पण्डित शशांक शर्मा (15+ वर्ष वैदिक कर्मकाण्ड एवं ज्योतिष अनुभव, रुद्रपुर, उत्तराखण्ड) का प्रामाणिक परिचय।',
    cardTitle: 'ACHARYA PANDIT SHASHANK SHARMA',
    cardSub: '15+ Years Vedic Jyotish & Karmakand Experience • Rudrapur, Uttarakhand',
    shortCard: 'ACHARYA SHASHANK SHARMA\nPandit Ji Online Rudrapur',
    badge: 'FOUNDER • PANDIT JI ONLINE',
    art: 'gyan',
    accent: '#f59e0b'
  },
  '/contact-us': {
    title: 'संपर्क करें — आचार्य पण्डित शशांक शर्मा, रुद्रपुर (उत्तराखण्ड) | पण्डित जी ऑनलाइन',
    desc: 'वैदिक पूजा बुकिंग, जन्मपत्री परामर्श एवं ज्योतिषीय समाधान हेतु सीधे संपर्क करें: +91 7017279043, रुद्रपुर।',
    cardTitle: 'CONTACT PANDIT JI ONLINE RUDRAPUR',
    cardSub: 'Direct Puja Booking & Horoscope Consultation • +91 7017279043',
    shortCard: 'CONTACT PANDIT JI ONLINE\nRudrapur +91 7017279043',
    badge: 'RUDRAPUR, UDHAM SINGH NAGAR (UK)',
    art: 'puja',
    accent: '#10b981'
  },
  '/privacy-policy': {
    title: 'गोपनीयता नीति (Privacy Policy) | पण्डित जी ऑनलाइन',
    desc: 'पण्डित जी ऑनलाइन की आधिकारिक गोपनीयता नीति — जन्म विवरण, डेटा सुरक्षा एवं गूगल एडसेंस मानक।',
    cardTitle: 'PRIVACY POLICY & DATA SECURITY',
    cardSub: '100% Confidential Birth Details & Secure Vedic Astrology Portal',
    shortCard: 'PRIVACY POLICY\nPandit Ji Online',
    badge: 'OFFICIAL PRIVACY & SECURITY STANDARDS',
    art: 'gyan',
    accent: '#10b981'
  },
  '/terms-and-conditions': {
    title: 'नियम एवं शर्तें (Terms & Conditions) | पण्डित जी ऑनलाइन',
    desc: 'पण्डित जी ऑनलाइन पोर्टल के उपयोग, वैदिक ज्योतिष गणना, पूजा बुकिंग एवं परामर्श से जुड़े नियम व शर्तें।',
    cardTitle: 'TERMS & CONDITIONS • PANDIT JI ONLINE',
    cardSub: 'Official Portal Guidelines, Puja Booking Rules & Vedic Standards',
    shortCard: 'TERMS & CONDITIONS\nPandit Ji Online',
    badge: 'OFFICIAL TERMS OF SERVICE',
    art: 'gyan',
    accent: '#f59e0b'
  },
  '/disclaimer': {
    title: 'अस्वीकरण (Disclaimer) — वैदिक ज्योतिष एवं आध्यात्मिक परामर्श सूचना | पण्डित जी ऑनलाइन',
    desc: 'पण्डित जी ऑनलाइन की आधिकारिक वैदिक ज्योतिष एवं आध्यात्मिक परामर्श अस्वीकरण सूचना।',
    cardTitle: 'OFFICIAL ASTROLOGICAL DISCLAIMER',
    cardSub: 'Vedic Shastra Advisory & Spiritual Guidance Standards',
    shortCard: 'OFFICIAL DISCLAIMER\nPandit Ji Online',
    badge: 'SPIRITUAL & ASTROLOGICAL NOTICE',
    art: 'gyan',
    accent: '#f59e0b'
  },
  '/a-naam-rashi-swabhav': {
    title: 'A नाम की राशि क्या है? (मेष राशि) — स्वभाव, करियर, प्रेम व शुभ रत्न | पण्डित जी ऑनलाइन',
    desc: 'जानिए A (अ, आ, ल) अक्षर से नाम वाले लोगों की वैदिक राशि (मेष - Aries), स्वामी मंगल, स्वभाव, करियर, प्रेम विवाह, भाग्यशाली मूंगा रत्न और अचूक वैदिक उपाय।',
    cardTitle: 'A NAAM KI RASHI: MESH (ARIES)',
    cardSub: 'Swami Mangal • Swabhav • Career • Love Life & Lucky Moonga Ratna',
    shortCard: 'A NAAM KI RASHI (MESH)\nSwabhav, Career & Ratna',
    badge: 'STAGE 1 • TOP SEARCH NAAM RASHI GUIDE',
    art: 'rashi',
    accent: '#ef4444'
  },
  '/r-naam-rashi-swabhav': {
    title: 'R नाम की राशि क्या है? (तुला राशि) — स्वभाव, करियर, विवाह व शुभ रत्न | पण्डित जी ऑनलाइन',
    desc: 'जानिए R (र, त) अक्षर से नाम वाले लोगों की वैदिक राशि (तुला - Libra), स्वामी शुक्र, आकर्षक व्यक्तित्व, करियर, वैवाहिक जीवन, शुभ ओपल/हीरा रत्न और अचूक उपाय।',
    cardTitle: 'R NAAM KI RASHI: TULA (LIBRA)',
    cardSub: 'Swami Shukra • Swabhav • Career • Marriage & Lucky Opal Ratna',
    shortCard: 'R NAAM KI RASHI (TULA)\nSwabhav, Vivah & Ratna',
    badge: 'STAGE 1 • TOP SEARCH NAAM RASHI GUIDE',
    art: 'rashi',
    accent: '#ec4899'
  },
  '/m-naam-rashi-swabhav': {
    title: 'M नाम की राशि क्या है? (सिंह राशि) — स्वभाव, राजयोग, करियर व माणिक्य रत्न | पण्डित जी ऑनलाइन',
    desc: 'जानिए M (म, ट) अक्षर से नाम वाले लोगों की वैदिक राशि (सिंह - Leo), स्वामी सूर्य, राजसी स्वभाव, सरकारी नौकरी/व्यापार राजयोग, प्रेम जीवन और शुभ माणिक्य रत्न।',
    cardTitle: 'M NAAM KI RASHI: SINGH (LEO)',
    cardSub: 'Swami Surya • Royal Nature • Rajyoga • Career & Lucky Ruby Ratna',
    shortCard: 'M NAAM KI RASHI (SINGH)\nRajyoga, Career & Manikya',
    badge: 'STAGE 1 • TOP SEARCH NAAM RASHI GUIDE',
    art: 'rashi',
    accent: '#f59e0b'
  },
  '/p-naam-rashi-swabhav': {
    title: 'P नाम की राशि क्या है? (कन्या राशि) — स्वभाव, करियर, व्यापार व पन्ना रत्न | पण्डित जी ऑनलाइन',
    desc: 'जानिए P (प, ष, ण) अक्षर से नाम वाले लोगों की वैदिक राशि (कन्या - Virgo), स्वामी बुध, तीव्र बुद्धि, व्यापार व करियर सफलता, प्रेम जीवन और शुभ पन्ना रत्न।',
    cardTitle: 'P NAAM KI RASHI: KANYA (VIRGO)',
    cardSub: 'Swami Budh • Sharp Intellect • Business • Career & Emerald Ratna',
    shortCard: 'P NAAM KI RASHI (KANYA)\nSwabhav, Vyapar & Panna',
    badge: 'STAGE 1 • TOP SEARCH NAAM RASHI GUIDE',
    art: 'rashi',
    accent: '#10b981'
  },
  '/griha-pravesh-muhurat-2027': {
    title: 'गृह प्रवेश मुहूर्त 2026-2027 — नूतन गृह प्रवेश की शुभ तिथियां, वास्तु नियम व पूजा विधि | पण्डित जी ऑनलाइन',
    desc: 'साल 2026 और 2027 में नए घर में प्रवेश (नूतन, सपूर्व व जीर्ण गृह प्रवेश) के सभी सर्वोत्तम शुभ मुहूर्त, स्थिर लग्न सारणी, वास्तु कलश स्थापना विधि और वर्जित मास।',
    cardTitle: 'GRIHA PRAVESH MUHURAT 2026-2027',
    cardSub: 'Auspicious Dates • Sthir Lagna Table • Vastu Kalash Sthapana Vidhi',
    shortCard: 'GRIHA PRAVESH 2026-27\nShubh Tithi & Vastu Vidhi',
    badge: 'STAGE 2 • SHUBH MUHURAT PANCHANG 2026-27',
    art: 'panchang',
    accent: '#f97316'
  },
  '/ekadashi-vrat-list-2027': {
    title: 'एकादशी व्रत कैलेंडर एवं पारण समय सारणी 2026-2027 (सभी 24 एकादशी तिथि) | पण्डित जी ऑनलाइन',
    desc: 'वर्ष 2026-2027 की सभी 24 एकादशी (निर्जला, देवउठनी, देवशयनी, पुत्रदा, मोक्षदा एकादशी) की सटीक व्रत तिथि, हरि वासर नियम, द्वादशी पारण का शुभ समय एवं व्रत विधि।',
    cardTitle: 'EKADASHI VRAT & PARANA LIST 2026-27',
    cardSub: 'All 24 Ekadashi Dates • Smarta & Vaishnava • Hari Vasar Parana Time',
    shortCard: '24 EKADASHI CALENDAR\nVrat Tithi & Parana Time',
    badge: 'STAGE 2 • SANATAN VRAT PANCHANG 2026-27',
    art: 'panchang',
    accent: '#fbbf24'
  },
  '/kaalsarp-dosh-nivaran': {
    title: 'कालसर्प दोष क्या है? 12 प्रकार (अनंत से शेषनाग), कुंडली जांच एवं अचूक वैदिक उपाय | पण्डित जी ऑनलाइन',
    desc: 'जानिए जन्म कुंडली में राहु-केतु से बनने वाले 12 प्रकार के कालसर्प दोष (अनंत, कुलिक, वासुकि, तक्षक, कर्कोटक, शेषनाग आदि) के लक्षण, स्वतः भंग नियम और अचूक वैदिक शांति उपाय।',
    cardTitle: 'KAALSARP DOSH CHECKER & 12 TYPES',
    cardSub: 'Anant to Sheshnag 12 Kaalsarp • Cancellation Rules & Rudrabhishek Upay',
    shortCard: 'KAALSARP DOSH NIVARAN\n12 Types & Kundali Check',
    badge: 'STAGE 3 • KUNDALI DOSH CALCULATOR',
    art: 'kundli',
    accent: '#a855f7'
  },
  '/sapne-me-saap-dekhna': {
    title: 'सपने में सांप देखना (स्वप्न शास्त्र) — काले, सफेद, पीले व नाग-नागिन दिखने के 21 शुभ-अशुभ संकेत | पण्डित जी ऑनलाइन',
    desc: 'स्वप्न शास्त्र और अग्नि पुराण के अनुसार सपने में सांप देखना, सांप का काटना, शिवलिंग पर नाग दिखना, सफेद या काला सांप दिखने के 21 गूढ़ रहस्य, धन लाभ संकेत और वैदिक उपाय।',
    cardTitle: 'SAPNE ME SAAP DEKHNA (SWAPNA SHASTRA)',
    cardSub: '21 Auspicious & Warning Snake Dream Signs • Shivling Nag & Remedies',
    shortCard: 'SAPNE ME SAAP DEKHNA\n21 Swapna Shastra Signs',
    badge: 'STAGE 3 • VIRAL SWAPNA SHASTRA GUIDE',
    art: 'gyan',
    accent: '#14b8a6'
  },
  '/aaj-ka-panchang': {
    title: 'आज का पंचांग (Aaj Ka Panchang) — तिथि, वार, नक्षत्र, योग, करण व सूर्योदय-सूर्यास्त | पण्डित जी ऑनलाइन',
    desc: 'आज का शुद्ध दृक गणित हिन्दू पंचांग — आज की सटीक तिथि, नक्षत्र, योग, करण, चंद्र राशि, सूर्योदय-सूर्यास्त, अभिजित मुहूर्त, राहुकाल और व्रत-त्योहार।',
    cardTitle: 'AAJ KA SHUDDH DRIK PANCHANG',
    cardSub: 'Daily Tithi • Nakshatra • Yoga • Karana • Sunrise & Abhijit Muhurat',
    shortCard: 'AAJ KA PANCHANG\nTithi, Nakshatra & Muhurat',
    badge: 'DAILY VEDIC PANCHANG • RUDRAPUR',
    art: 'panchang',
    accent: '#f59e0b'
  },
  '/aaj-ka-choghadiya': {
    title: 'आज का चौघड़िया (Aaj Ka Choghadiya) — दिन और रात के शुभ चौघड़िया मुहूर्त (अमृत, शुभ, लाभ, चर) | पण्डित जी ऑनलाइन',
    desc: 'स्थानीय सूर्योदय और सूर्यास्त पर आधारित आज का दिन और रात का चौघड़िया मुहूर्त — जानिए अमृत, शुभ, लाभ, चर, उद्वेग, काल व रोग चौघड़िया का सटीक समय।',
    cardTitle: 'AAJ KA DIN & RAAT CHOGHADIYA',
    cardSub: 'Amrit • Shubh • Labh • Char Muhurat • Daily Live Choghadiya Table',
    shortCard: 'AAJ KA CHOGHADIYA\nAmrit, Shubh & Labh Time',
    badge: 'LIVE VEDIC CHOGHADIYA MUHURAT',
    art: 'panchang',
    accent: '#10b981'
  },
  '/aaj-ka-rahukaal': {
    title: 'आज का राहुकाल (Aaj Ka Rahukaal) — राहुकाल, यमगण्ड, गुलिक काल व अभिजित मुहूर्त समय | पण्डित जी ऑनलाइन',
    desc: 'जानिए आज का सटीक राहुकाल समय, यमगण्ड काल, गुलिक काल और दुर्मुहूर्त का समय तथा राहुकाल में यात्रा व आवश्यक कार्य करने के शास्त्रीय नियम और उपाय।',
    cardTitle: 'AAJ KA RAHUKAAL & YAMAGANDAM',
    cardSub: 'Daily Rahu Kaal Time • Gulika Kaal • Abhijit Muhurat & Vedic Remedies',
    shortCard: 'AAJ KA RAHUKAAL\nTime & Shastrokta Rules',
    badge: 'DAILY RAHUKAAL & ABHIJIT MUHURAT',
    art: 'panchang',
    accent: '#f43f5e'
  },
  '/naam-rashi': {
    title: 'नाम से राशि जानें (Naam Rashi Calculator A to Z) — अक्षर से वैदिक राशि, नक्षत्र, स्वामी ग्रह व शुभ रत्न | पण्डित जी ऑनलाइन',
    desc: 'अपने हिंदी या अंग्रेजी नाम के पहले अक्षर (A से Z) से जानिए अपनी सटीक वैदिक चंद्र राशि, नक्षत्र चरण, राशि स्वामी, स्वभाव, करियर, लकी नंबर और भाग्यशाली रत्न।',
    cardTitle: 'NAAM RASHI CALCULATOR (A TO Z)',
    cardSub: 'Find Vedic Rashi by Name • 27 Nakshatra Pada • Lucky Ratna & Number',
    shortCard: 'NAAM RASHI CALCULATOR\nRashi, Nakshatra & Ratna',
    badge: '108 NAKSHATRA PADA NAME CALCULATOR',
    art: 'rashi',
    accent: '#a855f7'
  },
  '/mesh-rashifal': {
    title: 'मेष राशिफल (Mesh Rashifal - Aries) — आज का मेष राशिफल, स्वभाव, करियर, प्रेम व मूंगा रत्न | पण्डित जी ऑनलाइन',
    desc: 'मेष राशि (चू, चे, चो, ला, ली, लू, ले, लो, अ) का आज का वैदिक राशिफल, स्वामी मंगल का गोचर फल, व्यक्तित्व, करियर, विवाह सामंजस्य, शुभ मूंगा रत्न और अचूक उपाय।',
    cardTitle: 'MESH RASHIFAL (ARIES HOROSCOPE)',
    cardSub: 'Swami Mangal • Daily Gochar • Career, Love & Red Coral (Moonga) Upay',
    shortCard: 'MESH RASHIFAL (ARIES)\nDaily Horoscope & Upay',
    badge: 'VEDIC RASHIFAL • MESH (ARIES)',
    art: 'rashi',
    accent: '#ef4444'
  },
  '/vrishabh-rashifal': {
    title: 'वृषभ राशिफल (Vrishabh Rashifal - Taurus) — आज का वृषभ राशिफल, स्वभाव, करियर व हीरा/ओपल रत्न | पण्डित जी ऑनलाइन',
    desc: 'वृषभ राशि (ई, ऊ, ए, ओ, वा, वी, वू, वे, वो) का आज का वैदिक राशिफल, स्वामी शुक्र का गोचर प्रभाव, स्वभाव, धन-संपत्ति, दांपत्य जीवन, शुभ रत्न और वैदिक उपाय।',
    cardTitle: 'VRISHABH RASHIFAL (TAURUS)',
    cardSub: 'Swami Shukra • Daily Gochar • Wealth, Family & Diamond/Opal Ratna',
    shortCard: 'VRISHABH RASHIFAL\nDaily Horoscope & Upay',
    badge: 'VEDIC RASHIFAL • VRISHABH (TAURUS)',
    art: 'rashi',
    accent: '#ec4899'
  },
  '/mithun-rashifal': {
    title: 'मिथुन राशिफल (Mithun Rashifal - Gemini) — आज का मिथुन राशिफल, स्वभाव, व्यापार व पन्ना रत्न | पण्डित जी ऑनलाइन',
    desc: 'मिथुन राशि (का, की, कू, घ, ङ, छ, के, को, ह) का आज का वैदिक राशिफल, स्वामी बुध का गोचर फल, बौद्धिक क्षमता, व्यापार, करियर, शुभ पन्ना रत्न और गणपति उपाय।',
    cardTitle: 'MITHUN RASHIFAL (GEMINI)',
    cardSub: 'Swami Budh • Daily Gochar • Business, Intellect & Emerald (Panna)',
    shortCard: 'MITHUN RASHIFAL\nDaily Horoscope & Upay',
    badge: 'VEDIC RASHIFAL • MITHUN (GEMINI)',
    art: 'rashi',
    accent: '#10b981'
  },
  '/kark-rashifal': {
    title: 'कर्क राशिफल (Kark Rashifal - Cancer) — आज का कर्क राशिफल, स्वभाव, परिवार व मोती रत्न | पण्डित जी ऑनलाइन',
    desc: 'कर्क राशि (ही, हू, हे, हो, डा, डी, डू, डे, डो) का आज का वैदिक राशिफल, स्वामी चंद्रमा का गोचर फल, भावुक स्वभाव, पारिवारिक सुख, शुभ मोती रत्न और शिव आराधना उपाय।',
    cardTitle: 'KARK RASHIFAL (CANCER HOROSCOPE)',
    cardSub: 'Swami Chandra • Daily Gochar • Family, Peace & Natural Pearl (Moti)',
    shortCard: 'KARK RASHIFAL (CANCER)\nDaily Horoscope & Upay',
    badge: 'VEDIC RASHIFAL • KARK (CANCER)',
    art: 'rashi',
    accent: '#38bdf8'
  },
  '/simha-rashifal': {
    title: 'सिंह राशिफल (Simha Rashifal - Leo) — आज का सिंह राशिफल, राजयोग, करियर व माणिक्य रत्न | पण्डित जी ऑनलाइन',
    desc: 'सिंह राशि (मा, मी, मू, मे, मो, टा, टी, टू, टे) का आज का वैदिक राशिफल, स्वामी सूर्य देव का गोचर फल, नेतृत्व क्षमता, सरकारी नौकरी योग, माणिक्य रत्न और सूर्य अर्घ्य उपाय।',
    cardTitle: 'SIMHA RASHIFAL (LEO HOROSCOPE)',
    cardSub: 'Swami Surya • Daily Gochar • Leadership, Rajyoga & Ruby (Manikya)',
    shortCard: 'SIMHA RASHIFAL (LEO)\nDaily Horoscope & Upay',
    badge: 'VEDIC RASHIFAL • SIMHA (LEO)',
    art: 'rashi',
    accent: '#f59e0b'
  },
  '/kanya-rashifal': {
    title: 'कन्या राशिफल (Kanya Rashifal - Virgo) — आज का कन्या राशिफल, स्वभाव, करियर व पन्ना रत्न | पण्डित जी ऑनलाइन',
    desc: 'कन्या राशि (टो, पा, पी, पू, ष, ण, ठ, पे, पो) का आज का वैदिक राशिफल, उच्च के बुध का गोचर फल, विश्लेषणात्मक बुद्धि, व्यापार, स्वास्थ्य, पन्ना रत्न और वैदिक उपाय।',
    cardTitle: 'KANYA RASHIFAL (VIRGO HOROSCOPE)',
    cardSub: 'Swami Budh • Daily Gochar • Finance, Career & Emerald (Panna) Upay',
    shortCard: 'KANYA RASHIFAL (VIRGO)\nDaily Horoscope & Upay',
    badge: 'VEDIC RASHIFAL • KANYA (VIRGO)',
    art: 'rashi',
    accent: '#10b981'
  },
  '/tula-rashifal': {
    title: 'तुला राशिफल (Tula Rashifal - Libra) — आज का तुला राशिफल, स्वभाव, दांपत्य व हीरा/ओपल रत्न | पण्डित जी ऑनलाइन',
    desc: 'तुला राशि (रा, री, रू, रे, रो, ता, ती, तू, ते) का आज का वैदिक राशिफल, स्वामी शुक्र का गोचर फल, न्यायप्रिय स्वभाव, व्यापारिक साझेदारी, ऐश्वर्य, ओपल रत्न और लक्ष्मी उपाय।',
    cardTitle: 'TULA RASHIFAL (LIBRA HOROSCOPE)',
    cardSub: 'Swami Shukra • Daily Gochar • Harmony, Business & Opal/Diamond Upay',
    shortCard: 'TULA RASHIFAL (LIBRA)\nDaily Horoscope & Upay',
    badge: 'VEDIC RASHIFAL • TULA (LIBRA)',
    art: 'rashi',
    accent: '#ec4899'
  },
  '/vrishchik-rashifal': {
    title: 'वृश्चिक राशिफल (Vrishchik Rashifal - Scorpio) — आज का वृश्चिक राशिफल, स्वभाव, करियर व मूंगा रत्न | पण्डित जी ऑनलाइन',
    desc: 'वृश्चिक राशि (तो, ना, नी, नू, ने, नो, या, यी, यू) का आज का वैदिक राशिफल, स्वामी मंगल का गोचर फल, दृढ़ संकल्प, शोध व प्रशासन योग, मूंगा रत्न और हनुमान जी के उपाय।',
    cardTitle: 'VRISHCHIK RASHIFAL (SCORPIO)',
    cardSub: 'Swami Mangal • Daily Gochar • Determination, Career & Moonga Ratna',
    shortCard: 'VRISHCHIK RASHIFAL\nDaily Horoscope & Upay',
    badge: 'VEDIC RASHIFAL • VRISHCHIK (SCORPIO)',
    art: 'rashi',
    accent: '#dc2626'
  },
  '/dhanu-rashifal': {
    title: 'धनु राशिफल (Dhanu Rashifal - Sagittarius) — आज का धनु राशिफल, धर्म, करियर व पुखराज रत्न | पण्डित जी ऑनलाइन',
    desc: 'धनु राशि (ये, यो, भा, भी, भू, धा, फा, ढा, भे) का आज का वैदिक राशिफल, देवगुरु बृहस्पति का गोचर फल, आध्यात्मिक तेज, उच्च शिक्षा, पुखराज रत्न और विष्णु सहस्रनाम उपाय।',
    cardTitle: 'DHANU RASHIFAL (SAGITTARIUS)',
    cardSub: 'Swami Guru Brihaspati • Daily Gochar • Wisdom, Fortune & Pukhraj',
    shortCard: 'DHANU RASHIFAL\nDaily Horoscope & Upay',
    badge: 'VEDIC RASHIFAL • DHANU (SAGITTARIUS)',
    art: 'rashi',
    accent: '#eab308'
  },
  '/makar-rashifal': {
    title: 'मकर राशिफल (Makar Rashifal - Capricorn) — आज का मकर राशिफल, कर्मयोग, करियर व नीलम रत्न | पण्डित जी ऑनलाइन',
    desc: 'मकर राशि (भो, जा, जी, खी, खू, खे, खो, गा, गी) का आज का वैदिक राशिफल, कर्मफलदाता शनि देव का गोचर फल, अनुशासन, उद्योग व प्रशासन योग, नीलम रत्न और शनि शांति उपाय।',
    cardTitle: 'MAKAR RASHIFAL (CAPRICORN)',
    cardSub: 'Swami Shani Dev • Daily Gochar • Hard Work, Success & Blue Sapphire',
    shortCard: 'MAKAR RASHIFAL\nDaily Horoscope & Upay',
    badge: 'VEDIC RASHIFAL • MAKAR (CAPRICORN)',
    art: 'shani',
    accent: '#6366f1'
  },
  '/kumbh-rashifal': {
    title: 'कुम्भ राशिफल (Kumbh Rashifal - Aquarius) — आज का कुम्भ राशिफल, साढ़ेसाती फल, करियर व नीलम रत्न | पण्डित जी ऑनलाइन',
    desc: 'कुम्भ राशि (गू, गे, गो, सा, सी, सू, से, सो, दा) का आज का वैदिक राशिफल, मूलत्रिकोण स्वामी शनि का गोचर फल, नवाचार, समाज सेवा, साढ़ेसाती उपाय और शुभ नीलम रत्न।',
    cardTitle: 'KUMBH RASHIFAL (AQUARIUS)',
    cardSub: 'Swami Shani Dev • Daily Gochar • Innovation, Sadesati & Neelam Upay',
    shortCard: 'KUMBH RASHIFAL\nDaily Horoscope & Upay',
    badge: 'VEDIC RASHIFAL • KUMBH (AQUARIUS)',
    art: 'shani',
    accent: '#818cf8'
  },
  '/meen-rashifal': {
    title: 'मीन राशिफल (Meen Rashifal - Pisces) — आज का मीन राशिफल, आध्यात्मिक योग, करियर व पुखराज रत्न | पण्डित जी ऑनलाइन',
    desc: 'मीन राशि (दी, दू, थ, झ, ञ, दे, दो, चा, ची) का आज का वैदिक राशिफल, देवगुरु बृहस्पति का गोचर फल, सात्विक स्वभाव, शिक्षा, विदेश योग, पुखराज रत्न और वैदिक उपाय।',
    cardTitle: 'MEEN RASHIFAL (PISCES HOROSCOPE)',
    cardSub: 'Swami Guru Brihaspati • Daily Gochar • Spirituality & Yellow Sapphire',
    shortCard: 'MEEN RASHIFAL (PISCES)\nDaily Horoscope & Upay',
    badge: 'VEDIC RASHIFAL • MEEN (PISCES)',
    art: 'rashi',
    accent: '#fbbf24'
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
  if (totalLen <= 22) {
    return [words.join(' ')];
  }
  if (totalLen <= 46) {
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

function buildOgCardSvg(routeInfo) {
  const lines = splitTitleToLines(routeInfo.cardTitle || 'PANDIT JI ONLINE');
  const lineCount = lines.length;

  let titleBlock = '';
  let sepY = 250;
  if (lineCount === 1) {
    titleBlock = `<text x="60" y="190" font-family="system-ui, -apple-system, sans-serif" font-size="48" font-weight="900" fill="#ffffff" letter-spacing="0.5">${xmlEscape(lines[0])}</text>`;
    sepY = 226;
  } else if (lineCount === 2) {
    titleBlock = `
      <text x="60" y="164" font-family="system-ui, -apple-system, sans-serif" font-size="44" font-weight="900" fill="#ffffff" letter-spacing="0.5">${xmlEscape(lines[0])}</text>
      <text x="60" y="220" font-family="system-ui, -apple-system, sans-serif" font-size="42" font-weight="900" fill="#fde047" letter-spacing="0.5">${xmlEscape(lines[1])}</text>`;
    sepY = 248;
  } else {
    titleBlock = `
      <text x="60" y="148" font-family="system-ui, -apple-system, sans-serif" font-size="34" font-weight="900" fill="#ffffff" letter-spacing="0.5">${xmlEscape(lines[0])}</text>
      <text x="60" y="192" font-family="system-ui, -apple-system, sans-serif" font-size="34" font-weight="900" fill="#fde047" letter-spacing="0.5">${xmlEscape(lines[1])}</text>
      <text x="60" y="234" font-family="system-ui, -apple-system, sans-serif" font-size="32" font-weight="900" fill="#fed7aa" letter-spacing="0.5">${xmlEscape(lines[2])}</text>`;
    sepY = 258;
  }

  const subText = String(routeInfo.cardSub || '');
  const subParts = subText.split('•').map((s) => s.trim()).filter(Boolean);
  const subLine1 = subParts.slice(0, 2).map((s) => '✦ ' + s).join('   ');
  const subLine2 = subParts.slice(2, 4).map((s) => '✦ ' + s).join('   ');

  const badge = xmlEscape(routeInfo.badge || 'VEDIC JYOTISH SANSTHAN • RUDRAPUR');
  const photoUrl = PANDIT_PORTRAIT_DATA_URI;

  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3e1005"/>
      <stop offset="45%" stop-color="#1d0502"/>
      <stop offset="100%" stop-color="#2d0a03"/>
    </linearGradient>
    <radialGradient id="warmCenter" cx="35%" cy="40%" r="65%">
      <stop offset="0%" stop-color="#9a3412" stop-opacity="0.40"/>
      <stop offset="100%" stop-color="#180502" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="portraitAura" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#fde047" stop-opacity="0.85"/>
      <stop offset="50%" stop-color="#f59e0b" stop-opacity="0.50"/>
      <stop offset="85%" stop-color="#d97706" stop-opacity="0.20"/>
      <stop offset="100%" stop-color="#d97706" stop-opacity="0"/>
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
      <circle cx="945" cy="228" r="98"/>
    </clipPath>
  </defs>

  <!-- Background Canvas -->
  <rect width="1200" height="630" fill="url(#bgGrad)"/>
  <rect width="1200" height="630" fill="url(#warmCenter)"/>

  <!-- Ornate Golden Frames -->
  <rect x="18" y="18" width="1164" height="594" rx="24" fill="none" stroke="url(#goldGrad)" stroke-width="3.8" stroke-opacity="0.95"/>
  <rect x="28" y="28" width="1144" height="574" rx="18" fill="none" stroke="#fde047" stroke-width="1.4" stroke-dasharray="8 6" stroke-opacity="0.6"/>

  <!-- Corner Gems -->
  <circle cx="42" cy="42" r="7" fill="#fde047"/>
  <circle cx="1158" cy="42" r="7" fill="#fde047"/>
  <circle cx="42" cy="588" r="7" fill="#fde047"/>
  <circle cx="1158" cy="588" r="7" fill="#fde047"/>

  <!-- Top Badges -->
  <rect x="60" y="50" width="430" height="44" rx="22" fill="#451a03" stroke="#fde047" stroke-width="2.2"/>
  <text x="275" y="78" font-family="system-ui, -apple-system, sans-serif" font-size="15" font-weight="900" fill="#fef08a" text-anchor="middle" letter-spacing="1.2">${badge}</text>

  <rect x="504" y="50" width="218" height="44" rx="22" fill="#065f46" stroke="#6ee7b7" stroke-width="1.8"/>
  <text x="613" y="78" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="900" fill="#ecfdf5" text-anchor="middle" letter-spacing="1">100% SHUDDH DRIK</text>

  <!-- Dynamic Title Block (No Cut-off) -->
  ${titleBlock}

  <!-- Accent Divider -->
  <rect x="60" y="${sepY}" width="660" height="4.5" rx="2.25" fill="url(#goldGrad)"/>

  <!-- Subtitle Features -->
  <text x="60" y="${sepY + 44}" font-family="system-ui, -apple-system, sans-serif" font-size="23" font-weight="800" fill="#fef3c7">${xmlEscape(subLine1)}</text>
  ${subLine2 ? `<text x="60" y="${sepY + 84}" font-family="system-ui, -apple-system, sans-serif" font-size="21" font-weight="800" fill="#fed7aa">${xmlEscape(subLine2)}</text>` : ''}

  <!-- Call To Action Button -->
  <rect x="60" y="388" width="410" height="54" rx="27" fill="url(#ctaGrad)" stroke="#fef08a" stroke-width="2.8"/>
  <text x="265" y="422" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="1.2">OPEN NOW • 100% FREE SEVA →</text>

  <!-- RIGHT COLUMN: Acharya Pandit Shashank Sharma Portrait Medallion -->
  <!-- Golden Radiant Aura Rays -->
  <circle cx="945" cy="228" r="142" fill="url(#portraitAura)"/>
  <circle cx="945" cy="228" r="122" fill="none" stroke="#fde047" stroke-width="1.8" stroke-dasharray="5 4" stroke-opacity="0.75"/>

  <!-- Outer Bezel Ring -->
  <circle cx="945" cy="228" r="108" fill="none" stroke="url(#goldGrad)" stroke-width="7"/>
  <circle cx="945" cy="228" r="101" fill="none" stroke="#fef08a" stroke-width="2"/>

  <!-- Circular Photo of Acharya Ji -->
  <image href="${photoUrl}" xlink:href="${photoUrl}" x="847" y="130" width="196" height="196" clip-path="url(#panditPhotoClip)" preserveAspectRatio="xMidYMid slice"/>

  <!-- Inner Bevel Over Photo -->
  <circle cx="945" cy="228" r="98" fill="none" stroke="#fde047" stroke-width="2.5" stroke-opacity="0.9"/>

  <!-- Verified Checkmark Badge at Bottom-Right of Portrait -->
  <g transform="translate(1018, 302)">
    <circle cx="0" cy="0" r="20" fill="#047857" stroke="#fde047" stroke-width="3.2"/>
    <path d="M-7 0 L-2 5 L8 -6" fill="none" stroke="#ffffff" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/>
  </g>

  <!-- Pandit Ji Official Name Plate -->
  <rect x="795" y="352" width="300" height="36" rx="18" fill="#451a03" stroke="#fde047" stroke-width="2"/>
  <text x="945" y="376" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="900" fill="#fef08a" text-anchor="middle" letter-spacing="0.6">आचार्य पण्डित शशांक शर्मा</text>

  <text x="945" y="410" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="800" fill="#fed7aa" text-anchor="middle" letter-spacing="0.5">Vedic Jyotish • Rudrapur (Uttarakhand)</text>

  <rect x="825" y="424" width="240" height="28" rx="14" fill="#065f46" stroke="#6ee7b7" stroke-width="1.4"/>
  <text x="945" y="443" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="900" fill="#ecfdf5" text-anchor="middle" letter-spacing="0.8">✓ VERIFIED VEDIC ASTROLOGER</text>

  <!-- Bottom Brand Footer Safe Bar -->
  <rect x="22" y="496" width="1156" height="108" rx="18" fill="#120502" fill-opacity="0.97"/>
  <line x1="22" y1="496" x2="1178" y2="496" stroke="url(#goldGrad)" stroke-width="2.8"/>
  <text x="60" y="538" font-family="system-ui, -apple-system, sans-serif" font-size="23" font-weight="900" fill="#fde047" letter-spacing="0.6">PANDIT JI ONLINE — ACHARYA PANDIT SHASHANK SHARMA</text>
  <text x="60" y="572" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="800" fill="#fed7aa">Vedic Jyotish &amp; Sanatan Dharm Sansthan, Rudrapur (Uttarakhand)  •  www.panditjionline.online</text>
</svg>`;
}

function buildSocialHtml(routeInfo, requestedUrlObj) {
  const isHome = routeInfo.path === '/';
  const canonicalUrl = isHome ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${routeInfo.path}`;
  const slug = routeInfo.path.replace(/^\/+/, '').replace(/\//g, '-') || 'home';

  // Preserve query/path variations in og:url so WhatsApp/Facebook cache-buster links (?v=1, ?s=v34, /v=1)
  // are never collapsed back into a stale cached entry on the user's phone
  let ogUrl = canonicalUrl;
  if (requestedUrlObj) {
    const reqPath = requestedUrlObj.pathname || '/';
    const reqSearch = requestedUrlObj.search || '';
    if (reqSearch || reqPath.replace(/\/+$/, '') !== routeInfo.path) {
      ogUrl = `${SITE_ORIGIN}${reqPath}${reqSearch}`;
    }
  }

  // Single authoritative og:image URL on the first-party domain
  // Always 1200x630 widescreen social share card with Panditji's portrait
  const primaryOgImage = isHome
    ? `${SITE_ORIGIN}/og-card/home-${VERSION_TAG}.jpg`
    : `${SITE_ORIGIN}/og-card/${slug}-${VERSION_TAG}.jpg`;

  const imgWidth = '1200';
  const imgHeight = '630';
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
    .replace(/[-_.]v=?\d+$/i, '');
}

async function middleware(request) {
  const url = new URL(request.url);
  const pathname = url.pathname || '/';

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

  // 3. Dynamic Per-Page SVG Card (/og-svg/:slug.svg)
  if (pathname.startsWith('/og-svg/')) {
    const rawSlug = cleanSlugFromAssetPath(pathname);
    const routePath =
      rawSlug === 'home'
        ? '/'
        : rawSlug.startsWith('puja-') && rawSlug !== 'puja-services' && rawSlug !== 'puja-samagri-list'
          ? '/puja/' + rawSlug.slice(5)
          : '/' + rawSlug;
    const info = resolveRouteInfo(routePath, url.searchParams);
    const svg = buildOgCardSvg(info);
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
  if (pathname.startsWith('/og-card/') || pathname.startsWith('/api/og-card/')) {
    const rawSlug = cleanSlugFromAssetPath(pathname);
    const cleanSlug = rawSlug || 'home';

    // For home and all subpages, generate the dedicated 1200x630 royal Vedic card from SVG via fast mirrors
    const routePath =
      cleanSlug === 'home'
        ? '/'
        : cleanSlug.startsWith('puja-') && cleanSlug !== 'puja-services' && cleanSlug !== 'puja-samagri-list'
          ? '/puja/' + cleanSlug.slice(5)
          : '/' + cleanSlug;
    const info = resolveRouteInfo(routePath, url.searchParams);
    const canonicalSlug = info.path.replace(/^\/+/, '').replace(/\//g, '-') || 'home';
    const svgUrl = `${SITE_ORIGIN}/og-svg/${canonicalSlug}-${VERSION_TAG}.svg`;

    const rasterMirrors = [
      `https://wsrv.nl/?url=${encodeURIComponent(svgUrl)}&w=1200&h=630&output=jpg&q=82`,
      `https://images.weserv.nl/?url=${encodeURIComponent(svgUrl)}&w=1200&h=630&output=jpg&q=82`
    ];

    for (const mirrorUrl of rasterMirrors) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2400);
        const imgRes = await fetch(mirrorUrl, {
          signal: controller.signal,
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; PanditJiOnline/1.0; +https://www.panditjionline.online)',
            'Accept': 'image/jpeg,image/*;q=0.8'
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

    // Subpage dedicated fallback: redirect to the high-resolution vector raster mirror (never homepage photo)
    return Response.redirect(rasterMirrors[0], 302);
  }

  // 5. Explicit /api/social-preview endpoint
  if (pathname === '/api/social-preview') {
    const targetPath = url.searchParams.get('path') || '/';
    const info = resolveRouteInfo(targetPath, url.searchParams);
    return new Response(buildSocialHtml(info, url), {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=0, s-maxage=3600'
      }
    });
  }

  // 6. Intercept Social Media Crawlers (WhatsApp, Facebook, Telegram, Twitter/X, LinkedIn, Discord, Slack, Instagram, etc.)
  // Never intercept Googlebot, Google-Favicon, Google-InspectionTool, PageSpeed/Lighthouse, or AdSense (Mediapartners-Google / AdsBot-Google)
  const ua = request.headers.get('user-agent') || '';
  const isGoogleOrAuditBot = /googlebot|google-favicon|google favicon|google-inspectiontool|storebot-google|adsbot-google|mediapartners-google|apis-google|chrome-lighthouse|pagespeed|ptst|gtmetrix|bingbot|yandexbot|baiduspider|duckduckbot/i.test(ua);
  const isSocialBot =
    !isGoogleOrAuditBot &&
    /whatsapp|facebookexternalhit|facebot|meta-externalagent|instagram|threads|telegram|twitterbot|linkedinbot|slackbot|discordbot|pinterest|vkshare|skypeuripreview|embedly|quora|outbrain|redditbot|tumblr|bitlybot|viber|line|snapchat|applebot|okhttp|dalvik/i.test(ua);
  const isPreviewQuery = url.searchParams.get('__social_preview') === '1';

  if (isSocialBot || isPreviewQuery) {
    if (!/\.(ico|png|jpg|jpeg|svg|webp|woff2|js|css|json|txt|xml|map)$/i.test(pathname)) {
      const info = resolveRouteInfo(pathname, url.searchParams);
      return new Response(buildSocialHtml(info, url), {
        status: 200,
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'public, max-age=0, s-maxage=3600'
        }
      });
    }
  }

  // 7. 301 Permanent Redirect for Duplicate Short Alias URLs (consolidates SEO authority in Google Search Console)
  const normalizedPath = pathname.replace(/\/+$/, '').toLowerCase() || '/';
  if (ROUTE_ALIASES[normalizedPath]) {
    return Response.redirect(`${SITE_ORIGIN}${ROUTE_ALIASES[normalizedPath]}${url.search}`, 301);
  }

  // 8. Normal Browser, Googlebot, PageSpeed & AdSense requests:
  // If path is an unknown non-asset URL, return a clean HTTP 404 without AdSense scripts (prevents Soft-404 AdSense policy violations)
  const isKnownCanonicalRoute = Boolean(ROUTE_DATA[normalizedPath]);
  const isAssetOrSystemPath =
    pathname.startsWith('/assets/') ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/.well-known/') ||
    /\.(ico|png|jpg|jpeg|svg|webp|woff2|js|css|json|txt|xml|html|map)$/i.test(pathname);

  if (!isKnownCanonicalRoute && !isAssetOrSystemPath) {
    const notFoundHtml = `<!doctype html>
<html lang="hi">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="robots" content="noindex, nofollow" />
  <meta name="googlebot" content="noindex, nofollow" />
  <title>पृष्ठ उपलब्ध नहीं है (404 Not Found) | पण्डित जी ऑनलाइन</title>
  <link rel="canonical" href="${SITE_ORIGIN}/" />
</head>
<body style="margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;background:#120703;color:#fef3c7;font-family:system-ui,-apple-system,sans-serif;padding:24px;text-align:center;">
  <main style="max-width:540px;background:rgba(30,14,6,0.95);border:1px solid rgba(245,158,11,0.45);border-radius:20px;padding:32px 24px;box-shadow:0 16px 40px rgba(0,0,0,0.6);">
    <div style="font-size:42px;margin-bottom:10px;">🕉️</div>
    <h1 style="margin:0 0 10px 0;font-size:22px;color:#fde047;">यह पृष्ठ उपलब्ध नहीं है (404)</h1>
    <p style="margin:0 0 20px 0;font-size:14px;line-height:1.65;color:#fed7aa;">आप जिस वैदिक ज्योतिष पृष्ठ को खोज रहे हैं, उसका पता बदल गया है या वह उपलब्ध नहीं है। कृपया पण्डित जी ऑनलाइन के मुख्य पृष्ठ या नीचे दिए गए प्रमुख अनुभागों पर जाएं:</p>
    <div style="display:flex;flex-wrap:wrap;gap:10px;justify-content:center;">
      <a href="/" style="background:linear-gradient(90deg,#f59e0b,#facc15);color:#020617;text-decoration:none;font-weight:800;font-size:14px;padding:10px 18px;border-radius:999px;">🏠 मुख्य पृष्ठ (Home)</a>
      <a href="/janam-kundali" style="background:rgba(245,158,11,0.18);border:1px solid rgba(245,158,11,0.5);color:#fef08a;text-decoration:none;font-weight:700;font-size:13px;padding:10px 16px;border-radius:999px;">📜 निःशुल्क जन्म कुंडली</a>
      <a href="/kundali-milan" style="background:rgba(245,158,11,0.18);border:1px solid rgba(245,158,11,0.5);color:#fef08a;text-decoration:none;font-weight:700;font-size:13px;padding:10px 16px;border-radius:999px;">💑 36 गुण मिलान</a>
      <a href="/panchang" style="background:rgba(245,158,11,0.18);border:1px solid rgba(245,158,11,0.5);color:#fef08a;text-decoration:none;font-weight:700;font-size:13px;padding:10px 16px;border-radius:999px;">📅 आज का पंचांग</a>
      <a href="/rashifal" style="background:rgba(245,158,11,0.18);border:1px solid rgba(245,158,11,0.5);color:#fef08a;text-decoration:none;font-weight:700;font-size:13px;padding:10px 16px;border-radius:999px;">♈ दैनिक राशिफल</a>
    </div>
  </main>
</body>
</html>`;
    return new Response(notFoundHtml, {
      status: 404,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'X-Robots-Tag': 'noindex, nofollow',
        'Cache-Control': 'no-store, must-revalidate'
      }
    });
  }

  return new Response(null, {
    headers: {
      'x-middleware-next': '1'
    }
  });
}

module.exports = middleware;
module.exports.default = middleware;
