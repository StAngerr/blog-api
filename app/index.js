const { ApolloServer } = require("apollo-server");
const { initializeApp, cert } = require("firebase-admin/app");
const { config } = require("dotenv");
const serviceAccount = require("../config/blog-663c5-26845f7bd192.json");

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

const app = initializeApp(firebaseConfig);

const { blogDefs, commentsDefs, userDefs } = require("./schemas");
const {
  blogsResolver,
  commentsResolver,
  usersResolver,
  generalResolver,
} = require("./resolvers");

const server = new ApolloServer({
  typeDefs: [userDefs, commentsDefs, blogDefs],
  resolvers: [blogsResolver, commentsResolver, usersResolver, generalResolver],
});

server.listen().then(({ url }) => console.log(`API running. URL ${url}`));
