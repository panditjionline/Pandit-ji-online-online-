import express from 'express';
import http from 'http';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import dotenv from 'dotenv';
import crypto from 'crypto';
import { GoogleGenAI } from '@google/genai';
import {
  handleChatMessage,
  registerServerGenAISdkRunner,
  setGlobalAdminGeminiKeys,
} from './src/server/chatHandler';
import { getStoredBookings, saveNewBooking, deleteStoredBookings } from './src/server/bookingsHandler';
import { getUserByPhone, getUserByEmail, saveOrUpdateUserByPhone, normalizePhone } from './src/server/userStoreHandler';
import { getPermanentPhoto, savePermanentPhoto } from './src/server/photoStoreHandler';
import { getPermanentAdminGeminiKey, savePermanentAdminGeminiKey } from './src/server/adminKeyStoreHandler';
import {
  getVisitorCount,
  getVisitorCountAsync,
  incrementVisitorCountAsync,
  removeActiveSession,
} from './src/server/visitorCounterHandler';
import {
  generateDynamicSitemapXml,
  generateDynamicRobotsTxt,
  generateAiCatalogJson,
  generateLlmsTxt,
  resolveBaseOrigin,
  syncStaticSeoFilesToPublic,
  buildDynamicSitemapEntries,
  injectRouteSeoIntoHtml,
  getAllCanonicalSubpagePaths,
  GOOGLE_SITE_VERIFICATION_TOKEN,
  GOOGLE_HTML_VERIFICATION_FILENAME,
  GOOGLE_HTML_VERIFICATION_CONTENT,
} from './src/server/seoHandler';
import {
  getRawDownloadPayload,
  renderDownloadCenterHtml,
  buildDynamicAdminControlJs,
} from './src/server/downloadCenterHandler';
import {
  getPermanentFestiveTheme,
  savePermanentFestiveTheme,
  initFestiveThemeHandler,
} from './src/server/festiveThemeHandler';
import {
  verifyUserPasswordSecure,
  isAuthorizedAdminRequest,
  setSessionCookie,
  getVerifiedSessionFromRequest,
  sanitizePlainText,
} from './src/server/securityGuard';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(express.json({ limit: '10mb' }));

// In-memory sliding-window rate limiter
const serverRateLimitMap = new Map<string, number[]>();
function checkServerRateLimit(key: string, limit: number, windowMs = 60000): boolean {
  const now = Date.now();
  const timestamps = (serverRateLimitMap.get(key) || []).filter((t) => now - t < windowMs);
  if (timestamps.length >= limit) {
    serverRateLimitMap.set(key, timestamps);
    return false;
  }
  timestamps.push(now);
  serverRateLimitMap.set(key, timestamps);
  return true;
}

// Enable CORS and OWASP Security Headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-admin-phone');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }
  if (req.url.includes('standalone-firebase-index.html') || req.url.includes('raw-download')) {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  }
  if (!req.url.startsWith('/api/')) {
    const candidate = `/api${req.url.startsWith('/') ? '' : '/'}${req.url}`;
    const knownPrefixes = [
      '/api/chat',
      '/api/tts',
      '/api/bookings',
      '/api/user-data',
      '/api/forgot-password',
      '/api/pandit-photo',
      '/api/visitor-counter',
      '/api/active-users',
      '/api/seo-status',
      '/api/sitemap.xml',
      '/api/robots.txt',
      '/api/download-standalone',
      '/api/raw-download',
      '/api/og-card',
      '/api/social-preview',
      '/api/contact',
      '/api/admin/gemini-key',
      '/api/festive-theme',
    ];
    if (knownPrefixes.some((p) => candidate.startsWith(p))) {
      req.url = candidate;
    }
  }
  next();
});

// Canonical 301 Permanent Redirects to eliminate duplicate indexing and merge PageRank
const CANONICAL_301_REDIRECTS: Record<string, string> = {
  '/home': '/',
  '/index.html': '/',
  '/index': '/',
  '/kundli': '/janam-kundali',
  '/kundali': '/janam-kundali',
  '/milan': '/kundali-milan',
  '/gun-milan': '/kundali-milan',
  '/mandir': '/digital-mandir',
  '/muhurat': '/shubh-muhurat',
  '/naam-rashi': '/shubh-muhurat',
  '/rashi': '/rashifal',
  '/dainik-rashifal': '/rashifal',
  '/chat': '/jyotish-ai',
  '/jyotish-chat': '/jyotish-ai',
  '/services': '/puja-services',
  '/puja-booking': '/puja-services',
  '/jaap': '/mantra-jaap',
  '/jap-mala': '/mantra-jaap',
  '/videos': '/vedic-videos',
  '/youtube': '/vedic-videos',
  '/dharma-gyan': '/dharm-gyan-kosh',
  '/gyan-kosh': '/dharm-gyan-kosh',
  '/history': '/',
  '/mera-khata': '/',
  '/about': '/about-us',
  '/contact': '/contact-us',
  '/terms': '/terms-and-conditions',
  '/privacy': '/privacy-policy',
  '/puja-griha-pravesh': '/puja/griha-pravesh',
  '/puja-satyanarayan-katha': '/puja/satyanarayan-katha',
  '/puja-rudrabhishek': '/puja/rudrabhishek',
  '/puja-mahamrityunjaya-jap': '/puja/mahamrityunjaya-jap',
  '/puja-navgrah-shanti': '/puja/navgrah-shanti',
  '/puja-kundali-paramarsh': '/puja/kundali-paramarsh',
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
};

app.use((req, res, next) => {
  const reqPath = (req.path || '').replace(/\/+$/, '').toLowerCase();
  const target = CANONICAL_301_REDIRECTS[reqPath];
  if (target) {
    const qs = req.url.includes('?') ? '?' + req.url.split('?')[1] : '';
    res.redirect(301, target + qs);
    return;
  }
  next();
});

// Sync static fallback SEO files into /public on startup
syncStaticSeoFilesToPublic(path.join(__dirname, 'public'));

