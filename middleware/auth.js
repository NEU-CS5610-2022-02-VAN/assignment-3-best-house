// import jwt from "express-jwt";
// import jwks from "jwks-rsa";

// const requireAuth = jwt({
//   secret: jwks.expressJwtSecret({
//     cache: true,
//     rateLimit: true,
//     jwksRequestsPerMinute: 5,
//     jwksUri: process.env.AUTH0_JWK_URI,
//   }),
//   audience: process.env.AUTH0_AUDIENCE,
//   issuer: process.env.AUTH0_ISSUER,
//   algorithms: ["RS256"],
// });

// export default requireAuth;
