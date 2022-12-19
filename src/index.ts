import * as dotenv from "dotenv";
import puzzle from "./day16/day16part1";
import getInputAsync from "./getInput";

// Read in env vars
dotenv.config();

// Async wrapper function for entry promise
const runner = async () => {
  const startTime = new Date();
  const data = await getInputAsync("2022", "16");
  puzzle(data);
  const endTime = new Date();
  console.log("ms: " + (endTime.getTime() - startTime.getTime()));
};

// Entry promise to turn stack async
const promise = runner();
promise
  .then(() => {
    console.log("all done");
  })
  .catch((t) => {
    console.log("Failed", t);
  });
