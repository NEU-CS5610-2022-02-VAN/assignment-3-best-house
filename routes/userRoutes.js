import express from "express"
import { requireAuth } from "../middleware/index.js";
import { userController } from "../controllers/index.js"



const userRouter = express.Router()


//userRouter.route("/Create").post(userController.userCreate);

userRouter.post("/verify-user", requireAuth, userController.userVerify);
userRouter.get("/Readone", requireAuth, userController.userReadOne);
userRouter.patch("/Update", requireAuth, userController.userUpdate);


export default userRouter;