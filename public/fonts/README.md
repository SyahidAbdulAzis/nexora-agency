# Custom Fonts

Letakkan file font .woff Anda di folder ini.

**Cara pakai:**
1. Copy file .woff ke folder ini
2. Rename jadi `NexoraDisplay.woff` **ATAU** edit `src/fonts.css` dan ganti nama file di `url('/fonts/NamaFileKamu.woff')`
3. Jika font punya nama internal berbeda, Anda bisa tetap pakai `font-family: 'Nexora Display'` - itu hanya nama yang kita definisikan di CSS

**Contoh multiple weights:**
- NexoraDisplay-Regular.woff (weight 400)
- NexoraDisplay-Bold.woff (weight 700)

Lalu tambahkan @font-face di `src/fonts.css` untuk masing-masing.
