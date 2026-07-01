export function StatisticCard({ badge, alt, count, label }) {
  return (
    <div className="flex items-center gap-3">
      {/* Badge image */}
      <img
        src={badge}
        alt={alt}
        className="w-14 h-14 object-contain shrink-0"
        loading="lazy"
      />

      {/* Angka + label */}
      <div>
        <p className="text-2xl font-bold text-gray-900 leading-none mb-0.5">
          {count > 0 ? count.toLocaleString('id-ID') : '—'}
        </p>
        <p className="text-[11px] text-gray-500 leading-tight whitespace-pre-line">
          {label}
        </p>
      </div>
    </div>
  );
}
