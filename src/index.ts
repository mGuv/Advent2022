import * as dotenv from "dotenv";
import day1part1 from "./day1/day1part1";
import getInputAsync from "./getInput";

// Read in env vars
dotenv.config();

// Async wrapper function for entry promise
const runner = async () => {
  const data = await getInputAsync("2022", "1");
  day1part1(data);
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