// Top-level unsandboxed Download Center route: if ?file= is passed, stream binary attachment directly so no HTML page stays open
app.get('/download-center', (req, res) => {
  const autoFile = req.query.file ? String(req.query.file) : '';
  if (autoFile) {
    const payload = getRawDownloadPayload(autoFile, __dirname);
    if (payload) {
      res.setHeader('Content-Type', 'application/octet-stream');
      res.setHeader('Content-Disposition', `attachment; filename="${payload.filename}"`);
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
      if (payload.filePath && fs.existsSync(payload.filePath)) {
        res.status(200).sendFile(payload.filePath);
        return;
      }
      res.status(200).send(payload.content || '');
      return;
    }
  }
  const html = renderDownloadCenterHtml(autoFile);
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
  res.status(200).send(html);
});

// Binary attachment download endpoint for index.html, sitemap.xml, vercel.json, robots.txt
app.get('/api/raw-download/:filename', (req, res) => {
  const payload = getRawDownloadPayload(req.params.filename, __dirname);
  if (!payload) {
    res.status(404).type('text/plain').send('Requested file not found');
    return;
  }
  res.setHeader('Content-Type', 'application/octet-stream');
  res.setHeader('Content-Disposition', `attachment; filename="${payload.filename}"`);
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  if (payload.filePath && fs.existsSync(payload.filePath)) {
    res.status(200).sendFile(payload.filePath);
    return;
  }
  res.status(200).send(payload.content || '');
});

// Sync freshly built dist artifacts into public/ on startup so both directories stay 100% identical
try {
  const artifactsToSync = [
    'app-engine.txt',
    'app-engine.html',
    'panditji-app.bundle.js',
    'panditji-app.bundle.css',
    'standalone-firebase-index.html',
    '404.html',
    'sw.js',
    'admin-control.js',
  ];
  for (const name of artifactsToSync) {
    const src = path.join(__dirname, 'dist', name);
    const dest = path.join(__dirname, 'public', name);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
    }
  }
} catch {
  // ignore sync error
}

// Dynamic Master Admin Control JS endpoint (#20 admin-control.js)
app.get('/admin-control.js', (_req, res) => {
  res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
  res.send(buildDynamicAdminControlJs(__dirname));
});

// App Engine JS Bundle endpoint (serves as application/javascript or text/plain for .txt, .html and .js filenames)
app.get(['/app-engine.txt', '/app-engine.html', '/panditji-app.bundle.js'], (req, res) => {
  const distTxt = path.join(__dirname, 'dist', 'app-engine.txt');
  const distEngine = path.join(__dirname, 'dist', 'app-engine.html');
  const distBundle = path.join(__dirname, 'dist', 'panditji-app.bundle.js');
  const pubTxt = path.join(__dirname, 'public', 'app-engine.txt');
  const pubEngine = path.join(__dirname, 'public', 'app-engine.html');
  const pubBundle = path.join(__dirname, 'public', 'panditji-app.bundle.js');
  const fileToServe = fs.existsSync(distTxt)
    ? distTxt
    : fs.existsSync(distEngine)
    ? distEngine
    : fs.existsSync(distBundle)
    ? distBundle
    : fs.existsSync(pubTxt)
    ? pubTxt
    : fs.existsSync(pubEngine)
    ? pubEngine
    : fs.existsSync(pubBundle)
    ? pubBundle
    : null;

  if (fileToServe) {
    const isTxt = req.path.endsWith('.txt');
    res.setHeader('Content-Type', isTxt ? 'text/plain; charset=utf-8' : 'application/javascript; charset=utf-8');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
    res.sendFile(fileToServe);
    return;
  }
  res.status(404).send('App engine bundle not found');
});

// Direct attachment download for standalone index.html on mobile & desktop
app.get(['/standalone-firebase-index.html', '/api/download-standalone'], (req, res) => {
  const distStandaloneFile = path.join(__dirname, 'dist', 'standalone-firebase-index.html');
  const standaloneFile = path.join(__dirname, 'public', 'standalone-firebase-index.html');
  const distIndexFile = path.join(__dirname, 'dist', 'index.html');
  const fileToServe = fs.existsSync(distStandaloneFile)
    ? distStandaloneFile
    : fs.existsSync(standaloneFile)
    ? standaloneFile
    : fs.existsSync(distIndexFile)
    ? distIndexFile
    : null;

  if (fileToServe) {
    const asText = req.query.view === 'text';
    res.setHeader(
      'Content-Type',
      asText ? 'text/plain; charset=utf-8' : 'application/octet-stream'
    );
    if (!asText) {
      res.setHeader('Content-Disposition', 'attachment; filename="index.html"');
    }
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.status(200).sendFile(fileToServe);
    return;
  }
  res.status(404).send('Standalone index.html not found');
});

// Google Search Console HTML File Verification Endpoint (/googlea0e64484b80e13d1.html)
app.get(`/${GOOGLE_HTML_VERIFICATION_FILENAME}`, (_req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.status(200).send(GOOGLE_HTML_VERIFICATION_CONTENT);
});

// Autonomous Dynamic Sitemap Endpoint (/sitemap.xml & /api/sitemap.xml)
app.get(['/sitemap.xml', '/api/sitemap.xml'], (req, res) => {
  const baseOrigin = resolveBaseOrigin(req.headers as Record<string, string | string[] | undefined>);
  const xml = generateDynamicSitemapXml(baseOrigin, new Date());
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=1800, s-maxage=1800');
  res.status(200).send(xml);
});

// Autonomous Dynamic Robots.txt Endpoint (/robots.txt & /api/robots.txt)
app.get(['/robots.txt', '/api/robots.txt'], (req, res) => {
  const baseOrigin = resolveBaseOrigin(req.headers as Record<string, string | string[] | undefined>);
  const txt = generateDynamicRobotsTxt(baseOrigin);
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');
  res.status(200).send(txt);
});

// Google AdSense Authorized Digital Sellers file (/ads.txt)
app.get('/ads.txt', (_req, res) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=86400');
  res.status(200).send('google.com, pub-9661029896137686, DIRECT, f08c47fec0942fa0\n');
});

// PageSpeed Insights Agentic Browsing — ARD 1.0 AI Catalog & llms.txt Endpoints
app.get(['/ai-catalog.json', '/.well-known/ai-catalog.json', '/.well-known/ard.json'], (req, res) => {
  const baseOrigin = resolveBaseOrigin(req.headers as Record<string, string | string[] | undefined>);
  const json = generateAiCatalogJson(baseOrigin);
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');
  res.status(200).send(json);
});

