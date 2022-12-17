import calculatePriority from "./calculatePriority";

export default (input: string) => {
  // Split rucksacks and remove trailing empty line
  const rucksacks = input.split("\n").slice(0, -1);

  // Sum up all the rucksacks
  const prioritySum = rucksacks.reduce((sum, rucksack) => {
    // Split in to two compartments
    const firstHalf = rucksack.slice(0, rucksack.length / 2);
    const secondHalf = rucksack.slice(rucksack.length / 2);

    // make sets to rack contents and current duplicates
    const duplicates = new Set<string>();
    const set = new Set<string>(firstHalf.split(""));

    // Check each char in second half against first half for dupes
    secondHalf.split("").forEach((c) => {
      if (!set.has(c)) {
        return;
      }

      duplicates.add(c);
    });

    // Sim the dupes
    const rucksackScore = Array.from(duplicates.values()).reduce(
      (rucksackSum, duplicate) => {
        return calculatePriority(duplicate) + rucksackSum;
      },
      0
    );

    return sum + rucksackScore;
  }, 0);

  console.log("All done, total priority is: ", prioritySum);
};
