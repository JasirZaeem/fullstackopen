import express from "express";
import pingRouter from "./ping";
import diagnosisRouter from "./diagnoses";
import patientRouter from "./patients";

const apiRouter = express.Router();

apiRouter.use("/ping", pingRouter);
apiRouter.use("/diagnoses", diagnosisRouter);
apiRouter.use("/patients", patientRouter);

export default apiRouter;
