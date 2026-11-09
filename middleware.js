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
const VERSION_TAG = 'v40';

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
  <text x="400" y="53" font-family="Arial, Helvetica, sans-serif" font-size="11.5" font-weight="900" fill="#ecfdf5" text-anchor="middle" letter-spacing="0.8">100% SHUDDH DRIK</text>

  <rect x="712" y="34" width="176" height="30" rx="15" fill="#451a03" stroke="#fde047" stroke-width="1.6"/>
  <text x="800" y="53" font-family="Arial, Helvetica, sans-serif" font-size="11.5" font-weight="900" fill="#fef08a" text-anchor="middle" letter-spacing="0.8">✓ VERIFIED JYOTISH</text>

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

  <!-- Call To Action Button -->
  <rect x="390" y="448" width="420" height="46" rx="23" fill="url(#ctaGrad)" stroke="#fef08a" stroke-width="2.5"/>
  <text x="600" y="477" font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="1.1">OPEN NOW • 100% FREE SEVA →</text>

  <!-- Bottom Brand Safe Footer Inside Center Safe Zone -->
  <rect x="296" y="508" width="608" height="106" rx="18" fill="#120401" fill-opacity="0.97"/>
  <line x1="296" y1="508" x2="904" y2="508" stroke="url(#goldGrad)" stroke-width="2.4"/>
  <text x="600" y="546" font-family="Arial, Helvetica, sans-serif" font-size="21" font-weight="900" fill="#fde047" text-anchor="middle" letter-spacing="0.8">PANDIT JI ONLINE — RUDRAPUR</text>
  <text x="600" y="578" font-family="Arial, Helvetica, sans-serif" font-size="15.5" font-weight="800" fill="#fed7aa" text-anchor="middle" letter-spacing="0.4">Vedic Jyotish Sansthan (Uttarakhand) • www.panditjionline.online</text>
</svg>`;
}

function buildSocialHtml(routeInfo, requestedUrlObj, ua) {
  const isHome = routeInfo.path === '/';
  const canonicalUrl = isHome ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${routeInfo.path}`;
  const slug = routeInfo.path.replace(/^\/+/, '').replace(/\//g, '-') || 'home';
  const isWhatsApp = /whatsapp/i.test(String(ua || ''));

  // Preserve query/path variations in og:url so WhatsApp/Facebook cache-buster links (?v=1, ?s=v40)
  // are never collapsed back into a stale cached entry on the user's phone
  let ogUrl = canonicalUrl;
  if (requestedUrlObj) {
    const reqPath = requestedUrlObj.pathname || '/';
    const reqSearch = requestedUrlObj.search || '';
    if (reqSearch || reqPath.replace(/\/+$/, '') !== routeInfo.path) {
      ogUrl = `${SITE_ORIGIN}${reqPath}${reqSearch}`;
    }
  }

  // WhatsApp Status & Chat receive the dedicated 800x800 (1:1 HD Square) center card so WhatsApp never
  // crops the sides or downscales a 1.91:1 image into a blurry 157x157 thumbnail!
  // Facebook, Twitter/X, LinkedIn, and Telegram receive the 1200x630 widescreen card (whose center 620x630
  // safe zone also protects 100% of Acharya Ji's portrait and title if cropped).
  const primaryOgImage = isWhatsApp
    ? `${SITE_ORIGIN}/og-card/${slug}-wa-${VERSION_TAG}.jpg`
    : `${SITE_ORIGIN}/og-card/${slug}-${VERSION_TAG}.jpg`;

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
    .replace(/-(wa|sq)$/i, '');
}

