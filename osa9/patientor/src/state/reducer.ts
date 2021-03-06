import { State } from "./state";
import { Patient, PatientList } from "../types";

export type Action =
    {
      type: string;
      payload: PatientList;
    }
  | {
      type: string;
      payload: Patient;
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        patients: {
          ...Object.values(action.payload).reduce(
            (memo: PatientList, patient: Patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      console.log(action);
      return {
        ...state,
        patients: <{patient: Patient}> {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_PATIENT":
      console.log('action:', action);
      console.log('state:', state);
      return {
        ...state,
        patients: {
          ...state.patients
        },
        patient: <{patient: Patient}> {
          [action.payload.id]: action.payload
        }
      };
    default:
      return state;
  }
};

export const setPatientList = (data: PatientList) => {
  return {
    type: "SET_PATIENT_LIST",
    payload: data
  };
};

export const addPatient = (data: Patient) => {
  return {
    type: "ADD_PATIENT",
    payload: data
  };
};

export const setPatient = (data: Patient) => {
  return {
    type: "SET_PATIENT",
    payload: data
  };
};