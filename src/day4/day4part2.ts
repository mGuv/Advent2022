export default (input: string) => {
  const assignments = input.split("\n").slice(0, -1);

  const overlaps = assignments.reduce((sum, a) => {
    const parts = a.split(",");

    const minA = parseInt(parts[0].split("-")[0]);
    const maxA = parseInt(parts[0].split("-")[1]);
    const minB = parseInt(parts[1].split("-")[0]);
    const maxB = parseInt(parts[1].split("-")[1]);

    // Do they over lap at all
    if (minA > maxB) {
      // A cannot overlap B
      return sum;
    }

    if (minB > maxA) {
      // B cannot overlap A
      return sum;
    }
    return sum + 1;
  }, 0);

  console.log("Total overlaps: " + overlaps);
};
