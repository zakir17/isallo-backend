import express from "express";
import { ObjectId } from "mongodb";
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

submissionRouter.delete("/:id", async (req, res) => {
  try {
    const id: string = req.params.id;
    const client = await getClient();
    const results = await client
      .db()
      .collection<Submission>("submissions")
      .deleteOne({ _id: new ObjectId(id) });
    if (results.deletedCount) {
      res.sendStatus(204);
    } else {
      res.status(404);
      res.send(" No id found");
    }
  } catch (err) {
    errorResponse(err, res);
  }
});

submissionRouter.get("/:id", async (req, res) => {
  try {
    const id: string = req.params.id;
    const client = await getClient();
    const result = await client
      .db()
      .collection<Submission>("submissions")
      .findOne({ _id: new ObjectId(id) });
    if (result) {
      res.status(200);
      res.json(result);
    } else {
      res.status(404);
      res.send(" No id found");
    }
  } catch (err) {
    errorResponse(err, res);
  }
});

export default submissionRouter;
