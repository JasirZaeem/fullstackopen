type bmiCategory = "Underweight" | "Normal weight" | "Overweight" | "Obese";

/**
 * Find bmi given height and weight
 * @param  height The height in centimeters
 * @param  weight The weight in kilograms
 * @return The calculated bmi
 */
export const calculateBmi = (height: number, weight: number): bmiCategory => {
  const bmi: number = weight / ((height / 100) * (height / 100));
  if (bmi <= 18.5) {
    return "Underweight";
  } else if (bmi <= 25) {
    return "Normal weight";
  } else if (bmi <= 30) {
    return "Overweight";
  } else {
    return "Obese";
  }
};

const parseArguments = (args: string[]): { height: number; weight: number } => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  const height = Number(args[2]);
  const weight = Number(args[3]);

  if (isNaN(height) || isNaN(weight)) {
    throw new Error("Provided values were not numbers!");
  }
  return {
    height,
    weight,
  };
};

if (require.main === module) {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
}
