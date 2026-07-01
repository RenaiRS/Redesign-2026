// ─────────────────────────────────────────────────
// Data Statis untuk Halaman Homepage
// ─────────────────────────────────────────────────
// Saat integrasi Backend, ganti data ini dengan
// response dari API endpoint yang sesuai.
// ─────────────────────────────────────────────────

/** Manfaat / Benefit IGRS — Section Tentang IGRS */
export const IGRS_BENEFITS = [
  {
    id: 'benefit-1',
    icon: 'shield',
    title: 'Perlindungan Anak',
    description:
      'Membantu orang tua memilihkan game yang sesuai dengan usia dan kematangan emosional anak mereka.',
  },
  {
    id: 'benefit-2',
    icon: 'info',
    title: 'Informasi Transparan',
    description:
      'Menyediakan informasi lengkap mengenai konten game sehingga pengguna dapat membuat keputusan yang tepat.',
  },
  {
    id: 'benefit-3',
    icon: 'star',
    title: 'Standar Nasional',
    description:
      'Mengadopsi standar rating nasional yang konsisten dan dapat dipercaya oleh seluruh ekosistem industri game Indonesia.',
  },
];

/** Statistik IGRS — Section Tentang IGRS */
export const IGRS_STATS = [
  { id: 'stat-1', value: '500+', label: 'Game Terdaftar' },
  { id: 'stat-2', value: '5', label: 'Kategori Rating' },
  { id: 'stat-3', value: '9', label: 'Deskriptor Konten' },
  { id: 'stat-4', value: '2024', label: 'Tahun Berdiri' },
];

/** Artikel Blog & Pengumuman */
export const BLOG_POSTS = [
  {
    id: 'blog-1',
    title: 'Memahami Rating Game untuk Melindungi Anak',
    excerpt:
      'Panduan lengkap bagi orang tua tentang cara membaca dan memahami sistem rating game agar dapat mendampingi anak bermain dengan bijak.',
    category: 'Panduan',
    author: 'Tim IGRS',
    date: '2024-06-15',
    readTime: '5 menit',
    thumbnail: '',
    slug: 'memahami-rating-game',
  },
  {
    id: 'blog-2',
    title: 'Game Edukatif Terbaik untuk Anak Usia 7–13 Tahun',
    excerpt:
      'Rekomendasi game edukatif yang sudah tersertifikasi IGRS dan aman dimainkan oleh anak-anak dalam pengawasan orang tua.',
    category: 'Rekomendasi',
    author: 'Tim IGRS',
    date: '2024-06-10',
    readTime: '4 menit',
    thumbnail: '',
    slug: 'game-edukatif-anak',
  },
  {
    id: 'blog-3',
    title: 'Dampak Game Kekerasan terhadap Perkembangan Remaja',
    excerpt:
      'Tinjauan ilmiah mengenai pengaruh konten kekerasan dalam game terhadap perkembangan psikologis dan perilaku remaja.',
    category: 'Edukasi',
    author: 'Tim IGRS',
    date: '2024-06-05',
    readTime: '7 menit',
    thumbnail: '',
    slug: 'dampak-game-kekerasan',
  },
];

/** Kategori Konten (Deskriptor) — Section Panduan Orang Tua */
export const CONTENT_CATEGORIES = [
  {
    id: 'cat-kekerasan',
    label: 'Kekerasan',
    description: 'Adegan kekerasan fisik atau verbal',
    icon: '/images/icons/igrs kekerasan.png',
    color: 'bg-red-50 dark:bg-red-950/30',
    borderColor: 'border-red-200 dark:border-red-800/40',
    iconBg: 'bg-red-100 dark:bg-red-900/40',
  },
  {
    id: 'cat-darah',
    label: 'Darah',
    description: 'Adegan berdarah atau mengerikan',
    icon: '/images/icons/igrs darah.png',
    color: 'bg-orange-50 dark:bg-orange-950/30',
    borderColor: 'border-orange-200 dark:border-orange-800/40',
    iconBg: 'bg-orange-100 dark:bg-orange-900/40',
  },
  {
    id: 'cat-horror',
    label: 'Horor',
    description: 'Konten menakutkan atau seram',
    icon: '/images/icons/igrs horror.png',
    color: 'bg-purple-50 dark:bg-purple-950/30',
    borderColor: 'border-purple-200 dark:border-purple-800/40',
    iconBg: 'bg-purple-100 dark:bg-purple-900/40',
  },
  {
    id: 'cat-bahasa',
    label: 'Bahasa Kasar',
    description: 'Umpatan atau kata-kata kasar',
    icon: '/images/icons/igrs bahasa kasar.png',
    color: 'bg-yellow-50 dark:bg-yellow-950/30',
    borderColor: 'border-yellow-200 dark:border-yellow-800/40',
    iconBg: 'bg-yellow-100 dark:bg-yellow-900/40',
  },
  {
    id: 'cat-porno',
    label: 'Seksualitas',
    description: 'Konten seksual eksplisit',
    icon: '/images/icons/igrs porno.png',
    color: 'bg-pink-50 dark:bg-pink-950/30',
    borderColor: 'border-pink-200 dark:border-pink-800/40',
    iconBg: 'bg-pink-100 dark:bg-pink-900/40',
  },
  {
    id: 'cat-judi',
    label: 'Perjudian',
    description: 'Mekanisme taruhan atau gacha',
    icon: '/images/icons/igrs judi.png',
    color: 'bg-blue-50 dark:bg-blue-950/30',
    borderColor: 'border-blue-200 dark:border-blue-800/40',
    iconBg: 'bg-blue-100 dark:bg-blue-900/40',
  },
  {
    id: 'cat-rokok',
    label: 'Narkoba & Rokok',
    description: 'Penggunaan narkoba, alkohol, atau rokok',
    icon: '/images/icons/igrs rokok.png',
    color: 'bg-gray-50 dark:bg-gray-950/30',
    borderColor: 'border-gray-200 dark:border-gray-800/40',
    iconBg: 'bg-gray-100 dark:bg-gray-900/40',
  },
  {
    id: 'cat-online',
    label: 'Interaksi Online',
    description: 'Fitur multiplayer atau komunitas online',
    icon: '/images/icons/igrs kekerasan daring.png',
    color: 'bg-teal-50 dark:bg-teal-950/30',
    borderColor: 'border-teal-200 dark:border-teal-800/40',
    iconBg: 'bg-teal-100 dark:bg-teal-900/40',
  },
];

