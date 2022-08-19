//memo: all tested in 0808
//not tested for auth0
import prisma from "../models/index.js";
import asyncHandler from "express-async-handler";
import { ObjectId } from "bson";

// A USEr create a mood 
const moodCreate =asyncHandler(async(req, res) => {
  const { mood } = req.body;
  const auth0Id = ObjectId(req.params.id).toString();
  console.log(id)
  const newItem = await prisma.moods.create({
    data: {
      user: { connect: { auth0Id } },
      mood: String(mood),
    },
  });

  res.json(newItem);
});

//get all moods of a user
const moodReadAll =asyncHandler( async(req, res) => {
   const auth0Id = ObjectId(req.params.id).toString();
    const item = await prisma.moods.findMany({
    where: {
        userId: auth0Id,
    },
    select: {
        createdAt: true,
        mood: true,
    },
    });

    res.json(item);

});



export default { moodCreate, moodReadAll };
