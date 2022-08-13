import express from "express"
//import { requireAuth } from "../middleware/index.js";
import { userController } from "../controllers/index.js"



const userRouter = express.Router()


//userRouter.route("/Create").post(userController.userCreate);
userRouter.post("/Login/:id",userController.userLogin);
userRouter.route("/Update/:id").patch(userController.userUpdate);
userRouter.route("/ReadOne/:id").get(userController.userReadOne);

export default userRouter;