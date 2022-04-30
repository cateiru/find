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
// Based on https://gist.github.com/hirohitokato/03e98332b10a9ff211e2d9b8d9c3d4fe
export const calcPosition = (current: Position, target: Position) => {
  // 先に計算しておいた定数
  const e2 = 0.00669437999019758; // WGS84における「離心率e」の2乗
  const Rx = 6378137.0; // WGS84における「赤道半径Rx」
  const mNumber = 6335439.32729246; // WGS84における「子午線曲率半径M」の分子(Rx(1-e^2))

  const deg2rad = (deg: number) => (deg * Math.PI) / 180.0;

  const rad_lat1 = deg2rad(current.lat);
  const rad_lon1 = deg2rad(current.lon);
  const rad_lat2 = deg2rad(target.lat);
  const rad_lon2 = deg2rad(target.lon);

  const dp = rad_lon1 - rad_lon2; // 2点の緯度差
  const dr = rad_lat1 - rad_lat2; // 2点の経度差
  const p = (rad_lon1 + rad_lon2) / 2.0; // 2点の平均緯度

  const w = Math.sqrt(1.0 - e2 * Math.pow(Math.sin(p), 2));
  const m = mNumber / Math.pow(w, 3); // 子午線曲率半径
  const n = Rx / w; // 卯酉(ぼうゆう)線曲率半径

  // 2点間の距離(単位m)
  const d = Math.sqrt(Math.pow(m * dp, 2) + Math.pow(n * Math.cos(p) * dr, 2));

  return d;
};

export const calcDirec = (current: Position, target: Position) => {
  const y = -(target.lon - current.lon);
  const x = target.lat - current.lat;
  const d = Math.atan2(y, x);

  return d * (180 / Math.PI);
};
