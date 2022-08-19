import express from "express";
import { moodController } from "../controllers/index.js";
const moodRouter = express.Router();


moodRouter.get("/readall", moodController.moodReadAll);
moodRouter.post("/create", moodController.moodCreate);
export default moodRouter;
