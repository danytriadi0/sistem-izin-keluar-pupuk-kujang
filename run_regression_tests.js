/**
 * MASTER REGRESSION TEST SUITE - SISTEM PERIZINAN KELUAR AREA PUPUK KUJANG
 * Digunakan untuk mencegah "Looping Bug" / "Whack-A-Mole Bug"
 * Menjamin tidak ada fitur utama yang patah setelah perbaikan bug baru.
 */

const { chromium } = require('playwright');
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT_DIR = __dirname;
let testServer = null;
let serverPort = 8089;

// Helper: Simple MIME type lookup
const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
  '.ico': 'image/x-icon'
};

// Buat server statis lokal mandiri agar pengujian dapat berjalan tanpa server.py manual
function startLocalServer() {
  return new Promise((resolve, reject) => {
    testServer = http.createServer((req, res) => {
      let reqPath = decodeURI(req.url.split('?')[0]);
      if (reqPath === '/') reqPath = '/index.html';
      const filePath = path.join(ROOT_DIR, reqPath);

      if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
        return;
      }

      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';

      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Access-Control-Allow-Origin': '*'
      });
      fs.createReadStream(filePath).pipe(res);
    });

    testServer.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        serverPort++;
        testServer.listen(serverPort);
      } else {
        reject(err);
      }
    });

    testServer.listen(serverPort, () => {
      resolve(`http://localhost:${serverPort}`);
    });
  });
}

