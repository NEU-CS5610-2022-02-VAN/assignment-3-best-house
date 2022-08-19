import express from "express";
import {propertyController } from "../controllers/index.js";
const propertyRouter = express.Router();
import { requireAuth } from "../middleware/index.js";



propertyRouter.get("/ReadAll",propertyController.propertyReadAll);

propertyRouter.post("/create", requireAuth, propertyController.propertyCreate);
propertyRouter.patch( "/Update/:id",
 requireAuth,
  propertyController.propertyUpdate
);
propertyRouter.get(
  "/ReadOne/:id",
  requireAuth,
  propertyController.propertyReadOne
);
propertyRouter.delete(
  "/DeleteOne/:id",
  requireAuth,
  propertyController.propertyDeleteOne
);





// propertyRouter.route("/Create").post(propertyController.propertyCreate);
// propertyRouter.route("/Update/:id").patch(propertyController.propertyUpdate);
// propertyRouter.route("/ReadOne/:id").get(propertyController.propertyReadOne);
// propertyRouter.route("/ReadAll").get(propertyController.propertyReadAll);
// propertyRouter.route("/DeleteOne/:id").delete(propertyController.propertyDeleteOne);


export default propertyRouter;
