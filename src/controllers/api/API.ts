import axios, { AxiosInstance } from 'axios';
import qs from 'qs';
import { camelizeKeys, decamelizeKeys } from 'humps';

import { getPath } from './config';

import Auth from './resources/auth';


interface IAPI {
  // TODO: add other resources.
  auth: Auth;
  // user: User;
  // account: Account;
  // category: Category;
  instance: AxiosInstance;
  // TODO: add this method after auth resource.
  // updateToken(value?: string): boid;
}

class API implements IAPI {
  private baseURL: string;
  instance: AxiosInstance;

  auth: Auth;

  constructor() {
    this.baseURL = getPath();
    this.instance = axios.create({ baseURL: this.baseURL });

    this.prepareInstance();

    this.auth = new Auth(this.instance);
    // TODO: Init other resources...
  }

  private prepareRequests() {
    this.instance.interceptors.request.use(config => {
      const { data, params } = config;
      const isFormData = data instanceof FormData;
      const isString = data === 'string';
      let newData = data;

      if (!isFormData) {
        if (isString) {
          console.warn('Use object instead query string');
          try {
            // Check query string for camelized keys
            newData = qs.stringify(decamelizeKeys(qs.parse(data)));
          } catch (e) {
            console.warn('wrong string', data, e);
          }
        } else {
          newData = qs.stringify(decamelizeKeys(data));
        }
      }
      return ({
        ...config,
        params: decamelizeKeys(params),
        data: newData,
      });
    });
  }

  private prepareResponses() {
    this.instance.interceptors.response.use(response => ({
      ...response,
      data: camelizeKeys(response.data),
    }));
  }

  private prepareInstance() {
    this.prepareRequests();
    this.prepareResponses();
  }
}


export default API;
