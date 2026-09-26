# FitLog — Workout Library

This is my 6th assignment project. It's a workout library web app where you can look at different exercises, add them to your plan for the day, or save them for later.

Live site: https://my-6th-asg-fitlog.vercel.app

---

## What it does

The app shows 12 workouts loaded from an API. Each one has a picture, muscle group tags, equipment name, how long it takes, how many calories it burns, and a rating.

Click any workout and you go to a details page. There you can see the full info, step by step instructions, and two buttons — one to add it to today's plan, one to save it for later.

I made the design dark themed because it fits the gym vibe. It works fine on phone, tablet, and desktop.

---

## Things I used

- Next.js 16 with App Router
- React 19
- Tailwind CSS v4 for styling
- React Context API to keep the plan and saved lists in one place
- React Hot Toast for the little popup messages
- Lucide React for icons
- localStorage so the plan doesn't disappear when I refresh the page

---

## Main features

1. Workout library — 12 workouts shown in a grid with all their info
2. Details page — big image on the left, specs and instructions on the right
3. Add to today's plan — I capped it at 5 lifts per day like the design said
4. Save for later — a separate list you can check from My Plan page
5. Search — filter workouts by name or muscle group like "chest" or "legs"
6. Sort — on My Plan page you can sort by duration, calories, or rating
7. Toasts — small messages pop up when you add, save, remove, or mark done
8. 404 and loading — custom 404 page and a spinner while data loads

---

## How to run it

Clone the repo, then:

```
npm install
npm run dev
```

Open http://localhost:3000

---

## API I used

- All workouts: https://api.abcz.workers.dev/api/fitlog
- Single workout: https://api.abcz.workers.dev/api/fitlog/:id

---

## Links

- Live: https://my-6th-asg-fitlog.vercel.app
- GitHub: https://github.com/Annika-Islam/my-6th-asg-fitlog

---

## License

MIT © 2026 Annika Islam