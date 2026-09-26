import { Dumbbell } from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-[#111] rounded-3xl p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
      <div>
        <p className="text-[#ccff00] text-xs md:text-sm font-bold tracking-[0.2em]">
          WORKOUT LIBRARY
        </p>
        <h1 className="text-4xl md:text-6xl font-bold mt-4 leading-[1.05]">
          Train with intent. <br /> Log every set.
        </h1>
        <p className="text-gray-400 mt-5 max-w-lg text-sm md:text-base">
          FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into
          today&apos;s plan, and watch the week&apos;s work add up.
        </p>
        <a
          href="#library"
          className="inline-flex items-center gap-2 bg-[#ccff00] text-black font-bold px-6 py-3 rounded-full mt-7 hover:opacity-90 transition"
        >
          <Dumbbell size={18} /> BROWSE WORKOUTS
        </a>
      </div>

      <div className="flex justify-center md:justify-end">
        <img
          src="/banner.png"
          alt="hero"
          className="rounded-2xl w-full max-w-md object-cover"
        />
      </div>
    </section>
  );
}