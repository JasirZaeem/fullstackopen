import * as process from "process";

interface ExerciseAnalysis {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: 1 | 2 | 3;
  ratingDescription: string;
  target: number; // Target is fixed to 2
  average: number;
}

const ratingDescriptions = [
  "Need more exercise to reach the target",
  "Not too bad but could be better",
  "Well done! you reached the target",
];

/**
 * Calculates the average time of daily exercise hours and compares
 * it to the target amount of daily hours and returns an analysis
 * @param target Target daily average hours of exercise
 * @param dailyHours List of hours of exercise of each day of the period
 * @return An object with analysis
 */
export const exerciseCalculator = (
  target: number,
  dailyHours: number[]
): ExerciseAnalysis => {
  const periodLength: number = dailyHours.length;
  const [totalHours, trainingDays] = dailyHours.reduce(
    (stats, hours) => [stats[0] + hours, stats[1] + (hours > 0 ? 1 : 0)],
    [0, 0]
  );
  const average = totalHours / periodLength;
  const rating = average >= target ? 3 : average <= target * 0.75 ? 1 : 2;

  return {
    periodLength,
    trainingDays,
    success: rating === 3,
    rating,
    ratingDescription: ratingDescriptions[rating - 1],
    target,
    average,
  };
};

const parseArguments = (
  args: string[]
): { target: number; dailyHours: number[] } => {
  if (args.length < 4) throw new Error("Not enough arguments");

  const target = Number(args[2]);
  const dailyHours = args.slice(3).map(Number);

  if (isNaN(target) || dailyHours.some(isNaN)) {
    throw new Error("Provided values were not numbers!");
  }
  return {
    target,
    dailyHours,
  };
};

if (require.main === module) {
  const { target, dailyHours } = parseArguments(process.argv);
  console.log(exerciseCalculator(target, dailyHours));
}
