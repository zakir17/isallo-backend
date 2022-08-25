import express from "express";
import { getClient } from "../db";
import Submission from "../models/Submission";

const submissionRouter = express.Router();

const errorResponse = (error: any, res: any) => {
  console.error("FAIL", error);
  res.status(500).json({ message: "Internal Server Error" });
};

submissionRouter.get("/", async (req, res) => {
  try {
    const client = await getClient();
    const results = await client
      .db()
      .collection<Submission>("submissions")
      .find()
      .toArray();
    res.json(results);
  } catch (err) {
    errorResponse(err, res);
  }
});

submissionRouter.post("/", async (req, res) => {
  try {
    const newSubmission: Submission = req.body;
    const client = await getClient();
    await client
      .db()
      .collection<Submission>("submissions")
      .insertOne(newSubmission);
    res.status(200).json(newSubmission);
  } catch (err) {
    errorResponse(err, res);
  }
});

export default submissionRouter;
