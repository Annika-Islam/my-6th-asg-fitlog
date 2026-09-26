"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Clock, Flame, Star, Check, X } from "lucide-react";
import toast from "react-hot-toast";
import { useFitLog } from "@/components/context/FitLogContext";

export default function MyPlanPage() {
  const [tab, setTab] = useState("plan");
  const [sortBy, setSortBy] = useState("duration");
  const [loading, setLoading] = useState(true);
  const { plan, saved, removeFromPlan, removeFromSaved, markDone } = useFitLog();

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  const list = tab === "plan" ? plan : saved;

  const sorted = [...list].sort((a, b) => {
    if (sortBy === "duration") return (a.duration || 0) - (b.duration || 0);
    if (sortBy === "calories")
      return (a.caloriesBurned || 0) - (b.caloriesBurned || 0);
    if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
    return 0;
  });

  const totalMinutes = plan.reduce((s, w) => s + (w.duration || 0), 0);
  const totalCalories = plan.reduce(
    (s, w) => s + (w.caloriesBurned || 0),
    0
  );

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
      <h1
        className="text-4xl md:text-5xl font-bold"
        style={{ fontFamily: "var(--font-oswald)" }}
      >
        MY PLAN
      </h1>
      <p className="text-gray-400 mt-2 text-sm md:text-base">
        Cap of five lifts for today. Finish them, then load more.
      </p>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-10 h-10 border-4 border-[#ccff00] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-400 mt-4 text-sm">Loading workouts…</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-4 mt-8 bg-[#111] rounded-2xl p-6 border border-gray-800">
            {[
              ["Exercises", plan.length],
              ["Minutes", totalMinutes],
              ["Calories", totalCalories],
            ].map(([label, val]) => (
              <div key={label}>
                <p className="text-gray-400 text-xs md:text-sm">{label}</p>
                <p
                  className="text-2xl md:text-4xl font-bold text-[#ccff00] mt-1"
                  style={{ fontFamily: "var(--font-oswald)" }}
                >
                  {val}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-8">
            <div className="flex gap-1 bg-[#111] p-1 rounded-full">
              <button
                onClick={() => setTab("plan")}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition ${
                  tab === "plan" ? "bg-[#ccff00] text-black" : "text-gray-400"
                }`}
              >
                Today&apos;s Plan
              </button>
              <button
                onClick={() => setTab("saved")}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition ${
                  tab === "saved" ? "bg-[#ccff00] text-black" : "text-gray-400"
                }`}
              >
                Saved
              </button>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-400">Sort By</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#111] border border-gray-700 rounded-lg px-3 py-1.5 text-white"
              >
                <option value="duration">Duration</option>
                <option value="calories">Calories</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>

          {sorted.length === 0 ? (
            <div className="border border-dashed border-gray-700 rounded-2xl py-20 text-center mt-8">
              <h3
                className="text-2xl font-bold"
                style={{ fontFamily: "var(--font-oswald)" }}
              >
                NOTHING HERE YET
              </h3>
              <p className="text-gray-400 mt-2 text-sm">
                Browse the library and add a lift to get today moving.
              </p>
              <Link
                href="/"
                className="inline-block bg-[#ccff00] text-black font-bold px-6 py-3 rounded-full mt-6"
              >
                Go to workouts
              </Link>
            </div>
          ) : (
            <div className="space-y-4 mt-8">
              {sorted.map((w) => {
                const id = w.id;
                const name = w.name;
                const img = w.image;
                const eq = w.equipment || "—";
                const duration = w.duration || 0;
                const calories = w.caloriesBurned || 0;
                const rating = w.rating || 0;

                return (
                  <div
                    key={id}
                    className="bg-[#111] border border-gray-800 rounded-2xl p-4 flex flex-col md:flex-row items-center gap-4"
                  >
                    <img
                      src={img}
                      alt={name}
                      className="w-full md:w-28 h-20 object-cover rounded-xl"
                    />
                    <div className="flex-1 text-center md:text-left">
                      <h3
                        className="font-bold text-lg"
                        style={{ fontFamily: "var(--font-oswald)" }}
                      >
                        {String(name).toUpperCase()}
                      </h3>
                      <p className="text-gray-400 text-xs mt-1">{eq}</p>
                      <div className="flex justify-center md:justify-start gap-4 text-xs text-gray-400 mt-2">
                        <span className="flex items-center gap-1">
                          <Clock size={14} /> {duration} min
                        </span>
                        <span className="flex items-center gap-1">
                          <Flame size={14} /> {calories} kcal
                        </span>
                        <span className="flex items-center gap-1">
                          <Star size={14} /> {rating}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap justify-center">
                      <Link
                        href={`/workouts/${id}`}
                        className="border border-gray-600 px-4 py-2 rounded-full text-xs hover:border-[#ccff00] transition"
                      >
                        View Details
                      </Link>

                      {tab === "plan" && (
                        <button
                          onClick={() => {
                            markDone(id);
                            toast.success(`${name} marked as done`);
                          }}
                          className="flex items-center gap-1 bg-[#ccff00] text-black font-semibold px-4 py-2 rounded-full text-xs"
                        >
                          <Check size={14} /> Mark as Done
                        </button>
                      )}

                      <button
                        onClick={() => {
                          if (tab === "plan") removeFromPlan(id);
                          else removeFromSaved(id);
                          toast.success("Removed");
                        }}
                        className="text-gray-400 hover:text-red-400 p-2"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}