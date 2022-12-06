export default (input: string) => {
  const asArray = input.split("\n");

  const roundPoints = [6, 0, 3, 6, 0];
  let totalScore = 0;

  asArray.forEach((round) => {
    if (!round.length) {
      return;
    }

    const theirs = round.charCodeAt(0);
    const mine = round.charCodeAt(2);

    totalScore += roundPoints[mine - theirs - 21];
    totalScore += mine - 87;
  });

  console.log("final answer: " + totalScore);
};
