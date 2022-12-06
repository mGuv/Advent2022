export default (input: string) => {
  const asArray = input.split("\n");
  const allSolutions: { [key: string]: number } = {
    "A X": 0 + 3,
    "B X": 0 + 1,
    "C X": 0 + 2,
    "A Y": 3 + 1,
    "B Y": 3 + 2,
    "C Y": 3 + 3,
    "A Z": 6 + 2,
    "B Z": 6 + 3,
    "C Z": 6 + 1,
  };

  let totalScore = 0;

  asArray.forEach((round) => {
    if (!round.length) {
      return;
    }

    totalScore += allSolutions[round];
  });

  console.log("final answer: " + totalScore);
};
