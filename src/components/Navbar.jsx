 "use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useFitLog } from "./context/FitLogContext";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = useFitLog();

  const linkClass = (path) =>
    `px-4 py-1.5 rounded-full text-sm transition ${
      pathname === path
        ? "bg-[#ccff00] text-black font-semibold"
        : "text-gray-300 hover:text-white"
    }`;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="FitLog"
            className="w-8 h-8 object-contain"
          />
          <span
            className="text-[#ccff00] font-bold text-lg"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            FITLOG
          </span>
        </Link>

        <div className="hidden sm:flex gap-1 bg-[#111] rounded-full p-1">
          <Link href="/" className={linkClass("/")}>
            Workouts
          </Link>
          <Link href="/my-plan" className={linkClass("/my-plan")}>
            My Plan
          </Link>
        </div>

        <div className="flex items-center gap-3 text-sm">
          <Link
            href="/my-plan"
            className="flex items-center gap-2 text-gray-300"
          >
            Plan
            <span className="bg-[#ccff00] text-black text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full">
              {plan.length}
            </span>
          </Link>
          <Link
            href="/my-plan"
            className="flex items-center gap-2 text-gray-300"
          >
            Saved
            <span className="border border-gray-500 text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full">
              {saved.length}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}