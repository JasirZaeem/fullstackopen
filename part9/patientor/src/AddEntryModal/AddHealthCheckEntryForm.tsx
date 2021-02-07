import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { HealthCheckRating, NewHealthCheckEntry } from "../types";
import { useStateValue } from "../state";
import {
  TextField,
  DiagnosisSelection,
  NumberField,
} from "../AddPatientModal/FormField";

interface AddHealthCheckEntryFormProps {
  onSubmit: (values: NewHealthCheckEntry) => void;
  onCancel: () => void;
}

export const AddHealthCheckEntryForm: React.FC<AddHealthCheckEntryFormProps> = ({
  onSubmit,
  onCancel,
}) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Formik
      initialValues={{
        date: "",
        type: "HealthCheck",
        specialist: "",
        description: "",
        healthCheckRating: HealthCheckRating.Healthy,
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";

        const errors: { [field: string]: string } = {};
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.type) {
          errors.type = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (values.healthCheckRating === undefined) {
          errors.healthCheckRating = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />

            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />

            <Field
              label="Description"
              placeholder="description"
              name="description"
              component={TextField}
            />

            <Field
              label="Health Check Rating"
              placeholder="Health Check Rating"
              name="healthCheckRating"
              component={NumberField}
              I={HealthCheckRating.Healthy}
              max={HealthCheckRating.CriticalRisk}
            />

            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />

            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add Entry
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddHealthCheckEntryForm;
