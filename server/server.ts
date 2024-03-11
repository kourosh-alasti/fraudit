import { MongoClient } from "npm:mongodb";
import { load } from "$std/dotenv/mod.ts";

const env = await load();

const MONGO_CONN_STRING = env["MONGODB_CONN_URL"];
const mongoClient = new MongoClient(MONGO_CONN_STRING);

async function init() {
  try {
    await mongoClient.connect();
    console.log("Successfully Connected to MongoDB");
  } catch (err) {
    console.log(err);
    console.error("Error Connecting to MongoDB");
  }
}

await init();
