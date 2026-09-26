import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-6">
      <h1
        className="text-6xl md:text-8xl font-bold text-[#ccff00]"
        style={{ fontFamily: "var(--font-oswald)" }}
      >
        404
      </h1>
      <p className="text-gray-400 mt-4">
        This page doesn&apos;t exist. Let&apos;s get you back to training.
      </p>
      <Link
        href="/"
        className="bg-[#ccff00] text-black font-bold px-6 py-3 rounded-full mt-6"
      >
        Back to Home
      </Link>
    </div>
  );
}