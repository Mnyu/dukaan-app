import { atom } from 'recoil';

export const UserAtom = atom({
  key: 'userAtom',
  default: {
    isLoading: true,
    name: '',
    email: '',
    role: '',
    cart: new Map(),
  },
});
