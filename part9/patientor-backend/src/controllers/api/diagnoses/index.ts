import express from "express";
import { getDiagnoses } from "../../../services/diagnoses";

const diagnosisRouter = express.Router();

diagnosisRouter.get("/", (_req, res) => {
  res.json(getDiagnoses());
});

export default diagnosisRouter;
