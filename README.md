# Final Project **LBE Lab RPL 2026** berupa aplikasi To-Do List sederhana menggunakan HTML, CSS, dan JavaScript murni tanpa framework.

Project ini dikembangkan secara kolaboratif menggunakan workflow Git/GitHub dengan branch, Pull Request, review, dan integrasi fitur melalui branch `dev`.

---

## 1. Tujuan Pembelajaran

Setelah mengerjakan proyek ini, mahasiswa diharapkan terbiasa dengan:

- Alur kerja **fork dan Pull Request lintas repository**, sebagaimana lazim
  digunakan pada proyek open source.
- Membuat dan mengelola **backlog** di GitHub (Issues / Projects board).
- Struktur branch **`main` → `dev` → `feature/*`**.
- Alur kerja **Pull Request beserta review**, bukan commit langsung ke
  `main`/`dev`.
- Penulisan **commit message** dan **deskripsi Pull Request** yang jelas.
- Kolaborasi paralel tanpa saling menimpa pekerjaan anggota lain, termasuk
  cara menyelesaikan merge conflict apabila terjadi.

Penilaian utama diberikan berdasarkan **proses kerja**, bukan semata-mata
hasil akhir yang dihasilkan.

---

## 2. Cara Menjalankan Project

Proyek ini **tidak memerlukan instalasi apapun** (tidak ada `npm install`,
tidak ada backend/server, dan tidak ada database).

**Cara paling sederhana:**
1. Buka folder `src/`.
2. Klik dua kali pada `index.html`, halaman akan terbuka otomatis di browser.

**Cara yang lebih nyaman untuk keperluan development (opsional):**
- Bagi pengguna VS Code, dapat memasang extension **Live Server**, lalu klik
  kanan pada `src/index.html` dan pilih `Open with Live Server`. Browser akan
  melakukan refresh otomatis setiap kali perubahan disimpan.
- Alternatif lain adalah menjalankan `npx serve src` (memerlukan Node.js)
  apabila menginginkan server lokal sederhana tanpa extension.

Tidak ada langkah yang bersifat wajib selain membuka berkas HTML tersebut.
Tools di atas bersifat opsional dan dapat dipasang secara mandiri sesuai
kebutuhan masing-masing.

---

## 3. Struktur Folder

```
src/
├── index.html      # struktur halaman To-Do List
├── css/
│   └── style.css   # styling dan responsive UI
└── js/
    └── app.js      # logic dan seluruh fitur To-Do List
```

Fitur yang sudah berfungsi:
- Menambahkan task baru.
- Menampilkan daftar task.
- Menghapus task.
- Menandai task sebagai selesai.
- Mengedit task.
- Memfilter task berdasarkan status.
- Menyimpan data task menggunakan `localStorage`.
- Menampilkan jumlah task yang belum selesai.
- Menghapus seluruh task yang sudah selesai.

---

## 4. Pembagian Kelompok & Role

Proyek ini dikerjakan oleh 1 kelompok yang terdiri dari 5 orang. Karena proyek bersifat frontend-only tanpa backend/server, pembagian tugas dalam kelompok disesuaikan dengan fitur dan kebutuhan pengembangan aplikasi.

