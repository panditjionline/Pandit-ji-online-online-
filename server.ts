import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import crypto from 'crypto';
import { handleChatMessage } from './src/server/chatHandler';
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
  resolveBaseOrigin,
  syncStaticSeoFilesToPublic,
  buildDynamicSitemapEntries,
  GOOGLE_SITE_VERIFICATION_TOKEN,
  GOOGLE_HTML_VERIFICATION_FILENAME,
  GOOGLE_HTML_VERIFICATION_CONTENT,
} from './src/server/seoHandler';
import {
  getRawDownloadPayload,
  renderDownloadCenterHtml,
} from './src/server/downloadCenterHandler';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));

// Enable CORS for standalone index.html hosted on Firebase / Vercel and disable caching on standalone download
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
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
      '/api/contact',
      '/api/admin/gemini-key',
    ];
    if (knownPrefixes.some((p) => candidate.startsWith(p))) {
      req.url = candidate;
    }
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

// Direct attachment download for standalone index.html on mobile & desktop
app.get(['/standalone-firebase-index.html', '/api/download-standalone'], (req, res) => {
  const standaloneFile = path.join(__dirname, 'public', 'standalone-firebase-index.html');
  const distStandaloneFile = path.join(__dirname, 'dist', 'standalone-firebase-index.html');
  const distIndexFile = path.join(__dirname, 'dist', 'index.html');
  const fileToServe = fs.existsSync(standaloneFile)
    ? standaloneFile
    : fs.existsSync(distStandaloneFile)
    ? distStandaloneFile
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

// Global Admin Gemini API Key Endpoint (Admin-only secret configuration, serves all visitors)
app.get('/api/admin/gemini-key', (_req, res) => {
  const stored = getPermanentAdminGeminiKey(true);
  res.json(stored);
});

app.post('/api/admin/gemini-key', (req, res) => {
  try {
    const rawInput = Array.isArray(req.body?.keys)
      ? req.body.keys
      : typeof req.body?.apiKey === 'string'
      ? req.body.apiKey
      : [];
    const saved = savePermanentAdminGeminiKey(rawInput);
    res.json({ success: true, ...saved });
  } catch (error) {
    console.error('Error in POST /api/admin/gemini-key:', error);
    res.status(500).json({ error: 'Failed to save global Admin Gemini API keys' });
  }
});

// API route for Shashank Sharma AI chat
app.post('/api/chat', async (req, res) => {
  try {
    getPermanentAdminGeminiKey(true);
    const { message, history, language, userProfile } = req.body;
    const result = await handleChatMessage(message, history || [], language, userProfile);
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

// API routes for Bookings (Private per user phone number)
app.get('/api/bookings', (req, res) => {
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
    const newBooking = req.body;
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
    const phone = req.query.phone ? String(req.query.phone) : undefined;
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
    const inputHash = crypto.createHash('sha256').update(inputPassword).digest('hex');

    // Verify password if password parameter is explicitly passed (e.g. login attempt)
    if (inputPassword) {
      if (storedPassword && storedPassword !== inputPassword && storedPassword !== inputHash) {
        res.status(401).json({ error: 'WRONG_PASSWORD', message: 'गलत पासवर्ड!' });
        return;
      }
    }

    res.json({ found: true, user });
  } catch (error) {
    console.error('Error in GET /api/user-data:', error);
    res.status(500).json({ error: 'Failed to load user account' });
  }
});

app.post('/api/user-data', (req, res) => {
  try {
    const payload = req.body || {};
    if (!payload.phone) {
      res.status(400).json({ error: 'Mobile number is required' });
      return;
    }
    const savedUser = saveOrUpdateUserByPhone(payload);
    res.json({ success: true, user: savedUser });
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

// Profile Photo sync endpoint (persists across links and devices)
app.get('/api/pandit-photo', (_req, res) => {
  res.json(getPermanentPhoto());
});

app.post('/api/pandit-photo', (req, res) => {
  try {
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

// Explicit download endpoint for Single-File Standalone Firebase index.html
app.get('/standalone-firebase-index.html', (_req, res) => {
  const standalonePath = path.join(__dirname, 'public', 'standalone-firebase-index.html');
  const distStandalonePath = path.join(__dirname, 'dist', 'standalone-firebase-index.html');
  const distIndexPath = path.join(__dirname, 'dist', 'index.html');
  const target = fs.existsSync(standalonePath)
    ? standalonePath
    : fs.existsSync(distStandalonePath)
    ? distStandalonePath
    : fs.existsSync(distIndexPath)
    ? distIndexPath
    : null;

  if (target) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="index.html"');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.sendFile(target);
  } else {
    res.status(404).type('text/plain').send('Standalone index.html not found');
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

// Serve frontend via Vite middleware (or prebuilt dist in production when Vite is unavailable)
const distPath = path.join(__dirname, 'dist');
const distIndexPath = path.join(distPath, 'index.html');

function isStaticAssetRequest(urlPath: string): boolean {
  const clean = urlPath.split('?')[0];
  return (
    clean.startsWith('/assets/') ||
    clean.startsWith('/src/') ||
    clean.startsWith('/@vite/') ||
    clean.startsWith('/@react-refresh') ||
    clean.startsWith('/node_modules/') ||
    /\.(js|mjs|ts|tsx|jsx|css|map|json|wasm|png|jpg|jpeg|gif|svg|ico|webp|woff|woff2|ttf)$/i.test(clean)
  );
}

async function setupFrontend() {
  // Always mount public directory for static assets (icons, manifest, service worker, verification files)
  app.use(express.static(path.join(__dirname, 'public')));

  if (fs.existsSync(distPath)) {
    app.use(express.static(distPath, { index: false }));
  }

  let viteMounted = false;
  if (process.env.NODE_ENV !== 'production' || !fs.existsSync(distIndexPath)) {
    try {
      const { createServer: createViteServer } = await import('vite');
      const vite = await createViteServer({
        server: { middlewareMode: true },
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
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.setHeader('X-Content-Type-Options', 'nosniff');
      if (fs.existsSync(distIndexPath)) {
        res.sendFile(distIndexPath);
      } else {
        res.sendFile(path.join(__dirname, 'index.html'));
      }
    });
  }
}

// When running in Vercel Serverless or test environment, export app without binding port
if (!process.env.VERCEL) {
  await setupFrontend();
  app.listen(port, () => {
    console.log(`Pandit Ji Online server running on port ${port}`);
  });
}

export default app;
export { app };

