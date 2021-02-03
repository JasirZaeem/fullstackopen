import express from "express";
import {
  addNewPatient,
  getPatientsWithoutSSN,
} from "../../../services/patients";
import { parseUnregisteredPatient } from "../../../utils/validation";
import { ValidationError } from "../../../utils/errors";

const patientRouter = express.Router();

patientRouter.get("/", (_req, res) => {
  res.json(getPatientsWithoutSSN());
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

export default patientRouter;
