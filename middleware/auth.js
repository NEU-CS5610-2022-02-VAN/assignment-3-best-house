import jwt from "express-jwt";
import jwks from "jwks-rsa";

const requireAuth = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: process.env.AUTH0_JWK_URI,
  }),
  audience: process.env.AUTH0_AUDIENCE,
  issuer: process.env.AUTH0_ISSUER,
  algorithms: ["RS256"],
});

export default requireAuth;

//I tried all the possible solution found on multiple programming forums, but nothing worked, so I just downgrade my express-jwt version to 5.3.1 and it start working perfectly, so it means error is in new update, just uninstall current version with npm uninstall express-jwt and install again npm I express-jwt@5.3.1, it will help.
//https://stackoverflow.com/questions/63661915/typeerror-expressjwt-is-not-a-function