// memo: except login in 0806

import prisma from "../models/index.js";
import asyncHandler from "express-async-handler";
import { ObjectId } from "bson";

const userVerify = asyncHandler(async (req, res) => {
  const auth0Id = ObjectId(req.params.id).toString();
  const email = req.user[`${process.env.AUTH0_AUDIENCE}/email`];
  const name = req.user[`${process.env.AUTH0_AUDIENCE}/name`];
 
  const user = await prisma.users.findUnique({
    where: {
      auth0Id,
    },
    select: {
      name: true,
      email: true,
      auth0Id:true,
      lastname: true,
      location: true,
      id: true,
    },
  });

  if (user) {
    res.send(user);
  } else {
    const newUser = await prisma.users.create({
      data: {
        email:string(email),
        auth0Id:String(auth0Id),
        name:String(name)
      },
    });
    res.send(newUser);
  }
});


// const userCreate = asyncHandler(async (req, res) => {
//   const { name, email, password } = req.body;
//   const newItem = await prisma.users.create({
//     data: {
//       name: String(name),
//       email: String(email),
//       password: String(password),
//     },
//   });
//   res.json(newItem);
// });

// const userLogin = asyncHandler(async (req, res) => {
//   res.send("userLogin");
// });

const userUpdate = asyncHandler(async (req, res) => {
  const auth0Id = ObjectId(req.params.id).toString();

  const item = await prisma.users.update({
    where: {
      auth0Id: auth0Id,
    },
    data: {
      //this is change all
      //   name: String(name),
      //   lastname:String(lastname),
      //   email:String(email),
      //   location:String(location)

      //this is change only updated part
      ...req.body,
    },
  });

  res.json(item);
});

const userReadOne = asyncHandler(async (req, res) => {
  console.log("userreadone");
  const auth0Id = ObjectId(req.params.id).toString();
  const item = await prisma.users.findUnique({
    where: {
      auth0Id: auth0Id,
    },
    select: {
      name: true,
      email: true,
      location: true,
      lastname: true,
      id:true,
    },
  });
  res.json(item);
});

export default { userVerify, userUpdate, userReadOne };
