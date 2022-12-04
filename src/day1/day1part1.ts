export default (input: string) => {
  const asArray = input.split("\n");

  let currentSum = 0;
  let allMaxes: number[] = [];

  asArray.forEach((element) => {
    // Blank row means next elf
    if (element.length == 0) {
      allMaxes.push(currentSum);
      currentSum = 0;
      return;
    }

    currentSum += Number.parseInt(element);
  });

  const sorted = allMaxes.sort((a, b) => {
    return a < b ? 1 : -1;
  });

  console.log("Highest Calorie total:", sorted[0]);
  console.log(
    "Top 3 Calories total:",
    sorted.slice(0, 3).reduce((prev, next) => {
      return prev + next;
    }, 0)
  );
};
