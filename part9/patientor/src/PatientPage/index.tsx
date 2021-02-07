import { Entry, Gender, NewEntry, Patient } from "../types";
import React, { useEffect } from "react";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { addPatient, useStateValue } from "../state";
import { Button, Icon } from "semantic-ui-react";
import EntryListItem from "./EntryListItem";
import AddEntryModal from "../AddEntryModal";

interface PatientPageProps {
  patient?: Patient;
}

const PatientPage: React.FC<PatientPageProps> = ({ patient }) => {
  const [, dispatch] = useStateValue();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();
  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };
  const submitNewEntry = async (values: NewEntry) => {
    if (patient) {
      try {
        const { data: newEntry } = await axios.post<Entry | undefined>(
          `${apiBaseUrl}/patients/${patient?.id}/entries`,
          values
        );
        if (newEntry) {
          const updatedPatient: Patient = {
            ...patient,
            entries: [...patient?.entries, newEntry],
          };
          dispatch(addPatient(updatedPatient));
          closeModal();
        }
      } catch (e) {
        console.error(e.response.data);
        setError(e.response.data.error);
      }
    }
  };

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
    if (patient?.id && !patient?.ssn) {
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
        <AddEntryModal
          modalOpen={modalOpen}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeModal}
        />
        <Button onClick={() => openModal()}>Add New Entry</Button>
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
