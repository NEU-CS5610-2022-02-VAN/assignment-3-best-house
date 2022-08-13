import express from "express";
import {propertyController } from "../controllers/index.js";
const propertyRouter = express.Router();

propertyRouter.route("/Create/:id").post(propertyController.propertyCreate);
propertyRouter.route("/Update/:id").patch(propertyController.propertyUpdate);
propertyRouter.route("/ReadOne/:id").get(propertyController.propertyReadOne);
propertyRouter.route("/ReadAll/:id").get(propertyController.propertyReadAll);
propertyRouter.route("/DeleteOne/:id").delete(propertyController.propertyDeleteOne);
export default propertyRouter;
