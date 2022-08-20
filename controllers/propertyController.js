
// memo: all tested  0806
import prisma from "../models/index.js";
import asyncHandler from "express-async-handler";
import { ObjectId } from "bson";

const propertyCreate = asyncHandler(async (req, res) => {
  //note : the id here is user id
  const { address, owner, price, location, status, propertyType,picture } = req.body;
   const auth0Id = ObjectId(req.params.id).toString();

  const newItem = await prisma.properties.create({
    data: {
      user: { connect: { auth0Id } },
      address: String(address),
      owner: String(owner),
      price: Number(price),
      location: String(location),
      status: status,
      propertyType: propertyType,
      picture:picture
    },
  });

  res.json(newItem);
});

const propertyUpdate = asyncHandler(async (req, res) => {
  //note : the id here is property id
    const id = ObjectId(req.params.id).toString();
    const item = await prisma.properties.update({
      where: {
        id: id,
      },
      data: {
        ...req.body,
      },
    });

    res.json(item);
});

const propertyReadOne = asyncHandler(async (req, res) => {
  //note : the id here is property id
    const id = ObjectId(req.params.id).toString();
    const item = await prisma.properties.findUnique({
      where: {
        id: id,
      },
      select: {
        address: true,
        owner: true,
        price: true,
        location: true,
        status: true,
        propertyType: true,
        updatedAt:true,
        createdAt:true,
        picture:true
      },
    });
    res.json(item);
});

const propertyReadAll = asyncHandler(async (req, res) => {
    const item = await prisma.properties.findMany({
      select: {
        address: true,
        owner: true,
        price: true,
        userId:true,
        location: true,
        status: true,
        propertyType: true,
        updatedAt: true,
        createdAt: true,
        picture:true,
      },
    });

    res.json(item);
});


const propertyDeleteOne = asyncHandler(async (req, res) => {
  //note : the id here is property id
  const id = ObjectId(req.params.id).toString();
  const item = await prisma.properties.delete({
    where: {
      id: id,
    },
  });

  res.json(item);
});


export default {
  propertyReadAll,
  propertyReadOne,
  propertyCreate,
  propertyUpdate,
  propertyDeleteOne,
};
