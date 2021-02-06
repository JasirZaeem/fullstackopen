import { Patient, PublicPatient, UnregisteredPatient } from "../../types";
import patients from "../../../data/patients";

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
    id: Math.random().toString(),
    ...newPatient,
    entries: [],
  };

  patients.push(patient);

  return patient;
};