**| Role | Jumlah |	Tanggung Jawab Utama |**
|---|---|---|
| **Project Manager (PM)** | 1 orang |	Mengelola backlog dan GitHub Project, mengatur pembagian tugas, membuat dan mengelola branch dev, melakukan review dan merge Pull Request, memantau timeline dan progres proyek, melakukan integrasi fitur, memperbarui README/dokumentasi, serta mengembangkan fitur Task Counter dan melakukan finalisasi project |
| **Feature Developer 1**	| 1 orang |	Bertanggung jawab atas fitur Save Data to localStorage, termasuk implementasi HTML, CSS, dan JavaScript pada branch feature/* |
| **Feature Developer 2**	| 1 orang	| Bertanggung jawab atas fitur Mark Task as Complete, termasuk implementasi HTML, CSS, dan JavaScript pada branch feature/* |
| **Feature Developer 3**	| 1 orang	| Bertanggung jawab atas fitur Edit Task dan Filter Task, termasuk implementasi HTML, CSS, dan JavaScript pada branch feature/* |
| **Feature Developer 4**	| 1 orang	| Bertanggung jawab atas fitur Clear Completed Tasks, termasuk implementasi HTML, CSS, dan JavaScript pada branch feature/* |

---

## 5. Timeline Pengerjaan (14–20 September 2026)

Pengumuman final project disampaikan pada Senin, 14 September 2026.
Pengerjaan efektif berlangsung **6 hari**, Selasa 15 September s.d. Minggu 20
September 2026, dengan batas pengumpulan pukul **23.59** pada hari terakhir.

| Hari | Tanggal | Fokus |
|---|---|---|
| Senin | 14 Sept | **Pengumuman FP**: final project diumumkan ke seluruh kelas, pembagian 8 kelompok (masing-masing 5 orang), dan akses ke repo starter ini dibagikan. Belum ada pengerjaan kode pada hari ini. |
| Selasa | 15 Sept | **Kickoff**: PM melakukan fork repo starter ini ke akun/organisasi kelompok, menyiapkan board, memecah backlog menjadi Issues, dan membuat branch `dev` pada fork tersebut. Seluruh anggota melakukan `git clone` dari fork kelompok, memastikan starter dapat dijalankan, dan mulai coding pada branch `feature/*` masing-masing hari itu juga. 
| Rabu | 16 Sept | **Pengerjaan fitur**: seluruh anggota melanjutkan implementasi fitur masing-masing. PM memantau progres dan memastikan setiap fitur dikerjakan melalui branch `feature/*`. |
| Kamis | 17 Sept | **Feature development & review**: Pull Request untuk fitur **Save Data to localStorage** dan **Mark Task as Complete** diajukan, direview, dan di-merge ke `dev`. |
| Jumat | 18 Sept | **Feature development & integration**: fitur **Edit Task**, **Filter Task**, **Clear Completed Tasks**, dan **Task Counter** diselesaikan dan Pull Request masing-masing diproses melalui review dan merge ke `dev`. |
| Sabtu | 19 Sept | **Integrasi dan pengujian**: seluruh fitur diuji bersama pada branch `dev`. Ditemukan dan diperbaiki beberapa bug hasil integrasi, termasuk perbaikan pada fitur **Filter Task**. |
| Minggu | 20 Sept | **Finalisasi**: dilakukan perbaikan lanjutan pada fitur **localStorage**, penyempurnaan tampilan/UI (*polishing*), serta pengecekan akhir seluruh fitur. Setelah project siap, branch `dev` di-merge ke `main` pada fork kelompok dan Pull Request dari fork kelompok ke repo starter diajukan sebagai bentuk pengumpulan tugas sebelum pukul 23.59. |

---

## 6. Fitur yang Dibuat

### Fitur #1: Tandai Task Selesai (Mark as Complete)
Tambahkan checkbox pada setiap task. Apabila dicentang, task ditandai selesai
(teks dicoret/strikethrough dan warnanya dibuat lebih pudar).

### Fitur #2: Edit Task
Pengguna dapat mengubah teks task yang sudah ada tanpa perlu menghapus dan
membuat task baru.

### Fitur #3: Filter Task (Semua / Aktif / Selesai)
Tambahkan 3 tombol filter di atas daftar task untuk menampilkan: seluruh
task, task yang belum selesai saja, atau task yang sudah selesai saja.

### Fitur #4: Simpan Data ke `localStorage`
Data task tidak boleh hilang saat halaman dimuat ulang (refresh).

### Fitur #5: Counter Task Tersisa
Tampilkan teks seperti `"3 task tersisa"` yang menghitung jumlah task yang
belum selesai (`completed === false`).

### Fitur #6: Hapus Semua Task yang Sudah Selesai
Tombol "Hapus yang Selesai" untuk menghapus seluruh task yang telah dicentang
sekaligus.

---

## 7. UI/UX Enhancement

Project juga mendapatkan penyempurnaan tampilan agar lebih clean dan nyaman digunakan.

Beberapa perubahan yang dilakukan:
- Layout aplikasi dengan card yang lebih clean.
- Warna dan typography yang konsisten.
- Button dan filter dengan active/hover state.
- Tampilan task yang lebih rapi.
- Responsive layout untuk ukuran layar yang lebih kecil.
- Animasi sederhana saat task ditampilkan.

---

## 8. Kriteria Penilaian

Fokus penilaian terletak pada **workflow pengerjaan**, bukan hanya pada
fitur yang berhasil dibuat. Bobot penilaian yang disarankan:

| Kriteria | Bobot | Aspek yang Dinilai |
|---|---|---|
| **Git & GitHub Workflow** | 45% | Apakah terdapat backlog/Issues yang jelas dan ter-assign? Apakah branch `dev` digunakan sebagai staging? Apakah setiap fitur dikerjakan pada `feature/*` masing-masing (bukan bertumpuk pada satu branch)? Apakah Pull Request digunakan untuk seluruh proses merge (tanpa commit langsung ke `main`/`dev`)? Apakah terdapat review/approval sebelum merge? Apakah commit message jelas dan konsisten? |
| **Kelengkapan Fitur** | 25% | Berapa dari 6 fitur wajib yang berhasil diimplementasikan dan berfungsi dengan benar? |
| **Kualitas Kode** | 15% | Kode tersusun rapi dan konsisten gaya penulisannya, tidak terdapat kode mati atau `console.log` sisa debugging, serta penamaan variabel/fungsi jelas. |
| **Kolaborasi Tim** | 10% | Distribusi kontribusi cukup merata antar anggota (dilihat dari commit/Pull Request pada GitHub Insights), dengan progres harian yang tidak menumpuk pada satu atau dua hari terakhir. |
| **Dokumentasi** | 5% | README proyek diperbarui sesuai fitur yang benar-benar telah selesai, dan deskripsi Pull Request bersifat informatif. |

**Indikator workflow yang baik dibandingkan yang kurang baik:**

| Aspek | Baik ✅ | Kurang Baik ❌ |
|---|---|---|
| Backlog | Terdapat Issues per fitur, ter-assign, disertai label/status | Tidak terdapat Issues sama sekali, koordinasi hanya melalui chat |
| Branch | `main` + `dev` + `feature/*` per anggota/fitur | Seluruh anggota bekerja langsung pada `main`, atau satu branch besar dikerjakan bersama-sama |
| Pull Request | Setiap fitur = satu Pull Request, disertai deskripsi dan review | Tidak ada Pull Request, langsung `git push origin main` |
| Commit | Pesan jelas (`feat: ...`, `fix: ...`), granular | Pesan tidak informatif (`update`, `asdf`, `fix fix fix`), atau satu commit besar berisi seluruh fitur |
| Timeline | Commit tersebar sepanjang minggu | Seluruh commit muncul pada hari terakhir |

---

## 9. Checklist Sebelum Pengumpulan

- [x] Pekerjaan dilakukan pada fork repo starter ini, bukan pada repo
      starter secara langsung.
- [x] Branch `main` pada fork kelompok berisi versi final (hasil merge dari
      `dev`).
- [x] Branch `dev` masih tersedia pada fork kelompok (tidak dihapus) sebagai
      bukti histori pengerjaan.
- [x] Seluruh fitur pada bagian 6 telah dikerjakan melalui branch `feature/*`
      masing-masing.
- [x] Terdapat bukti Issues/backlog pada GitHub
- [x] Seluruh merge ke `dev`/`main` dilakukan melalui Pull Request, bukan
      commit langsung.
- [x] README diperbarui apabila terdapat perubahan struktur folder/fitur.
- [x] Proyek dapat dijalankan cukup dengan membuka `src/index.html`.
- [ ] Pull Request pengumpulan tugas dari fork kelompok ke repo starter ini
      sudah diajukan, dengan judul sesuai nama kelompok (misalnya
      `Kelompok 1`).

### Bukti Backlog Project

Berikut merupakan backlog yang digunakan untuk mengatur pembagian dan progres fitur dalam project:
<img width="1184" height="590" alt="Screenshot 2026-09-20 215515" src="https://github.com/user-attachments/assets/f91a4e95-0504-4d2b-b627-b91ad7d8b728" />


