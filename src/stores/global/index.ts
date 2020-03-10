import { createUserApi, IUser } from './user';

export interface IGlobalState {
  user: IUser;
}

const debug = process.env.NODE_ENV === 'development';

export const user = createUserApi();

if (debug) {
  user.$store.watch(console.log);
}