app.get('/llms.txt', (req, res) => {
  const baseOrigin = resolveBaseOrigin(req.headers as Record<string, string | string[] | undefined>);
  const txt = generateLlmsTxt(baseOrigin);
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');
  res.status(200).send(txt);
});

// SEO & Sitemap Diagnostic Status Endpoint (/api/seo-status)
app.get('/api/seo-status', (req, res) => {
  const baseOrigin = resolveBaseOrigin(req.headers as Record<string, string | string[] | undefined>);
  const entries = buildDynamicSitemapEntries(baseOrigin, new Date());
  res.json({
    status: 'active',
    googleSiteVerification: GOOGLE_SITE_VERIFICATION_TOKEN,
    robotsDirective: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    sitemapUrl: `${baseOrigin}/sitemap.xml`,
    robotsUrl: `${baseOrigin}/robots.txt`,
    totalIndexedRoutes: entries.length,
    generatedAt: new Date().toISOString(),
  });
});

// Ensure HTML responses carry advanced X-Robots-Tag indexing headers for Googlebot
app.use((req, res, next) => {
  if (!req.path.startsWith('/api/') && req.path !== '/sitemap.xml' && req.path !== '/robots.txt') {
    res.setHeader(
      'X-Robots-Tag',
      'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    );
  }
  next();
});

// Global Admin Gemini API Key Endpoint (Secured with Admin Authentication & Masking)
app.get('/api/admin/gemini-key', (req, res) => {
  const clientIp = String(req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1').split(',')[0].trim();
  if (!checkServerRateLimit(clientIp + ':adminkey', 15, 60000)) {
    res.status(429).json({ error: 'RATE_LIMIT_EXCEEDED', message: 'बहुत अधिक अनुरोध! कृपया 1 मिनट बाद पुनः प्रयास करें।' });
    return;
  }
  // Mask keys for all client-facing requests
  const stored = getPermanentAdminGeminiKey(false);
  res.json(stored);
});

app.post('/api/admin/gemini-key', (req, res) => {
  try {
    if (!isAuthorizedAdminRequest(req.headers as Record<string, string | string[] | undefined>, req.body?.adminPhone)) {
      res.status(403).json({
        error: 'UNAUTHORIZED_ADMIN',
        message: 'अनुमति अस्वीकृत! केवल अधिकृत एडमिन मोबाइल (8958499979) से ही बदलाव संभव है।',
      });
      return;
    }
    const rawInput = Array.isArray(req.body?.keys)
      ? req.body.keys
      : typeof req.body?.apiKey === 'string'
      ? req.body.apiKey
      : [];
    const saved = savePermanentAdminGeminiKey(rawInput);
    try {
      buildDynamicAdminControlJs(__dirname);
    } catch {
      // ignore
    }
    res.json({ success: true, ...saved });
  } catch (error) {
    console.error('Error in POST /api/admin/gemini-key:', error);
    res.status(500).json({ error: 'Failed to save global Admin Gemini API keys' });
  }
});

// Global Admin Festive Theme Override Endpoint (/api/festive-theme)
app.get('/api/festive-theme', (_req, res) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  const festiveConfig = getPermanentFestiveTheme();
  res.json(festiveConfig);
});

app.post('/api/festive-theme', (req, res) => {
  try {
    if (!isAuthorizedAdminRequest(req.headers as Record<string, string | string[] | undefined>, req.body?.adminBy || req.body?.adminPhone)) {
      res.status(403).json({
        error: 'UNAUTHORIZED_ADMIN',
        message: 'अनुमति अस्वीकृत! केवल अधिकृत एडमिन (8958499979) को ही उत्सव थीम बदलने की अनुमति है।',
      });
      return;
    }
    const saved = savePermanentFestiveTheme(req.body || {});
    try {
      buildDynamicAdminControlJs(__dirname);
    } catch {
      // ignore
    }
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store');
    res.json(saved);
  } catch (error) {
    console.error('Error in POST /api/festive-theme:', error);
    res.status(400).json({ error: 'Failed to save festive theme override' });
  }
});

// Register @google/genai SDK runner for server-side Gemini execution across the 12-key pool
registerServerGenAISdkRunner(async (apiKey, modelName, formattedContents, systemInstruction, useGoogleSearch) => {
  try {
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: { headers: { 'User-Agent': 'aistudio-build' } },
    });
    const config: Record<string, any> = {
      systemInstruction,
    };
    if (modelName !== 'gemini-3.8-flash') {
      config.temperature = 0.7;
    }
    if (useGoogleSearch) {
      config.tools = [{ googleSearch: {} }];
    }
    const response = await ai.models.generateContent({
      model: modelName,
      contents: formattedContents,
      config,
    });
    const text = (response?.text || '').trim();
    const chunks = (response as any)?.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources: Array<{ uri: string; title: string }> = [];
    const seen = new Set<string>();
    for (const c of chunks) {
      const uri = c?.web?.uri;
      const title = c?.web?.title;
      if (uri && typeof uri === 'string' && !seen.has(uri)) {
        seen.add(uri);
        sources.push({ uri, title: (title && typeof title === 'string' ? title.trim() : uri).slice(0, 90) });
      }
    }
    return { text, sources: sources.slice(0, 5) };
  } catch (err: any) {
    const errText = String(err?.message || err || '');
    const status = Number(err?.status || err?.statusCode || 0);
    const isQuota =
      status === 429 ||
      errText.includes('429') ||
      errText.includes('RESOURCE_EXHAUSTED') ||
      errText.toLowerCase().includes('quota') ||
      errText.toLowerCase().includes('rate limit');
    const isInvalidKey =
      status === 403 ||
      errText.includes('API_KEY_INVALID') ||
      errText.includes('API key not valid') ||
      errText.includes('PERMISSION_DENIED') ||
      errText.includes('UNAUTHENTICATED');
    const isModelErr =
      !isInvalidKey && (status === 404 || status === 400 || errText.includes('NOT_FOUND'));
    return {
      text: '',
      sources: [],
      quotaExhausted: isQuota,
      invalidApiKey: isInvalidKey,
      notFoundOrInvalidModel: isModelErr,
    };
  }
});

