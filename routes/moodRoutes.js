import express from "express";
import { moodController } from "../controllers/index.js";
const moodRouter = express.Router();

moodRouter.route("/Create/:id").post(moodController.moodCreate);
moodRouter.route("/ReadAll/:id").get(moodController.moodReadAll);
//moodRouter.route("/ReadOne/:id").get(moodController.moodReadOne);

export default moodRouter;
