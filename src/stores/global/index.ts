import storage from 'controllers/storage';

import { createUserApi, IUser } from './user';

export interface IGlobalState {
  user: IUser;
}

const debug = process.env.NODE_ENV === 'development';

export const user = createUserApi(storage.load().user);

user.$store.watch(state => {
  storage.save({ user: state });
});

if (debug) {
  user.$store.watch(console.log);
}