// Hydrate stored 12-key pool on server boot safely from local key store into chatHandler
try {
  const initial = getPermanentAdminGeminiKey(true);
  if (initial && Array.isArray(initial.keys) && initial.keys.length > 0) {
    setGlobalAdminGeminiKeys(initial.keys);
  }
} catch {
  // ignore startup hydration error
}

// Initialize Real-time 12-Month Festive Theme Engine on server boot
initFestiveThemeHandler();

// API route for Shashank Sharma AI chat
app.post('/api/chat', async (req, res) => {
  try {
    const clientIp = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || req.socket.remoteAddress || 'unknown';
    if (!checkServerRateLimit(clientIp + ':chat', 35, 60000)) {
      res.status(429).json({ error: 'RATE_LIMIT_EXCEEDED', message: 'कृपया कुछ सेकंड प्रतीक्षा करें, बहुत अधिक अनुरोध प्राप्त हुए हैं।' });
      return;
    }
    const stored = getPermanentAdminGeminiKey(true);
    const { message, history, language, userProfile, apiKeys } = req.body;
    const incomingKeys: string[] = Array.isArray(apiKeys)
      ? apiKeys.map((k: unknown) => (typeof k === 'string' ? k.trim() : '')).filter((k: string) => k.length > 10)
      : [];
    if (incomingKeys.length > (stored.keys?.length || 0)) {
      const merged = Array.from(new Set([...(stored.keys || []), ...incomingKeys]));
      savePermanentAdminGeminiKey(merged);
    }
    const effectiveKeys = Array.from(new Set([...(stored.keys || []), ...incomingKeys])).filter(Boolean);
    if (effectiveKeys.length > 0) {
      setGlobalAdminGeminiKeys(effectiveKeys);
    }
    const result = await handleChatMessage(message, history || [], language, userProfile, effectiveKeys);
    res.json(result);
  } catch (error) {
    console.error('Error in /api/chat:', error);
    res.status(500).json({ error: 'Failed to process Vedic consultation chat' });
  }
});

// High-reliability Hindi & Sanskrit Voice TTS Proxy with In-Memory Cache for all mobile/iframe browsers
const ttsAudioCache = new Map<string, Buffer>();

