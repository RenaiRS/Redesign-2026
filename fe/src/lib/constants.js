
export const RATING_OPTIONS = ['SU', '7+', '13+', '15+', '18+']

export const PLATFORM_LIST = [
  'PC',
  'PlayStation',
  'Xbox',
  'Nintendo Switch',
  'Android',
  'iOS',
]

export const CATEGORIES = [
  { label: 'Horor', value: 'Horror', description: 'Konten menakutkan / seram' },
  {
    label: 'Interaksi Online',
    value: 'Online Interactions',
    description: 'Fitur multiplayer / komunitas online',
  },
  {
    label: 'Penampilan Karakter',
    value: 'Character Appearance',
    description: 'Visual karakter / pakaian provokatif',
  },
  { label: 'Kekerasan', value: 'Violence', description: 'Adegan kekerasan fisik / verbal' },
  {
    label: 'Seksualitas / Pornografi',
    value: 'Sexuality/Pornography',
    description: 'Konten seksual eksplisit',
  },
  { label: 'Narkoba', value: 'Drugs', description: 'Penggunaan narkoba / alkohol / rokok' },
  { label: 'Darah', value: 'Blood', description: 'Adegan berdarah / mengerikan' },
  { label: 'Bahasa Kasar', value: 'Language', description: 'Umpatan / kata-kata kasar' },
  { label: 'Perjudian', value: 'Gambling', description: 'Mekanisme taruhan / gacha' },
]

export const RATING_DISPLAY = [
  { rating: 'SU', color: 'text-green-600 dark:text-green-400', bg: 'bg-green-100 dark:bg-green-900/30', text: 'Semua Umur' },
  { rating: '7+', color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-100 dark:bg-blue-900/30', text: '7 Tahun ke Atas' },
  { rating: '13+', color: 'text-yellow-600 dark:text-yellow-400', bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: '13 Tahun ke Atas' },
  { rating: '15+', color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-100 dark:bg-orange-900/30', text: '15 Tahun ke Atas' },
  { rating: '18+', color: 'text-red-600 dark:text-red-400', bg: 'bg-red-100 dark:bg-red-900/30', text: '18 Tahun ke Atas' },
]

export const STATUS_OPTIONS = [
  { label: 'Published', value: 'published' },
  { label: 'Draft', value: 'draft' },
]
