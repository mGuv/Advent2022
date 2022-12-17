import calculatePriority from "./calculatePriority";

export default (input: string) => {
  // Get all rucksacks with trailing empty line removes
  const rucksacks = input.split("\n").slice(0, -1);

  let score = 0;

  // Loop in blocks of three
  for (let i = 0; i < rucksacks.length; i += 3) {
    // get the three rucksacks
    const a = rucksacks[i];
    const b = rucksacks[i + 1];
    const c = rucksacks[i + 2];

    // Create sets of the first two
    const asSetA = new Set(a);
    const asSetB = new Set(b);

    // Find the third that exists in both and add it
    const dupe = c.split("").find((c) => {
      return asSetA.has(c) && asSetB.has(c);
    });

    score += calculatePriority(dupe);
  }

  console.log("all done", score);
};
