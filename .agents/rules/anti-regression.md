# PROTOKOL ANTI-REGRESI & BLAST RADIUS CONTROL (SISTEM PERIZINAN PUPUK KUJANG)

> **Tujuan:** Menghentikan fenomena *whack-a-mole bug* (memperbaiki 1 bug namun memunculkan bug baru di modul lain). Setiap agent yang bekerja pada repositori ini WAJIB mematuhi protokol ini tanpa terkecuali.

---

## 1. PRINSIP UTAMA: ROOT CAUSE > SYMPTOM PATCHING

1. **Dilarang Menambal Gejala Saja:**
   - Jangan sekadar menambahkan pengecekan darurat seperti `if (!data) return;` atau `try-catch` kosong untuk membungkam error.
   - Wajib cari tahu: *Mengapa data tersebut null? Siapa yang seharusnya menginisialisasi atau mengirimkan data tersebut?*
2. **Minimal Blast Radius (Surgical Edit):**
   - Batasi perubahan hanya pada file dan fungsi yang berkaitan langsung dengan permintaan pengguna.
   - Dilarang melakukan refactoring gaya kode, mengubah nama variabel global, atau merapikan fungsi lain yang tidak diminta karena berisiko mematahkan modul yang bergantung padanya.
3. **Jaminan Kompatibilitas Publik (Backward Compatibility):**
   - Fungsi yang diekspos ke `window.*` (misal: `window.renderKaryawanTable`, `window.openDetailModal`, `window.quickLoginRole`, dll) TIDAK BOLEH diubah nama atau signature parameternya tanpa fallback kompatibilitas penuh.

---

## 2. ATURAN ARSITEKTUR KHUSUS PROYEK PUPUK KUJANG

### A. Sinkronisasi Modul Desktop vs Mobile
- Aplikasi ini memiliki dua tampilan: Desktop (`karyawan.js`, `approver.js`, `posjaga.js`, `admin.js`) dan Mobile (`mobile_karyawan.js`, `mobile_atasan.js`, `mobile_security.js`).
- Keduanya membaca dan memanipulasi state yang sama (`window.ticketsList`, `window.currentUser`, `window.MOCK_USERS`).
- **Aturan:** Setiap perubahan pada skema tiket atau fungsi manipulasi data di desktop WAJIB kompatibel dengan tampilan mobile, dan sebaliknya.

### B. Event Listener Idempotency (Anti-Duplikasi Listener)
- Masalah regresi sering terjadi karena `addEventListener` dipanggil berulang kali setiap kali halaman/subpage dirender ulang.
- **Wajib gunakan salah satu strategi berikut saat mengikat event:**
  1. *Event Delegation* pada container statis (misal: delegasikan klik tabel ke `#tableBody`).
  2. Gunakan dataset guard sebelum attach:
     ```javascript
     if (!element.dataset.listenerBound) {
       element.addEventListener('click', handler);
       element.dataset.listenerBound = 'true';
     }
     ```
  3. Atau gunakan clone replacement: `element.replaceWith(element.cloneNode(true))` sebelum bind.

### C. Multi-Aktor & State Lifecycle (Null-Safety)
- Dilarang keras melakukan hardcoding identitas aktor (misal "Budi Pratama" atau "Hendra Gunawan") pada timeline tiket. Selalu gunakan `window.currentUser` atau cari dinamis di `MOCK_USERS`.
- `window.ACTORS` tidak boleh dibiarkan `null` atau `undefined` saat pergantian role atau pencabutan akun. Selalu sediakan safe fallback object:
  ```javascript
  const actor = window.ACTORS?.[role] || { name: 'Sistem / Guest', nip: '-', role };
  ```
- Catat jejak riwayat tiket HANYA pada properti `ticket.timeline` (array), jangan gunakan properti baru yang tidak standar.

### D. Pemisahan Domain Pelacakan vs Riwayat
- **Menu Pelacakan (Tracking):** HANYA tiket berstatus aktif/berjalan (`Menunggu Persetujuan`, `Disetujui`, `Sedang Berjalan`, `Terlambat`).
- **Menu Riwayat (History):** HANYA tiket dengan status final (`Selesai`, `Ditolak`, `Dibatalkan`, `Kedaluwarsa`).
- Pastikan logika filter tidak saling bocor atau tumpang-tindih.

---

## 3. SOP EKSEKUSI TIGA TAHAP (SEBELUM EDIT KODE)

Sebelum menyentuh satu baris kode pun, Agent WAJIB menerapkan langkah mental berikut:

```
[Tahap 1: Impact Analysis]
1. Modul mana saja yang memanggil fungsi/variabel yang akan saya ubah?
2. Apakah fungsi ini diekspos ke window.* dan dipakai di modul lain (desktop / mobile)?
3. Apakah perubahan ini mengubah format data tiket di localStorage/state?

[Tahap 2: Surgical Fix]
1. Terapkan perubahan seminimal mungkin.
2. Jangan hapus kode pendukung lama kecuali benar-benar redundant dan tidak dipanggil di modul lain.
3. Pertahankan penanganan null/empty state.

[Tahap 3: Regression Verification]
1. Jalankan `git diff` untuk memastikan tidak ada perubahan liar/accidental deletion.
2. Jalankan test suite regresi: `npm test` atau `node run_regression_tests.js`.
3. Verifikasi alur utama: Login -> Buat Pengajuan -> Tracking/Approval -> Riwayat.
```

---

## 4. DEFINITION OF DONE (SYARAT SELESAI)

Pekerjaan dinyatakan **SELESAI** hanya jika:
- [x] Bug yang dilaporkan telah teratasi pada skenario uji nyata.
- [x] Tidak ada console error baru pada browser/terminal.
- [x] Fitur lain (Login, Pengajuan, Modal Detail, Export PDF, Mobile Switcher) tetap berfungsi normal.
- [x] Audit `git diff` bersih dan hanya menyentuh area yang relevan.
