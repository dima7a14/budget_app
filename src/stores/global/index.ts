import storage from 'controllers/storage';

import Logger from '../logger';

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
    this.user = createUserApi(this, storage.load().token);



    this.initWatchers();
  }

  private initWatchers() {
    const debug = process.env.NODE_ENV === 'development';

    if (debug) {
      const appLogger = new Logger('App', false);
      const userLogger = new Logger('User', false);

      this.app.$store.watch(state => appLogger.log(state));
      this.user.$store.watch(state => userLogger.log(state));
    }
  }
}

const globalStore = new GlobalStore();

export default globalStore;