/** IDs game yang muncul di hero cover collage */
export const HERO_COVER_GAME_IDS = [
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890', // Resident Evil 4
  'b2c3d4e5-f6a7-8901-bcde-f12345678901', // Mobile Legends
  'c3d4e5f6-a7b8-9012-cdef-123456789012', // Valorant
  'd4e5f6a7-b8c9-0123-defa-234567890123', // Super Mario Odyssey
  'e5f6a7b8-c9d0-1234-efab-345678901234', // The Witcher 3
  'f6a7b8c9-d0e1-2345-fabc-456789012345', // Minecraft
];

/** IDs game yang muncul di Trending Section */
export const TRENDING_GAME_IDS = [
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'b2c3d4e5-f6a7-8901-bcde-f12345678901',
  'c3d4e5f6-a7b8-9012-cdef-123456789012',
  'd4e5f6a7-b8c9-0123-defa-234567890123',
  'e5f6a7b8-c9d0-1234-efab-345678901234',
];

/** Nav links Navbar */
export const NAV_LINKS = [
  { label: 'Beranda', path: '/' },
  { label: 'Game', path: '/games' },
  { label: 'Informasi Rating', path: '/rating-info' },
  { label: 'Konsultasi Adiksi', path: '/troubleshoot' },
];

/** Footer links */
export const FOOTER_LINKS = {
  layanan: [
    { label: 'Direktori Game', path: '/games' },
    { label: 'Informasi Rating', path: '/rating-info' },
    { label: 'Konsultasi Adiksi', path: '/troubleshoot' },
    { label: 'Panduan Orang Tua', path: '/rating-info' },
  ],
  informasi: [
    { label: 'Tentang IGRS', path: '/#tentang' },
    { label: 'Blog & Artikel', path: '/#blog' },
    { label: 'Pengumuman', path: '/#blog' },
    { label: 'Daftar sebagai Developer', path: '/login' },
  ],
  kontak: [
    { label: 'igrs@kemendikbud.go.id', path: 'mailto:igrs@kemendikbud.go.id', external: true },
    { label: 'Instagram @igrs_id', path: '#', external: true },
    { label: 'Twitter @igrs_id', path: '#', external: true },
  ],
};

/** Cover game images untuk hero collage — pasangkan cover file ke game title */
export const COVER_IMAGES = {
  'Resident Evil 4 Remake': '/images/games/Resident_Evil_4_remake_cover_art.jpg',
  'Mobile Legends: Bang Bang': '/images/games/PUBG.jpg',
  'Valorant': '/images/games/free fire.jpg',
  'Super Mario Odyssey': '/images/games/wario.png',
  'The Witcher 3: Wild Hunt': '/images/games/cyberpunk.jpeg',
  'Minecraft': '/images/games/Terraria Community Forums.jpeg',
  'Grand Theft Auto V': '/images/games/gtav.jpeg',
  'PUBG: Battlegrounds': '/images/games/PUBG.jpg',
  'Fortnite': '/images/games/fortnite.png',
  'Genshin Impact': '/images/games/GENSHIN.jpeg',
  'Cyberpunk 2077': '/images/games/cyberpunk.jpeg',
  'God of War': '/images/games/godofwarr.jpeg',
  'Fall Guys': '/images/games/Fall Guys - PS4 & PS5 Games _ PlayStation.jpeg',
  'Persona 5': '/images/games/P5.png',
  'NBA 2K17': '/images/games/nba2k17.png',
  'Yakuza': '/images/games/YAKUZALAD.jpeg',
  'Subway Surfers': '/images/games/SUBWAYSURFERS.jpeg',
  'Free Fire': '/images/games/free fire.jpg',
  'Dragon City': '/images/games/dragon city.jpg',
  'Pokemon GO': '/images/games/pokemongo.jpeg',
  'Fruit Ninja': '/images/games/fruitninja.jpeg',
  'Football Manager 12': '/images/games/fm12.png',
  'Outlast': '/images/games/outlast.png',
  'GTA 6': '/images/games/GTA6 COVERR.jpg',
};
