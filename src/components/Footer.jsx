export default function Footer() {
  return (
    <footer className="border-t border-gray-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-gray-400">
        <div className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="FitLog"
            className="w-6 h-6 object-contain"
          />
          <span
            className="text-[#ccff00] font-bold"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            FITLOG
          </span>
        </div>
        <p className="text-center md:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}