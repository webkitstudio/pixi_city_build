export default function twoDToIso(x, y, h) {
  const isoX = x - y;
  const isoY = (x + y) / 2 - h - 64;
  const isoPoint = new PIXI.Point(isoX, isoY);
  return isoPoint;
};
