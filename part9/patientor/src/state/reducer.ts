import { State } from "./state";
import { Patient } from "../types";

export const SET_PATIENT_LIST = "SET_PATIENT_LIST";
export const ADD_PATIENT = "ADD_PATIENT";

export interface SetPatientListAction {
  type: typeof SET_PATIENT_LIST;
  payload: Patient[];
}

export interface AddPatientAction {
  type: typeof ADD_PATIENT;
  payload: Patient;
}

export type Action = SetPatientListAction | AddPatientAction;

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
    default:
      return state;
  }
};
