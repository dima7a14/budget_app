import merge from 'lodash/merge';

import { IUser } from 'stores/global/user';


export interface IStorage {
  user?: IUser;
}

const DEFAULT_DATA: IStorage = {};


class AppStorage {
  private readonly key: string;
  private storageInstance: Storage;

  constructor() {
    this.key = 'simple_budget';
    this.storageInstance = !!localStorage.getItem(this.key) ? localStorage : sessionStorage;
  }

  public cacheData(value: boolean) {
    this.storageInstance = value ? localStorage : sessionStorage;
  }

  public load() {
    try {
      const data: IStorage = JSON.parse(this.storageInstance.getItem(this.key) || 'null') || {};

      return merge({}, DEFAULT_DATA, data);
    } catch (err) {
      console.error(err);
      return DEFAULT_DATA;
    }
  }

  public save(data: IStorage) {
    try {
      const currentData = this.load();
      this.storageInstance.setItem(this.key, JSON.stringify(merge(currentData, data)));
    } catch (err) {
      console.error(err);
    }
  }

  public clear() {
    this.storageInstance.clear();
  }
}

const storage = new AppStorage();

export default storage;
