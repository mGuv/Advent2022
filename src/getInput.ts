import axios from "axios";

import * as readline from "readline";

// Read next line as input
const readLineAsync = (prompt: string) => {
  let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const promise = new Promise<string>((resolver) => {
    rl.question("Please enter your AoC Session ID:", (input) => {
      rl.close();
      resolver(input);
    });
  });

  return promise;
};

// Creates the AoC URL to fetch problem data
const buildUrl = (year: string, day: string) => {
  return `${process.env.AOC_URL}/${year}/day/${day}/input`;
};

// Gets the specified problem's data
const getInputAsync = async (year: string, day: string) => {
  // Ensure we have a session ID
  let sessionId = process.env.AOC_SESSION_ID;
  if (!sessionId) {
    sessionId = await readLineAsync("Please enter your session ID:");
  }

  // Get from AoC
  const response = await axios.get(buildUrl(year, day), {
    headers: { Cookie: `session=${sessionId}` },
  });

  return response.data;
};

export default getInputAsync;
