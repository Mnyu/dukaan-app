import { selector } from 'recoil';
import { UserAtom } from '../atoms/userAtom';

export const isUserLoadingSelector = selector({
  key: 'isUserLoadingSelector',
  get: ({ get }) => {
    const userAtom = get(UserAtom);
    return userAtom.isLoading;
  },
});

export const userEmailSelector = selector({
  key: 'userEmailSelector',
  get: ({ get }) => {
    const userAtom = get(UserAtom);
    return userAtom.email;
  },
});

export const userRoleSelector = selector({
  key: 'userRoleSelector',
  get: ({ get }) => {
    const userAtom = get(UserAtom);
    return userAtom.role;
  },
});
