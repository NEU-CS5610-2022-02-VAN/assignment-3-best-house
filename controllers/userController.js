// memo: except login in 0806

import prisma from "../models/index.js";
import asyncHandler from "express-async-handler";
import { ObjectId } from "bson";


const userCreate = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const newItem = await prisma.users.create({
    data: {
      name: String(name),
      email: String(email),
      password: String(password),
    },
  });
  res.json(newItem);
});

const userLogin = asyncHandler(async (req, res) => {
  res.send("userLogin");
});

const userUpdate = asyncHandler(async (req, res) => {
  const id = ObjectId(req.params.id).toString();

  const item = await prisma.users.update({
    where: {
      id: id,
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
  const id = ObjectId(req.params.id).toString();
  const item = await prisma.users.findUnique({
    where: {
      id: id,
    },
    select: {
      name: true,
      email: true,
      location: true,
      lastname: true,
    },
  });
  res.json(item);
});

export default { userCreate, userLogin, userUpdate, userReadOne };
