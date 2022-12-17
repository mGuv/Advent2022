const asciiOffset = -96;
const uppercaseOfffset = 58;

// Calculates the priorty score of a given item
export default (item: string) => {
  let asNumber = item.charCodeAt(0) + asciiOffset;
  if (asNumber < 0) {
    asNumber += uppercaseOfffset;
  }

  return asNumber;
};
