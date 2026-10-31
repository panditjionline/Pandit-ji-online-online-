// ============================================================================
// PANDIT JI ONLINE — VERCEL EDGE ROUTING MIDDLEWARE (middleware.js — v35)
// Zero-dependency Edge/Routing Middleware for www.panditjionline.online
// Handles:
// 1. Per-page WhatsApp / Facebook / Social Crawler OpenGraph HTML (200 OK)
// 2. High-Resolution Sacred Vedic OG Card Images (/og-card/:slug.jpg)
// 3. Google Search Console (googlea0e64484b80e13d1.html) & AdSense (ads.txt)
// 4. Zero-latency pass-through for Googlebot, PageSpeed Insights & AdSense bots
// ============================================================================

const SITE_ORIGIN = 'https://www.panditjionline.online';
const HOMEPAGE_IMAGE = 'https://iili.io/neb1ghg.jpg';
const VERSION_TAG = 'v35';

const ROUTE_ALIASES = {
  '/kundli': '/janam-kundali',
  '/kundali': '/janam-kundali',
  '/milan': '/kundali-milan',
  '/gun-milan': '/kundali-milan',
  '/puja/kundali-milan': '/kundali-milan',
  '/puja-kundali-milan': '/kundali-milan',
  '/mandir': '/digital-mandir',
  '/muhurat': '/shubh-muhurat',
  '/naam-rashi': '/shubh-muhurat',
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
  '/jyotish-chat': '/jyotish-ai',
  '/chat': '/jyotish-ai',
  '/puja-booking': '/puja-services',
  '/services': '/puja-services',
  '/dharma-gyan': '/dharm-gyan-kosh',
  '/gyan-kosh': '/dharm-gyan-kosh',
  '/jap-mala': '/mantra-jaap',
  '/jaap': '/mantra-jaap',
  '/videos': '/vedic-videos',
  '/youtube': '/vedic-videos',
  '/history': '/mera-khata',
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
      <stop offset="0%" stop-color="#451205"/>
      <stop offset="48%" stop-color="#210702"/>
      <stop offset="100%" stop-color="#3b0e04"/>
    </linearGradient>
    <radialGradient id="warmCenter" cx="35%" cy="42%" r="60%">
      <stop offset="0%" stop-color="#9a3412" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#180502" stop-opacity="0"/>
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
    <radialGradient id="emblemGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.48"/>
      <stop offset="100%" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#bgGrad)"/>
  <rect width="1200" height="630" fill="url(#warmCenter)"/>
  <rect x="20" y="20" width="1160" height="590" rx="26" fill="none" stroke="url(#goldGrad)" stroke-width="4" stroke-opacity="0.95"/>
  <rect x="30" y="30" width="1140" height="570" rx="20" fill="none" stroke="#fde047" stroke-width="1.4" stroke-dasharray="8 6" stroke-opacity="0.65"/>

  <circle cx="48" cy="48" r="7" fill="#fde047"/>
  <circle cx="1152" cy="48" r="7" fill="#fde047"/>

  <rect x="60" y="54" width="490" height="46" rx="23" fill="#451a03" stroke="#fde047" stroke-width="2.2"/>
  <text x="305" y="83" font-family="sans-serif" font-size="16" font-weight="900" fill="#fef08a" text-anchor="middle" letter-spacing="1.5">${badge}</text>

  <rect x="568" y="54" width="218" height="46" rx="23" fill="#065f46" stroke="#6ee7b7" stroke-width="2"/>
  <text x="677" y="83" font-family="sans-serif" font-size="15" font-weight="900" fill="#ecfdf5" text-anchor="middle" letter-spacing="1.2">100% SHUDDH DRIK</text>

  <text x="60" y="${line2 ? '182' : '216'}" font-family="sans-serif" font-size="55" font-weight="900" fill="#ffffff" letter-spacing="0.5">${xmlEscape(line1)}</text>
  ${line2 ? `<text x="60" y="248" font-family="sans-serif" font-size="51" font-weight="900" fill="#fde047" letter-spacing="0.5">${xmlEscape(line2)}</text>` : ''}

  <rect x="60" y="278" width="670" height="5" rx="2.5" fill="url(#goldGrad)"/>

  <text x="60" y="334" font-family="sans-serif" font-size="26" font-weight="800" fill="#fef3c7">${xmlEscape(subLine1)}</text>
  ${subLine2 ? `<text x="60" y="376" font-family="sans-serif" font-size="24" font-weight="800" fill="#fed7aa">${xmlEscape(subLine2)}</text>` : ''}

  <rect x="60" y="414" width="460" height="58" rx="29" fill="url(#ctaGrad)" stroke="#fef08a" stroke-width="2.8"/>
  <text x="290" y="450" font-family="sans-serif" font-size="22" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="1.2">OPEN NOW • 100% FREE SEVA</text>

  ${renderArtworkSvg(routeInfo.art, accent)}

  <rect x="22" y="510" width="1156" height="98" rx="20" fill="#120502" fill-opacity="0.96"/>
  <line x1="22" y1="510" x2="1178" y2="510" stroke="url(#goldGrad)" stroke-width="2.8"/>
  <text x="60" y="553" font-family="sans-serif" font-size="24" font-weight="900" fill="#fde047" letter-spacing="0.6">PANDIT JI ONLINE — ACHARYA PANDIT SHASHANK SHARMA</text>
  <text x="60" y="585" font-family="sans-serif" font-size="19" font-weight="800" fill="#fed7aa">Vedic Jyotish &amp; Sanatan Dharm Sansthan, Rudrapur (Uttarakhand)  •  ${pathLabel}</text>
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

  // Single authoritative og:image URL on the first-party domain (serves 720x720 High-Res Vedic JPEG)
  const primaryOgImage = isHome
    ? `${SITE_ORIGIN}/og-card/home.jpg?v=${VERSION_TAG}`
    : `${SITE_ORIGIN}/og-card/${slug}.jpg?v=${VERSION_TAG}`;

  const imgWidth = '720';
  const imgHeight = '720';
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
    const targetStaticUrl = new URL(`/og-card/${cleanSlug}.jpg`, url.origin);

    // Serve the authentic 720x720 JPEG directly from CDN/cache
    try {
      const staticRes = await fetch(targetStaticUrl);
      if (staticRes.ok) {
        const buf = await staticRes.arrayBuffer();
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

    // Fallback directly to the official high-resolution photo of Panditji
    try {
      const homeRes = await fetch(HOMEPAGE_IMAGE);
      if (homeRes.ok) {
        const buf = await homeRes.arrayBuffer();
        return new Response(buf, {
          status: 200,
          headers: {
            'Content-Type': 'image/jpeg',
            'Content-Length': String(buf.byteLength),
            'Access-Control-Allow-Origin': '*',
            'Cache-Control': 'public, max-age=86400, s-maxage=86400',
            'X-Robots-Tag': 'index, follow, max-image-preview:large'
          }
        });
      }
    } catch {}

    return Response.redirect(HOMEPAGE_IMAGE, 302);
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
  // Never intercept Googlebot, Google-InspectionTool, PageSpeed/Lighthouse, or AdSense (Mediapartners-Google / AdsBot-Google)
  const ua = request.headers.get('user-agent') || '';
  const isGoogleOrAuditBot = /googlebot|google-inspectiontool|storebot-google|adsbot-google|mediapartners-google|apis-google|chrome-lighthouse|pagespeed|ptst|gtmetrix|bingbot|yandexbot|baiduspider|duckduckbot/i.test(ua);
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

  // 7. Normal Browser, Googlebot, PageSpeed & AdSense requests: zero-latency pass-through to static index.html / assets
  return new Response(null, {
    headers: {
      'x-middleware-next': '1'
    }
  });
}
