import express from "express";
import {
  addNewPatient,
  addRawEntryToPatient,
  getPatientById,
  getPublicPatient,
} from "../../../services/patients";
import { parseUnregisteredPatient } from "../../../utils/validation";
import { ValidationError } from "../../../utils/errors";

const patientRouter = express.Router();

patientRouter.get("/", (_req, res) => {
  res.json(getPublicPatient());
});

patientRouter.get("/:id", (req, res) => {
  const { id } = req.params;

  const patient = getPatientById(id);

  if (patient) {
    return res.json(patient);
  }

  return res.status(404).json({
    error: "Patient not found",
  });
});

patientRouter.post("/", (req, res) => {
  try {
    return res.json(addNewPatient(parseUnregisteredPatient(req.body)));
  } catch (e) {
    if (e instanceof ValidationError) {
      return res.status(400).json({
        error: e.message,
      });
    }

    return res.status(500).json({
      error: (e as Error).message ?? "Server error",
    });
  }
});

patientRouter.post("/:id/entries", (req, res) => {
  const { id } = req.params;
  let entry;

  try {
    entry = addRawEntryToPatient(id, req.body);
  } catch (e) {
    if (e instanceof ValidationError) {
      return res.status(400).json({
        error: e.message,
      });
    }

    return res.status(500).json({
      error: (e as Error).message ?? "Server error",
    });
  }

  if (entry) {
    return res.json(entry);
  }

  return res.status(404).send();
});

export default patientRouter;
