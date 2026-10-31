// ============================================================================
// PANDIT JI ONLINE — VERCEL EDGE ROUTING MIDDLEWARE (middleware.js)
// Zero-dependency Edge/Routing Middleware for www.panditjionline.online
// Handles:
// 1. Per-page WhatsApp / Facebook / Social Crawler OpenGraph HTML (200 OK)
// 2. Dynamic 1200x630 Per-Page Vedic OG Card Images (/og-svg/:slug.svg & /og-card/:slug.jpg)
// 3. Google Search Console (googlea0e64484b80e13d1.html) & AdSense (ads.txt)
// ============================================================================

const SITE_ORIGIN = 'https://www.panditjionline.online';
const HOMEPAGE_IMAGE = 'https://iili.io/neb1ghg.jpg';
const VERSION_TAG = 'v32';

const ROUTE_ALIASES = {
  '/kundli': '/janam-kundali',
  '/kundali': '/janam-kundali',
  '/milan': '/kundali-milan',
  '/gun-milan': '/kundali-milan',
  '/mandir': '/digital-mandir',
  '/muhurat': '/shubh-muhurat',
  '/naam-rashi': '/shubh-muhurat',
  '/about': '/about-us',
  '/contact': '/contact-us',
  '/terms': '/terms-and-conditions',
  '/privacy': '/privacy-policy'
};

