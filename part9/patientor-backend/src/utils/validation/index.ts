import { invalidOrMissingMessage, ValidationError } from "../errors";
import { Gender, Patient, UnregisteredPatient } from "../../types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseDateString = (date: unknown): string => {
  // Date must be : String
  if (!date || !isString(date)) {
    throw new ValidationError(invalidOrMissingMessage("Date", date));
  }

  // Date must be : YYYY-MM-DD
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    throw new ValidationError(`Invalid date format in ${date}`);
  }

  // Date must be : Valid date
  if (isNaN(Date.parse(date))) {
    throw new ValidationError(`Invalid date ${date}`);
  }

  return date;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (gender: any): gender is Gender => {
  return Object.values(Gender).includes(gender);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types
export const parseUnregisteredPatient = (patient: any): UnregisteredPatient => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { name, dateOfBirth, ssn, gender, occupation } = patient ?? {};

  if (!name || !isString(name)) {
    throw new ValidationError(invalidOrMissingMessage("Name", name));
  }

  if (!ssn || !isString(ssn)) {
    throw new ValidationError(invalidOrMissingMessage("SSN", ssn));
  }

  if (!occupation || !isString(occupation)) {
    throw new ValidationError(
      invalidOrMissingMessage("Occupation", occupation)
    );
  }

  if (!gender || !isGender(gender)) {
    throw new ValidationError(invalidOrMissingMessage("Gender", gender));
  }

  return {
    name,
    dateOfBirth: parseDateString(dateOfBirth),
    ssn,
    gender,
    occupation,
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types
export const parsePatient = (patient: any): Patient => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { id } = patient ?? {};

  if (!id || !isString(id)) {
    throw new ValidationError(invalidOrMissingMessage("ID", id));
  }

  return {
    id,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    ...parseUnregisteredPatient(patient),
  };
};
