import { Gender, Patient } from "../types";
import React, { useEffect } from "react";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { addPatient, useStateValue } from "../state";
import { Icon } from "semantic-ui-react";
import EntryListItem from "./EntryListItem";

interface PatientPageProps {
  patient?: Patient;
}

const PatientPage: React.FC<PatientPageProps> = ({ patient }) => {
  const [, dispatch] = useStateValue();

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${patient?.id}`
        );
        dispatch(addPatient(patientFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    if (!patient?.ssn) {
      fetchPatient();
    }
  }, [dispatch, patient]);

  return patient ? (
    patient.ssn ? (
      <div>
        <h1>
          {patient.name}{" "}
          <Icon
            name={
              patient.gender === Gender.Female
                ? "venus"
                : patient.gender === Gender.Male
                ? "mars"
                : "other gender"
            }
          />
        </h1>
        <ul>
          <li>SSN: {patient.ssn}</li>
          <li>Born on: {patient.dateOfBirth}</li>
          <li>Occupation: {patient.occupation}</li>
        </ul>
        {patient.entries.length ? (
          <div>
            <h3>Entries</h3>
            {patient.entries.map((entry) => (
              <EntryListItem entry={entry} key={entry.id} />
            ))}
          </div>
        ) : null}
      </div>
    ) : (
      <div>Loading...</div>
    )
  ) : (
    <div>Patient Not Found</div>
  );
};
export default PatientPage;
