"use client";
import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import WorkoutCard from "@/components/WorkoutCard";
import Loading from "@/components/Loading";

export default function HomePage() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.abcz.workers.dev/api/fitlog")
      .then((res) => res.json())
      .then((data) => {
        setWorkouts(data.data || data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="px-6 py-10 max-w-7xl mx-auto">
      <Hero />

      <section id="library" className="mt-16">
        <h2 className="text-4xl font-bold" style={{ fontFamily: "var(--font-oswald)" }}>
          THE LIBRARY
        </h2>
        <p className="text-gray-400 mt-1">Twelve lifts covering every major muscle group.</p>

        {loading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {workouts.map((w) => (
              <WorkoutCard key={w.id} workout={w} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}