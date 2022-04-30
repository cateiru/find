export interface DeviceOrientationEventWebkit extends DeviceOrientationEvent {
  webkitCompassHeading: number;
  requestPermission: () => Promise<string>;
}
