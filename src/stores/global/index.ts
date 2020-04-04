import { Store } from 'effector';

import storage from 'controllers/storage';

import { createUserApi, IUser } from './user';


export interface IGlobalStore {
  user: ReturnType<typeof createUserApi>;
}

class GlobalStore implements IGlobalStore {
  public user: ReturnType<typeof createUserApi>;

  constructor() {
    this.user = createUserApi(this, storage.load().user);

    this.initWatchers();
  }

  private initWatchers() {
    // Save all user data in the storage.
    this.user.$store.watch(state => {
      storage.save({ user: state });
    });

    const debug = process.env.NODE_ENV === 'development';

    if (debug) {
      this.user.$store.watch(console.log); // TODO: mb implement fancy debug messages?
    }
  }
}

const globalStore = new GlobalStore();

export default globalStore;
