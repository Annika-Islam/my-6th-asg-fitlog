import Link from "next/link";
import { Clock, Flame, Star } from "lucide-react";

export default function WorkoutCard({ workout }) {
  const id = workout.id;
  const name = workout.name;
  const image = workout.image;
  const tags = workout.muscleGroups || [];
  const equipment = workout.equipment || "—";
  const duration = workout.duration || 0;
  const calories = workout.caloriesBurned || 0;
  const rating = workout.rating || 0;

  return (
    <Link
      href={`/workouts/${id}`}
      className="bg-[#111] rounded-2xl overflow-hidden border border-gray-800 hover:border-[#ccff00]/60 transition block group"
    >
      <div className="overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-52 object-cover group-hover:scale-105 transition duration-500"
        />
      </div>

      <div className="p-5">
        <div className="flex flex-wrap gap-2">
          {tags.slice(0, 3).map((t, i) => (
            <span
              key={i}
              className="bg-[#ccff00] text-black text-[10px] font-bold px-3 py-1 rounded-full tracking-wider"
            >
              {String(t).toUpperCase()}
            </span>
          ))}
        </div>

        <h3
          className="font-bold text-lg mt-3 uppercase"
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          {name}
        </h3>
        <p className="text-gray-500 text-xs mt-1">{equipment}</p>

        <div className="flex gap-4 text-xs text-gray-400 mt-4">
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
    </Link>
  );
}