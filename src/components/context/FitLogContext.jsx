"use client";
import { createContext, useContext, useEffect, useState } from "react";

const FitLogContext = createContext();

export function FitLogProvider({ children }) {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);

  
  useEffect(() => {
    const p = localStorage.getItem("fitlog_plan");
    const s = localStorage.getItem("fitlog_saved");
    if (p) setPlan(JSON.parse(p));
    if (s) setSaved(JSON.parse(s));
  }, []);

 
  useEffect(() => {
    localStorage.setItem("fitlog_plan", JSON.stringify(plan));
  }, [plan]);

  useEffect(() => {
    localStorage.setItem("fitlog_saved", JSON.stringify(saved));
  }, [saved]);

  const addToPlan = (workout) => {
    if (plan.length >= 5) return "full";
    if (plan.find((w) => w.id === workout.id)) return "exists";
    setPlan([...plan, workout]);
    return true;
  };

  const addToSaved = (workout) => {
    if (saved.find((w) => w.id === workout.id)) return "exists";
    setSaved([...saved, workout]);
    return true;
  };

  const removeFromPlan = (id) => setPlan(plan.filter((w) => w.id !== id));
  const removeFromSaved = (id) => setSaved(saved.filter((w) => w.id !== id));
  
  const markDone = (id) => {
    setPlan(plan.map((w) => (w.id === id ? { ...w, done: true } : w)));
  };

  return (
    <FitLogContext.Provider
      value={{
        plan,
        saved,
        addToPlan,
        addToSaved,
        removeFromPlan,
        removeFromSaved,
        markDone,
      }}
    >
      {children}
    </FitLogContext.Provider>
  );
}

export const useFitLog = () => useContext(FitLogContext);