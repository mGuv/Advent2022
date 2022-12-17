export default (input: string) => {
  const assignments = input.split("\n").slice(0, -1);

  const overlaps = assignments.reduce((sum, a) => {
    const parts = a.split(",");

    const minA = parseInt(parts[0].split("-")[0]);
    const maxA = parseInt(parts[0].split("-")[1]);
    const minB = parseInt(parts[1].split("-")[0]);
    const maxB = parseInt(parts[1].split("-")[1]);

    // Do they fully overlap?
    if (minA >= minB && maxA <= maxB) {
      // A is inside B
      return sum + 1;
    }

    if (minB >= minA && maxB <= maxA) {
      // B is inside A
      return sum + 1;
    }

    return sum;
  }, 0);

  console.log("Total overlaps: " + overlaps);
};
