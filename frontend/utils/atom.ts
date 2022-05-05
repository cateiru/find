import {atom, AtomEffect} from 'recoil';

const localStorageEffect =
  <T>(key: string): AtomEffect<T> =>
  ({setSelf, onSet}) => {
    if (process.browser) {
      const savedValue = localStorage.getItem(key);
      if (savedValue !== null) {
        setSelf(JSON.parse(savedValue));
      }

      onSet((newValue, _, isReset) => {
        isReset
          ? localStorage.removeItem(key)
          : localStorage.setItem(key, JSON.stringify(newValue));
      });
    }
  };

export const DebugModeState = atom({
  key: 'DebugModeState',
  default: false,
  effects: [localStorageEffect<boolean>('debug_mode')],
});
