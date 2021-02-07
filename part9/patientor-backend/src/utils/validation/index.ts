import { invalidOrMissingMessage, ValidationError } from "../errors";
import {
  BaseEntry,
  Entry,
  EntryTypes,
  Gender,
  HealthCheckEntry,
  HealthCheckRating,
  HospitalEntry,
  OccupationalHealthcareEntry,
  UnregisteredPatient,
} from "../../types";

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

  // Parsed date later

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
export const parseBaseEntry = (entry: any): BaseEntry => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { id, description, date, specialist, diagnosisCodes } = entry;

  if (!id || !isString(id)) {
    throw new ValidationError(invalidOrMissingMessage("ID", id));
  }
  if (!description || !isString(description)) {
    throw new ValidationError(
      invalidOrMissingMessage("Description", description)
    );
  }

  // Parsed date later

  if (!specialist || !isString(specialist)) {
    throw new ValidationError(
      invalidOrMissingMessage("Specialist", specialist)
    );
  }

  if (diagnosisCodes) {
    if (
      !Array.isArray(diagnosisCodes) ||
      diagnosisCodes.some((code) => !code || !isString(code))
    ) {
      throw new ValidationError(
        invalidOrMissingMessage("Specialist", specialist)
      );
    }

    return {
      id,
      date: parseDateString(date),
      description,
      specialist,
      diagnosisCodes,
    };
  }

  return {
    id,
    date: parseDateString(date),
    description,
    specialist,
  };
};

const isHealthCheckRating = (rating: any): rating is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(rating);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types
export const parseHealthCheckEntry = (entry: any): HealthCheckEntry => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { type, healthCheckRating, ...rest } = entry;

  const baseEntry = parseBaseEntry(rest);

  if (!type || !isString(type) || type !== EntryTypes.HealthCheck) {
    throw new ValidationError(invalidOrMissingMessage("Type", type));
  }

  if (!healthCheckRating || !isHealthCheckRating(healthCheckRating)) {
    throw new ValidationError(
      invalidOrMissingMessage("HealthCheckRating", healthCheckRating)
    );
  }

  return {
    ...baseEntry,
    type,
    healthCheckRating,
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types
export const parseHospitalEntry = (entry: any): HospitalEntry => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const {
    type,
    discharge: { date, criteria },
    ...rest
  } = entry;

  const baseEntry = parseBaseEntry(rest);

  if (!type || !isString(type) || type !== EntryTypes.Hospital) {
    throw new ValidationError(invalidOrMissingMessage("Type", type));
  }

  // Parsed date later

  if (!criteria || !isString(criteria)) {
    throw new ValidationError(
      invalidOrMissingMessage("Discharge: Criteria", criteria)
    );
  }

  return {
    ...baseEntry,
    type,
    discharge: {
      date: parseDateString(date),
      criteria,
    },
  };
};

export const parseOccupationalHealthcareEntry = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types
  entry: any
): OccupationalHealthcareEntry => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { type, employerName, sickLeave, ...rest } = entry;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { startDate, endDate } = sickLeave;

  const baseEntry = parseBaseEntry(rest);

  if (!type || !isString(type) || type !== EntryTypes.OccupationalHealthcare) {
    throw new ValidationError(invalidOrMissingMessage("Type", type));
  }

  // Parsed date later

  if (!employerName || !isString(employerName)) {
    throw new ValidationError(
      invalidOrMissingMessage("EmployerName", employerName)
    );
  }

  if (sickLeave) {
    return {
      ...baseEntry,
      type,
      employerName,
      sickLeave: {
        startDate: parseDateString(startDate),
        endDate: parseDateString(endDate),
      },
    };
  }

  return {
    ...baseEntry,
    type,
    employerName,
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntryType = (entryType: any): entryType is EntryTypes => {
  return Object.values(EntryTypes).includes(entryType);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types
export const parseEntry = (entry: any): Entry => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { type } = entry;

  if (!type || !isEntryType(type)) {
    throw new ValidationError(invalidOrMissingMessage("Type", type));
  }

  switch (type) {
    case EntryTypes.HealthCheck: {
      return parseHealthCheckEntry(entry);
    }
    case EntryTypes.Hospital: {
      return parseHospitalEntry(entry);
    }
    case EntryTypes.OccupationalHealthcare: {
      return parseOccupationalHealthcareEntry(entry);
    }
  }
};
