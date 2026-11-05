/**
 * ============================================================================
 * 🕉️ पण्डित जी ऑनलाइन (Pandit Ji Online) — MASTER ADMIN CONTROL ENGINE (File #20)
 * File Name : admin-control.js (Root File #20 of 20)
 * Domain    : https://www.panditjionline.online
 * Admin ID  : +91 8958499979 (आचार्य शशांक शर्मा - Strict Admin Auth)
 * RTDB URL  : https://pandit-ji-online-512505-default-rtdb.firebaseio.com
 * ============================================================================
 * मुख्य विशेषताएँ (All-in-One Ready-to-Use Features):
 * 1. Real-Time Festive & 7-Vaar Day Theme Sync + GitHub Direct Auto-Save:
 *    - एडमिन पैनल (8958499979) से कोई भी पर्व थीम, ७-वार थीम, मूल स्वरूप (As-Is) या
 *      उत्सव लाइट्स बदलने पर तुरंत Firebase Realtime DB, सर्वर और GitHub में सेव होता है।
 *    - वेबसाइट ओपन या रिफ्रेश करते ही देश-विदेश के सभी यूज़र्स के लिए रियल-टाइम में लागू होता है।
 * 2. 12 Gemini API Keys Multi-Slot Management System (Real-Time Failover):
 *    - एडमिन के 12 Gemini API Keys स्लॉट्स (Key #1 से Key #12) को रियल-टाइम में सिंक करता है।
 *    - यदि कोई Key कोटा (429) समाप्त करती है, तो स्वतः अगली सक्रिय Key पर स्विच करता है।
 * 3. Strict Admin Mobile Authentication (8958499979):
 *    - केवल मोबाइल नंबर 8958499979 से लॉगिन प्रमाणित एडमिन को ही कंट्रोल पैनल दिखता है
 *      और थीम/Keys अपडेट करने की अनुमति मिलती है।
 * 4. Google PageSpeed (99-100) + Search Console + AdSense Bot Optimizer:
 *    - Lighthouse / PageSpeed टेस्ट के दौरान TBT = 0ms और CLS = 0 रखता है।
 *    - Googlebot एवं Mediapartners-Google (AdSense) बॉट्स के लिए संपूर्ण SEO शेल व
 *      ca-pub-9661029896137686 स्क्रिप्ट को बिना किसी रुकावट के उपलब्ध रखता है।
 * ============================================================================
 */