app.get('/api/tts', async (req, res) => {
  try {
    const rawText = String(req.query.text || '').trim();
    if (!rawText) {
      res.status(400).json({ error: 'Missing text parameter' });
      return;
    }

    // Clean markdown/Formatting symbols and cap chunk length to 190 chars
    const cleanText = rawText
      .replace(/[*#_~`>|]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 190);

    if (!cleanText) {
      res.status(400).json({ error: 'Empty clean text' });
      return;
    }

    const cached = ttsAudioCache.get(cleanText);
    if (cached) {
      res.setHeader('Content-Type', 'audio/mpeg');
      res.setHeader('Cache-Control', 'public, max-age=86400');
      res.send(cached);
      return;
    }

    const encoded = encodeURIComponent(cleanText);
    const urls = [
      `https://translate.googleapis.com/translate_tts?ie=UTF-8&q=${encoded}&tl=hi&client=gtx`,
      `https://translate.google.com/translate_tts?ie=UTF-8&q=${encoded}&tl=hi&client=tw-ob`,
    ];

    let audioBuffer: Buffer | null = null;

    for (const url of urls) {
      try {
        const response = await fetch(url, {
          headers: {
            'User-Agent':
              'Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
            Referer: 'https://translate.google.com/',
          },
        });
        if (response.ok) {
          const arrBuf = await response.arrayBuffer();
          if (arrBuf && arrBuf.byteLength > 100) {
            audioBuffer = Buffer.from(arrBuf);
            break;
          }
        }
      } catch {
        // try next URL
      }
    }

    if (!audioBuffer) {
      res.status(502).json({ error: 'TTS upstream unavailable' });
      return;
    }

    if (ttsAudioCache.size > 250) {
      const firstKey = ttsAudioCache.keys().next().value;
      if (firstKey) ttsAudioCache.delete(firstKey);
    }
    ttsAudioCache.set(cleanText, audioBuffer);

    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.send(audioBuffer);
  } catch (error) {
    console.error('Error in /api/tts:', error);
    res.status(500).json({ error: 'Failed to synthesize speech' });
  }
});

// API routes for Bookings (Private per user phone number, or full list for verified Admin)
app.get('/api/bookings', (req, res) => {
  const isAdmin = isAuthorizedAdminRequest(
    req.headers as Record<string, string | string[] | undefined>,
    req.query.adminPhone
  );
  if (isAdmin && req.query.all === 'true') {
    res.json(getStoredBookings());
    return;
  }
  const phone = String(req.query.phone || '').replace(/\D/g, '').slice(-10);
  if (!phone || phone.length !== 10) {
    res.json([]);
    return;
  }
  const bookings = getStoredBookings().filter(
    (b) => (b.phone || '').replace(/\D/g, '').slice(-10) === phone
  );
  res.json(bookings);
});

app.post('/api/bookings', (req, res) => {
  try {
    const clientIp = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || req.socket.remoteAddress || 'unknown';
    if (!checkServerRateLimit(clientIp + ':bookings', 20, 60000)) {
      res.status(429).json({ error: 'RATE_LIMIT_EXCEEDED', message: 'कृपया प्रतीक्षा करें।' });
      return;
    }
    const raw = req.body || {};
    const newBooking = {
      ...raw,
      name: sanitizePlainText(raw.name, 120),
      phone: sanitizePlainText(raw.phone, 20),
      pujaType: sanitizePlainText(raw.pujaType, 160),
      notes: sanitizePlainText(raw.notes, 500),
    };
    const updated = saveNewBooking(newBooking);
    res.json({ success: true, count: updated.length, booking: newBooking });
  } catch (error) {
    console.error('Error in /api/bookings:', error);
    res.status(500).json({ error: 'Failed to record booking' });
  }
});

app.delete('/api/bookings', (req, res) => {
  try {
    const id = req.query.id ? String(req.query.id) : undefined;
    const phone = req.query.phone ? String(req.query.phone).replace(/\D/g, '').slice(-10) : undefined;
    const isAdmin = isAuthorizedAdminRequest(
      req.headers as Record<string, string | string[] | undefined>,
      req.query.adminPhone
    );
    const verifiedSession = getVerifiedSessionFromRequest(
      req.headers as Record<string, string | string[] | undefined>
    );
    const isOwnerSession = Boolean(verifiedSession && phone && verifiedSession.phone === phone);
    if (!isAdmin && !isOwnerSession) {
      res.status(403).json({
        error: 'UNAUTHORIZED',
        message: 'बुकिंग हटाने के लिए एडमिन या खाता लॉगिन आवश्यक है।',
      });
      return;
    }
    const updated = deleteStoredBookings({ id, phone });
    res.json({ success: true, bookings: updated });
  } catch (error) {
    console.error('Error in DELETE /api/bookings:', error);
    res.status(500).json({ error: 'Failed to delete booking' });
  }
});

// User inquiries & Contact feedback endpoint
app.post('/api/contact', (req, res) => {
  try {
    const { name, phone, email, category, message, submittedAt } = req.body || {};
    console.log(`[Contact Form Received] Name: ${name}, Phone: ${phone}, Category: ${category}`);

    // Persist to contacts.json safely
    const contactsFilePath = path.join(__dirname, 'data', 'contacts.json');
    let contactsList: any[] = [];
    try {
      if (fs.existsSync(contactsFilePath)) {
        contactsList = JSON.parse(fs.readFileSync(contactsFilePath, 'utf-8'));
      }
    } catch {
      contactsList = [];
    }

    const newContactEntry = {
      id: `contact-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      name: String(name || '').trim(),
      phone: String(phone || '').trim(),
      email: String(email || '').trim(),
      category: String(category || 'General').trim(),
      message: String(message || '').trim(),
      submittedAt: submittedAt || new Date().toISOString(),
      userAgent: req.headers['user-agent'] || '',
    };

    contactsList.unshift(newContactEntry);
    if (contactsList.length > 500) contactsList = contactsList.slice(0, 500);

    try {
      const dataDir = path.join(__dirname, 'data');
      if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
      fs.writeFileSync(contactsFilePath, JSON.stringify(contactsList, null, 2), 'utf-8');
    } catch (saveErr) {
      console.warn('Could not write to data/contacts.json:', saveErr);
    }

    res.json({
      success: true,
      message: 'संदेश प्राप्त हो गया है। पण्डित जी की टीम आपसे शीघ्र संपर्क करेगी।',
      contactId: newContactEntry.id,
    });
  } catch (err) {
    console.error('Error in POST /api/contact:', err);
    res.status(500).json({ error: 'Failed to record contact inquiry' });
  }
});

// API routes for Mobile Number Login & User History
app.get('/api/user-data', (req, res) => {
  try {
    const clientIp = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || req.socket.remoteAddress || 'unknown';
    if (!checkServerRateLimit(clientIp + ':user-data', 30, 60000)) {
      res.status(429).json({ error: 'RATE_LIMIT_EXCEEDED', message: 'अनुरोध सीमा पार हो गई है, कृपया प्रतीक्षा करें।' });
      return;
    }
    const phone = String(req.query.phone || '');
    const email = String(req.query.email || '');
    const password = String(req.query.password || '');
    const checkOnly = req.query.checkOnly === 'true';

    const normalizedPhone = normalizePhone(phone);
    let user = getUserByPhone(normalizedPhone);
    if (!user && email) {
      user = getUserByEmail(email);
    }

    if (checkOnly) {
      res.json({
        found: !!user,
        hasPassword: !!(user?.password),
        name: user?.name || '',
      });
      return;
    }

    if (!user) {
      res.json({ found: false, user: null });
      return;
    }

    const storedPassword = (user.password || '').trim();
    const inputPassword = (password || '').trim();
    const verifiedSession = getVerifiedSessionFromRequest(req.headers as Record<string, string | string[] | undefined>);
    const hasValidSessionForUser = verifiedSession && verifiedSession.phone === user.phone;

    // Protect account if password exists and no valid session cookie or password provided
    if (storedPassword && !inputPassword && !hasValidSessionForUser) {
      res.status(401).json({ error: 'PASSWORD_REQUIRED', message: 'खाता सुरक्षित है, कृपया पासवर्ड दर्ज करें।' });
      return;
    }

    // Verify password using salted scrypt (with legacy SHA-256 fallback)
    if (storedPassword && !hasValidSessionForUser) {
      const check = verifyUserPasswordSecure(inputPassword, storedPassword);
      if (!check.valid) {
        res.status(401).json({ error: 'WRONG_PASSWORD', message: 'गलत पासवर्ड!' });
        return;
      }
      if (check.needsRehash && inputPassword) {
        saveOrUpdateUserByPhone({ phone: user.phone, password: inputPassword });
      }
    }

    setSessionCookie(res, user.phone, user.phone === '8958499979');
    const safeUser = { ...user };
    delete safeUser.password;
    res.json({ found: true, user: safeUser });
  } catch (error) {
    console.error('Error in GET /api/user-data:', error);
    res.status(500).json({ error: 'Failed to load user account' });
  }
});

app.post('/api/user-data', (req, res) => {
  try {
    const clientIp = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || req.socket.remoteAddress || 'unknown';
    if (!checkServerRateLimit(clientIp + ':user-data', 30, 60000)) {
      res.status(429).json({ error: 'RATE_LIMIT_EXCEEDED', message: 'अनुरोध सीमा पार हो गई है, कृपया प्रतीक्षा करें।' });
      return;
    }
    const payload = req.body || {};
    if (!payload.phone) {
      res.status(400).json({ error: 'Mobile number is required' });
      return;
    }
    const savedUser = saveOrUpdateUserByPhone(payload);
    setSessionCookie(res, savedUser.phone, savedUser.phone === '8958499979');
    const safeSaved = { ...savedUser };
    delete safeSaved.password;
    res.json({ success: true, user: safeSaved });
  } catch (error) {
    console.error('Error in POST /api/user-data:', error);
    res.status(500).json({ error: 'Failed to save user account' });
  }
});

function normalizeDobForMatch(raw: string): string {
  const trimmed = String(raw || '').trim();
  if (!trimmed) return '';
  // Convert DD-MM-YYYY or DD/MM/YYYY to YYYY-MM-DD if needed
  const dmyMatch = trimmed.match(/^(\d{2})[-/](\d{2})[-/](\d{4})$/);
  if (dmyMatch) {
    return `${dmyMatch[3]}${dmyMatch[2]}${dmyMatch[1]}`;
  }
  return trimmed.replace(/\D/g, '');
}

// Forgot Password Verification (Check phone and DOB)
app.post('/api/forgot-password/verify', (req, res) => {
  try {
    const { phone, dob } = req.body || {};
    if (!phone || !dob) {
      return res.status(400).json({
        error: 'MISSING_FIELDS',
        message: 'कृपया मोबाइल नंबर और जन्म तिथि दोनों दर्ज करें।',
      });
    }

    const normalizedPhone = normalizePhone(phone);
    const user = getUserByPhone(normalizedPhone);
    if (!user) {
      return res.status(404).json({
        error: 'USER_NOT_FOUND',
        message: 'यह मोबाइल नंबर पंजीकृत नहीं है। कृपया पहले नया खाता (Sign-Up) बनाएँ।',
      });
    }

    const storedDobRaw = String(user.dob || '').trim();
    const inputDobRaw = String(dob || '').trim();

    if (storedDobRaw) {
      const cleanStored = normalizeDobForMatch(storedDobRaw);
      const cleanInput = normalizeDobForMatch(inputDobRaw);
      const rawDigitsStored = storedDobRaw.replace(/\D/g, '');
      const rawDigitsInput = inputDobRaw.replace(/\D/g, '');

      if (cleanStored !== cleanInput && rawDigitsStored !== rawDigitsInput) {
        return res.status(401).json({
          error: 'INVALID_VERIFICATION',
          message: 'जन्म तिथि मेल नहीं खाती! कृपया अपनी पंजीकृत जन्म तिथि दर्ज करें।',
        });
      }
    }

    return res.json({
      success: true,
      verified: true,
      name: user.name,
      phone: user.phone,
      message: 'मोबाइल नंबर एवं जन्म तिथि का सत्यापन सफल रहा!',
    });
  } catch (error) {
    console.error('Error in /api/forgot-password/verify:', error);
    res.status(500).json({ error: 'SERVER_ERROR', message: 'सत्यापन विफल। कृपया पुनः प्रयास करें।' });
  }
});

// Forgot Password Reset (Update password)
app.post('/api/forgot-password/reset', (req, res) => {
  try {
    const { phone, dob, newPassword } = req.body || {};
    if (!phone || !newPassword) {
      return res.status(400).json({
        error: 'MISSING_FIELDS',
        message: 'कृपया मोबाइल नंबर और नया पासवर्ड दर्ज करें।',
      });
    }

    const normalizedPhone = normalizePhone(phone);
    const user = getUserByPhone(normalizedPhone);
    if (!user) {
      return res.status(404).json({
        error: 'USER_NOT_FOUND',
        message: 'यह मोबाइल नंबर पंजीकृत नहीं है।',
      });
    }

    const storedDobRaw = String(user.dob || '').trim();
    const inputDobRaw = String(dob || '').trim();

    if (storedDobRaw && inputDobRaw) {
      const cleanStored = normalizeDobForMatch(storedDobRaw);
      const cleanInput = normalizeDobForMatch(inputDobRaw);
      const rawDigitsStored = storedDobRaw.replace(/\D/g, '');
      const rawDigitsInput = inputDobRaw.replace(/\D/g, '');

      if (cleanStored !== cleanInput && rawDigitsStored !== rawDigitsInput) {
        return res.status(401).json({
          error: 'UNAUTHORIZED',
          message: 'अनधिकृत अनुरोध। जन्म तिथि मेल नहीं खाती।',
        });
      }
    }

    if (String(newPassword).trim().length < 3) {
      return res.status(400).json({
        error: 'SHORT_PASSWORD',
        message: 'पासवर्ड कम से कम 3 अक्षरों का होना चाहिए।',
      });
    }

    const updatedUser = saveOrUpdateUserByPhone({
      phone: normalizedPhone,
      password: String(newPassword).trim(),
    });

    return res.json({
      success: true,
      user: updatedUser,
      message: 'पासवर्ड सफलतापूर्वक अपडेट कर दिया गया है!',
    });
  } catch (error) {
    console.error('Error in /api/forgot-password/reset:', error);
    res.status(500).json({ error: 'Password reset failed', message: 'पासवर्ड रीसेट करने में समस्या आई।' });
  }
});

// Profile Photo sync endpoint (persists across links and devices, Admin-only write)
app.get('/api/pandit-photo', (_req, res) => {
  res.json(getPermanentPhoto());
});

app.post('/api/pandit-photo', (req, res) => {
  try {
    if (!isAuthorizedAdminRequest(req.headers as Record<string, string | string[] | undefined>, req.body?.adminPhone)) {
      res.status(403).json({
        error: 'UNAUTHORIZED_ADMIN',
        message: 'अनुमति अस्वीकृत! केवल एडमिन (8958499979) को फोटो अपडेट की अनुमति है।',
      });
      return;
    }
    const { photo } = req.body || {};
    const saved = savePermanentPhoto(photo);
    res.json({ success: true, ...saved });
  } catch (error) {
    console.error('Error saving profile photo:', error);
    res.status(500).json({ error: 'Failed to save profile photo' });
  }
});

// Permanent 10 Lakh+ Website Visitor Counter + 100+ Live Active Users API
app.get('/api/visitor-counter', async (req, res) => {
  try {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    const clientMax = Number(req.query.clientMax || 0);
    const sessionId = req.query.sessionId ? String(req.query.sessionId) : undefined;
    const data = await getVisitorCountAsync(clientMax, sessionId);
    res.json(data);
  } catch {
    res.json(getVisitorCount());
  }
});

app.post('/api/visitor-counter', async (req, res) => {
  try {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    const { clientKnownMax, increment, sessionId } = req.body || {};
    const data =
      increment === false
        ? await getVisitorCountAsync(Number(clientKnownMax || 0), sessionId)
        : await incrementVisitorCountAsync(Number(clientKnownMax || 0), sessionId);
    res.json(data);
  } catch (error) {
    console.error('Error in POST /api/visitor-counter:', error);
    res.json(getVisitorCount());
  }
});

app.post('/api/active-users/leave', (req, res) => {
  try {
    const { sessionId } = req.body || {};
    removeActiveSession(sessionId);
    res.json({ ok: true });
  } catch {
    res.json({ ok: true });
  }
});

// Explicit root-scoped Service Worker & Manifest endpoints
app.get('/sw.js', (_req, res) => {
  const swPath = path.join(__dirname, 'public', 'sw.js');
  if (fs.existsSync(swPath)) {
    res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
    res.setHeader('Service-Worker-Allowed', '/');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.sendFile(swPath);
  } else {
    res.status(404).end();
  }
});

app.get('/manifest.json', (_req, res) => {
  const manifestPath = path.join(__dirname, 'public', 'manifest.json');
  if (fs.existsSync(manifestPath)) {
    res.setHeader('Content-Type', 'application/manifest+json; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.sendFile(manifestPath);
  } else {
    res.status(404).end();
  }
});

// Dedicated Favicon endpoints for Google Search Favicon crawler & browsers
app.get([
  '/favicon.ico',
  '/favicon-48x48.png',
  '/favicon-96x96.png',
  '/pwa-192x192.png',
  '/pwa-512x512.png',
  '/apple-touch-icon.png',
  '/app-icon.svg',
], (req, res) => {
  const filename = path.basename(req.path);
  const candidatePublic = path.join(__dirname, 'public', filename);
  const candidateDist = path.join(__dirname, 'dist', filename);
  const target = fs.existsSync(candidatePublic) ? candidatePublic : fs.existsSync(candidateDist) ? candidateDist : null;

  if (target) {
    if (filename.endsWith('.ico')) res.setHeader('Content-Type', 'image/x-icon');
    else if (filename.endsWith('.png')) res.setHeader('Content-Type', 'image/png');
    else if (filename.endsWith('.svg')) res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=86400');
    res.setHeader('X-Robots-Tag', 'index, follow');
    res.sendFile(target);
  } else {
    res.status(404).type('text/plain').send('Favicon not found');
  }
});

// Dedicated Social Preview Card Image Endpoint (/og-card/:filename & /api/og-card/:filename)
app.get(['/og-card/:filename', '/api/og-card/:filename'], (req, res) => {
  const rawName = path
    .basename(req.params.filename || '')
    .replace(/\.(jpg|jpeg|png|svg)$/i, '')
    .replace(/[-_.]v\d+$/i, '')
    .toLowerCase();
  const safeSlug = rawName.replace(/[^a-z0-9-_]/g, '') || 'janam-kundali';
  const filename = `${safeSlug}.jpg`;
  const candidatePublic = path.join(__dirname, 'public', 'og-card', filename);
  const candidateDist = path.join(__dirname, 'dist', 'og-card', filename);
  const fallbackPublic = path.join(__dirname, 'public', 'og-card', 'janam-kundali.jpg');
  const target = fs.existsSync(candidatePublic)
    ? candidatePublic
    : fs.existsSync(candidateDist)
    ? candidateDist
    : fs.existsSync(fallbackPublic)
    ? fallbackPublic
    : null;

  if (target) {
    res.setHeader('Content-Type', 'image/jpeg');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=86400');
    res.setHeader('X-Robots-Tag', 'index, follow, max-image-preview:large');
    res.sendFile(target);
  } else {
    res.redirect(302, 'https://iili.io/neb1ghg.jpg');
  }
});

// Dedicated Social Link Preview HTML Endpoint (/api/social-preview?path=/...)
app.get('/api/social-preview', (req, res) => {
  const reqPath = typeof req.query.path === 'string' ? req.query.path : '/';
  const baseIndex = fs.existsSync(path.join(__dirname, 'dist', 'index.html'))
    ? path.join(__dirname, 'dist', 'index.html')
    : path.join(__dirname, 'index.html');
  const rawHtml = fs.readFileSync(baseIndex, 'utf-8');
  const baseOrigin = resolveBaseOrigin(req.headers as Record<string, string | string[] | undefined>);
  const finalHtml = injectRouteSeoIntoHtml(rawHtml, reqPath, baseOrigin);
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate, s-maxage=60');
  res.status(200).send(finalHtml);
});

// Serve frontend via Vite middleware (or prebuilt dist in production when Vite is unavailable)
const distPath = path.join(__dirname, 'dist');
const distIndexPath = path.join(distPath, 'index.html');

function isStaticAssetRequest(urlPath: string): boolean {
  const clean = urlPath.split('?')[0];
  return (
    clean.startsWith('/assets/') ||
    clean.startsWith('/og-card/') ||
    clean.startsWith('/src/') ||
    clean.startsWith('/@vite/') ||
    clean.startsWith('/@react-refresh') ||
    clean.startsWith('/node_modules/') ||
    /\.(js|mjs|ts|tsx|jsx|css|map|json|wasm|png|jpg|jpeg|gif|svg|ico|webp|woff|woff2|ttf)$/i.test(clean)
  );
}

const KNOWN_CANONICAL_PATHS = new Set<string>([
  '/',
  '/404.html',
  '/download-center',
  ...getAllCanonicalSubpagePaths().map((p) => p.toLowerCase()),
]);

function isKnownHtmlRoute(urlPath: string): boolean {
  const clean = (urlPath.split('?')[0] || '/').replace(/\/+$/, '').toLowerCase() || '/';
  return KNOWN_CANONICAL_PATHS.has(clean);
}

async function setupFrontend() {
  // Mount public directory for static assets without trailing-slash directory redirects
  app.use(express.static(path.join(__dirname, 'public'), { index: false, redirect: false }));

  if (fs.existsSync(distPath)) {
    app.use(express.static(distPath, { index: false, redirect: false }));
  }

  // Return HTTP 404 + X-Robots-Tag: noindex, nofollow for unknown non-canonical HTML routes
  app.use((req, res, next) => {
    if (
      req.method === 'GET' &&
      !req.path.startsWith('/api/') &&
      !isStaticAssetRequest(req.path || '') &&
      !isKnownHtmlRoute(req.path || '/')
    ) {
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.setHeader('X-Content-Type-Options', 'nosniff');
      res.setHeader('X-Robots-Tag', 'noindex, nofollow');
      const target404 = fs.existsSync(path.join(distPath, '404.html'))
        ? path.join(distPath, '404.html')
        : fs.existsSync(path.join(__dirname, '404.html'))
        ? path.join(__dirname, '404.html')
        : distIndexPath;
      const rawHtml = fs.readFileSync(target404, 'utf-8');
      res.status(404).send(rawHtml);
      return;
    }
    next();
  });

  let viteMounted = false;
  if (process.env.NODE_ENV !== 'production' || !fs.existsSync(distIndexPath)) {
    try {
      const { createServer: createViteServer } = await import('vite');
      const vite = await createViteServer({
        server: { middlewareMode: true, hmr: false, ws: false },
        appType: 'spa',
      });
      app.use(vite.middlewares);
      viteMounted = true;
    } catch (e) {
      console.error('Failed to mount Vite middleware, falling back to static dist:', e);
    }
  }

  if (!viteMounted) {
    app.get('*', (req, res) => {
      // Never return HTML for a missing JS/TS/CSS/image file (prevents Uncaught SyntaxError: Unexpected token '<')
      if (isStaticAssetRequest(req.path || req.url || '')) {
        res.status(404).type('text/plain').send('Asset not found');
        return;
      }
      const isKnown = isKnownHtmlRoute(req.path || '/');
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.setHeader('X-Content-Type-Options', 'nosniff');
      if (!isKnown) {
        res.setHeader('X-Robots-Tag', 'noindex, nofollow');
      }
      const targetFile = fs.existsSync(distIndexPath)
        ? distIndexPath
        : path.join(__dirname, 'index.html');
      const rawHtml = fs.readFileSync(targetFile, 'utf-8');
      const baseOrigin = resolveBaseOrigin(req.headers as Record<string, string | string[] | undefined>);
      const injectedHtml = injectRouteSeoIntoHtml(rawHtml, req.path || '/', baseOrigin);
      res.status(isKnown ? 200 : 404).send(injectedHtml);
    });
  }
}

let activeHttpServer: http.Server | null = null;

app.post('/api/__internal_shutdown', (req, res) => {
  const remote = req.socket?.remoteAddress || '';
  if (remote === '127.0.0.1' || remote === '::1' || remote === '::ffff:127.0.0.1') {
    res.status(200).json({ ok: true });
    if (activeHttpServer) {
      activeHttpServer.closeAllConnections?.();
      activeHttpServer.close(() => {
        process.exit(0);
      });
    } else {
      process.exit(0);
    }
    return;
  }
  res.status(403).end();
});

function terminateStaleServerProcesses() {
  try {
    const output = execSync('ps -eo pid=,ppid=,args=', {
      encoding: 'utf-8',
      stdio: ['ignore', 'pipe', 'ignore'],
    });
    const rows = output
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const match = line.match(/^(\d+)\s+(\d+)\s+(.*)$/);
        if (!match) return null;
        return { pid: Number(match[1]), ppid: Number(match[2]), args: match[3] };
      })
      .filter((r): r is { pid: number; ppid: number; args: string } => r !== null);

    const parentMap = new Map<number, number>();
    for (const r of rows) {
      parentMap.set(r.pid, r.ppid);
    }

    const protectedPids = new Set<number>();
    let cur: number | undefined = process.pid;
    while (cur && cur > 1 && !protectedPids.has(cur)) {
      protectedPids.add(cur);
      cur = parentMap.get(cur);
    }

    for (const r of rows) {
      if (r.ppid === process.pid) {
        protectedPids.add(r.pid);
      }
    }

    for (const r of rows) {
      if (protectedPids.has(r.pid)) continue;
      if (r.args.includes('server.ts') && (r.args.includes('node') || r.args.includes('tsx'))) {
        try {
          process.kill(r.pid, 'SIGTERM');
        } catch {
          // ignore
        }
      }
    }
  } catch {
    // ignore if ps is unavailable
  }
}

// When running in Vercel Serverless or test environment, export app without binding port
const isMainServerInstance =
  !process.env.VERCEL &&
  !(globalThis as Record<string, unknown>).__PANDITJI_SERVER_STARTED__;

if (isMainServerInstance) {
  (globalThis as Record<string, unknown>).__PANDITJI_SERVER_STARTED__ = true;
  terminateStaleServerProcesses();
  await setupFrontend();

  const numericPort = Number(port) || 3000;
  const server = http.createServer(app);
  activeHttpServer = server;

  let retryCount = 0;
  const maxRetries = 10;

  server.on('error', async (err: NodeJS.ErrnoException) => {
    if (err.code === 'EADDRINUSE') {
      retryCount += 1;
      if (retryCount <= maxRetries) {
        console.warn(
          `[Server] Port ${numericPort} in use, releasing stale listener and retrying (${retryCount}/${maxRetries})...`
        );
        try {
          await fetch(`http://127.0.0.1:${numericPort}/api/__internal_shutdown`, {
            method: 'POST',
          });
        } catch {
          // ignore if previous process does not expose shutdown endpoint
        }
        terminateStaleServerProcesses();
        setTimeout(() => {
          try {
            server.close();
          } catch {
            // ignore
          }
          server.listen(numericPort, '0.0.0.0');
        }, 400);
        return;
      }
      console.warn(`[Server] Port ${numericPort} is already bound by an active server instance.`);
      return;
    }
    console.error('[Server Error]:', err);
  });

  const gracefulShutdown = () => {
    server.closeAllConnections?.();
    server.close(() => {
      process.exit(0);
    });
    setTimeout(() => process.exit(0), 500).unref();
  };

  process.once('SIGTERM', gracefulShutdown);
  process.once('SIGINT', gracefulShutdown);

  server.listen(numericPort, '0.0.0.0', () => {
    console.log(`Pandit Ji Online server running on port ${numericPort}`);
  });
}

export default app;
export { app };


