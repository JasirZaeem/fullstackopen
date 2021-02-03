import { Patient, PatientWithoutSSN, UnregisteredPatient } from "../../types";
import patients from "../../../data/patients";

export const getPatientsWithoutSSN = (): PatientWithoutSSN[] => {
  // Remove ssn and return all other fields
  return patients.map(({ ssn: _, ...patientWithoutSSN }) => patientWithoutSSN);
};

export const addNewPatient = (newPatient: UnregisteredPatient): Patient => {
  const patient: Patient = {
    id: Math.random().toString(),
    ...newPatient,
  };

  patients.push(patient);

  return patient;
};
