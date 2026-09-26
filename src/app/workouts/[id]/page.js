"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Plus, Bookmark } from "lucide-react";
import toast from "react-hot-toast";
import { useFitLog } from "@/components/context/FitLogContext";
import Loading from "@/components/Loading";

export default function WorkoutDetails() {
  const { id } = useParams();
  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToPlan, addToSaved, plan } = useFitLog();

  useEffect(() => {
    fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setWorkout(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <Loading />;
  if (!workout)
    return (
      <p className="text-center py-20 text-gray-400">Workout not found.</p>
    );

  const {
    name,
    image,
    muscleGroups = [],
    equipment = "—",
    difficulty = "—",
    duration = 0,
    caloriesBurned = 0,
    sets = "—",
    reps = "—",
    rating = "—",
    description = "",
    instructions = [],
  } = workout;

  const handleAddPlan = () => {
    if (plan.length >= 5) return toast.error("Plan is full (max 5).");
    const res = addToPlan(workout);
    if (res === "exists") toast.error("Already in plan");
    else if (res === "full") toast.error("Plan is full (max 5).");
    else toast.success("Added to today's plan");
  };

  const handleSave = () => {
    const res = addToSaved(workout);
    if (res === "exists") toast.error("Already saved");
    else toast.success("Saved for later");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 grid md:grid-cols-2 gap-10">
      <img
        src={image}
        alt={name}
        className="rounded-2xl w-full object-cover"
      />

      <div>
        <h1
          className="text-3xl md:text-5xl font-bold uppercase"
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          {name}
        </h1>
        <p className="text-gray-400 mt-3 text-sm md:text-base">{description}</p>

        <div className="flex gap-2 mt-4 flex-wrap">
          {muscleGroups.map((t, i) => (
            <span
              key={i}
              className="bg-[#ccff00] text-black text-xs font-bold px-3 py-1 rounded-full"
            >
              {String(t).toUpperCase()}
            </span>
          ))}
        </div>

        <div className="bg-[#111] rounded-2xl mt-6 divide-y divide-gray-800 border border-gray-800">
          {[
            ["EQUIPMENT", equipment],
            ["DIFFICULTY", difficulty],
            ["SETS", sets],
            ["REPS", reps],
            ["DURATION", `${duration} min`],
            ["CALORIES", `${caloriesBurned} kcal`],
            ["RATING", rating],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between px-4 py-3 text-sm">
              <span className="text-gray-400">{k}</span>
              <span>{v}</span>
            </div>
          ))}
        </div>

        {instructions.length > 0 && (
          <>
            <h3
              className="mt-8 font-bold uppercase"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              Instructions
            </h3>
            <ol className="list-decimal list-inside text-gray-300 mt-3 space-y-2 text-sm">
              {instructions.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </>
        )}

        <div className="flex flex-wrap gap-3 mt-8">
          <button
            onClick={handleAddPlan}
            className="flex items-center gap-2 bg-[#ccff00] text-black font-bold px-6 py-3 rounded-full hover:opacity-90"
          >
            <Plus size={18} /> Add to today&apos;s plan
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 border border-gray-600 px-6 py-3 rounded-full hover:border-[#ccff00]"
          >
            <Bookmark size={18} /> Save for later
          </button>
        </div>
      </div>
    </div>
  );
}