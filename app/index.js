const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { initializeApp, cert } = require("firebase-admin/app");
const { config } = require("dotenv");
const serviceAccount = require("../config/acc.json");
const cors = require("cors");

config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  credential: cert(serviceAccount),
};

initializeApp(firebaseConfig);

const { blogDefs, commentsDefs, userDefs } = require("./schemas");
const {
  blogsResolver,
  commentsResolver,
  usersResolver,
  generalResolver,
} = require("./resolvers");

const app = express();

const corsOptions = {
  origin: "https://studio.apollographql.com",
};

app.use(cors(corsOptions));

const server = new ApolloServer({
  typeDefs: [userDefs, commentsDefs, blogDefs],
  resolvers: [blogsResolver, commentsResolver, usersResolver, generalResolver],
});

server.start().then((res) => {
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log(`API running at http://localhost:4000${server.graphqlPath}`),
  );
});