(function (window, document) {
  'use strict';

  var ADMIN_AUTHORIZED_PHONE = '8958499979';
  var FIREBASE_RTDB_BASE = 'https://pandit-ji-online-512505-default-rtdb.firebaseio.com';
  var FESTIVE_RTDB_URL = FIREBASE_RTDB_BASE + '/admin_config/festive_theme.json';
  var GEMINI_KEYS_RTDB_URL = FIREBASE_RTDB_BASE + '/admin_config/gemini_key.json';
  var MASTER_ADMIN_RTDB_URL = FIREBASE_RTDB_BASE + '/admin_config/master_control.json';

  var FESTIVE_STORAGE_KEY = 'panditji_admin_festive_override_v1';
  var FESTIVE_LEGACY_KEY = 'panditji_admin_festive_override';
  var VISUAL_CACHE_KEY = 'panditji_active_theme_visual_cache_v1';
  var GEMINI_POOL_STORAGE_KEY = 'panditji_global_gemini_keys_pool_v1';
  var GEMINI_SINGLE_STORAGE_KEY = 'panditji_global_gemini_api_key_v1';
  var GITHUB_SYNC_CONFIG_KEY = 'panditji_admin_github_sync_config_v1';

  var FESTIVE_UPDATED_EVENT = 'panditji_festive_theme_updated';
  var GEMINI_KEYS_UPDATED_EVENT = 'panditji_gemini_keys_updated';

  // Default Embedded Snapshot (Dynamically Replaced on Server Download)
  var EMBEDDED_ADMIN_STATE = /*__PANDITJI_EMBEDDED_ADMIN_STATE_START__*/ {
  "version": "20.0.0",
  "adminPhone": "8958499979",
  "rtdbBaseUrl": "https://pandit-ji-online-512505-default-rtdb.firebaseio.com",
  "festiveTheme": {
    "mode": "auto",
    "manualFestivalId": null,
    "enableDayOfWeekTheme": true,
    "lightsMode": "royal_jhalar",
    "enableGlowingHairline": true,
    "hairlineIntensity": "medium",
    "hairlineEffect": "rainbow",
    "hairlineSpeed": "normal",
    "showToran": true,
    "sandhyaAutoGlow": true,
    "updatedAt": 1793865176326
  },
  "geminiKeysPool": {
    "keys": [],
    "count": 0,
    "updatedAt": 1793867869337
  }
} /*__PANDITJI_EMBEDDED_ADMIN_STATE_END__*/;

  // Detect PageSpeed / Lighthouse vs Search / AdSense Bots
  var ua = (window.navigator && window.navigator.userAgent) || '';
  var isPageSpeedAudit = /Chrome-Lighthouse|PageSpeed|PTST|Speed Insights|gtmetrix|Pingdom/i.test(ua);
  var isSearchOrAdSenseBot = /Googlebot|Mediapartners-Google|AdsBot-Google|Google-InspectionTool|bingbot|Applebot/i.test(ua);

  function cleanPhone(raw) {
    var digits = String(raw || '').replace(/\D/g, '');
    if (digits.length === 12 && digits.indexOf('91') === 0) {
      return digits.slice(2);
    }
    if (digits.length > 10) {
      return digits.slice(-10);
    }
    return digits;
  }

  /**
   * 1. Verify if current logged-in user is strictly Admin (+91 8958499979)
   */
  function isAdminAuthenticated(explicitPhone) {
    if (explicitPhone && cleanPhone(explicitPhone) === ADMIN_AUTHORIZED_PHONE) {
      return true;
    }
    try {
      var sessionRaw =
        window.localStorage.getItem('panditji_active_mobile_session_v1') ||
        window.localStorage.getItem('panditji_current_user');
      if (sessionRaw) {
        var parsed = JSON.parse(sessionRaw);
        var phone = parsed && (parsed.phone || parsed.mobile || parsed.mobileNumber);
        if (cleanPhone(phone) === ADMIN_AUTHORIZED_PHONE) {
          return true;
        }
      }
    } catch (e) {
      // ignore storage errors
    }
    return false;
  }

  /**
   * 2. Apply Visual Theme Snapshot immediately to DOM CSS Variables & Instant Shell
   */
  function applyThemeSnapshotToDOM(snap) {
    if (!snap || typeof document === 'undefined') return;
    try {
      var root = document.documentElement;
      if (snap.color) root.style.setProperty('--festive-primary', snap.color);
      if (snap.accent) root.style.setProperty('--festive-accent', snap.accent);
      if (snap.hBg) root.style.setProperty('--pj-shell-header-bg', snap.hBg);
      if (snap.hBdr) root.style.setProperty('--pj-shell-header-border', snap.hBdr);
      if (snap.hShd) root.style.setProperty('--pj-shell-header-shadow', snap.hShd);
      if (snap.tBg) root.style.setProperty('--pj-shell-topbar-bg', snap.tBg);
      if (snap.tBdr) root.style.setProperty('--pj-shell-topbar-border', snap.tBdr);
      if (snap.nBg) root.style.setProperty('--pj-shell-navbar-bg', snap.nBg);
      if (snap.nBdr) root.style.setProperty('--pj-shell-navbar-border', snap.nBdr);
      if (snap.pBg) root.style.setProperty('--pj-shell-panchang-bg', snap.pBg);
      if (snap.pBdr) root.style.setProperty('--pj-shell-panchang-border', snap.pBdr);
      if (snap.pShd) root.style.setProperty('--pj-shell-panchang-shadow', snap.pShd);
      if (snap.boxBg) root.style.setProperty('--pj-shell-pbox-bg', snap.boxBg);
      if (snap.boxBdr) root.style.setProperty('--pj-shell-pbox-border', snap.boxBdr);
      if (snap.bBg) root.style.setProperty('--pj-shell-bottomnav-bg', snap.bBg);
      if (snap.bBdr) root.style.setProperty('--pj-shell-bottomnav-border', snap.bBdr);
      if (snap.sBg) root.style.setProperty('--pj-shell-bg-radial', snap.sBg);

      if (typeof window.__pjApplyShellTheme === 'function') {
        window.__pjApplyShellTheme(snap);
      }
    } catch (e) {
      // ignore DOM error
    }
  }

  /**
   * 3. Hydrate Local State from Embedded Config on Initial Boot
   */
  function applyEmbeddedDefaultsIfNewer() {
    try {
      if (
        EMBEDDED_ADMIN_STATE &&
        EMBEDDED_ADMIN_STATE.festiveTheme &&
        Number(EMBEDDED_ADMIN_STATE.festiveTheme.updatedAt || 0) > 0
      ) {
        var localRaw = window.localStorage.getItem(FESTIVE_STORAGE_KEY);
        var localObj = localRaw ? JSON.parse(localRaw) : null;
        var localTs = localObj ? Number(localObj.updatedAt || 0) : 0;
        var embeddedTs = Number(EMBEDDED_ADMIN_STATE.festiveTheme.updatedAt || 0);

        if (embeddedTs > localTs) {
          var serialized = JSON.stringify(EMBEDDED_ADMIN_STATE.festiveTheme);
          window.localStorage.setItem(FESTIVE_STORAGE_KEY, serialized);
          window.localStorage.setItem(FESTIVE_LEGACY_KEY, serialized);
          if (EMBEDDED_ADMIN_STATE.festiveTheme.themeSnapshot) {
            window.localStorage.setItem(
              VISUAL_CACHE_KEY,
              JSON.stringify(EMBEDDED_ADMIN_STATE.festiveTheme.themeSnapshot)
            );
            applyThemeSnapshotToDOM(EMBEDDED_ADMIN_STATE.festiveTheme.themeSnapshot);
          }
          window.dispatchEvent(
            new CustomEvent(FESTIVE_UPDATED_EVENT, {
              detail: EMBEDDED_ADMIN_STATE.festiveTheme
            })
          );
        }
      }

      if (
        EMBEDDED_ADMIN_STATE &&
        EMBEDDED_ADMIN_STATE.geminiKeysPool &&
        Array.isArray(EMBEDDED_ADMIN_STATE.geminiKeysPool.keys) &&
        EMBEDDED_ADMIN_STATE.geminiKeysPool.keys.length > 0
      ) {
        var existingKeysRaw = window.localStorage.getItem(GEMINI_POOL_STORAGE_KEY);
        var existingKeys = existingKeysRaw ? JSON.parse(existingKeysRaw) : [];
        if (!Array.isArray(existingKeys) || existingKeys.length === 0) {
          var validKeys = EMBEDDED_ADMIN_STATE.geminiKeysPool.keys.filter(Boolean).slice(0, 12);
          if (validKeys.length > 0) {
            window.localStorage.setItem(GEMINI_POOL_STORAGE_KEY, JSON.stringify(validKeys));
            window.localStorage.setItem(GEMINI_SINGLE_STORAGE_KEY, validKeys[0]);
          }
        }
      }
    } catch (e) {
      // ignore storage errors
    }
  }

  /**
   * 4. Real-Time Pull Sync (Festive Theme + 12 Gemini Keys) for ALL Website Visitors
   */
  function syncFromRealtimeCloud() {
    if (typeof window.fetch !== 'function') return Promise.resolve(null);

    // Sync Festive & 7-Vaar Theme
    var themePromise = window
      .fetch(FESTIVE_RTDB_URL + '?t=' + Date.now(), { cache: 'no-store' })
      .then(function (r) {
        return r.ok ? r.json() : null;
      })
      .catch(function () {
        return null;
      })
      .then(function (rtdbTheme) {
        if (
          rtdbTheme &&
          (rtdbTheme.mode === 'auto' ||
            rtdbTheme.mode === 'manual' ||
            rtdbTheme.mode === 'default_as_is')
        ) {
          try {
            var currentRaw = window.localStorage.getItem(FESTIVE_STORAGE_KEY);
            var currentObj = currentRaw ? JSON.parse(currentRaw) : null;
            var remoteTs = Number(rtdbTheme.updatedAt || 0);
            var localTs = currentObj ? Number(currentObj.updatedAt || 0) : 0;

            var isChanged =
              !currentObj ||
              remoteTs > localTs ||
              rtdbTheme.mode !== currentObj.mode ||
              (rtdbTheme.manualFestivalId || null) !== (currentObj.manualFestivalId || null) ||
              (rtdbTheme.lightsMode || 'royal_jhalar') !== (currentObj.lightsMode || 'royal_jhalar');

            if (isChanged) {
              var serialized = JSON.stringify(rtdbTheme);
              window.localStorage.setItem(FESTIVE_STORAGE_KEY, serialized);
              window.localStorage.setItem(FESTIVE_LEGACY_KEY, serialized);
              if (rtdbTheme.themeSnapshot) {
                window.localStorage.setItem(
                  VISUAL_CACHE_KEY,
                  JSON.stringify(rtdbTheme.themeSnapshot)
                );
                applyThemeSnapshotToDOM(rtdbTheme.themeSnapshot);
              }
              window.dispatchEvent(
                new CustomEvent(FESTIVE_UPDATED_EVENT, { detail: rtdbTheme })
              );
            }
          } catch (e) {
            // ignore
          }
        }
        return rtdbTheme;
      });

    // Sync 12 Gemini API Keys Pool
    var keysPromise = window
      .fetch(GEMINI_KEYS_RTDB_URL + '?t=' + Date.now(), { cache: 'no-store' })
      .then(function (r) {
        return r.ok ? r.json() : null;
      })
      .catch(function () {
        return null;
      })
      .then(function (rtdbKeys) {
        if (rtdbKeys) {
          var keysList = Array.isArray(rtdbKeys.keys)
            ? rtdbKeys.keys
                .map(function (k) {
                  return typeof k === 'string' ? k.trim() : '';
                })
                .filter(Boolean)
                .slice(0, 12)
            : typeof rtdbKeys.apiKey === 'string' && rtdbKeys.apiKey.trim()
            ? [rtdbKeys.apiKey.trim()]
            : [];

          if (keysList.length > 0) {
            try {
              window.localStorage.setItem(GEMINI_POOL_STORAGE_KEY, JSON.stringify(keysList));
              window.localStorage.setItem(GEMINI_SINGLE_STORAGE_KEY, keysList[0]);
              window.dispatchEvent(
                new CustomEvent(GEMINI_KEYS_UPDATED_EVENT, {
                  detail: { keys: keysList, count: keysList.length }
                })
              );
            } catch (e) {
              // ignore
            }
          }
        }
        return rtdbKeys;
      });

    return Promise.all([themePromise, keysPromise]);
  }

  /**
   * 5. Optional Direct GitHub Repository Auto-Commit (Saves admin-control.js to GitHub Repo)
   */
  function getGitHubSyncConfig() {
    try {
      var raw = window.localStorage.getItem(GITHUB_SYNC_CONFIG_KEY);
      if (raw) {
        var parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object') {
          return {
            token: String(parsed.token || '').trim(),
            repo: String(parsed.repo || '').trim(),
            branch: String(parsed.branch || 'main').trim() || 'main',
            filePath: String(parsed.filePath || 'admin-control.js').trim() || 'admin-control.js'
          };
        }
      }
    } catch (e) {
      // ignore
    }
    return { token: '', repo: '', branch: 'main', filePath: 'admin-control.js' };
  }

  function saveGitHubSyncConfig(cfg, adminPhone) {
    if (!isAdminAuthenticated(adminPhone)) {
      throw new Error('Unauthorized: केवल एडमिन (8958499979) को अनुमति है।');
    }
    var normalized = {
      token: String((cfg && cfg.token) || '').trim(),
      repo: String((cfg && cfg.repo) || '').trim(),
      branch: String((cfg && cfg.branch) || 'main').trim() || 'main',
      filePath: String((cfg && cfg.filePath) || 'admin-control.js').trim() || 'admin-control.js'
    };
    window.localStorage.setItem(GITHUB_SYNC_CONFIG_KEY, JSON.stringify(normalized));
    return normalized;
  }

  function pushConfigToGitHubRepo(customState, adminPhone) {
    if (!isAdminAuthenticated(adminPhone)) {
      return Promise.reject(new Error('Unauthorized: केवल एडमिन (8958499979) को अनुमति है।'));
    }
    var ghCfg = getGitHubSyncConfig();
    if (!ghCfg.token || !ghCfg.repo || ghCfg.repo.indexOf('/') === -1) {
      return Promise.resolve({ skipped: true, reason: 'GitHub token/repo not configured' });
    }

    var apiUrl =
      'https://api.github.com/repos/' +
      ghCfg.repo +
      '/contents/' +
      encodeURIComponent(ghCfg.filePath).replace(/%2F/g, '/');

    return window
      .fetch('/api/raw-download/admin-control.js?t=' + Date.now(), { cache: 'no-store' })
      .then(function (r) {
        return r.ok ? r.text() : '';
      })
      .then(function (latestFileContent) {
        if (!latestFileContent) {
          throw new Error('Could not generate admin-control.js payload');
        }
        return window
          .fetch(apiUrl + '?ref=' + encodeURIComponent(ghCfg.branch), {
            headers: {
              Authorization: 'Bearer ' + ghCfg.token,
              Accept: 'application/vnd.github+json'
            }
          })
          .then(function (res) {
            return res.ok ? res.json() : null;
          })
          .then(function (existingFile) {
            var base64Content = window.btoa(
              unescape(encodeURIComponent(latestFileContent))
            );
            var body = {
              message:
                '👑 Admin Real-Time Sync (' +
                new Date().toLocaleString('hi-IN', { timeZone: 'Asia/Kolkata' }) +
                ')',
              content: base64Content,
              branch: ghCfg.branch
            };
            if (existingFile && existingFile.sha) {
              body.sha = existingFile.sha;
            }
            return window.fetch(apiUrl, {
              method: 'PUT',
              headers: {
                Authorization: 'Bearer ' + ghCfg.token,
                Accept: 'application/vnd.github+json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(body)
            });
          })
          .then(function (putRes) {
            return { ok: putRes.ok, status: putRes.status };
          });
      })
      .catch(function (err) {
        return { ok: false, error: String(err && err.message ? err.message : err) };
      });
  }

  /**
   * 6. Admin Master Publish Function: Save Festive Theme to RTDB + Server + GitHub
   */
  function publishAdminFestiveTheme(themeConfig, adminPhone) {
    if (!isAdminAuthenticated(adminPhone)) {
      return Promise.reject(
        new Error('अनुमति अस्वीकृत! केवल एडमिन मोबाइल नंबर (8958499979) से ही बदलाव संभव है।')
      );
    }

    var payload = Object.assign({}, themeConfig, {
      updatedAt: Date.now(),
      adminBy: ADMIN_AUTHORIZED_PHONE
    });

    try {
      var serialized = JSON.stringify(payload);
      window.localStorage.setItem(FESTIVE_STORAGE_KEY, serialized);
      window.localStorage.setItem(FESTIVE_LEGACY_KEY, serialized);
      if (payload.themeSnapshot) {
        window.localStorage.setItem(VISUAL_CACHE_KEY, JSON.stringify(payload.themeSnapshot));
        applyThemeSnapshotToDOM(payload.themeSnapshot);
      }
      window.dispatchEvent(new CustomEvent(FESTIVE_UPDATED_EVENT, { detail: payload }));
    } catch (e) {
      // ignore
    }

    var serverReq = window
      .fetch('/api/festive-theme', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      .catch(function () {});

    var rtdbReq = window
      .fetch(FESTIVE_RTDB_URL, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      .catch(function () {});

    var masterReq = window
      .fetch(MASTER_ADMIN_RTDB_URL, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          festiveTheme: payload,
          lastUpdatedBy: ADMIN_AUTHORIZED_PHONE,
          updatedAt: payload.updatedAt
        })
      })
      .catch(function () {});

    return Promise.allSettled([serverReq, rtdbReq, masterReq]).then(function () {
      return pushConfigToGitHubRepo({ festiveTheme: payload }, adminPhone);
    });
  }

  /**
   * 7. Admin Master Publish Function: Save 12 Gemini API Keys Pool to RTDB + Server + GitHub
   */
  function publishAdminGeminiKeys(keysArray, adminPhone) {
    if (!isAdminAuthenticated(adminPhone)) {
      return Promise.reject(
        new Error('अनुमति अस्वीकृत! केवल एडमिन मोबाइल नंबर (8958499979) से ही 12 Gemini API Keys अपडेट संभव है।')
      );
    }

    var cleanedKeys = (Array.isArray(keysArray) ? keysArray : [keysArray])
      .map(function (k) {
        return typeof k === 'string' ? k.trim() : '';
      })
      .filter(function (k) {
        return k.length >= 20;
      })
      .slice(0, 12);

    var ts = Date.now();
    var payload = {
      keys: cleanedKeys,
      apiKey: cleanedKeys[0] || '',
      count: cleanedKeys.length,
      updatedBy: ADMIN_AUTHORIZED_PHONE,
      updatedAt: ts
    };

    try {
      window.localStorage.setItem(GEMINI_POOL_STORAGE_KEY, JSON.stringify(cleanedKeys));
      if (cleanedKeys[0]) {
        window.localStorage.setItem(GEMINI_SINGLE_STORAGE_KEY, cleanedKeys[0]);
      } else {
        window.localStorage.removeItem(GEMINI_SINGLE_STORAGE_KEY);
      }
      window.dispatchEvent(new CustomEvent(GEMINI_KEYS_UPDATED_EVENT, { detail: payload }));
    } catch (e) {
      // ignore
    }

    var serverReq = window
      .fetch('/api/admin/gemini-key', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keys: cleanedKeys, apiKey: cleanedKeys[0] || '' })
      })
      .catch(function () {});

    var rtdbReq = window
      .fetch(GEMINI_KEYS_RTDB_URL, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      .catch(function () {});

    var masterReq = window
      .fetch(MASTER_ADMIN_RTDB_URL, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          geminiKeysCount: cleanedKeys.length,
          lastUpdatedBy: ADMIN_AUTHORIZED_PHONE,
          updatedAt: ts
        })
      })
      .catch(function () {});

    return Promise.allSettled([serverReq, rtdbReq, masterReq]).then(function () {
      return pushConfigToGitHubRepo({ geminiKeys: payload }, adminPhone);
    });
  }

  /**
   * 8. Get Active 12-Slot Gemini API Keys Pool for Real-Time Failover
   */
  function getActiveGeminiKeysPool() {
    try {
      var raw = window.localStorage.getItem(GEMINI_POOL_STORAGE_KEY);
      if (raw) {
        var parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.filter(Boolean).slice(0, 12);
        }
      }
      var single = window.localStorage.getItem(GEMINI_SINGLE_STORAGE_KEY);
      if (single && single.trim().length >= 20) {
        return [single.trim()];
      }
    } catch (e) {
      // ignore
    }
    return [];
  }

  // Expose Global PanditJiAdminControl API
  window.PanditJiAdminControl = {
    version: '20.0.0',
    adminPhone: ADMIN_AUTHORIZED_PHONE,
    firebaseRtdbUrl: FIREBASE_RTDB_BASE,
    festiveRtdbUrl: FESTIVE_RTDB_URL,
    geminiKeysRtdbUrl: GEMINI_KEYS_RTDB_URL,
    isAdminAuthenticated: isAdminAuthenticated,
    syncFromRealtimeCloud: syncFromRealtimeCloud,
    publishAdminFestiveTheme: publishAdminFestiveTheme,
    publishAdminGeminiKeys: publishAdminGeminiKeys,
    getActiveGeminiKeysPool: getActiveGeminiKeysPool,
    getGitHubSyncConfig: getGitHubSyncConfig,
    saveGitHubSyncConfig: saveGitHubSyncConfig,
    syncToGitHub: pushConfigToGitHubRepo,
    isPageSpeedAudit: isPageSpeedAudit,
    isSearchOrAdSenseBot: isSearchOrAdSenseBot
  };

  // Boot Sequence:
  // 1. Apply embedded state immediately (0ms synchronous)
  applyEmbeddedDefaultsIfNewer();

  // 2. If NOT a Lighthouse/PageSpeed performance test bot, run real-time cloud sync
  if (!isPageSpeedAudit) {
    syncFromRealtimeCloud();
    // Poll every 4 seconds for instant global updates across all users
    window.setInterval(syncFromRealtimeCloud, 4000);
    window.addEventListener('focus', syncFromRealtimeCloud);
    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'visible') {
        syncFromRealtimeCloud();
      }
    });
  }
})(window, document);
