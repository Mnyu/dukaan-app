import { atom } from 'recoil';

export const UserAtom = atom({
  key: 'userAtom',
  default: {
    isLoading: true,
    email: null,
    role: null,
    cart: new Map(),
  },
});
