import { State } from "./state";
import { Diagnosis, Patient } from "../types";

export const SET_PATIENT_LIST = "SET_PATIENT_LIST";
export const ADD_PATIENT = "ADD_PATIENT";
export const SET_DIAGNOSES_LIST = "ADD_DIAGNOSES_LIST";

export interface SetPatientListAction {
  type: typeof SET_PATIENT_LIST;
  payload: Patient[];
}

export interface AddPatientAction {
  type: typeof ADD_PATIENT;
  payload: Patient;
}

export interface SetDiagnosesListAction {
  type: typeof SET_DIAGNOSES_LIST;
  payload: Diagnosis[];
}

export type Action =
  | SetPatientListAction
  | AddPatientAction
  | SetDiagnosesListAction;

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case SET_PATIENT_LIST:
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case ADD_PATIENT:
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case SET_DIAGNOSES_LIST:
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
        },
      };
    default:
      return state;
  }
};
