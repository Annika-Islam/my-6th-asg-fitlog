"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useFitLog } from "./context/FitLogContext";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = useFitLog();

  const linkClass = (path) =>
    `px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm transition ${
      pathname === path
        ? "bg-[#ccff00] text-black font-semibold"
        : "text-gray-300 hover:text-white"
    }`;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-8 py-3 sm:py-4 flex items-center justify-between gap-2">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <img
            src="/logo.png"
            alt="FitLog"
            className="w-6 h-6 sm:w-8 sm:h-8 object-contain"
          />
          <span
            className="text-[#ccff00] font-bold text-sm sm:text-lg"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            FITLOG
          </span>
        </Link>

        {/* Nav links — now visible on all sizes */}
        <div className="flex gap-0.5 sm:gap-1 bg-[#111] rounded-full p-0.5 sm:p-1">
          <Link href="/" className={linkClass("/")}>
            Workouts
          </Link>
          <Link href="/my-plan" className={linkClass("/my-plan")}>
            My Plan
          </Link>
        </div>

        {/* Badges */}
        <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm shrink-0">
          <Link
            href="/my-plan"
            className="flex items-center gap-1 sm:gap-2 text-gray-300"
          >
            <span className="hidden sm:inline">Plan</span>
            <span className="bg-[#ccff00] text-black text-[10px] sm:text-xs font-bold w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center rounded-full">
              {plan.length}
            </span>
          </Link>
          <Link
            href="/my-plan"
            className="flex items-center gap-1 sm:gap-2 text-gray-300"
          >
            <span className="hidden sm:inline">Saved</span>
            <span className="border border-gray-500 text-[10px] sm:text-xs font-bold w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center rounded-full">
              {saved.length}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}