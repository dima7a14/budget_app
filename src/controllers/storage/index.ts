export interface IStorage {
  tokens?: {
    access: string;
    refresh: string;
  };
}

const DEFAULT_DATA: IStorage = {};


class AppStorage {
  private readonly key: string;
  private storageInstance: Storage;

  constructor() {
    this.key = 'simple_budget';
    this.storageInstance = !!localStorage.getItem(this.key) ? localStorage : sessionStorage;
  }

  public enableCaching(value: boolean) {
    this.storageInstance = value ? localStorage : sessionStorage;
  }

  public load() {
    try {
      const data: IStorage = JSON.parse(this.storageInstance.getItem(this.key) || 'null') || {};

      return { ...DEFAULT_DATA, ...data };
    } catch (err) {
      console.error(err);
      return DEFAULT_DATA;
    }
  }

  public save(data: IStorage) {
    try {
      const currentData = this.load();
      this.storageInstance.setItem(this.key, JSON.stringify({ ...currentData, ...data }));
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
