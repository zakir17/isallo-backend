import express from "express";
import { ObjectId } from "mongodb";
import { getClient } from "../db";
import Submission from "../models/Submission";

const submissionRouter = express.Router();

const errorResponse = (error: any, res: any) => {
  console.error("FAIL", error);
  res.status(500).json({ message: "Internal Server Error" });
};

submissionRouter.get("/:uid", async (req, res) => {
  try {
    const uid: string | undefined = req.params.uid;
    const client = await getClient();
    const query: any = { uid };
    const results = await client
      .db()
      .collection<Submission>("submissions")
      .find(query)
      .toArray();
    res.status(200);
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

submissionRouter.delete("/:id/user/:uid", async (req, res) => {
  try {
    const uid: string | undefined = req.params.uid;
    const id: string = req.params.id;
    const client = await getClient();
    const results = await client
      .db()
      .collection<Submission>("submissions")
      .deleteOne({ $and: [{ _id: new ObjectId(id) }, { uid }] });
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

submissionRouter.get("/:id/user/:uid", async (req, res) => {
  try {
    const uid: string | undefined = req.params.uid;
    const id: string = req.params.id;
    const client = await getClient();
    const result = await client
      .db()
      .collection<Submission>("submissions")
      .findOne({ $and: [{ _id: new ObjectId(id) }, { uid }] });
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
