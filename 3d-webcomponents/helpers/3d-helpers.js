function addCoordinates(position1, position2) {
  const pos1 = position1 || { x: 0, y: 0, z: 0 };
  const pos2 = position2 || { x: 0, y: 0, z: 0 };

  return {
    x: (pos1.x || 0) + (pos2.x || 0),
    y: (pos1.y || 0) + (pos2.y || 0),
    z: (pos1.z || 0) + (pos2.z || 0),
  };
}

function negateCoordinates(position) {
  const pos = position || { x: 0, y: 0, z: 0 };

  return {
    x: -pos.x,
    y: -pos.y,
    z: -pos.z,
  };
}

function degreesToRadians(degrees) {
  return degrees * (Math.PI / 180);
}

function radiansToDegrees(radians) {
  return radians * (180 / Math.PI);
}

function getPositionChange(angle, distance) {
  const angleRadians = degreesToRadians(angle);
  const x = Math.sin(angleRadians) * distance;
  const z = -Math.cos(angleRadians) * distance;

  return { x, z };
}

function constrainValue(min, value, max) {
  return Math.min(Math.max(value, min), max);
}
