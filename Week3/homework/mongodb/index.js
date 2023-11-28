const { MongoClient, ServerApiVersion } = require("mongodb");
const { seedDatabase } = require("./seedDatabase.js");
require("dotenv").config();

async function createEpisodeExercise(client) {
  try {
    const database = client.db("databaseWeek3");
    const collection = database.collection("bob_ross_episodes");

    const newEpisode = {
      episode: "S09E13",
      title: "MOUNTAIN HIDE-AWAY",
      elements: [
        "CIRRUS",
        "CLOUDS",
        "CONIFER",
        "DECIDUOUS",
        "GRASS",
        "MOUNTAIN",
        "MOUNTAINS",
        "RIVER",
        "SNOWY_MOUNTAIN",
        "TREE",
        "TREES",
      ],
    };

    const result = await collection.insertOne(newEpisode);
    console.log(
      `Created season 9 episode 13 and the document got the id ${result.insertedId}`
    );
  } catch (error) {
    console.error("Error adding episode:", error);
  }
}

async function findEpisodesExercises(client) {
  try {
    const database = client.db("databaseWeek3");
    const collection = database.collection("bob_ross_episodes");

    const episode1 = await collection.findOne({ episode: "S02E02" });
    console.log(`The title of episode 2 in season 2 is ${episode1.title}`);

    const episode2 = await collection.findOne({ title: "BLACK RIVER" });
    console.log(
      `The season and episode number of the "BLACK RIVER" episode is ${episode2.episode}`
    );

    const episodes3 = await collection
      .find({ elements: "CLIFF" }, { projection: { title: 1, _id: 0 } })
      .toArray();
    const titles3 = episodes3.map((episode) => episode.title);
    console.log(`The episodes that Bob Ross painted a CLIFF are ${titles3}`);

    const episodes4 = await collection
      .find(
        { elements: { $all: ["CLIFF", "LIGHTHOUSE"] } },
        { projection: { title: 1, _id: 0 } }
      )
      .toArray();
    const titles4 = episodes4.map((episode) => episode.title);
    console.log(
      `The episodes that Bob Ross painted a CLIFF and a LIGHTHOUSE are ${titles4}`
    );
  } catch (error) {
    console.error("Error finding episodes:", error);
  }
}

async function updateEpisodeExercises(client) {
  try {
    const database = client.db("databaseWeek3");
    const collection = database.collection("bob_ross_episodes");

    const updateResult1 = await collection.updateOne(
      { episode: "S30E13" },
      { $set: { title: "BLUE RIDGE FALLS" } }
    );

    console.log(
      `Ran a command to update episode 13 in season 30 and it updated ${updateResult1.modifiedCount} episodes`
    );

    const updateResult2 = await collection.updateMany(
      { elements: "BUSHES" },
      { $set: { "elements.$": "BUSH" } }
    );

    console.log(
      `Ran a command to update all the BUSHES to BUSH and it updated ${updateResult2.modifiedCount} episodes`
    );
  } catch (error) {
    console.error("Error updating episodes:", error);
  }
}

async function deleteEpisodeExercise(client) {
  try {
    const database = client.db("databaseWeek3");
    const collection = database.collection("bob_ross_episodes");

    const deleteResult = await collection.deleteOne({ episode: "S31E14" });

    console.log(
      `Ran a command to delete episode and it deleted ${deleteResult.deletedCount} episodes`
    );
  } catch (error) {
    console.error("Error deleting episode:", error);
  }
}

async function main() {
  if (process.env.MONGODB_URL == null) {
    throw Error(
      `You did not set up the environment variables correctly. Did you create a '.env' file and add a package to create it?`
    );
  }
  const client = new MongoClient(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });

  try {
    await client.connect();

    // Seed our database
    await seedDatabase(client);

    // CREATE
    await createEpisodeExercise(client);

    // READ
    await findEpisodesExercises(client);

    // UPDATE
    await updateEpisodeExercises(client);

    // DELETE
    await deleteEpisodeExercise(client);
  } catch (err) {
    console.error(err);
  } finally {
    // Always close the connection at the end
    await client.close();
  }
}

/**
 * In the end the console should read something like this: 

Created season 9 episode 13 and the document got the id 625e9addd11e82a59aa9ff93
The title of episode 2 in season 2 is WINTER SUN
The season and episode number of the "BLACK RIVER" episode is S02E06
The episodes that Bob Ross painted a CLIFF are NIGHT LIGHT, EVENING SEASCAPE, SURF'S UP, CLIFFSIDE, BY THE SEA, DEEP WILDERNESS HOME, CRIMSON TIDE, GRACEFUL WATERFALL
The episodes that Bob Ross painted a CLIFF and a LIGHTHOUSE are NIGHT LIGHT
Ran a command to update episode 13 in season 30 and it updated 1 episodes
Ran a command to update all the BUSHES to BUSH and it updated 120 episodes
Ran a command to delete episode and it deleted 1 episodes
 
*/

main();