function isSquareAssetRequest(pathname, url, ua) {
  if (/-(wa|sq)(-v=?\d+)?\.(jpg|jpeg|png|svg|webp)$/i.test(pathname)) return true;
  if (url && url.searchParams && url.searchParams.get('sq') === '1') return true;
  if (ua && /whatsapp/i.test(ua)) return true;
  return false;
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

  // 2b. Google Discover & Follow Live RSS 2.0 + Media RSS Feed (/feed.xml & /rss.xml)
  if (pathname === '/feed.xml' || pathname === '/rss.xml') {
    const nowUtc = new Date();
    const istMs = nowUtc.getTime() + 5.5 * 60 * 60 * 1000;
    const istDate = new Date(istMs);
    const yyyy = istDate.getUTCFullYear();
    const mm = String(istDate.getUTCMonth() + 1).padStart(2, '0');
    const dd = String(istDate.getUTCDate()).padStart(2, '0');
    const todayIstStr = `${yyyy}-${mm}-${dd}`;
    const pubDateRfc = nowUtc.toUTCString();

    const discoverFeedPaths = [
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
      '/meen-rashifal',
      '/vivah-muhurat-2027',
      '/griha-pravesh-muhurat-2027',
      '/ekadashi-vrat-list-2027',
      '/s-naam-rashi-swabhav',
      '/a-naam-rashi-swabhav',
      '/r-naam-rashi-swabhav',
      '/m-naam-rashi-swabhav',
      '/p-naam-rashi-swabhav',
      '/janam-kundali',
      '/kundali-milan',
      '/shani-sadesati-upay',
      '/manglik-dosh-nivaran',
      '/kaalsarp-dosh-nivaran',
      '/sapne-me-saap-dekhna'
    ];

    const itemsXml = discoverFeedPaths
      .map((p) => {
        const itemInfo = ROUTE_DATA[p];
        if (!itemInfo) return '';
        const itemUrl = `${SITE_ORIGIN}${p}`;
        const itemSlug = p.replace(/^\/+/, '').replace(/\//g, '-');
        const itemImg = `${SITE_ORIGIN}/og-card/${itemSlug}-${VERSION_TAG}.jpg`;
        const isDaily = p.includes('panchang') || p.includes('choghadiya') || p.includes('rahukaal') || p.includes('rashifal');
        const itemGuid = isDaily ? `${itemUrl}#${todayIstStr}` : itemUrl;
        return `    <item>
      <title>${xmlEscape(itemInfo.title)}</title>
      <link>${xmlEscape(itemUrl)}</link>
      <guid isPermaLink="false">${xmlEscape(itemGuid)}</guid>
      <pubDate>${pubDateRfc}</pubDate>
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
    <link>${SITE_ORIGIN}/</link>
    <description>आचार्य पण्डित शशांक शर्मा (रुद्रपुर, उत्तराखण्ड) द्वारा प्रतिदिन अपडेटेड शुद्ध दृक पंचांग, दैनिक राशिफल, शुभ मुहूर्त एवं वैदिक ज्योतिष लेख।</description>
    <language>hi-IN</language>
    <lastBuildDate>${pubDateRfc}</lastBuildDate>
    <atom:link href="${SITE_ORIGIN}/feed.xml" rel="self" type="application/rss+xml" />
    <atom:link href="https://pubsubhubbub.appspot.com/" rel="hub" />
    <image>
      <url>${SITE_ORIGIN}/pwa-512x512.png</url>
      <title>पण्डित जी ऑनलाइन</title>
      <link>${SITE_ORIGIN}/</link>
    </image>
${itemsXml}
  </channel>
</rss>`;

    return new Response(rssXml, {
      status: 200,
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=900, s-maxage=900, stale-while-revalidate=3600'
      }
    });
  }

  // 3. Dynamic Per-Page SVG Card (/og-svg/:slug.svg)
  if (pathname.startsWith('/og-svg/')) {
    const isSquare = isSquareAssetRequest(pathname, url, '');
    const rawSlug = cleanSlugFromAssetPath(pathname);
    const routePath =
      rawSlug === 'home'
        ? '/'
        : rawSlug.startsWith('puja-') && rawSlug !== 'puja-services' && rawSlug !== 'puja-samagri-list'
          ? '/puja/' + rawSlug.slice(5)
          : '/' + rawSlug;
    const info = resolveRouteInfo(routePath, url.searchParams);
    const svg = buildOgCardSvg(info, isSquare);
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
    const isSquare = isSquareAssetRequest(pathname, url, ua);
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
    const svgSuffix = isSquare ? `-wa-${VERSION_TAG}` : `-${VERSION_TAG}`;
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
      const warmSvgUrl = `${SITE_ORIGIN}/og-svg/${canonicalSlug}${isWa ? '-wa' : ''}-${VERSION_TAG}.svg`;
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

function getEdgeIstDateInfo() {
  const nowUtc = new Date();
  const istTime = new Date(nowUtc.getTime() + 5.5 * 60 * 60 * 1000);
  const y = istTime.getUTCFullYear();
  const m = String(istTime.getUTCMonth() + 1).padStart(2, '0');
  const d = String(istTime.getUTCDate()).padStart(2, '0');
  const todayStr = `${y}-${m}-${d}`;
  return {
    todayStr,
    datePublishedIso: `${todayStr}T05:30:00+05:30`,
    dateModifiedIso: nowUtc.toISOString()
  };
}

function buildEdgeAuthorBox() {
  return `<div style="margin-top:20px;padding:15px;background:rgba(30,41,59,0.75);border:1px solid rgba(245,158,11,0.42);border-radius:14px;display:flex;flex-wrap:wrap;gap:14px;align-items:center;">
    <div style="width:46px;height:46px;border-radius:50%;background:linear-gradient(135deg,#f59e0b,#d97706);display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0;">🕉️</div>
    <div style="flex:1;min-width:220px;">
      <div style="font-size:11px;font-weight:700;color:#fbbf24;text-transform:uppercase;letter-spacing:0.8px;">प्रकाशक एवं मुख्य ज्योतिषाचार्य (E-E-A-T Verified Publisher)</div>
      <div style="font-size:15px;font-weight:800;color:#fef3c7;margin-top:2px;">आचार्य पण्डित शशांक शर्मा (Acharya Pandit Shashank Sharma)</div>
      <div style="font-size:12px;color:#cbd5e1;margin-top:2px;">श्री ज्योतिष वैदिक संस्थान • १५+ वर्ष प्रामाणिक वैदिक कर्मकाण्ड एवं ज्योतिष अनुभव</div>
      <div style="font-size:11px;color:#94a3b8;margin-top:4px;">📍 रुद्रपुर, जिला ऊधम सिंह नगर, उत्तराखण्ड - 263153, भारत | 📞 +91 7017279043 | ✉️ shashanksharma0456@gmail.com</div>
    </div>
  </div>`;
}

function buildEdgeRouteArticleHtml(canonicalPath, info) {
  const cleanTitle = xmlEscape(String(info.title || '').split('|')[0].trim() || info.title);
  const cleanDesc = xmlEscape(info.desc || '');
  const badge = xmlEscape(info.badge || 'VEDIC JYOTISH SANSTHAN • RUDRAPUR');
  const slug = canonicalPath.replace(/^\/+/, '').replace(/\//g, '-').toLowerCase() || 'home';
  const discoverHeroImg = `${SITE_ORIGIN}/og-card/${slug}-${VERSION_TAG}.jpg`;
  const { todayStr, datePublishedIso } = getEdgeIstDateInfo();

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
      <p style="font-size:13px;color:#e2e8f0;margin:0;">
