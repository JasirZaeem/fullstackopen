export enum Gender {
  Male = "male",
  Female = "female",
}

export interface Entry {}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export type PublicPatient = Omit<Patient, "ssn" | "entries">;

export type UnregisteredPatient = Omit<Patient, "id" | "entries">;

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}
