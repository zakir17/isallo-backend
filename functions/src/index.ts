import * as functions from "firebase-functions";
import express from "express";
import cors from "cors";
import submissionRouter from "./routes/submissionRouter";
const app = express();
app.use(cors());
app.use(express.json());
app.use("/submissions", submissionRouter);
export const api = functions.https.onRequest(app);
