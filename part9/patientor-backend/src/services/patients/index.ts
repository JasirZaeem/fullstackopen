import {
  Entry,
  Patient,
  PublicPatient,
  UnregisteredPatient,
} from "../../types";
import patients from "../../../data/patients";
import { generateId } from "../../utils";
import { parseEntry } from "../../utils/validation";

export const getPublicPatient = (): PublicPatient[] => {
  // Remove ssn and return all other fields
  return patients.map(
    ({ ssn: _ssn, entries: _entries, ...publicPatient }) => publicPatient
  );
};

export const getPatientById = (patientId: string): Patient | undefined => {
  return patients.find(({ id }) => id === patientId);
};

export const addNewPatient = (newPatient: UnregisteredPatient): Patient => {
  const patient: Patient = {
    id: generateId(),
    ...newPatient,
    entries: [],
  };

  patients.push(patient);

  return patient;
};

export const addEntryToPatient = (patientId: string, entry: Entry): boolean => {
  const patient = getPatientById(patientId);
  if (patient) {
    if (patient.entries) {
      patient.entries.push(entry);
    } else {
      patient.entries = [entry];
    }
    return true;
  }
  return false;
};

export const addRawEntryToPatient = (
  patientId: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types
  entry: any
): Entry | undefined => {
  const entryToAdd = parseEntry({ ...entry, id: generateId() });
  if (addEntryToPatient(patientId, entryToAdd)) {
    return entryToAdd;
  }
  return;
};
