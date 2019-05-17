let prevId = 0;

export function uuid() {
  let nextId = Date.now();
  while (nextId <= prevId) {
    nextId += 1;
  }
  prevId = nextId;
  return nextId.toString(36);
}

export default uuid