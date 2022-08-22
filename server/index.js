import express from "express";
import pkg from "@prisma/client";
import morgan from "morgan";
import cors from "cors";
import jwt from "express-jwt";
import jwks from "jwks-rsa";

var requireAuth = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: process.env.AUTH0_JWK_URI, //.env enviorment variables
  }),
  audience: process.env.AUTH0_AUDIENCE,
  issuer: process.env.AUTH0_ISSUER,
  algorithms: ["RS256"],
});

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

app.get("/ping", (req, res) => {
  res.send("pong");
});

//---------------////property part////---------------

//get all properties
app.get("/properties/readal", async (req, res) => {
  const properties = await prisma.property.findMany();
  res.json(properties);
});

//get properties based on user
app.get("/properties", requireAuth, async (req, res) => {
  const auth0Id = req.user.sub; //user object
  const user = await prisma.user.findUnique({
    where: {
      auth0Id,
    },
  });
 
  const properties = await prisma.property.findMany({
    where: {
      managerId: user.id,
    },
  });

  res.json(properties);
});

// get a property item by db id
app.get("/properties/find/:id", async (req, res) => {
  const id = parseInt(req.params.id);

    let itemNumber = await prisma.property.count({ //check if target exists
      where: {
        id: id
      }
    })
  
    if(itemNumber != 0){
    const item = await prisma.property.findUnique({
      where: {
        id: id
      },
    });
    res.json(item);
    }else {
      console.log("no such property, cant find");
      res.json("no such property, cant find");
    }
});

// creates a property item
app.post("/properties", requireAuth, async (req, res) => {
  const auth0Id = req.user.sub;
  const { owner, address, location, status, type, price, picture } = req.body;
  let existNumber = await prisma.property.count({ //check if target exists
    where: {
      address: address
    }
  })

  if (!address || !type || !price || !picture) {
    res.status(400).send("missed at least 1 info of address, type or price");
  } else if(existNumber!=0){
    res.status(400).send("the address already exists");
  }else{
    const newItem = await prisma.property.create({
      data: {
        owner: owner,
        address: address,
        location: location,
        status:status,
        type: type,
        price: price,
        picture: picture,
        manager: { connect: { auth0Id } },
      },
    });
    res.status(201).json(newItem);
  }
});

// deletes a property item by id
app.delete("/properties", requireAuth, async (req, res) => {
  const { id } = req.body;
  let itemNumber = await prisma.property.count({ //check if target exists
    where: {
      id: id
    }
  })

  if(itemNumber != 0){
    const deletedItem = await prisma.property.delete({
      where: {
        id: id,
      },
    });
    res.json(deletedItem);
  }else {
    console.log("no such note");
    res.json("no such note");
  }
  });

// updates a property item by id
app.put("/properties/update/:id", requireAuth, async (req, res) => {
  const id = parseInt(req.params.id);
  const { owner, address, location, status, type, price, picture } = req.body;
  let itemNumber = await prisma.property.count({ //check if target exists
    where: {
      id: id
    }
  })
  let existNumber = await prisma.property.count({ //check if target exists
    where: {
      address: address
    }
  })
  
  if(itemNumber != 0 && existNumber === 0){
    const updatedItem = await prisma.property.update({
      where: {
        id: id,
      },
      data: {
        owner: owner,
        address: address,
        location: location,
        status:status,
        type: type,
        price: price,
        picture: picture,
      },
    });
    res.json(updatedItem);
  }else {
    console.log("no such property, cant update");
    res.json("no such property, cant update");
  } 
});

// creates a property item
app.post("/properties", requireAuth, async (req, res) => {
  const auth0Id = req.user.sub;

  const { owner, address, location, status, type, price, picture } = req.body;

  let existNumber = await prisma.property.count({ //check if target exists
    where: {
      address: address
    }
  })

  if (!address || !type || !price || !picture) {
    res.status(400).send("missed at least 1 info of address, type or price");
  } else if(existNumber!=0){
    res.status(400).send("the address already exists");
  }else{
    const newItem = await prisma.property.create({
      data: {
        owner: owner,
        address: address,
        location: location,
        status:status,
        type: type,
        price: price,
        picture: picture,
        manager: { connect: { auth0Id } },
      },
    });

    res.status(201).json(newItem);
  }
});



//---------------////mood part////---------------

//get all moods by user id 
app.get("/moods/readal", requireAuth, async (req, res) => {
  const auth0Id = req.user.sub; //user object
  const user = await prisma.user.findUnique({
    where: {
      auth0Id,
    },
  });

  const moods = await prisma.mood.findMany({
    where: {
      userId: user.id,
    },
  });

  res.json(moods);
});

//get latest mood 
app.get("/moods/latest", requireAuth, async (req, res) => {
  const auth0Id = req.user.sub; //user object
  const user = await prisma.user.findUnique({
    where: {
      auth0Id,
    },
  });

  const latest = await prisma.mood.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      id: 'desc'
    },
    take: 1
  });

  res.json(latest);
});

// creates a mood item
app.post("/moods/create", requireAuth, async (req, res) => {
  const auth0Id = req.user.sub;
  const { mood } = req.body;

  if (!mood) {
    res.status(400).send("missed mood info");
  }else{
    const newItem = await prisma.mood.create({
      data: {
        mood: mood,
        user: { connect: { auth0Id } }
      },
    });

    res.status(201).json(newItem);
  }
});


//---------------////user part////---------------

// get Profile information of authenticated user
app.get("/me", requireAuth, async (req, res) => {
  const auth0Id = req.user.sub;
  const user = await prisma.user.findUnique({
    where: {
      auth0Id,
    },
  });

  const latestMood = await prisma.mood.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      id: 'desc'
    },
    take: 1
  });

  res.json(user);
});

// verify user status, if not registered in our database we will create it
app.post("/verify-user", requireAuth, async (req, res) => {
  const auth0Id = req.user.sub;
  const email = req.user[`${process.env.AUTH0_AUDIENCE}/email`];
  const name = req.user[`${process.env.AUTH0_AUDIENCE}/name`];
  const user = await prisma.user.findUnique({
    where: {
      auth0Id,
    },
  });

  if (user) {
    res.json(user);
  } else {
    const newUser = await prisma.user.create({
      data: {
        email,
        auth0Id,
        name,
      },
    });

    res.json(newUser);
  }
});


app.listen(8000, () => {
  console.log("Server running on http://localhost:8000 🎉 🚀");
});
