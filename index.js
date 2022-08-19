import { ObjectId } from "bson";
import express, { response } from "express";
import pkg from "@prisma/client";
import morgan from "morgan";
import cors from "cors";
import { userRoutes, propertyRoutes,moodRoutes } from "./routes/index.js";

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));


app.use("/user", userRoutes);
app.use("/property", propertyRoutes);
app.use("/mood",moodRoutes)
app.get("*", (request, respond) => {
  respond.send("404");
});
// //user create ->tested

// app.post("/userCreate", async (req, res) => {
//   const { name,email,password } = req.body;
//   const newItem = await prisma.users.create({
//     data: {
//       name: String(name),
//       email: String(email),
//       password:String(password)
//     },
//   });
//   res.json(newItem);
// });



// //user read -> readAllUsers->tested
// app.get("/userReadAll", async (req, res) => {
//   const item = await prisma.users.findMany();
//   res.json(item);
// });


// //user read -> readOneUser->tested
// app.get("/userReadOne/:id", async (req, res) => {
//   console.log("userreadone")
//   const id = ObjectId(req.params.id).toString();
//   const item = await prisma.users.findUnique({
//     where: {
//       id: id,
//     },
//     select: {
//       name: true,
//       email: true,
//       location:true,
//       lastname:true
//     },
//   });
//   res.json(item);
// });


// //user updateUser->tested
// app.patch("/userUpdate/:id", async (req, res) => {
//   const id = ObjectId(req.params.id).toString();
//   //const {name,lastname,email,location } = req.body;
//   const item = await prisma.users.update({
//     where: {
//       id: id,
//     },
//     data: {
//     //this is change all
//     //   name: String(name),
//     //   lastname:String(lastname),
//     //   email:String(email),
//     //   location:String(location)

//     //this is change only updated part
//     ...req.body,
//     },
//   });
  
//   res.json(item);
// });

//
//mood-create->tested
// app.post("/moodCreate/:id", async (req, res) => {
//   const { mood } = req.body;
//   const id = ObjectId(req.params.id).toString();
//   const newItem = await prisma.moods.create({
//     data: {
//       user: { connect: { id } },
//       mood: String(mood),
//     },
//   });

//   res.json(newItem);
// });


//mood-readall->tested
// app.get("/moodReadAll/:id", async (req, res) => {
//   const userId = ObjectId(req.params.id).toString();
//     const item = await prisma.moods.findMany({
//       where: {
//         userId: userId,
//       },
//       select: {
//         createdAt: true,
//         mood: true,
//       },
//     });

//   res.json(item);
// });

app.listen(8000, () => {
  console.log("Server running on http://localhost:8000 🎉 🚀");
});

