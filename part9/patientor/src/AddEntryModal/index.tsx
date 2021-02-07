import React, { useState } from "react";
import { Dropdown, Modal, Segment } from "semantic-ui-react";
import { EntryType, NewEntry } from "../types";
import AddHealthCheckEntryForm from "./AddHealthCheckEntryForm";
import AddHospitalEntryForm from "./AddHospitalEntryForm";
import AddOccupationalHealthcareEntryForm from "./AddOccupationalHealthcareEntryForm";

export type EntryTypeOption = {
  value: EntryType;
  text: string;
};

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: NewEntry) => void;
  error?: string;
}

const entryOptions: EntryTypeOption[] = [
  { value: EntryType.HealthCheckEntry, text: "Health Check" },
  { value: EntryType.HospitalEntry, text: "Hospital" },
  {
    value: EntryType.OccupationalHealthcareEntry,
    text: "Occupational Healthcare",
  },
];

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => {
  const [selectedType, setSelectedType] = useState(EntryType.HealthCheckEntry);

  return (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
      <Modal.Header>Add a new entry</Modal.Header>
      <Modal.Content>
        {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
        <Dropdown
          placeholder="Select Friend"
          fluid
          selection
          options={entryOptions}
          value={selectedType}
          onChange={(event, data) => setSelectedType(data.value as EntryType)}
        />

        {selectedType === EntryType.HealthCheckEntry ? (
          <AddHealthCheckEntryForm onSubmit={onSubmit} onCancel={onClose} />
        ) : selectedType === EntryType.HospitalEntry ? (
          <AddHospitalEntryForm onSubmit={onSubmit} onCancel={onClose} />
        ) : (
          <AddOccupationalHealthcareEntryForm
            onSubmit={onSubmit}
            onCancel={onClose}
          />
        )}
      </Modal.Content>
    </Modal>
  );
};
export default AddEntryModal;
