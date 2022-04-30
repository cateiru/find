// 端末の傾き補正（Android用）
// https://www.w3.org/TR/orientation-event/

import type {Position} from './socket';

// Based on https://one-it-thing.com/6555/
export const compassHeading = (
  alpha: number,
  beta: number,
  gamma: number
): number => {
  const degtorad = Math.PI / 180; // Degree-to-Radian conversion

  const _x = beta ? beta * degtorad : 0; // beta value
  const _y = gamma ? gamma * degtorad : 0; // gamma value
  const _z = alpha ? alpha * degtorad : 0; // alpha value

  const cY = Math.cos(_y);
  const cZ = Math.cos(_z);
  const sX = Math.sin(_x);
  const sY = Math.sin(_y);
  const sZ = Math.sin(_z);

  // Calculate Vx and Vy components
  const Vx = -cZ * sY - sZ * sX * cY;
  const Vy = -sZ * sY + cZ * sX * cY;

  // Calculate compass heading
  let compassHeading = Math.atan(Vx / Vy);

  // Convert compass heading to use whole unit circle
  if (Vy < 0) {
    compassHeading += Math.PI;
  } else if (Vx < 0) {
    compassHeading += 2 * Math.PI;
  }

  return compassHeading * (180 / Math.PI); // Compass Heading (in degrees)
};

// ヒュベニの近似式を使用して2地点の緯度経度から相対距離を求める
// ref. https://komoriss.com/calculate-distance-between-two-points-from-latitude-and-longitude/
export const calcPosition = (current: Position, target: Position) => {
  return Math.sqrt(
    (((6334834 /
      Math.sqrt(
        (1 -
          0.006674 *
            Math.sin((((current.lat + target.lat) / 2) * Math.PI) / 180)) ^
          2 ^
          3
      )) *
      (current.lat - target.lat) *
      Math.PI) /
      180) ^
      (2 +
        ((6377397 /
          Math.sqrt(
            (1 -
              0.006674 *
                Math.sin((((current.lat + target.lat) / 2) * Math.PI) / 180)) ^
              2
          )) *
          cos((((current.lat + target.lat) / 2) * Math.PI) / 180) *
          (current.lon - target.lon) *
          Math.PI) /
          180) ^
      2
  );
};

export const calcDirec = (current: Position, target: Position) => {
  const y = -(target.lon - current.lon);
  const x = target.lat - current.lat;
  const d = Math.atan2(y, x);

  return d * (180 / Math.PI);
};
