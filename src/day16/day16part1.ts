import Heap = require("heap");

type Valve = {
  room: string;
  flowrate: number;
  tunnels: string[];
};

type ValveMap = Record<string, Valve>;

const parseValve = (valveString: string): Valve => {
  const parts = valveString.split(" ");

  return {
    room: parts[1],
    flowrate: Number(parts[4].split("=")[1].slice(0, -1)),
    tunnels: parts.slice(9).map((t) => (t.length == 3 ? t.substring(0, 2) : t)),
  };
};

const parseAllValves = (input: string) => {
  const rawValues = input.split("\n").slice(0, -1);

  const valves: Record<string, Valve> = {};

  rawValues.forEach((valve) => {
    const parsedValve = parseValve(valve);
    valves[parsedValve.room] = parsedValve;
  });

  return valves;
};

type PathNode = {
  previous?: PathNode;
  cost: number;
  room: string;
};

const orderPathNode = (a: PathNode, b: PathNode) => {
  return a.cost - b.cost;
};

const getPath = (map: ValveMap, from: string, to: string) => {
  const heap = new Heap<PathNode>(orderPathNode);
  heap.insert({
    cost: 0,
    room: from,
  });

  const seen = new Set<string>();
  const path: string[] = [];

  while (true) {
    if (heap.size() == 0) {
      console.log(`There's no path for ${from}->${to}`);
      break;
    }

    let currentNode = heap.pop();
    seen.add(currentNode.room);

    if (currentNode.room == to) {
      // found the path, unwarp
      while (currentNode) {
        path.push(currentNode.room);
        currentNode = currentNode.previous;
      }

      path.reverse();
      break;
    }

    // add all neighbours
    map[currentNode.room].tunnels.forEach((tunnel) => {
      if (seen.has(tunnel)) {
        return;
      }

      heap.insert({
        cost: currentNode.cost + 1,
        room: tunnel,
        previous: currentNode,
      });
    });
  }

  return path;
};

type ValvePath = {
  currentPressure: number;
  currentRoom: string;
  minutesLeft: number;
  valvesFound: Set<string>;
};

export default (input: string) => {
  const valveMap = parseAllValves(input);
  const valvesWithFlow = Object.values(valveMap).filter((v) => v.flowrate > 0);
  const valveStepMap: Record<string, Record<string, number>> = {};

  const preMapTime = new Date();
  // figure out path steps from every valve to every other valve
  for (let i = 0; i < valvesWithFlow.length - 1; i++) {
    const startingValve = valvesWithFlow[i];

    if (!valveStepMap[startingValve.room]) {
      valveStepMap[startingValve.room] = {};
    }

    for (let j = i + 1; j < valvesWithFlow.length; j++) {
      const goalValve = valvesWithFlow[j];
      const path = getPath(valveMap, startingValve.room, goalValve.room);

      valveStepMap[startingValve.room][goalValve.room] = path.length - 1;
      if (!valveStepMap[goalValve.room]) {
        valveStepMap[goalValve.room] = {};
      }
      valveStepMap[goalValve.room][startingValve.room] = path.length - 1;
    }
  }

  // If AA isn't there, add it as we need to path from it to begin with
  if (!valveStepMap["AA"]) {
    valveStepMap["AA"] = {};

    valvesWithFlow.forEach((goalValve) => {
      const path = getPath(valveMap, "AA", goalValve.room);
      valveStepMap["AA"][goalValve.room] = path.length;
    });
  }
  const postMapTime = new Date();
  console.log("Build Map: " + (postMapTime.getTime() - preMapTime.getTime()));

  // now try all permutations
  let currentBest = 0;
  let operations = 0;
  const queue: ValvePath[] = [
    {
      minutesLeft: 30,
      currentPressure: 0,
      currentRoom: "AA",
      valvesFound: new Set<string>(),
    },
  ];

  const preSolveTime = new Date();

  while (queue.length > 0) {
    const currentState = queue.splice(0, 1)[0];
    operations++;

    if (currentState.currentPressure > currentBest) {
      currentBest = currentState.currentPressure;
    }

    if (currentState.valvesFound.size == 6) {
    }

    // errrrr, expand it
    valvesWithFlow.forEach((toFind) => {
      if (currentState.valvesFound.has(toFind.room)) {
        return;
      }

      const pathLength = valveStepMap[currentState.currentRoom][toFind.room];

      if (pathLength >= currentState.minutesLeft) {
        return;
      }

      queue.push({
        minutesLeft: currentState.minutesLeft - pathLength - 1,
        currentPressure:
          currentState.currentPressure +
          toFind.flowrate * (currentState.minutesLeft - pathLength),
        currentRoom: toFind.room,
        valvesFound: new Set<string>([
          ...currentState.valvesFound,
          toFind.room,
        ]),
      });
    });
  }

  const postSolveTime = new Date();
  console.log("Solve: " + (postSolveTime.getTime() - preSolveTime.getTime()));
  console.log(
    "best score: " + currentBest,
    " after " + operations + " operatios"
  );
};
