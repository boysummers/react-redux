# Diary App – Praktikum Redux Toolkit

Aplikasi buku harian sederhana menggunakan Expo Router, React Native, TypeScript, dan Redux Toolkit.

## Menjalankan aplikasi

```bash
npm install
npx expo start --clear
```

## Struktur state pada aplikasi

### 1. Local state (useState)
Local state adalah state yang dimiliki oleh satu komponen/screen. Pada form Create dan Edit, nilai sementara `title`, `body`, dan `mood` disimpan menggunakan `useState`. Nilai input tidak perlu langsung dimasukkan ke Redux karena perubahan setiap karakter hanya dibutuhkan oleh form tersebut. Setelah tombol Simpan ditekan dan validasi berhasil, komponen mengirim action ke Redux untuk memperbarui data diary bersama.

### 2. Global Redux state
Global state adalah state aplikasi yang dikelola terpusat di Redux Store dan dapat diakses oleh banyak screen. Pada aplikasi ini, `state.diary.entries` menyimpan daftar diary. Home, Favorites, Detail, dan Edit membaca data yang sama melalui `useAppSelector`, sedangkan perubahan dilakukan melalui `useAppDispatch`. Action menjelaskan kejadian/perintah, reducer menentukan bagaimana state berubah, `dispatch(action)` mengirim action ke store, dan selector mengambil bagian state yang dibutuhkan komponen.

### 3. Persistent database
Persistent database adalah penyimpanan permanen, misalnya SQLite, MySQL, atau PostgreSQL. Data disimpan di luar memori proses aplikasi sehingga dapat tetap tersedia setelah aplikasi ditutup atau perangkat dimulai ulang. Redux Store pada project ini hanya menyimpan state di memori; belum ada integrasi database atau persistence middleware. Karena itu, data perubahan Redux akan kembali ke initial state ketika aplikasi dimulai ulang. Redux tidak menggantikan database.

## Fitur praktikum

- Tambah, edit, hapus diary, dan ubah status favorite.
- Filter diary berdasarkan mood di Home.
- Statistik Total Diary dan Total Favorite.
- Kosongkan semua favorite tanpa menghapus diary.
- Validasi judul minimal 3 karakter dan isi diary wajib diisi.
- Empty state informatif pada Home dan Favorites.

## Diskusi konsep Redux

- **Mengapa isi TextInput tidak harus disimpan di Redux?** Karena nilai input sementara biasanya hanya dipakai oleh form itu sendiri. `useState` lebih sederhana dan menghindari dispatch untuk setiap ketikan. Redux digunakan ketika data perlu dibagikan atau dikelola lintas screen.
- **Perbedaan `dispatch(action)` dengan `setState()`:** `setState()` memperbarui state lokal komponen; `dispatch(action)` mengirim action ke Redux Store agar reducer memperbarui global state.
- **Fungsi reducer:** menentukan perubahan state berdasarkan state saat ini dan action yang diterima.
- **Mengapa Redux Store disebut single source of truth?** Karena satu sumber state global menjadi acuan bersama seluruh komponen yang terhubung.
- **Apa yang terjadi jika dua screen membaca state diary yang sama?** Keduanya menerima nilai dari Store yang sama dan akan memperlihatkan perubahan terbaru setelah Store diperbarui.
- **Perbedaan action dan reducer:** action adalah deskripsi kejadian/perintah beserta payload; reducer adalah fungsi/aturan yang memproses action untuk menghasilkan perubahan state.
- **Mengapa Redux Toolkit dibanding Redux klasik?** Redux Toolkit mengurangi boilerplate dan menyediakan `configureStore`, `createSlice`, integrasi Immer, serta konfigurasi default yang lebih aman dan praktis.
- **Apakah Redux dapat menggantikan MySQL?** Tidak. Redux mengelola state aplikasi di sisi client, sedangkan MySQL adalah database persisten untuk menyimpan data secara permanen dan dapat diakses melalui backend.
- **Kapan Context API cukup dan kapan Redux lebih sesuai?** Context API cukup untuk state global sederhana seperti tema atau preferensi. Redux lebih sesuai untuk state kompleks, banyak screen, banyak aksi, dan alur perubahan yang perlu terstruktur serta mudah diuji.
- **Keuntungan typed hooks pada TypeScript:** `useAppDispatch` dan `useAppSelector` memberi inferensi tipe pada dispatch, action, dan RootState sehingga mengurangi kesalahan tipe dan kebutuhan casting manual.

## Catatan implementasi

Aplikasi ini menggunakan Redux Toolkit dengan `configureStore` dan `createSlice`. Data contoh disimpan dalam `initialState` untuk keperluan praktikum.
