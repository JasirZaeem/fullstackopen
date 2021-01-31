import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { exerciseCalculator } from "./exerciseCalculator";

const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query?.height);
  const weight = Number(req.query?.weight);

  if (!height || !weight) {
    return res.status(400).json({
      error: "Malformed parameters",
    });
  }

  return res.json({ height, weight, bmi: calculateBmi(height, weight) });
});

app.post("/exercise", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const {
    daily_exercises,
    target,
  }: { daily_exercises: number[]; target: number } = req.body;

  if (target === undefined || daily_exercises === undefined) {
    return res.status(400).json({
      error: "Parameters missing",
    });
  }

  if (target >= 0 && daily_exercises.every((h: number) => h >= 0)) {
    return res.json(exerciseCalculator(target, daily_exercises));
  }

  return res.status(400).json({
    error: "Malformed parameters",
  });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