const ROUTE_DATA = {
  '/': {
    title: 'Pandit Ji Online - Free Kundli, Vedic Astrology & Horoscope',
    desc: 'Get free Vedic astrology predictions, online kundli matching, 36 gun milan, daily rashifal, and expert astrological remedies at Pandit Ji Online, Rudrapur.',
    cardTitle: 'PANDIT JI ONLINE',
    cardSub: 'Free Janam Kundali • 36 Gun Milan • Drik Panchang • Digital Mandir',
    shortCard: 'PANDIT JI ONLINE\nVedic Jyotish Rudrapur',
    badge: 'VEDIC JYOTISH SANSTHAN • RUDRAPUR',
    art: 'gyan',
    accent: '#f59e0b'
  },
  '/digital-mandir': {
    title: 'डिजिटल मंदिर दर्शन एवं लाइव आरती | Virtual Hindu Temple | पण्डित जी ऑनलाइन',
    desc: '3D सनातन डिजिटल मंदिर में भगवान श्री हरि विष्णु, महादेव, हनुमान जी, श्री गणेश व माँ दुर्गा के नित्य दर्शन, अखण्ड दीप, शंखनाद व लाइव आरती करें।',
    cardTitle: 'SHRI DIGITAL SANATAN MANDIR',
    cardSub: 'Live 3D Darshan • Akhand Jyoti • Bell & Shankhnaad • Live Aarti',
    shortCard: 'DIGITAL SANATAN MANDIR\nLive 3D Darshan & Aarti',
    badge: '3D VIRTUAL HINDU TEMPLE • LIVE DARSHAN',
    art: 'mandir',
    accent: '#fbbf24'
  },
  '/janam-kundali': {
    title: 'सम्पूर्ण जन्म कुंडली (Lagna & Navamsha) | Free Vedic Kundli | पण्डित जी ऑनलाइन',
    desc: 'अपनी जन्म तिथि, समय व स्थान से बनाएं लाहिड़ी अयनांश आधारित 100% सटीक वैदिक जन्म कुंडली — लग्न चार्ट, नवमांश (D-9), विंशोत्तरी महादशा व राजयोग विश्लेषण।',
    cardTitle: 'FREE VEDIC JANAM KUNDALI',
    cardSub: 'Lagna & Navamsha (D-9) • Vimshottari Dasha • Rajyoga & Remedies',
    shortCard: 'FREE JANAM KUNDALI\nLagna, D-9 & Mahadasha',
    badge: '100% ACCURATE LAHIRI CHITRAPAKSHA AYANAMSHA',
    art: 'kundli',
    accent: '#f97316'
  },
  '/kundali-milan': {
    title: '36 गुण कुंडली मिलान (अष्टकूट) | Free Kundli Matching for Marriage | पण्डित जी ऑनलाइन',
    desc: 'वर-कन्या के नाम या जन्म विवरण से करें शास्त्रोक्त 36 गुण अष्टकूट कुंडली मिलान, मांगलिक दोष जाँच एवं नाड़ी/भकूट दोष परिहार।',
    cardTitle: '36 GUN ASHTAKOOT KUNDALI MILAN',
    cardSub: 'Var-Kanya Marriage Compatibility • Manglik Check • Nadi Parihar',
    shortCard: '36 GUN KUNDALI MILAN\nAshtakoot Vivah Matching',
    badge: 'SHASTROKTA VIVAH MATCHING • 36 GUN REPORT',
    art: 'milan',
    accent: '#ec4899'
  },
  '/panchang': {
    title: 'आज का पंचांग व शुभ मुहूर्त | Today Hindu Panchang Rudrapur | पण्डित जी ऑनलाइन',
    desc: 'रुद्रपुर (उत्तराखण्ड) अक्षांश आधारित शुद्ध लाहिड़ी दृक गणित पंचांग — आज की तिथि, नक्षत्र, योग, करण, राहुकाल, अभिजीत मुहूर्त एवं चौघड़िया।',
    cardTitle: 'AAJ KA DRIK GANIT PANCHANG',
    cardSub: 'Tithi • Nakshatra • Yoga • Karana • Abhijit Muhurat • Rahukaal',
    shortCard: 'AAJ KA DRIK PANCHANG\nTithi, Nakshatra & Muhurat',
    badge: 'DAILY VEDIC HINDU CALENDAR • RUDRAPUR',
    art: 'panchang',
    accent: '#f59e0b'
  },
  '/shubh-muhurat': {
    title: 'विवाह, मुंडन, गृह प्रवेश व वाहन शुभ मुहूर्त 2026-27 | पण्डित जी ऑनलाइन',
    desc: 'दृक पंचांग आधारित 2026-2027 के सर्वोत्तम विवाह, मुंडन संस्कार, गृह प्रवेश एवं वाहन खरीदने के शुभ मुहूर्त तथा नाम राशि कैलकुलेटर।',
    cardTitle: 'SHUBH MUHURAT 2026 - 2027',
    cardSub: 'Vivah • Griha Pravesh • Mundan Sanskar • Vahan Kharid Muhurat',
    shortCard: 'SHUBH MUHURAT 2026-27\nVivah, Mundan & Vahan',
    badge: 'AUSPICIOUS VEDIC DATES & TIMINGS 2026-27',
    art: 'panchang',
    accent: '#eab308'
  },
  '/vivah-muhurat-2027': {
    title: 'विवाह मुहूर्त 2026-2027: नाम से जानें शुभ शादी की तिथियां व तारा बल | पण्डित जी ऑनलाइन',
    desc: 'वर और कन्या के नाम से जानें 2026-2027 के सर्वोत्तम विवाह मुहूर्त, तारा बल, चन्द्र बल और अबूझ मुहूर्त तिथियां।',
    cardTitle: 'SHUBH VIVAH MUHURAT 2026-27',
    cardSub: 'Auspicious Hindu Wedding Dates • Tara Bal & Chandra Bal Check',
    shortCard: 'VIVAH MUHURAT 2026-27\nShubh Shadi Dates by Name',
    badge: 'MARRIAGE MUHURAT CALCULATOR BY NAME',
    art: 'milan',
    accent: '#f43f5e'
  },
  '/mundan-muhurat': {
    title: 'मुंडन संस्कार शुभ मुहूर्त 2026-2027: शिशु नाम से तिथि व नक्षत्र गणना | पण्डित जी ऑनलाइन',
    desc: 'बच्चे के नाम से जानें मुंडन (चूड़ाकरण) संस्कार 2026-2027 की सबसे शुभ तिथियां, नक्षत्र, करण और भद्रा विचार।',
    cardTitle: 'MUNDAN SANSKAR MUHURAT 2026-27',
    cardSub: 'Chudakaran Auspicious Dates • Baby Name Nakshatra & Tithi Check',
    shortCard: 'MUNDAN MUHURAT 2026-27\nShishu Chudakaran Dates',
    badge: 'VEDIC SHISHU SANSKAR MUHURAT',
    art: 'panchang',
    accent: '#10b981'
  },
  '/vahan-kharidne-ka-muhurat': {
    title: 'वाहन खरीदने का शुभ मुहूर्त 2026-2027: नाम से शुभ तिथि व लकी रंग | पण्डित जी ऑनलाइन',
    desc: 'कार, बाइक या नया वाहन खरीदने के लिए नाम राशि अनुसार शुभ मुहूर्त 2026-2027, चर-द्विस्वभाव लग्न और भाग्यशाली वाहन रंग।',
    cardTitle: 'VAHAN KHARIDNE KA MUHURAT 2026-27',
    cardSub: 'Best Car & Bike Buying Dates • Lucky Vehicle Color by Rashi',
    shortCard: 'VAHAN MUHURAT 2026-27\nCar & Bike Shubh Dates',
    badge: 'VEHICLE PURCHASE MUHURAT & LUCKY COLOR',
    art: 'panchang',
    accent: '#3b82f6'
  },
  '/s-naam-rashi-swabhav': {
    title: 'नाम से जानें अपनी राशि, नक्षत्र, स्वभाव, करियर और भाग्यशाली रत्न | पण्डित जी ऑनलाइन',
    desc: 'S नाम या किसी भी अक्षर (A to Z) से जानें अपनी वैदिक चन्द्र राशि, नक्षत्र चरण, स्वामी ग्रह, स्वभाव, करियर और भाग्यशाली रत्न।',
    cardTitle: 'NAAM SE JANEIN RASHI & SWABHAV',
    cardSub: 'A to Z Name Rashi Calculator • Nakshatra • Career • Lucky Gemstone',
    shortCard: 'NAAM RASHI CALCULATOR\nRashi, Nakshatra & Swabhav',
    badge: 'VEDIC CHANDRA RASHI & PERSONALITY GUIDE',
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
  '/jyotish-ai': {
    title: 'निःशुल्क ज्योतिष चैट एवं वैदिक परामर्श | Free Jyotish AI Chat | पण्डित जी ऑनलाइन',
    desc: 'आचार्य पण्डित शशांक शर्मा जी के मार्गदर्शन में जन्म कुंडली, विवाह, करियर व ग्रह शांति पर 24×7 निःशुल्क ज्योतिषीय परामर्श।',
    cardTitle: '24x7 FREE VEDIC JYOTISH PARAMARSH',
    cardSub: 'Instant Kundali, Vivah, Career & Graha Shanti Guidance Chat',
    shortCard: 'FREE JYOTISH AI CHAT\n24x7 Vedic Consultation',
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

function resolveRouteInfo(rawPath) {
  let clean = String(rawPath || '/').split('?')[0].split('#')[0].replace(/\/+$/, '').toLowerCase() || '/';
  if (clean === '/index.html' || clean === '/index') clean = '/';
  const canonicalPath = ROUTE_ALIASES[clean] || clean;
  const info = ROUTE_DATA[canonicalPath] || ROUTE_DATA[clean];
  if (info) {
    return { path: canonicalPath, ...info };
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
      <g transform="translate(975, 295)">
        <circle cx="0" cy="0" r="150" fill="#1a0903" stroke="${accent}" stroke-width="3"/>
        <circle cx="0" cy="0" r="134" fill="none" stroke="#fde047" stroke-width="1" stroke-dasharray="6 6"/>
        <polygon points="0,-105 -75,25 75,25" fill="none" stroke="#facc15" stroke-width="4"/>
        <polygon points="0,-80 -55,25 55,25" fill="${accent}" fill-opacity="0.22" stroke="#fde047" stroke-width="2"/>
        <circle cx="0" cy="-115" r="8" fill="#facc15"/>
        <path d="M 0,-125 L 0,-142 L 38,-132 L 0,-123" fill="#ef4444"/>
        <rect x="-65" y="25" width="130" height="65" fill="#2a0e05" stroke="#facc15" stroke-width="3"/>
        <rect x="-28" y="40" width="56" height="50" rx="28" fill="#451a03" stroke="#fde047" stroke-width="2.5"/>
        <path d="M -16,78 Q 0,92 16,78 Z" fill="#f59e0b"/>
        <path d="M 0,52 Q -9,68 0,76 Q 9,68 0,52 Z" fill="#fef08a"/>
        <rect x="-85" y="90" width="170" height="12" rx="4" fill="#facc15"/>
        <text x="0" y="126" font-family="sans-serif" font-size="16" font-weight="800" fill="#fef08a" text-anchor="middle" letter-spacing="2">3D LIVE MANDIR</text>
      </g>`;
  }
  if (art === 'kundli') {
    return `
      <g transform="translate(975, 295)">
        <circle cx="0" cy="0" r="150" fill="#1a0903" stroke="${accent}" stroke-width="3"/>
        <rect x="-95" y="-95" width="190" height="190" fill="#270e04" stroke="#facc15" stroke-width="3.5"/>
        <line x1="-95" y1="-95" x2="95" y2="95" stroke="#fbbf24" stroke-width="2"/>
        <line x1="95" y1="-95" x2="-95" y2="95" stroke="#fbbf24" stroke-width="2"/>
        <polygon points="0,-95 95,0 0,95 -95,0" fill="none" stroke="#fde047" stroke-width="2.5"/>
        <text x="0" y="-38" font-family="sans-serif" font-size="15" font-weight="800" fill="#fef08a" text-anchor="middle">LAGNA</text>
        <text x="0" y="-18" font-family="sans-serif" font-size="13" font-weight="700" fill="#fb923c" text-anchor="middle">1</text>
        <text x="-48" y="5" font-family="sans-serif" font-size="13" font-weight="700" fill="#fde68a" text-anchor="middle">4</text>
        <text x="0" y="52" font-family="sans-serif" font-size="13" font-weight="700" fill="#fde68a" text-anchor="middle">7</text>
        <text x="48" y="5" font-family="sans-serif" font-size="13" font-weight="700" fill="#fde68a" text-anchor="middle">10</text>
        <text x="0" y="128" font-family="sans-serif" font-size="15" font-weight="800" fill="#fef08a" text-anchor="middle" letter-spacing="1.5">VEDIC KUNDALI</text>
      </g>`;
  }
  if (art === 'milan') {
    return `
      <g transform="translate(975, 295)">
        <circle cx="0" cy="0" r="150" fill="#1a0903" stroke="${accent}" stroke-width="3"/>
        <circle cx="0" cy="0" r="132" fill="none" stroke="#f472b6" stroke-width="1.5" stroke-dasharray="6 6"/>
        <circle cx="-28" cy="-18" r="48" fill="none" stroke="#facc15" stroke-width="5"/>
        <circle cx="28" cy="-18" r="48" fill="none" stroke="#fb7185" stroke-width="5"/>
        <rect x="-70" y="48" width="140" height="38" rx="19" fill="#831843" stroke="#facc15" stroke-width="2"/>
        <text x="0" y="73" font-family="sans-serif" font-size="18" font-weight="900" fill="#fef08a" text-anchor="middle" letter-spacing="1.5">36 / 36 GUN</text>
        <text x="0" y="122" font-family="sans-serif" font-size="14" font-weight="800" fill="#fbcfe8" text-anchor="middle" letter-spacing="1.5">ASHTAKOOT MILAN</text>
      </g>`;
  }
  if (art === 'panchang') {
    return `
      <g transform="translate(975, 295)">
        <circle cx="0" cy="0" r="150" fill="#1a0903" stroke="${accent}" stroke-width="3"/>
        <circle cx="0" cy="0" r="126" fill="none" stroke="#fde047" stroke-width="1.5" stroke-dasharray="8 6"/>
        <circle cx="0" cy="-12" r="54" fill="#f59e0b" fill-opacity="0.25" stroke="#facc15" stroke-width="4"/>
        <circle cx="0" cy="-12" r="32" fill="#facc15"/>
        <path d="M 12,-34 A 24,24 0 1,0 12,10 A 18,18 0 1,1 12,-34 Z" fill="#1a0903"/>
        <rect x="-78" y="64" width="156" height="34" rx="17" fill="#451a03" stroke="#facc15" stroke-width="2"/>
        <text x="0" y="86" font-family="sans-serif" font-size="15" font-weight="900" fill="#fef08a" text-anchor="middle" letter-spacing="1.5">DRIK PANCHANG</text>
      </g>`;
  }
  if (art === 'rashi') {
    return `
      <g transform="translate(975, 295)">
        <circle cx="0" cy="0" r="150" fill="#1a0903" stroke="${accent}" stroke-width="3"/>
        <circle cx="0" cy="0" r="124" fill="none" stroke="#facc15" stroke-width="2"/>
        <circle cx="0" cy="0" r="82" fill="#2e1065" fill-opacity="0.55" stroke="#fde047" stroke-width="2"/>
        <line x1="0" y1="-124" x2="0" y2="124" stroke="#facc15" stroke-width="1" stroke-opacity="0.5"/>
        <line x1="-124" y1="0" x2="124" y2="0" stroke="#facc15" stroke-width="1" stroke-opacity="0.5"/>
        <line x1="-88" y1="-88" x2="88" y2="88" stroke="#facc15" stroke-width="1" stroke-opacity="0.5"/>
        <line x1="88" y1="-88" x2="-88" y2="88" stroke="#facc15" stroke-width="1" stroke-opacity="0.5"/>
        <text x="0" y="-8" font-family="sans-serif" font-size="30" font-weight="900" fill="#fef08a" text-anchor="middle">A - Z</text>
        <text x="0" y="22" font-family="sans-serif" font-size="15" font-weight="800" fill="#e9d5ff" text-anchor="middle" letter-spacing="1.5">12 RASHI</text>
        <text x="0" y="112" font-family="sans-serif" font-size="14" font-weight="800" fill="#fde047" text-anchor="middle" letter-spacing="1.5">27 NAKSHATRA</text>
      </g>`;
  }
  if (art === 'shani') {
    return `
      <g transform="translate(975, 295)">
        <circle cx="0" cy="0" r="150" fill="#111827" stroke="${accent}" stroke-width="3"/>
        <circle cx="0" cy="0" r="130" fill="none" stroke="#818cf8" stroke-width="1.5" stroke-dasharray="6 6"/>
        <ellipse cx="0" cy="-10" rx="95" ry="26" fill="none" stroke="#facc15" stroke-width="6" transform="rotate(-18 0 -10)"/>
        <circle cx="0" cy="-10" r="42" fill="#312e81" stroke="#fde047" stroke-width="3"/>
        <rect x="-78" y="64" width="156" height="34" rx="17" fill="#1e1b4b" stroke="#facc15" stroke-width="2"/>
        <text x="0" y="86" font-family="sans-serif" font-size="15" font-weight="900" fill="#fef08a" text-anchor="middle" letter-spacing="1.5">SHANI GOCHAR</text>
      </g>`;
  }
  if (art === 'puja') {
    return `
      <g transform="translate(975, 295)">
        <circle cx="0" cy="0" r="150" fill="#1a0903" stroke="${accent}" stroke-width="3"/>
        <polygon points="-75,45 75,45 55,85 -55,85" fill="#7c2d12" stroke="#facc15" stroke-width="3"/>
        <rect x="-88" y="85" width="176" height="16" rx="4" fill="#facc15"/>
        <path d="M 0,-85 Q -45,-15 -22,42 L 22,42 Q 45,-15 0,-85 Z" fill="#f97316" stroke="#fde047" stroke-width="2"/>
        <path d="M 0,-45 Q -22,0 -10,42 L 10,42 Q 22,0 0,-45 Z" fill="#fef08a"/>
        <text x="0" y="126" font-family="sans-serif" font-size="15" font-weight="900" fill="#fef08a" text-anchor="middle" letter-spacing="1.5">VEDIC ANUSHTHAN</text>
      </g>`;
  }
  return `
    <g transform="translate(975, 295)">
      <circle cx="0" cy="0" r="150" fill="#1a0903" stroke="${accent}" stroke-width="3"/>
      <circle cx="0" cy="0" r="128" fill="none" stroke="#fde047" stroke-width="1.5" stroke-dasharray="6 6"/>
      <polygon points="0,-95 26,-26 95,0 26,26 0,95 -26,26 -95,0 -26,-26" fill="${accent}" fill-opacity="0.22" stroke="#facc15" stroke-width="3"/>
      <circle cx="0" cy="0" r="42" fill="#451a03" stroke="#fde047" stroke-width="3"/>
      <text x="0" y="10" font-family="sans-serif" font-size="26" font-weight="900" fill="#fef08a" text-anchor="middle">OM</text>
      <text x="0" y="124" font-family="sans-serif" font-size="15" font-weight="900" fill="#fef08a" text-anchor="middle" letter-spacing="1.5">VEDIC SHASTRA</text>
    </g>`;
}

function buildOgCardSvg(routeInfo) {
  const words = String(routeInfo.cardTitle || 'PANDIT JI ONLINE').split(/\s+/);
  let line1 = '';
  let line2 = '';
  for (const w of words) {
    if ((line1 + ' ' + w).trim().length <= 22) {
      line1 = (line1 + ' ' + w).trim();
    } else {
      line2 = (line2 + ' ' + w).trim();
    }
  }
  if (line2.length > 26) {
    line2 = line2.slice(0, 25).trim() + '...';
  }

  const subText = String(routeInfo.cardSub || '');
  const subParts = subText.split('•').map((s) => s.trim()).filter(Boolean);
  const subLine1 = subParts.slice(0, 2).join('  •  ');
  const subLine2 = subParts.slice(2, 4).join('  •  ');

  const accent = routeInfo.accent || '#f59e0b';
  const badge = xmlEscape(routeInfo.badge || 'PANDIT JI ONLINE • RUDRAPUR');
  const pathLabel = xmlEscape(routeInfo.path === '/' ? 'www.panditjionline.online' : `panditjionline.online${routeInfo.path}`);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2a0c04"/>
      <stop offset="55%" stop-color="#140703"/>
      <stop offset="100%" stop-color="#230b04"/>
    </linearGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#fde047"/>
      <stop offset="50%" stop-color="#f59e0b"/>
      <stop offset="100%" stop-color="#fef08a"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#bgGrad)"/>
  <rect x="20" y="20" width="1160" height="590" rx="24" fill="none" stroke="url(#goldGrad)" stroke-width="3" stroke-opacity="0.8"/>
  <rect x="30" y="30" width="1140" height="570" rx="18" fill="none" stroke="${accent}" stroke-width="1" stroke-dasharray="8 6" stroke-opacity="0.5"/>

  <rect x="64" y="58" width="470" height="44" rx="22" fill="#451a03" stroke="#facc15" stroke-width="1.5"/>
  <text x="299" y="86" font-family="sans-serif" font-size="16" font-weight="800" fill="#fde047" text-anchor="middle" letter-spacing="1.5">${badge}</text>

  <text x="64" y="${line2 ? '185' : '220'}" font-family="sans-serif" font-size="52" font-weight="900" fill="#fef08a" letter-spacing="0.5">${xmlEscape(line1)}</text>
  ${line2 ? `<text x="64" y="250" font-family="sans-serif" font-size="50" font-weight="900" fill="#fbbf24" letter-spacing="0.5">${xmlEscape(line2)}</text>` : ''}

  <rect x="64" y="284" width="640" height="5" rx="2.5" fill="url(#goldGrad)"/>

  <text x="64" y="340" font-family="sans-serif" font-size="25" font-weight="700" fill="#fed7aa">${xmlEscape(subLine1)}</text>
  ${subLine2 ? `<text x="64" y="382" font-family="sans-serif" font-size="24" font-weight="700" fill="#fdba74">${xmlEscape(subLine2)}</text>` : ''}

  <rect x="64" y="420" width="420" height="52" rx="26" fill="#d97706" stroke="#fef08a" stroke-width="2"/>
  <text x="274" y="453" font-family="sans-serif" font-size="21" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="1">OPEN NOW • 100% FREE SEVA</text>

  ${renderArtworkSvg(routeInfo.art, accent)}

  <rect x="22" y="516" width="1156" height="92" rx="18" fill="#0f0502" fill-opacity="0.92"/>
  <line x1="22" y1="516" x2="1178" y2="516" stroke="#f59e0b" stroke-width="2" stroke-opacity="0.6"/>
  <text x="64" y="556" font-family="sans-serif" font-size="24" font-weight="900" fill="#facc15">PANDIT JI ONLINE — ACHARYA PANDIT SHASHANK SHARMA</text>
  <text x="64" y="586" font-family="sans-serif" font-size="18" font-weight="600" fill="#fde68a">Vedic Jyotish &amp; Sanatan Dharm Sansthan, Rudrapur (Uttarakhand)  •  ${pathLabel}</text>
</svg>`;
}

function buildSocialHtml(routeInfo) {
  const isHome = routeInfo.path === '/';
  const canonicalUrl = isHome ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${routeInfo.path}`;
  const slug = routeInfo.path.replace(/^\/+/, '').replace(/\//g, '-') || 'home';
  const svgCardUrl = `${SITE_ORIGIN}/og-svg/${slug}.svg?v=${VERSION_TAG}`;
  const primaryOgImage = isHome
    ? HOMEPAGE_IMAGE
    : `https://wsrv.nl/?url=${encodeURIComponent(svgCardUrl)}&w=1200&h=630&output=jpg&q=92`;
  const fallbackOgImage = isHome
    ? HOMEPAGE_IMAGE
    : `https://placehold.co/1200x630/2a0c04/facc15/jpeg?font=montserrat&text=${encodeURIComponent(routeInfo.shortCard || routeInfo.cardTitle)}`;

  const imgWidth = isHome ? '720' : '1200';
  const imgHeight = isHome ? '720' : '630';
  const safeTitle = xmlEscape(routeInfo.title);
  const safeDesc = xmlEscape(routeInfo.desc);
  const safeUrl = xmlEscape(canonicalUrl);
  const safeImg = xmlEscape(primaryOgImage);
  const safeFallbackImg = xmlEscape(fallbackOgImage);

  return `<!doctype html>
<html lang="hi">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${safeTitle}</title>
  <meta name="title" content="${safeTitle}" />
  <meta name="description" content="${safeDesc}" />
  <link rel="canonical" href="${safeUrl}" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Pandit Ji Online" />
  <meta property="og:locale" content="hi_IN" />
  <meta property="og:title" content="${safeTitle}" />
  <meta property="og:description" content="${safeDesc}" />
  <meta property="og:url" content="${safeUrl}" />
  <meta property="og:image" content="${safeImg}" />
  <meta property="og:image:url" content="${safeImg}" />
  <meta property="og:image:secure_url" content="${safeImg}" />
  <meta property="og:image:type" content="image/jpeg" />
  <meta property="og:image:width" content="${imgWidth}" />
  <meta property="og:image:height" content="${imgHeight}" />
  <meta property="og:image:alt" content="${safeTitle}" />
  <meta property="og:image" content="${safeFallbackImg}" />
  <link rel="image_src" href="${safeImg}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${safeTitle}" />
  <meta name="twitter:description" content="${safeDesc}" />
  <meta name="twitter:url" content="${safeUrl}" />
  <meta name="twitter:image" content="${safeImg}" />
  <meta name="twitter:image:src" content="${safeImg}" />
  <meta name="twitter:image:alt" content="${safeTitle}" />
</head>
<body style="background:#140703;color:#fef08a;font-family:sans-serif;padding:32px;text-align:center;">
  <h1>${safeTitle}</h1>
  <p>${safeDesc}</p>
  <p><a href="${safeUrl}" style="color:#facc15;">${safeUrl}</a></p>
</body>
</html>`;
}

export default async function middleware(request) {
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
    const rawSlug = pathname.replace(/^\/og-svg\//, '').replace(/\.(svg|jpg|jpeg|png)$/i, '');
    const routePath = rawSlug === 'home' ? '/' : rawSlug.startsWith('puja-') && rawSlug !== 'puja-services' && rawSlug !== 'puja-samagri-list'
      ? '/puja/' + rawSlug.slice(5)
      : '/' + rawSlug;
    const info = resolveRouteInfo(routePath);
    const svg = buildOgCardSvg(info);
    return new Response(svg, {
      status: 200,
      headers: {
        'Content-Type': 'image/svg+xml; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400'
      }
    });
  }

  // 4. Dynamic Per-Page JPEG Card (/og-card/:slug.jpg or /api/og-card/:slug)
  if (pathname.startsWith('/og-card/') || pathname.startsWith('/api/og-card/')) {
    const rawSlug = pathname
      .replace(/^\/(api\/)?og-card\//, '')
      .replace(/\.(jpg|jpeg|png|svg)$/i, '');
    const routePath = rawSlug === 'home' ? '/' : rawSlug.startsWith('puja-') && rawSlug !== 'puja-services' && rawSlug !== 'puja-samagri-list'
      ? '/puja/' + rawSlug.slice(5)
      : '/' + rawSlug;
    const info = resolveRouteInfo(routePath);
    const svgUrl = `${SITE_ORIGIN}/og-svg/${rawSlug}.svg?v=${VERSION_TAG}`;
    const wsrvUrl = `https://wsrv.nl/?url=${encodeURIComponent(svgUrl)}&w=1200&h=630&output=jpg&q=92`;
    try {
      const imgRes = await fetch(wsrvUrl);
      if (imgRes.ok) {
        const buf = await imgRes.arrayBuffer();
        if (buf.byteLength > 1000) {
          return new Response(buf, {
            status: 200,
            headers: {
              'Content-Type': 'image/jpeg',
              'Access-Control-Allow-Origin': '*',
              'Cache-Control': 'public, max-age=86400, s-maxage=86400'
            }
          });
        }
      }
    } catch {}

    const fallbackUrl = `https://placehold.co/1200x630/2a0c04/facc15/jpeg?font=montserrat&text=${encodeURIComponent(info.shortCard || info.cardTitle)}`;
    try {
      const fbRes = await fetch(fallbackUrl);
      if (fbRes.ok) {
        const buf = await fbRes.arrayBuffer();
        return new Response(buf, {
          status: 200,
          headers: {
            'Content-Type': 'image/jpeg',
            'Access-Control-Allow-Origin': '*',
            'Cache-Control': 'public, max-age=86400, s-maxage=86400'
          }
        });
      }
    } catch {}

    return Response.redirect(HOMEPAGE_IMAGE, 302);
  }

  // 5. Explicit /api/social-preview endpoint
  if (pathname === '/api/social-preview') {
    const targetPath = url.searchParams.get('path') || '/';
    const info = resolveRouteInfo(targetPath);
    return new Response(buildSocialHtml(info), {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=0, s-maxage=3600'
      }
    });
  }

  // 6. Intercept Social Media Crawlers (WhatsApp, Facebook, Telegram, Twitter/X, LinkedIn, Discord, Slack)
  const ua = request.headers.get('user-agent') || '';
  const isSocialBot = /whatsapp|facebookexternalhit|facebot|meta-externalagent|telegram|twitterbot|linkedinbot|slackbot|discordbot|pinterest|vkshare|skypeuripreview|embedly|quora|outbrain|redditbot|tumblr|bitlybot/i.test(ua);
  const isPreviewQuery = url.searchParams.get('__social_preview') === '1';

  if (isSocialBot || isPreviewQuery) {
    if (!/\.(ico|png|jpg|jpeg|svg|webp|woff2|js|css|json|txt|xml|map)$/i.test(pathname)) {
      const info = resolveRouteInfo(pathname);
      return new Response(buildSocialHtml(info), {
        status: 200,
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'public, max-age=0, s-maxage=3600'
        }
      });
    }
  }

  // 7. Normal Browser / Googlebot requests: pass through to static index.html / assets
  return new Response(null, {
    headers: {
      'x-middleware-next': '1'
    }
  });
}
