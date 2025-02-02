import React, { createContext, useContext, useReducer } from "react";
import { Diagnosis, Patient } from "../types";

import {
  Action,
  ADD_PATIENT,
  AddPatientAction,
  SET_DIAGNOSES_LIST,
  SET_PATIENT_LIST,
  SetDiagnosesListAction,
  SetPatientListAction,
} from "./reducer";

export type State = {
  patients: { [id: string]: Patient };
  diagnoses: { [code: string]: Diagnosis };
};

const initialState: State = {
  patients: {},
  diagnoses: {},
};

export const StateContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => initialState,
]);

type StateProviderProps = {
  reducer: React.Reducer<State, Action>;
  children: React.ReactElement;
};

export const StateProvider: React.FC<StateProviderProps> = ({
  reducer,
  children,
}: StateProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};
export const useStateValue = () => useContext(StateContext);

// Action creators

export const setPatientList = (patients: Patient[]): SetPatientListAction => ({
  type: SET_PATIENT_LIST,
  payload: patients,
});

export const addPatient = (patient: Patient): AddPatientAction => ({
  type: ADD_PATIENT,
  payload: patient,
});

export const setDiagnosisList = (diagnoses: Diagnosis[]): SetDiagnosesListAction => ({
  type: SET_DIAGNOSES_LIST,
  payload:diagnoses
})