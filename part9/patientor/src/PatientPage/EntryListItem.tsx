import { Entry } from "../types";
import React from "react";
import { Card, Icon, SemanticCOLORS } from "semantic-ui-react";
import { assertNever } from "../utils";

interface EntryProps {
  entry: Entry;
}

enum iconsForEntryTypes {
  "HealthCheck" = "stethoscope",
  "OccupationalHealthcare" = "briefcase",
  "Hospital" = "hospital",
}

const healthCodeToColor: SemanticCOLORS[] = [
  "green",
  "yellow",
  "orange",
  "red",
];

const EntryListItem: React.FC<EntryProps> = ({ entry }) => {
  let otherDetails;

  switch (entry.type) {
    case "HealthCheck": {
      otherDetails = (
        <Icon
          name={"heart"}
          color={healthCodeToColor[entry.healthCheckRating]}
        />
      );
      break;
    }
    case "Hospital": {
      otherDetails = (
        <>
          <p>Discharged on: {entry.discharge.date}</p>
          <p>Criteria: {entry.discharge.criteria}</p>
        </>
      );
      break;
    }
    case "OccupationalHealthcare": {
      otherDetails = (
        <>
          <p>Employer: {entry.employerName}</p>
          {entry.sickLeave?.startDate && entry.sickLeave?.endDate ? (
            <p>
              On Leave from {entry.sickLeave.startDate} to{" "}
              {entry.sickLeave.endDate}
            </p>
          ) : null}
        </>
      );
      break;
    }
    default:
      return assertNever(entry);
  }

  return (
    <Card
      fluid
      color={
        entry.type === "HealthCheck"
          ? healthCodeToColor[entry.healthCheckRating]
          : "grey"
      }
    >
      <Card.Content>
        <Card.Header>
          <h4>
            <em>{entry.description}</em>{" "}
            <Icon name={iconsForEntryTypes[entry.type]} size={"big"} />
          </h4>
        </Card.Header>
        <Card.Meta>{entry.date}</Card.Meta>
        {entry.diagnosisCodes?.length ? (
          <ul>
            {entry.diagnosisCodes.map((diagnosisCode) => (
              <li key={diagnosisCode}>{diagnosisCode}</li>
            ))}
          </ul>
        ) : null}
        <div>{otherDetails}</div>
      </Card.Content>
    </Card>
  );
};

export default EntryListItem;
