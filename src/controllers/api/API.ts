import axios, { AxiosInstance, AxiosError } from 'axios';
import qs from 'qs';
import { camelizeKeys, decamelizeKeys } from 'humps';

import storage from 'controllers/storage';

import { getPath } from './config';

import Auth, { ITokens } from './resources/auth';
import Users from './resources/users';
import Accounts from './resources/accounts';
import Transactions from './resources/transactions';
import Categories from './resources/categories';


interface IAPI {
  auth: Auth;
  users: Users;
  accounts: Accounts;
  transactions: Transactions;
  categories: Categories;
  instance: AxiosInstance;
}

class API implements IAPI {
  private baseURL: string;
  private refreshToken: string;
  instance: AxiosInstance;

  auth: Auth;
  users: Users;
  accounts: Accounts;
  transactions: Transactions;
  categories: Categories;

  constructor() {
    this.baseURL = getPath();
    this.refreshToken = '';
    this.instance = axios.create({ baseURL: this.baseURL });

    this.prepareInstance();

    this.auth = new Auth(this.instance);
    this.users = new Users(this.instance);
    this.accounts = new Accounts(this.instance);
    this.transactions = new Transactions(this.instance);
    this.categories = new Categories(this.instance);
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
    }), async (error: AxiosError) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest.url?.includes(this.auth.refreshPath)) {
        this.setTokens({ access: '', refresh: this.refreshToken });
        const data = await this.auth.refresh(this.refreshToken);

        if (data) {
          this.refreshToken = data.refresh;
          this.setTokens(data);
          storage.save({ tokens: data });
          originalRequest.headers['Authorization'] = `Bearer ${data.access}`;

          return this.instance(originalRequest);
        }
      }

      this.setTokens({ access: '', refresh: '' });
      storage.save({ tokens: { access: '', refresh: '' } });

      throw error;
    });
  }

  private prepareInstance() {
    this.prepareRequests();
    this.prepareResponses();
  }

  public setTokens(tokens: ITokens) {
    this.instance.defaults.headers.common.Authorization = tokens.access
      ? `Bearer ${tokens.access}`
      : '';
    this.refreshToken = tokens.refresh || '';
  }
}


export default API;