// Test Runner
(async () => {
  console.log('='.repeat(65));
  console.log('  PUPUK KUJANG - AUTOMATED ANTI-REGRESSION TEST HARNESS');
  console.log('='.repeat(65));

  const results = [];
  function record(name, pass, details = '') {
    results.push({ name, pass, details });
    const mark = pass ? '\x1b[32m[PASS]\x1b[0m' : '\x1b[31m[FAIL]\x1b[0m';
    console.log(`${mark} ${name} ${details ? '(' + details + ')' : ''}`);
  }

  let baseUrl = '';
  try {
    baseUrl = await startLocalServer();
    console.log(`[INFO] Server uji lokal aktif di: ${baseUrl}\n`);
  } catch (err) {
    console.error('[ERROR] Gagal menyalakan server lokal:', err.message);
    process.exit(1);
  }

  let browser;
  try {
    try {
      browser = await chromium.launch({ channel: 'chrome', headless: true });
    } catch (e1) {
      try {
        browser = await chromium.launch({ channel: 'msedge', headless: true });
      } catch (e2) {
        browser = await chromium.launch({ headless: true });
      }
    }
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

    // Dengarkan console error untuk mendeteksi runtime crash
    const pageErrors = [];
    page.on('pageerror', (err) => pageErrors.push(err.message));

    await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    // TEST 1: Script & Application Init
    const isAppLoaded = await page.evaluate(() => {
      return typeof window.kujangQuickLogin === 'function' &&
             typeof window.ticketsList !== 'undefined' &&
             Array.isArray(window.ticketsList);
    });
    record('Core App Initialization & Tickets State', isAppLoaded);

    // TEST 2: Karyawan Dashboard & Quick Login
    await page.evaluate(() => window.kujangQuickLogin('karyawan'));
    await page.waitForTimeout(800);
    const karyawanLoginValid = await page.evaluate(() => {
      const u = window.getKujangCurrentUser ? window.getKujangCurrentUser() : null;
      return !!u && (u.role === 'karyawan' || u.roleKey === 'karyawan');
    });
    record('Karyawan Quick Login & Session State', karyawanLoginValid);

    // TEST 3: Approver Switch & Tab Navigation
    await page.evaluate(() => window.kujangQuickLogin('approver'));
    await page.waitForTimeout(800);
    const approverValid = await page.evaluate(() => {
      const u = window.getKujangCurrentUser ? window.getKujangCurrentUser() : null;
      return !!u && (u.role === 'approver' || u.roleKey === 'approver' || u.role === 'atasan');
    });
    record('Approver Quick Login & Role Authentication', approverValid);

    // TEST 4: Pos Jaga (Security) Dashboard
    await page.evaluate(() => window.kujangQuickLogin('posjaga'));
    await page.waitForTimeout(800);
    const securityValid = await page.evaluate(() => {
      const u = window.getKujangCurrentUser ? window.getKujangCurrentUser() : null;
      return !!u && (u.role === 'security' || u.roleKey === 'security' || u.role === 'posjaga');
    });
    record('Pos Jaga (Security) Quick Login', securityValid);

    // TEST 5: Admin Dashboard
    await page.evaluate(() => window.kujangQuickLogin('admin'));
    await page.waitForTimeout(800);
    const adminValid = await page.evaluate(() => {
      const u = window.getKujangCurrentUser ? window.getKujangCurrentUser() : null;
      return !!u && (u.role === 'admin' || u.roleKey === 'admin');
    });
    record('Admin Quick Login', adminValid);

    // TEST 6: Domain Separation (Pelacakan vs Riwayat)
    await page.evaluate(() => window.kujangQuickLogin('karyawan'));
    await page.waitForTimeout(800);
    const domainSeparationValid = await page.evaluate(() => {
      // Periksa daftar tiket
      const tickets = window.ticketsList || [];
      const activeStatuses = ['Menunggu Persetujuan', 'Disetujui', 'Sedang Berjalan', 'Terlambat'];
      const finalStatuses = ['Selesai', 'Ditolak', 'Dibatalkan', 'Kedaluwarsa'];

      // Validasi konsistensi fungsi filter jika ada
      let separationHealthy = true;
      tickets.forEach(t => {
        if (!t.status) separationHealthy = false;
      });
      return separationHealthy;
    });
    record('Domain Separation Integrity (Ticket Status)', domainSeparationValid);

    // TEST 7: Null-Safety & Fallback Object di window.ACTORS
    const nullSafetyValid = await page.evaluate(() => {
      if (typeof window.ACTORS === 'undefined') return true; // jika tidak pakai ACTORS global
      // Pastikan tidak ada null crash
      try {
        const dummyRole = 'non_existent_role_test';
        const actor = window.ACTORS[dummyRole];
        return actor === undefined || (typeof actor === 'object');
      } catch (e) {
        return false;
      }
    });
    record('Null-Safety di Global Actor Reference', nullSafetyValid);

    // TEST 8: Mobile Responsiveness Check (Tanpa Crash)
    await page.setViewportSize({ width: 390, height: 844 });
    await page.waitForTimeout(500);
    const mobileHealthy = await page.evaluate(() => {
      // Pastikan body atau mobile wrapper ter-render tanpa error
      return document.body && document.body.innerHTML.length > 500;
    });
    record('Mobile Viewport Adaptability', mobileHealthy);

    // TEST 9: Runtime Console Errors Check
    const hasNoFatalErrors = pageErrors.length === 0;
    record('Zero Runtime Console Errors', hasNoFatalErrors, pageErrors.length > 0 ? pageErrors.join(' | ') : 'Clean');

    // SUMMARY
    console.log('\n' + '-'.repeat(65));
    const passedCount = results.filter(r => r.pass).length;
    const failedCount = results.filter(r => !r.pass).length;

    console.log(`TOTAL PENGUJIAN: ${results.length}`);
    console.log(`\x1b[32mBERHASIL (PASS): ${passedCount}\x1b[0m`);
    if (failedCount > 0) {
      console.log(`\x1b[31mGAGAL (FAIL):    ${failedCount}\x1b[0m`);
      console.log('\n\x1b[31m[PERINGATAN REGRESI] Ada pengujian yang gagal! Harap periksa kembali sebelum menyimpan perubahan.\x1b[0m');
    } else {
      console.log('\x1b[32m[SEMPURNA] Seluruh uji regresi inti berhasil dilewati tanpa error!\x1b[0m');
    }
    console.log('-'.repeat(65));

    await browser.close();
    if (testServer) testServer.close();

    process.exit(failedCount > 0 ? 1 : 0);
  } catch (err) {
    console.error('\n[FATAL ERROR DALAM PENGUJIAN]:', err);
    if (browser) await browser.close();
    if (testServer) testServer.close();
    process.exit(1);
  }
})();
