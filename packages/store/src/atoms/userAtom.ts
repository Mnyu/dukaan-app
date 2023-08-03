import { atom } from 'recoil';

export const UserAtom = atom({
  key: 'userAtom',
  default: {
    isLoading: true,
    name: null,
    email: null,
    role: null,
    cart: new Map(),
  },
});
