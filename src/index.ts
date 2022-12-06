import * as dotenv from "dotenv";
import day2part2 from "./day2/day2part2";
import getInputAsync from "./getInput";

// Read in env vars
dotenv.config();

// Async wrapper function for entry promise
const runner = async () => {
  const data = await getInputAsync("2022", "2");
  day2part2(data);
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
