import storage from 'controllers/storage';

import { createAppApi } from './app';
import { createUserApi } from './user';


export interface IGlobalStore {
  app: ReturnType<typeof createAppApi>;
  user: ReturnType<typeof createUserApi>;
}

class GlobalStore implements IGlobalStore {
  public app: ReturnType<typeof createAppApi>;
  public user: ReturnType<typeof createUserApi>;

  constructor() {
    this.app = createAppApi(this);
    this.user = createUserApi(this, storage.load().user);

    this.initWatchers();
  }

  private initWatchers() {
    // Save all user data in the storage.
    this.user.$store.watch(state => {
      storage.save({ user: state });
    });

    const debug = process.env.NODE_ENV === 'development';

    if (debug) { // TODO: mb implement fancy debug messages?
      this.app.$store.watch(console.log);
      this.user.$store.watch(console.log);
    }
  }
}

const globalStore = new GlobalStore();

export default globalStore;
