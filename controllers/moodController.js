//memo: all tested in 0808
import prisma from "../models/index.js";
import asyncHandler from "express-async-handler";
import { ObjectId } from "bson";

const moodCreate =asyncHandler(async(req, res) => {
  const { mood } = req.body;
  const id = ObjectId(req.params.id).toString();
  console.log(id)
  const newItem = await prisma.moods.create({
    data: {
      user: { connect: { id } },
      mood: String(mood),
    },
  });

  res.json(newItem);
});

const moodReadAll =asyncHandler( async(req, res) => {
    const userId = ObjectId(req.params.id).toString();
    const item = await prisma.moods.findMany({
    where: {
        userId: userId,
    },
    select: {
        createdAt: true,
        mood: true,
    },
    });

    res.json(item);

});



export default { moodCreate, moodReadAll };
