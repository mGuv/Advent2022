import * as dotenv from "dotenv";
import puzzle from "./day4/day4part2";
import getInputAsync from "./getInput";

// Read in env vars
dotenv.config();

// Async wrapper function for entry promise
const runner = async () => {
  const data = await getInputAsync("2022", "4");
  puzzle(data);
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
